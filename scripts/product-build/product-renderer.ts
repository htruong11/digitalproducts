import type {
  ProductDefinition,
  ProductField,
  ProductPage,
} from "../../products/hospital-to-home-discharge-kit/product";
import { findRiskyClaims } from "../../marketplaces/etsy/etsyctl/draft-listing";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function renderField(field: ProductField): string {
  const lines = field.lines ?? 1;
  if (field.kind === "checklist") {
    return `
      <div class="check-row">
        <span class="box"></span>
        <span>${escapeHtml(field.label)}</span>
      </div>
    `;
  }

  const lineItems = Array.from({ length: lines }, () => `<span></span>`).join(
    "",
  );
  return `
    <label class="field ${field.kind === "box" ? "field-box" : ""}">
      <strong>${escapeHtml(field.label)}</strong>
      <div>${lineItems}</div>
    </label>
  `;
}

function renderPage(page: ProductPage, product: ProductDefinition): string {
  const fields = page.fields.map(renderField).join("");
  return `
    <article class="print-page">
      <header>
        <span>${String(page.number).padStart(2, "0")}</span>
        <p>${escapeHtml(product.title)}</p>
      </header>
      <h1>${escapeHtml(page.title)}</h1>
      <p class="purpose">${escapeHtml(page.purpose)}</p>
      ${page.note ? `<p class="note">${escapeHtml(page.note)}</p>` : ""}
      <section class="fields">${fields}</section>
      <footer>${escapeHtml(product.disclaimer)}</footer>
    </article>
  `;
}

export function renderPrintHtml(product: ProductDefinition): string {
  const pages = product.pages.map((page) => renderPage(page, product)).join("");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(product.title)}</title>
    <style>
      :root {
        --ink: #1f2933;
        --slate: #435562;
        --teal: #3f6f78;
        --gold: #d59845;
        --paper: #fffdf8;
        --hairline: #aebbc5;
        --hairline-soft: #d7dee5;
        --background: #eef3f7;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 24px;
        background: var(--background);
        color: var(--ink);
      }

      .print-page {
        width: 8.5in;
        height: 11in;
        margin: 0 auto 24px;
        padding: 0.6in 0.75in;
        background: var(--paper);
        border: 1px solid var(--hairline-soft);
        box-shadow: 0 12px 30px rgba(25, 42, 58, 0.12);
        display: flex;
        flex-direction: column;
        break-after: page;
        page-break-after: always;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding-bottom: 12px;
        border-bottom: 2px solid var(--teal);
        color: var(--teal);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 800;
      }

      header p {
        margin: 0;
      }

      h1 {
        margin: 32px 0 8px;
        color: var(--ink);
        font-family: "Georgia", "Times New Roman", serif;
        font-size: 34px;
        font-weight: 700;
        line-height: 1.1;
      }

      .purpose {
        color: var(--slate);
        font-size: 14px;
        line-height: 1.5;
        font-style: italic;
      }

      .note {
        margin-top: 18px;
        padding: 14px 18px;
        border-left: 5px solid var(--gold);
        background: #fff6e6;
        color: #60400f;
        font-size: 13px;
        line-height: 1.5;
        border-radius: 2px;
      }

      .fields {
        display: grid;
        gap: 20px;
        margin-top: 32px;
      }

      .field {
        display: grid;
        gap: 6px;
        break-inside: avoid;
      }

      .field strong {
        color: var(--ink);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.02em;
      }

      .field div {
        display: grid;
        gap: 14px;
      }

      .field span {
        display: block;
        min-height: 18px;
        border-bottom: 1px solid var(--hairline);
      }

      .field-box div {
        min-height: 0;
        padding: 14px;
        border: 1px solid var(--hairline);
        background: #fff;
        border-radius: 4px;
      }

      .field-box span {
        min-height: 20px;
      }

      .check-row {
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 32px;
        color: var(--ink);
        font-size: 15px;
      }

      .box {
        flex: 0 0 auto;
        width: 18px;
        height: 18px;
        border: 2px solid var(--teal);
        background: #fff;
        border-radius: 3px;
      }

      footer {
        margin-top: auto;
        padding-top: 24px;
        color: #7a8a99;
        font-size: 9px;
        line-height: 1.4;
        text-align: center;
        border-top: 1px solid var(--hairline-soft);
      }

      @page {
        size: Letter;
        margin: 0;
      }

      @media print {
        body {
          padding: 0;
          background: #fff;
        }

        .print-page {
          width: 8.5in;
          height: 11in;
          margin: 0;
          border: 0;
          box-shadow: none;
          break-after: page;
          page-break-after: always;
        }
      }
    </style>
  </head>
  <body>${pages}</body>
</html>`;
}

export function renderListingMarkdown(product: ProductDefinition): string {
  const tags = product.listing.tags.map((tag) => `- ${tag}`).join("\n");
  const bullets = product.listing.descriptionBullets
    .map((bullet) => `- ${bullet}`)
    .join("\n");
  const faq = product.listing.faq
    .map((item) => `### ${item.question}\n\n${item.answer}`)
    .join("\n\n");

  return `# ${product.title} Etsy Draft

## Title

${product.listing.title}

## Price

- Intro: ${product.listing.priceIntro}
- Anchor: ${product.listing.priceAnchor}

## Tags

${tags}

## Description Bullets

${bullets}

## AI Disclosure

${product.aiDisclosure}

## Disclaimer

${product.disclaimer}

## FAQ

${faq}

## Post-Purchase Note

${product.listing.postPurchaseNote}
`;
}

export const blockedClaimTerms = [
  "clinically proven",
  "doctor recommended",
  "medically approved",
  "diagnose",
  "treat",
  "cure",
  "heal",
  "prevention",
  "reduce risk",
  "dosage guidance",
  "when to call 911",
  "probate guide",
  "tax advice",
  "legal advice",
  "guarantees compliance",
];

export function findBlockedClaims(product: ProductDefinition): string[] {
  const exactTermHits = blockedClaimTerms.filter((term) =>
    JSON.stringify(product).toLowerCase().includes(term),
  );
  const riskyClaimHits = findRiskyClaims([
    product.title,
    product.subtitle,
    product.audience,
    product.disclaimer,
    product.aiDisclosure,
    product.listing.title,
    ...product.listing.tags,
    ...product.listing.descriptionBullets,
    ...product.listing.faq.flatMap((item) => [item.question, item.answer]),
    product.listing.postPurchaseNote,
    ...product.pages.flatMap((page) => [
      page.title,
      page.purpose,
      page.note ?? "",
      ...page.fields.map((field) => field.label),
    ]),
  ]);

  return [...new Set([...exactTermHits, ...riskyClaimHits])];
}
