// Minimal, dependency-free Etsy Open API v3 client.
//
// Scope is deliberately small (IMP-003 Phase 2): auth header construction and a
// connectivity check (`ping`). Write endpoints live in sibling modules and are
// gated by the Autonomy Tiers in IMP-003 — this file performs no writes.

export const ETSY_API_BASE = "https://openapi.etsy.com/v3";
export const ETSY_PING_PATH = "/application/openapi-ping";

// A minimal Headers-like accessor (matches the global `Headers` and node-fetch).
export type HeadersLike = { get(name: string): string | null };

// A structural subset of the global `fetch` so tests can inject a fake and the
// client stays runtime-agnostic. `headers` is optional so a bare fake (status +
// json only) keeps working; when present we surface rate-limit info.
export type FetchLike = (
  url: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  },
) => Promise<{
  status: number;
  json: () => Promise<unknown>;
  headers?: HeadersLike;
}>;

export interface EtsyClientOptions {
  apiKey: string;
  baseUrl?: string;
  fetchImpl?: FetchLike;
}

export interface PingResult {
  ok: boolean;
  status: number;
  applicationId?: number;
  error?: string;
  /** Populated when the transport exposes response headers. */
  rateLimit?: RateLimit;
}

/**
 * Build the headers every Etsy v3 request needs. The `x-api-key` (app keystring)
 * is always required. Pass `accessToken` for seller-scoped / write endpoints —
 * Etsy needs *both* the api key and the OAuth Bearer token on those calls.
 * Throws early on a missing key so a misconfigured job fails loudly instead of
 * making an anonymous request.
 */
export function buildAuthHeaders(
  apiKey: string,
  accessToken?: string,
): Record<string, string> {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("ETSY_API_KEY is required");
  }
  const headers: Record<string, string> = {
    "x-api-key": apiKey,
    Accept: "application/json",
  };
  if (accessToken && accessToken.trim()) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}

/** Rate-limit snapshot parsed from Etsy response headers (all best-effort). */
export interface RateLimit {
  limitPerSecond?: number;
  remainingThisSecond?: number;
  limitPerDay?: number;
  remainingToday?: number;
  /** Present on a 429; seconds to wait before retrying. */
  retryAfterSeconds?: number;
}

function num(headers: HeadersLike, name: string): number | undefined {
  const raw = headers.get(name);
  if (raw == null) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Parse Etsy's rate-limit headers. Note the QPD window is a rolling 24h, and an
 * over-limit response is HTTP 429 with a `retry-after` header.
 */
export function parseRateLimit(headers: HeadersLike): RateLimit {
  return {
    limitPerSecond: num(headers, "x-limit-per-second"),
    remainingThisSecond: num(headers, "x-remaining-this-second"),
    limitPerDay: num(headers, "x-limit-per-day"),
    remainingToday: num(headers, "x-remaining-today"),
    retryAfterSeconds: num(headers, "retry-after"),
  };
}

function resolveFetch(fetchImpl?: FetchLike): FetchLike {
  if (fetchImpl) return fetchImpl;
  const globalFetch = (globalThis as { fetch?: unknown }).fetch;
  if (typeof globalFetch !== "function") {
    throw new Error(
      "No fetch implementation available; pass options.fetchImpl",
    );
  }
  return globalFetch as unknown as FetchLike;
}

/**
 * Hit the Etsy `openapi-ping` endpoint. A valid key returns
 * `{ application_id: number }` with HTTP 200; anything else is normalized to
 * `{ ok: false, status, error }` using Etsy's JSON `error` string when present.
 */
export async function ping(options: EtsyClientOptions): Promise<PingResult> {
  const { apiKey, baseUrl = ETSY_API_BASE } = options;
  const doFetch = resolveFetch(options.fetchImpl);
  const headers = buildAuthHeaders(apiKey);

  const res = await doFetch(`${baseUrl}${ETSY_PING_PATH}`, {
    method: "GET",
    headers,
  });

  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  const rateLimit = res.headers ? parseRateLimit(res.headers) : undefined;

  if (res.status === 200 && typeof body.application_id === "number") {
    return {
      ok: true,
      status: res.status,
      applicationId: body.application_id,
      rateLimit,
    };
  }

  return {
    ok: false,
    status: res.status,
    error:
      typeof body.error === "string"
        ? body.error
        : `Unexpected status ${res.status}`,
    rateLimit,
  };
}
