// Minimal, dependency-free Etsy Open API v3 client.
//
// Scope is deliberately small (IMP-003 Phase 2): auth header construction and a
// connectivity check (`ping`). Write endpoints live in sibling modules and are
// gated by the Autonomy Tiers in IMP-003 — this file performs no writes.

export const ETSY_API_BASE = "https://openapi.etsy.com/v3";
export const ETSY_PING_PATH = "/application/openapi-ping";

// A structural subset of the global `fetch` so tests can inject a fake and the
// client stays runtime-agnostic.
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
}

/**
 * Build the headers every Etsy v3 request needs. Throws early on a missing key
 * so a misconfigured job fails loudly instead of making an anonymous request.
 */
export function buildAuthHeaders(apiKey: string): Record<string, string> {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("ETSY_API_KEY is required");
  }
  return {
    "x-api-key": apiKey,
    Accept: "application/json",
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

  if (res.status === 200 && typeof body.application_id === "number") {
    return { ok: true, status: res.status, applicationId: body.application_id };
  }

  return {
    ok: false,
    status: res.status,
    error:
      typeof body.error === "string"
        ? body.error
        : `Unexpected status ${res.status}`,
  };
}
