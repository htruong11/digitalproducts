# etsyctl

Thin, dependency-free client for the [Etsy Open API v3](https://developer.etsy.com/),
plus a local dry-run validator for draft listings. This is the Phase 2 seed from
[IMP-003](../../../docs/imps/IMP-003-productionizing-agent-employment.md). It
performs **no writes** — `client.ts` only reads (`ping`), and `draft-listing.ts`
only builds/validates payloads locally.

## Modules

- `client.ts` — `buildAuthHeaders()` and `ping()` against `openapi-ping`. Errors
  are normalized to `{ ok, status, error }`.
- `draft-listing.ts` — `buildDraftListingPayload()` maps repo inputs to the
  `createDraftListing` body; `validateDraftListing()` returns `error`/`warn`
  issues (Etsy schema limits + the safety-reviewer checks: risky claims, missing
  disclaimer, missing image).

## Tests

```bash
# Default: deterministic, offline (mocked transport). Live tests are skipped.
npm test

# Opt-in live contract check — hits the real Etsy API with a deliberately
# malformed key and asserts the 403 + JSON error contract:
ETSY_LIVE=1 npx vitest run marketplaces/etsy

# Full live check — requires a real key (never commit it; pass via env):
ETSY_API_KEY="keystring:shared_secret" npx vitest run marketplaces/etsy
```

### Observed live contract (2026-05-30)

`GET https://openapi.etsy.com/v3/application/openapi-ping`, header `x-api-key`,
`content-type: application/json`:

| Key                                   | Status | Body                                                           |
| ------------------------------------- | ------ | -------------------------------------------------------------- |
| missing / no `keystring:secret` colon | 403    | `error: ...should be in the format 'keystring:shared_secret'.` |
| well-formed but invalid               | 403    | `error: API key not found or not active...`                    |
| valid                                 | 200    | `{ "application_id": <number> }`                               |

Credentials are never stored here — pass them through the environment only.
