# Hospital-to-Home Discharge Kit

First publishable product from
`docs/imps/IMP-006-adjacent-product-research.md`.

Positioning:

- Buyer: adult child or family caregiver after a parent leaves hospital, rehab,
  urgent care, or surgery recovery.
- Promise: record care-team instructions, first-week tasks, medication changes,
  follow-ups, contacts, and family ownership in one printable organizer.
- Price test: `$9.99` intro / `$14.99` anchor.

Allowed framing:

- Organizer, checklist, tracker, log, worksheet, record, and template.
- For recording the buyer's care-team instructions and family tasks.

Blocked framing:

- Medical advice, warning signs, dosage guidance, recovery promises, diagnosis
  guidance, treatment steps, "when to call" rules, legal/tax/insurance advice,
  or compliance claims.

Folders:

- `content/` - 10-14 page kit copy and page specs.
- `print/` - PDF source and print styles.
- `sheets/` - optional connected-system upgrade.
- `listing-assets/` - 6-8 listing images from real pages.
- `release/` - claims scrub, AI disclosure, and Etsy publication packet.

Current build source:

- `product.ts` - typed product, page, listing, FAQ, disclaimer, and AI disclosure model.
- `npm run product:build` - writes generated HTML, Etsy draft, and claims scrub.
- `npm run product:pdf` - writes the Playwright-rendered PDF to `dist/`.
