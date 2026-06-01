import { describe, expect, it } from "vitest";
import type { FetchLike } from "./client";
import {
  ETSY_OAUTH_CONNECT_URL,
  ETSY_OAUTH_TOKEN_URL,
  buildAuthorizationUrl,
  exchangeCodeForToken,
  generatePkce,
  generateState,
  refreshAccessToken,
} from "./oauth";

// Records the request and returns a scripted status + JSON body.
function fakeFetch(status: number, body: unknown) {
  const calls: {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  }[] = [];
  const impl: FetchLike = async (url, init) => {
    calls.push({
      url,
      method: init?.method,
      headers: init?.headers,
      body: init?.body,
    });
    return { status, json: async () => body };
  };
  return { impl, calls };
}

describe("generatePkce", () => {
  it("produces a url-safe verifier and an S256 challenge", async () => {
    const { codeVerifier, codeChallenge } = await generatePkce();
    expect(codeVerifier).toMatch(/^[A-Za-z0-9._~-]+$/);
    expect(codeVerifier.length).toBeGreaterThanOrEqual(43);
    expect(codeChallenge).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(codeChallenge).not.toContain("=");
  });

  it("computes the known SHA-256 challenge for a fixed verifier", async () => {
    // Deterministic crypto: fixed bytes for getRandomValues, real subtle.digest.
    const fixed = new Uint8Array(32).fill(0);
    const crypto = {
      getRandomValues: <T extends ArrayBufferView>(arr: T): T => {
        new Uint8Array(arr.buffer).set(fixed);
        return arr;
      },
      subtle: globalThis.crypto.subtle,
    };
    const { codeVerifier, codeChallenge } = await generatePkce(crypto);
    // base64url of 32 zero bytes:
    expect(codeVerifier).toBe("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    // SHA-256 of that string, base64url, no padding:
    expect(codeChallenge).toBe("DwBzhbb51LfusnSGBa_hqYSgo7-j8BTQnip4TOnlzRo");
  });

  it("generates distinct verifiers across calls", async () => {
    const a = await generatePkce();
    const b = await generatePkce();
    expect(a.codeVerifier).not.toBe(b.codeVerifier);
  });
});

describe("generateState", () => {
  it("returns a url-safe non-empty token", () => {
    expect(generateState()).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});

describe("buildAuthorizationUrl", () => {
  it("assembles the connect URL with PKCE + scopes", () => {
    const url = new URL(
      buildAuthorizationUrl({
        clientId: "keystring123",
        redirectUri: "https://example.com/cb",
        scopes: ["listings_r", "listings_w"],
        state: "st8",
        codeChallenge: "chal",
      }),
    );
    expect(`${url.origin}${url.pathname}`).toBe(ETSY_OAUTH_CONNECT_URL);
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("client_id")).toBe("keystring123");
    expect(url.searchParams.get("redirect_uri")).toBe("https://example.com/cb");
    expect(url.searchParams.get("scope")).toBe("listings_r listings_w");
    expect(url.searchParams.get("state")).toBe("st8");
    expect(url.searchParams.get("code_challenge")).toBe("chal");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
  });

  it("throws when no scopes are requested", () => {
    expect(() =>
      buildAuthorizationUrl({
        clientId: "k",
        redirectUri: "https://example.com/cb",
        scopes: [],
        state: "s",
        codeChallenge: "c",
      }),
    ).toThrow(/scope/i);
  });
});

describe("exchangeCodeForToken", () => {
  it("posts a form-encoded authorization_code grant and parses tokens", async () => {
    const { impl, calls } = fakeFetch(200, {
      access_token: "12345.acc",
      refresh_token: "12345.ref",
      expires_in: 3600,
      token_type: "Bearer",
    });

    const result = await exchangeCodeForToken({
      clientId: "keystring123",
      redirectUri: "https://example.com/cb",
      code: "authcode",
      codeVerifier: "verifier",
      fetchImpl: impl,
    });

    expect(result.ok).toBe(true);
    expect(result.token?.access_token).toBe("12345.acc");
    expect(calls[0].url).toBe(ETSY_OAUTH_TOKEN_URL);
    expect(calls[0].method).toBe("POST");
    expect(calls[0].headers?.["Content-Type"]).toBe(
      "application/x-www-form-urlencoded",
    );
    const form = new URLSearchParams(calls[0].body);
    expect(form.get("grant_type")).toBe("authorization_code");
    expect(form.get("client_id")).toBe("keystring123");
    expect(form.get("code")).toBe("authcode");
    expect(form.get("code_verifier")).toBe("verifier");
    expect(form.get("redirect_uri")).toBe("https://example.com/cb");
  });

  it("normalizes an error response", async () => {
    const { impl } = fakeFetch(400, {
      error: "invalid_grant",
      error_description: "code expired",
    });

    const result = await exchangeCodeForToken({
      clientId: "k",
      redirectUri: "https://example.com/cb",
      code: "bad",
      codeVerifier: "v",
      fetchImpl: impl,
    });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(400);
    expect(result.error).toBe("code expired");
  });
});

describe("refreshAccessToken", () => {
  it("posts a refresh_token grant", async () => {
    const { impl, calls } = fakeFetch(200, {
      access_token: "12345.acc2",
      refresh_token: "12345.ref2",
      expires_in: 3600,
      token_type: "Bearer",
    });

    const result = await refreshAccessToken({
      clientId: "keystring123",
      refreshToken: "12345.ref",
      fetchImpl: impl,
    });

    expect(result.ok).toBe(true);
    expect(result.token?.access_token).toBe("12345.acc2");
    const form = new URLSearchParams(calls[0].body);
    expect(form.get("grant_type")).toBe("refresh_token");
    expect(form.get("refresh_token")).toBe("12345.ref");
    expect(form.get("client_id")).toBe("keystring123");
  });
});
