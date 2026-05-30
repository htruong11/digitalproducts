import { describe, expect, it } from "vitest";
import {
  ETSY_API_BASE,
  ETSY_PING_PATH,
  buildAuthHeaders,
  ping,
  type FetchLike,
} from "./client";

// A fake fetch that records the call and returns a scripted status + JSON body.
function fakeFetch(status: number, body: unknown) {
  const calls: { url: string; headers?: Record<string, string> }[] = [];
  const impl: FetchLike = async (url, init) => {
    calls.push({ url, headers: init?.headers });
    return { status, json: async () => body };
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

  it("throws on a missing or blank key", () => {
    expect(() => buildAuthHeaders("")).toThrow(/required/i);
    expect(() => buildAuthHeaders("   ")).toThrow(/required/i);
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
