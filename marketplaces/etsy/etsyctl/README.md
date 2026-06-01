# etsyctl

Thin, dependency-free client for the [Etsy Open API v3](https://developer.etsy.com/),
plus a local dry-run validator for draft listings. This is the Phase 2 seed from
[IMP-003](../../../docs/imps/IMP-003-productionizing-agent-employment.md). It
performs **no writes** — `client.ts` only reads (`ping`), and `draft-listing.ts`
only builds/validates payloads locally.

## Modules

- `client.ts` — `buildAuthHeaders(apiKey, accessToken?)` (adds
  `Authorization: Bearer` when an OAuth token is supplied), `ping()` against
  `openapi-ping`, and `parseRateLimit()` for the `x-limit-*` / `retry-after`
  headers. Errors are normalized to `{ ok, status, error, rateLimit? }`.
- `oauth.ts` — OAuth 2.0 Authorization Code + PKCE plumbing:
  `generatePkce()`, `generateState()`, `buildAuthorizationUrl()`,
  `exchangeCodeForToken()`, `refreshAccessToken()`, plus `ETSY_SCOPES`. No
  third-party deps (Web Crypto + the injectable `FetchLike`). Required before any
  seller-scoped or write call — `x-api-key` alone only reaches public endpoints.
- `endpoints.ts` — pure path builders for the core workflow (shop, listings,
  images, digital files, inventory, receipts, taxonomy) plus `REFERENCE`, a
  linked catalog of the broader API for future work.
- `draft-listing.ts` — `buildDraftListingPayload()` maps repo inputs to the
  `createDraftListing` body; `validateDraftListing()` returns `error`/`warn`
  issues (Etsy schema limits + the safety-reviewer checks: risky claims, missing
  disclaimer, missing image).

## Auth model

Two credentials, two layers:

- **App keystring** (`x-api-key`) — identifies the Application. Required on every
  call. Public endpoints (`openapi-ping`, seller taxonomy) need only this.
- **OAuth Bearer access token** — identifies the seller and their granted
  scopes. Required for shop/listing/inventory/receipt calls. Obtain via the
  `oauth.ts` PKCE flow; access tokens last ~1h, refresh tokens ~90 days.

The app shared secret is **not** sent as a header — it is only used (if at all)
during the OAuth exchange. Keep keystring/secret/tokens in the environment; never
commit them.

## Account state (as of 2026-05-31)

- App `digitalproducts`: **Pending Personal Approval**. Rate limit **5 QPS /
  5,000 QPD** (lower than the 10k default until approved).
- Shop `ShaneNeeley` is in **Developer Mode** — listings are hidden from Etsy
  search, which is correct for testing. Remove test listings and email
  developer@etsy.com to return to normal sales mode.
- See [../research/api-terms-of-use.md](../research/api-terms-of-use.md) for the
  binding API Terms (rate limits, caching/freshness, attribution, PII).

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
