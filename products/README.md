# Products

Product workspaces are organized around sellable products, not broad market
themes.

## Active Queue

1. `hospital-to-home-discharge-kit/` - first Etsy listing. **Build-ready**
   (`product.ts` + dist PDF + staged Etsy draft).
2. `aging-parent-handoff-kit/` - companion product and bundle candidate.
   **Build-ready** (`product.ts` + dist PDF + staged Etsy draft); publish after
   the discharge kit has a live listing.
3. `care-pact-sibling-coordination-kit/` - next caregiver-library PDF.
   **Build-ready draft** (`product.ts`); publish after claims scrub and listing
   image review.
4. `executor-first-30-days-estate-admin-kit/` - higher-ticket idea.
   **Drafted but parked for launch** until legal-adjacent claims are reviewed by
   a human and preferably by an attorney/paralegal.

## Building

Products are defined as `product.ts` files registered in
`scripts/product-build/build-product.ts`. Build commands:

- `npm run product:build` - builds every registered product (HTML + Etsy draft
  - claims scrub) and runs the claim gate; fails the build on any blocked claim.
- `npm run product:pdf` - same, plus renders the print PDF via Playwright.
- `npx tsx scripts/product-build/build-product.ts <slug> [--pdf]` - build one
  product by slug.

Build outputs are gitignored where applicable; an Etsy publish still requires
human review (the claims scrub is a draft-pass, not a publish approval).

## Historical

- `caregiver-command-kit/` - historical MVP name from IMP-001/IMP-005. Do not
  use this as the public product name.

## Standard Product Folders

- `content/` - buyer-facing copy and page specs.
- `print/` - PDF-oriented HTML, CSS, templates, and render sources.
- `sheets/` - optional Google Sheet or connected-system upgrade specs.
- `listing-assets/` - Etsy/Gumroad images and mockups derived from real pages.
- `release/` - release checklist, claims scrub, and publication packet.
