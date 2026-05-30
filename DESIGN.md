# DESIGN.md

## 1. Visual Theme & Atmosphere

- Warm editorial marketing page for a practical family-care printable.
- Human and calm, without hospital, SaaS, or dashboard cues.
- Short, skimmable sections with large readable text and tangible paper previews.
- Product promise stays modest: coordination, handoffs, and shared organization.

## 2. Color Palette & Roles

Primary:

- Ink: `#1d1d1b` for main text and primary buttons.
- Paper: `#fffaf3` for product-sheet previews and cards.
- Canvas: `#f7f3ec` for the page background.

Accent:

- Sage: `#6f8f82` for calm care coordination accents.
- Terracotta: `#c96442` for the primary product signal and CTA highlights.
- Dusty Blue: `#4d7d99` for secondary structure and quiet contrast.

Neutral Scale:

- Muted Ink: `#68645f` for supporting copy.
- Soft Ink: `#8a837a` for captions.
- Hairline: `#ded5c8` for borders.
- White: `#ffffff` for elevated cards.

## 3. Typography Rules

Use system fonts only: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

| Role            | Font        | Size                      | Weight | Line Height | Letter Spacing | Notes                        |
| --------------- | ----------- | ------------------------- | ------ | ----------- | -------------- | ---------------------------- |
| Hero            | System sans | 56px desktop, 40px mobile | 650    | 1.04        | 0              | Concrete product promise     |
| Section heading | System sans | 34px desktop, 28px mobile | 650    | 1.15        | 0              | Short labels                 |
| Card title      | System sans | 20px                      | 650    | 1.25        | 0              | No oversized card text       |
| Body            | System sans | 18px                      | 400    | 1.6         | 0              | Readable for older audiences |
| Small           | System sans | 14px                      | 500    | 1.45        | 0              | Captions and labels          |

## 4. Component Stylings

- Buttons: 8px radius, 12px 18px padding, dark primary or white secondary with hairline border.
- Cards: white or paper surfaces, 8px radius, 1px hairline border, no nested cards.
- Navigation: no full nav needed; use hero CTAs and section anchors.
- Product visual: layered paper sheets with printed rows, checkboxes, and page labels.
- Disclaimer: quiet bordered note, not an alert.

## 5. Layout Principles

- Container max width: 1120px.
- Section padding: 72px desktop, 48px mobile.
- Grid gaps: 24px desktop, 16px mobile.
- Keep the first viewport focused on the product name, promise, and paper preview.
- Avoid long research dumps, internal labels, broad category grids, and pricing tables.

## 6. Depth & Elevation

- Prefer borders and subtle shadows over heavy elevation.
- Paper preview shadow: `0 24px 70px rgba(79, 63, 42, 0.16)`.
- Cards shadow: `0 12px 32px rgba(79, 63, 42, 0.08)`.

## 7. Do's and Don'ts

- Do say printable, simple, no app, no login.
- Do lead with family coordination and shared handoffs.
- Do show what pages are included.
- Do invite feedback from elderly-care collaborators.
- Do not make medical, clinical, legal, financial, or health-outcome claims.
- Do not use SaaS words such as platform, dashboard, members, sync, or real-time.
- Do not mention IMPs, internal research notes, or draft status on the page.

## 8. Responsive Behavior

- Breakpoint: 760px.
- Stack all grids to one column on mobile.
- Keep tap targets at least 44px tall.
- Product preview remains visible but simplified on small screens.

## 9. Agent Prompt Guide

Use a warm off-white page with charcoal text, terracotta CTA, sage accents, 8px cards, large readable body text, and a tangible paper-kit visual. Keep copy short and modest. The audience is family caregivers and elderly-care collaborators reviewing a printable Etsy product concept.
