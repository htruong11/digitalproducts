// Etsy Open API v3 OAuth 2.0 (Authorization Code + PKCE).
//
// Every seller-scoped or write endpoint requires a Bearer access token obtained
// through this flow; the public `x-api-key` alone (see client.ts) only reaches
// public endpoints like openapi-ping. This module is pure plumbing — it builds
// the authorize URL and exchanges/refreshes tokens. It performs no listing
// writes itself; those remain gated by the IMP-003 autonomy tiers.
//
// Runtime-agnostic: crypto comes from the Web Crypto API (globalThis.crypto,
// present in Node 18+ and browsers) and HTTP from the injectable FetchLike used
// across etsyctl, so there are no third-party dependencies.

import type { FetchLike } from "./client.ts";

export const ETSY_OAUTH_CONNECT_URL = "https://www.etsy.com/oauth/connect";
export const ETSY_OAUTH_TOKEN_URL =
  "https://api.etsy.com/v3/public/oauth/token";

// All OAuth scopes Etsy exposes. Request the narrowest set an Application needs.
// Seller listing work needs at least listings_r/listings_w (+ listings_d to
// delete); order fulfillment needs transactions_r/transactions_w.
export const ETSY_SCOPES = [
  "address_r",
  "address_w",
  "billing_r",
  "cart_r",
  "cart_w",
  "email_r",
  "favorites_r",
  "favorites_w",
  "feedback_r",
  "listings_d",
  "listings_r",
  "listings_w",
  "profile_r",
  "profile_w",
  "recommend_r",
  "recommend_w",
  "shops_r",
  "shops_w",
  "transactions_r",
  "transactions_w",
] as const;
export type EtsyScope = (typeof ETSY_SCOPES)[number];

// --- PKCE ---------------------------------------------------------------

export interface Pkce {
  /** Random 43-char secret; kept client-side and sent only at token exchange. */
  codeVerifier: string;
  /** base64url(SHA-256(codeVerifier)); sent in the authorize URL. */
  codeChallenge: string;
}

type CryptoLike = {
  getRandomValues<T extends ArrayBufferView>(array: T): T;
  subtle: {
    digest(algorithm: string, data: ArrayBuffer): Promise<ArrayBuffer>;
  };
};

function resolveCrypto(crypto?: CryptoLike): CryptoLike {
  const c = crypto ?? (globalThis as { crypto?: CryptoLike }).crypto;
  if (!c?.subtle || typeof c.getRandomValues !== "function") {
    throw new Error("Web Crypto unavailable; pass a crypto implementation");
  }
  return c;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Generate a PKCE verifier/challenge pair (S256). */
export async function generatePkce(crypto?: CryptoLike): Promise<Pkce> {
  const c = resolveCrypto(crypto);
  const verifierBytes = new Uint8Array(32);
  c.getRandomValues(verifierBytes);
  const codeVerifier = base64UrlEncode(verifierBytes); // 43 url-safe chars
  const digest = await c.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier).buffer as ArrayBuffer,
  );
  return {
    codeVerifier,
    codeChallenge: base64UrlEncode(new Uint8Array(digest)),
  };
}

/** Opaque, single-use CSRF token to round-trip through the authorize redirect. */
export function generateState(crypto?: CryptoLike): string {
  const bytes = new Uint8Array(16);
  resolveCrypto(crypto).getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

// --- Authorization URL --------------------------------------------------

export interface AuthorizationUrlParams {
  /** App API Key (keystring) — Etsy uses it as the OAuth client_id. */
  clientId: string;
  /** HTTPS callback; must exactly match a URL registered in the dev portal. */
  redirectUri: string;
  scopes: EtsyScope[];
  /** From generateState(); verify it is echoed back on the redirect. */
  state: string;
  /** From generatePkce().codeChallenge. */
  codeChallenge: string;
}

/** Build the URL to send the seller to so they can grant access. */
export function buildAuthorizationUrl(params: AuthorizationUrlParams): string {
  if (params.scopes.length === 0) {
    throw new Error("At least one scope is required");
  }
  const url = new URL(ETSY_OAUTH_CONNECT_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", params.clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("scope", params.scopes.join(" "));
  url.searchParams.set("state", params.state);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  return url.toString();
}

// --- Token exchange / refresh ------------------------------------------

export interface TokenResponse {
  /** Bearer token (`<user_id>.<token>`), valid ~1 hour. */
  access_token: string;
  /** Used to mint new access tokens; ~90-day lifetime. */
  refresh_token: string;
  /** Access-token lifetime in seconds (3600). */
  expires_in: number;
  token_type: string; // "Bearer"
}

export interface TokenResult {
  ok: boolean;
  status: number;
  token?: TokenResponse;
  /** Etsy's `error_description` (or `error`) string when the exchange fails. */
  error?: string;
}

function resolveFetch(fetchImpl?: FetchLike): FetchLike {
  if (fetchImpl) return fetchImpl;
  const globalFetch = (globalThis as { fetch?: unknown }).fetch;
  if (typeof globalFetch !== "function") {
    throw new Error("No fetch implementation available; pass fetchImpl");
  }
  return globalFetch as unknown as FetchLike;
}

async function postToken(
  form: URLSearchParams,
  fetchImpl?: FetchLike,
  tokenUrl: string = ETSY_OAUTH_TOKEN_URL,
): Promise<TokenResult> {
  const res = await resolveFetch(fetchImpl)(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (
    res.status === 200 &&
    typeof body.access_token === "string" &&
    typeof body.refresh_token === "string"
  ) {
    return {
      ok: true,
      status: res.status,
      token: body as unknown as TokenResponse,
    };
  }
  const error =
    (typeof body.error_description === "string" && body.error_description) ||
    (typeof body.error === "string" && body.error) ||
    `Token request failed with status ${res.status}`;
  return { ok: false, status: res.status, error };
}

export interface ExchangeCodeParams {
  clientId: string;
  redirectUri: string;
  /** Authorization code from the redirect query. */
  code: string;
  /** The matching generatePkce().codeVerifier from this flow. */
  codeVerifier: string;
  fetchImpl?: FetchLike;
  tokenUrl?: string;
}

/** Exchange an authorization code for access + refresh tokens. */
export function exchangeCodeForToken(
  params: ExchangeCodeParams,
): Promise<TokenResult> {
  const form = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: params.clientId,
    redirect_uri: params.redirectUri,
    code: params.code,
    code_verifier: params.codeVerifier,
  });
  return postToken(form, params.fetchImpl, params.tokenUrl);
}

export interface RefreshTokenParams {
  clientId: string;
  refreshToken: string;
  fetchImpl?: FetchLike;
  tokenUrl?: string;
}

/** Trade a refresh token for a fresh access token (and a new refresh token). */
export function refreshAccessToken(
  params: RefreshTokenParams,
): Promise<TokenResult> {
  const form = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: params.clientId,
    refresh_token: params.refreshToken,
  });
  return postToken(form, params.fetchImpl, params.tokenUrl);
}
