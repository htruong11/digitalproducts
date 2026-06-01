# Product Build

Typed generators for local product artifacts.

Commands:

```bash
npm run product:build
npm run product:pdf
```

`product:build` is fast and writes:

- `products/hospital-to-home-discharge-kit/dist/hospital-to-home-discharge-kit.html`
- `marketplaces/etsy/drafts/hospital-to-home-discharge-kit.md`
- `products/hospital-to-home-discharge-kit/release/claims-scrub.md`

`product:pdf` also uses Playwright Chromium to render the PDF. Keep generated
`dist/` files out of git unless a release artifact is intentionally committed.
