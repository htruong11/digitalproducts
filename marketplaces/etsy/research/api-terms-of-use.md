# Etsy API Terms of Use — compliance notes

Source: Etsy API Terms of Use (https://www.etsy.com/developers), governed by NY law.
Captured 2026-05-31. **Etsy reserves the right to change these terms at any time**, so
re-check before any behavior change in [`etsyctl/`](../etsyctl/README.md). Questions:
developer@etsy.com.

> The full legal text is long; this note records only the clauses that constrain how
> our tooling and listing pipeline must behave. Read the source for warranty,
> liability, indemnity, and jurisdiction language.

## Our app & account state (as of 2026-05-31)

- **App:** `digitalproducts` — status **Pending Personal Approval**.
- **Rate limit (this app):** **5 QPS / 5,000 QPD** — lower than the 10k default
  until personal approval lands. Etsy reports live quota in the dev portal and via
  `x-limit-*` response headers; over-limit returns **429 + `retry-after`**.
  `etsyctl/client.ts` `parseRateLimit()` surfaces these.
- **Shop `ShaneNeeley`: Developer Mode** — listings are hidden from Etsy search so
  test listings can't be bought by accident. Correct for testing. To exit: delete
  test listings, then email developer@etsy.com.
- Credentials (keystring + shared secret) live only in `.env` (gitignored) — never
  in the repo. See [[pii-hygiene-in-commits]].

## Hard operational constraints (affect our code)

- **Rate limit:** **5 QPS / 5,000 QPD** for our (pending) app today; 10,000/day is
  the general default. Exceeding = abusive usage. Contact developer@etsy.com before
  going over. Don't hammer the API.
- **Caching/freshness:** do **not** cache/store Content beyond a reasonable period
  needed to serve the request. Displayed item content/images must be **≤ 6 hours**
  stale vs. the live site; other Etsy content **≤ 24 hours**. → Our repo must not
  treat stored listing/competitor snapshots as a live display surface.
- **Link back:** any Application that uses product info/images must **link directly
  back** to the product/image on Etsy.
- **No scraping / API-only:** screen-scraping etsy.com, reverse-engineering internal
  data feeds, or using legacy/internal (non-public) APIs is prohibited. The public
  API is the only sanctioned programmatic access. → etsyctl must only hit documented
  Open API v3 endpoints.
- **No circumventing checkout:** can't replicate/bypass Etsy's checkout or replace the
  core etsy.com UX.
- **No security circumvention:** don't bypass security measures or technical limits;
  don't forge headers / disguise request origin.

## Data & PII (reinforces our existing rule)

- Do **not** upload, collect, store, share, transfer, or process personal info about
  Etsy members unless that member specifically authorized it.
- Do not collect/store member ID + password combinations.
- Member Content (photos, descriptions, stories) is owned by **members, not Etsy**;
  respect member-specified restrictions (profile, shop policies, item descriptions).
- Aligns with our repo rule: no credentials/tokens/PII committed (see etsy README;
  [[pii-hygiene-in-commits]]).

## Application requirements (when/if we ship a public app)

- Provide a prominently displayed **contact email** for issues, and respond timely.
- Provide a **terms of service + privacy policy** in a visible location.
- Required attribution notice, displayed prominently:
  > "The term 'Etsy' is a trademark of Etsy, Inc. This application uses the Etsy API
  > but is not endorsed or certified by Etsy, Inc."
- Etsy logo/trademark usage must be unaltered, less prominent than our own mark, and
  must not imply endorsement/affiliation.
- We are solely responsible for the app and all customer support to end-users.

## Commercial use (Section 4)

- Reasonable commercial use is allowed. **Permitted:** selling our **own** products/
  services, charging for app portions that don't integrate the API, in-app advertising
  (non-deceptive).
- **Prohibited:** selling the API / member content / access; charging users for what
  Etsy gives members free; using the API **primarily to drive traffic to non-Etsy
  sites/services**.
- Can't sell, lease, or sublicense API access. License is non-transferable,
  revocable.

## Status quo: are we compliant today?

`etsyctl` is **read-only/dry-run + auth plumbing, no writes**: `client.ts` reads
(`ping`), `oauth.ts` builds the PKCE flow and exchanges/refreshes tokens, `endpoints.ts`
is pure path strings, and `draft-listing.ts` builds & validates payloads locally. Nothing
calls a write endpoint. Credentials are env-only, never stored. That posture sits well
inside these terms. The freshness/link-back/attribution obligations become live the
moment we (a) build write/submit flows, (b) display fetched Etsy content anywhere, or
(c) ship a public-facing Application — revisit this note at each of those gates.
