import { describe, expect, it } from "vitest";
import {
  ETSY_API_BASE,
  ETSY_PING_PATH,
  buildAuthHeaders,
  parseRateLimit,
  ping,
  type FetchLike,
  type HeadersLike,
} from "./client";

// A fake fetch that records the call and returns a scripted status + JSON body.
// `headers` is an optional map exposed via a Headers-like accessor.
function fakeFetch(
  status: number,
  body: unknown,
  headers?: Record<string, string>,
) {
  const calls: { url: string; headers?: Record<string, string> }[] = [];
  const headersLike: HeadersLike | undefined = headers
    ? { get: (name) => headers[name.toLowerCase()] ?? null }
    : undefined;
  const impl: FetchLike = async (url, init) => {
    calls.push({ url, headers: init?.headers });
    return { status, json: async () => body, headers: headersLike };
  };
  return { impl, calls };
}

describe("buildAuthHeaders", () => {
  it("sets the x-api-key header", () => {
    expect(buildAuthHeaders("key123")).toEqual({
      "x-api-key": "key123",
      Accept: "application/json",
    });
  });

  it("adds a Bearer Authorization header when an access token is given", () => {
    expect(buildAuthHeaders("key123", "tok_abc")).toEqual({
      "x-api-key": "key123",
      Accept: "application/json",
      Authorization: "Bearer tok_abc",
    });
  });

  it("omits Authorization for a blank access token", () => {
    expect(buildAuthHeaders("key123", "   ")).not.toHaveProperty(
      "Authorization",
    );
  });

  it("throws on a missing or blank key", () => {
    expect(() => buildAuthHeaders("")).toThrow(/required/i);
    expect(() => buildAuthHeaders("   ")).toThrow(/required/i);
  });
});

describe("parseRateLimit", () => {
  it("parses the documented rate-limit headers", () => {
    const headers: HeadersLike = {
      get: (name) =>
        ({
          "x-limit-per-second": "5",
          "x-remaining-this-second": "4",
          "x-limit-per-day": "5000",
          "x-remaining-today": "4990",
          "retry-after": "2",
        })[name.toLowerCase()] ?? null,
    };
    expect(parseRateLimit(headers)).toEqual({
      limitPerSecond: 5,
      remainingThisSecond: 4,
      limitPerDay: 5000,
      remainingToday: 4990,
      retryAfterSeconds: 2,
    });
  });

  it("leaves fields undefined when headers are absent or non-numeric", () => {
    const headers: HeadersLike = {
      get: (name) => (name.toLowerCase() === "x-limit-per-day" ? "oops" : null),
    };
    expect(parseRateLimit(headers)).toEqual({
      limitPerSecond: undefined,
      remainingThisSecond: undefined,
      limitPerDay: undefined,
      remainingToday: undefined,
      retryAfterSeconds: undefined,
    });
  });
});

describe("ping (mocked transport)", () => {
  it("returns ok with the application id on HTTP 200", async () => {
    const { impl, calls } = fakeFetch(200, { application_id: 4242 });

    const result = await ping({ apiKey: "key123", fetchImpl: impl });

    expect(result).toEqual({ ok: true, status: 200, applicationId: 4242 });
    expect(calls[0].url).toBe(`${ETSY_API_BASE}${ETSY_PING_PATH}`);
    expect(calls[0].headers?.["x-api-key"]).toBe("key123");
  });

  it("normalizes the real 403 'malformed key' contract", async () => {
    // Mirrors the live response observed for a key without keystring:secret form.
    const { impl } = fakeFetch(403, {
      error:
        "Invalid API key: should be in the format 'keystring:shared_secret'.",
    });

    const result = await ping({ apiKey: "no_colon_key", fetchImpl: impl });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(403);
    expect(result.error).toMatch(/keystring:shared_secret/);
  });

  it("normalizes the real 403 'invalid key' contract", async () => {
    const { impl } = fakeFetch(403, {
      error:
        "API key not found or not active, or incorrect shared secret for API key.",
    });

    const result = await ping({ apiKey: "abc:def", fetchImpl: impl });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(403);
    expect(result.error).toMatch(/not found or not active/i);
  });

  it("falls back to a status message when no error string is present", async () => {
    const { impl } = fakeFetch(500, {});

    const result = await ping({ apiKey: "key123", fetchImpl: impl });

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/Unexpected status 500/);
  });

  it("treats a 200 without application_id as a failure", async () => {
    const { impl } = fakeFetch(200, { unexpected: true });

    const result = await ping({ apiKey: "key123", fetchImpl: impl });

    expect(result.ok).toBe(false);
  });

  it("surfaces rate-limit headers when the transport exposes them", async () => {
    const { impl } = fakeFetch(
      200,
      { application_id: 4242 },
      { "x-limit-per-day": "5000", "x-remaining-today": "4999" },
    );

    const result = await ping({ apiKey: "key123", fetchImpl: impl });

    expect(result.rateLimit?.limitPerDay).toBe(5000);
    expect(result.rateLimit?.remainingToday).toBe(4999);
  });

  it("leaves rateLimit undefined when the transport omits headers", async () => {
    const { impl } = fakeFetch(200, { application_id: 4242 });

    const result = await ping({ apiKey: "key123", fetchImpl: impl });

    expect(result.rateLimit).toBeUndefined();
  });
});

// Live tests hit the real Etsy API. They are skipped unless credentials/opt-in
// are provided, so the default `npm test` stays deterministic and offline.
const liveKey = process.env.ETSY_API_KEY;
const liveOptIn = process.env.ETSY_LIVE === "1";

describe("ping (live Etsy API)", () => {
  it.skipIf(!liveKey)(
    "succeeds against the real endpoint with a valid ETSY_API_KEY",
    async () => {
      const result = await ping({ apiKey: liveKey as string });
      expect(result.ok).toBe(true);
      expect(typeof result.applicationId).toBe("number");
    },
  );

  it.skipIf(!liveOptIn)(
    "rejects a malformed key with 403 + JSON error (contract check)",
    async () => {
      const result = await ping({ apiKey: "etsyctl_contract_probe" });
      expect(result.ok).toBe(false);
      expect(result.status).toBe(403);
      expect(result.error).toMatch(/API key/i);
    },
  );
});
