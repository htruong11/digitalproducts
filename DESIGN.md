# DESIGN.md

## 1. Visual Theme & Atmosphere

- Editorial product page for a practical family-care printable, informed by a
  Notion-style workspace aesthetic but adapted for caregivers.
- Calm, concrete, and evidence-aware: the page should feel like an organized
  desk before a doctor visit, not like a SaaS dashboard or generic Etsy mockup.
- First viewport centers the product name and promise over a full-bleed paper
  workspace scene. No split hero and no decorative gradient hero.
- Dense enough to answer objections: market proof, product contents, buyer
  moment, competitor positioning, validation plan, and disclaimer.
- Design must stay human and low-support: printable PDF, no login, no medical
  claims, no complicated app language.

## 2. Color Palette & Roles

Primary:

- Midnight: `#111827` for hero background, primary text, and serious trust.
- Ink: `#1f2933` for body text.
- White: `#ffffff` for page and card surfaces.
- Workspace: `#f5f7f4` for quiet section backgrounds.

Accent:

- Teal: `#207d80` for care-coordination accents and secondary data signals.
- Coral: `#d95f43` for primary CTA, buyer-pain markers, and emphasis.
- Gold: `#d4a72c` for proof badges and market notes.
- Sky: `#3b82b8` for links and informational labels.

Neutral Scale:

- Slate: `#52606d` for supporting copy.
- Stone: `#8a94a3` for captions and timestamps.
- Hairline: `#d9e0e7` for borders.
- Hairline Soft: `#edf1f4` for internal dividers.
- Paper: `#fffdf8` for printable previews.

Shadows & Depth:

- Paper Shadow: `0 28px 80px rgba(17, 24, 39, 0.24)`.
- Card Shadow: `0 18px 50px rgba(17, 24, 39, 0.08)`.
- Raised Shadow: `0 24px 70px rgba(17, 24, 39, 0.12)`.

## 3. Typography Rules

Use system fonts only:
`Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

| Role            | Font        | Size                      | Weight | Line Height | Letter Spacing | Notes                           |
| --------------- | ----------- | ------------------------- | ------ | ----------- | -------------- | ------------------------------- |
| Hero            | System sans | 64px desktop, 40px mobile | 700    | 1.02        | 0              | Product name only               |
| Hero support    | System sans | 21px desktop, 18px mobile | 400    | 1.55        | 0              | Plain buyer outcome             |
| Section heading | System sans | 38px desktop, 29px mobile | 700    | 1.12        | 0              | One concrete claim              |
| Card title      | System sans | 20px                      | 700    | 1.25        | 0              | Compact, scannable              |
| Body            | System sans | 17px                      | 400    | 1.62        | 0              | Readable for older audiences    |
| Small           | System sans | 14px                      | 500    | 1.45        | 0              | Labels, captions, source notes  |
| Micro           | System sans | 12px                      | 800    | 1.35        | 0              | Uppercase tags without tracking |

## 4. Component Stylings

- Buttons: 8px radius, 12px 18px padding, minimum 48px height. Primary is Coral
  on white or Midnight on light backgrounds. Secondary is transparent with
  hairline border.
- Cards: 8px radius, 1px hairline border, white or paper surface, no nested
  cards. Use compact headers and real content, not decorative filler.
- Product visual: full-bleed hero workspace with layered printable pages,
  checkboxes, notes, tabs, and a small market-proof strip. It must show product
  state, not abstract decoration.
- Stat chips: small, bordered, readable, with one strong number and one label.
- Comparison rows: plain table-like rows with competitor cluster, evidence, and
  weakness to exploit.
- Disclaimer: quiet bordered note near the bottom, never styled as alarm.

## 5. Layout Principles

- Container max width: 1180px.
- Section padding: 76px desktop, 52px mobile.
- Grid gaps: 18px to 28px.
- Hero height: about 78vh so a hint of the next section remains visible on
  desktop and mobile.
- Use full-width sections, not floating page-section cards.
- Cards are for repeated evidence, contents, risks, and validation steps only.

## 6. Depth & Elevation

- Prefer clear borders and spacing over heavy elevation.
- Use one hero workspace depth layer; below the hero, use subtle card shadows
  only when it improves scanability.
- Paper previews may overlap; content cards should not overlap.

## 7. Do's and Don'ts

- Do lead with "Hospital-to-Home Discharge Kit."
- Do show the concrete buyer moment: emergency info, daily handoff, doctor visit
  prep, and family task ownership.
- Do include why the product could fail: crowded keywords, low-price comps, and
  distribution risk.
- Do use market proof responsibly without implying guaranteed sales.
- Do not use medical, legal, financial, HIPAA, clinical, or outcome claims.
- Do not make the page beige-dominant or monochrome.
- Do not use gradient orbs, bokeh, stock imagery, or generic caregiver photos.
- Do not mention internal IMP names on the public page.

## 8. Responsive Behavior

- Breakpoints: 980px and 720px.
- Collapse all grids to one column below 720px.
- Keep tap targets at least 44px tall.
- On mobile, hero copy stays first and the product visual sits behind/below it
  without overlapping text.
- Tables convert to stacked rows on narrow screens.

## 9. Agent Prompt Guide

Build a polished static product page for a printable "Hospital-to-Home Discharge Kit."
Use a midnight hero with a full-bleed paper-workspace visual, white/light green
sections, teal/coral/gold accents, 8px cards, readable system typography, and
specific market-proof sections. The page should feel like a practical product
brief for caregivers and collaborators, not a generic SaaS landing page.
