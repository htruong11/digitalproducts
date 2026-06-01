import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { validateDraftListing } from "../../marketplaces/etsy/etsyctl/draft-listing";
import type { ProductDefinition } from "../../products/hospital-to-home-discharge-kit/product";
import { hospitalToHomeDischargeKit } from "../../products/hospital-to-home-discharge-kit/product";
import { agingParentHandoffKit } from "../../products/aging-parent-handoff-kit/product";
import { executorEstateAdminKit } from "../../products/executor-first-30-days-estate-admin-kit/product";
import { carePactSiblingCoordinationKit } from "../../products/care-pact-sibling-coordination-kit/product";
import {
  findBlockedClaims,
  renderListingMarkdown,
  renderPrintHtml,
} from "./product-renderer";

// Build queue (products/README.md). To add a product, drop its definition here.
const PRODUCTS: ProductDefinition[] = [
  hospitalToHomeDischargeKit,
  agingParentHandoffKit,
  carePactSiblingCoordinationKit,
  executorEstateAdminKit,
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const etsyDraftDir = path.join(root, "marketplaces", "etsy", "drafts");

async function writeText(filePath: string, contents: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, contents, "utf8");
}

async function renderPdf(htmlPath: string, pdfPath: string): Promise<void> {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
    await page.pdf({
      path: pdfPath,
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }
}

async function buildProduct(
  product: ProductDefinition,
  withPdf: boolean,
): Promise<void> {
  const blockedClaims = findBlockedClaims(product);
  if (blockedClaims.length > 0) {
    throw new Error(
      `[${product.slug}] Blocked claim terms found: ${blockedClaims.join(", ")}`,
    );
  }

  const listingValidation = validateDraftListing({
    title: product.listing.title,
    description: [
      ...product.listing.descriptionBullets,
      product.aiDisclosure,
      product.disclaimer,
    ].join("\n\n"),
    price: Number.parseFloat(product.listing.priceIntro.replace(/^\$/, "")),
    quantity: 999,
    whoMade: "i_did",
    whenMade: "2020_2026",
    taxonomyId: 1,
    type: "download",
    tags: product.listing.tags,
    hasImage: true,
    hasDigitalFile: true,
  });
  if (!listingValidation.valid) {
    const messages = listingValidation.issues.map((issue) => issue.message);
    throw new Error(
      `[${product.slug}] Listing validation failed: ${messages.join(" ")}`,
    );
  }

  const productRoot = path.join(root, "products", product.slug);
  const distDir = path.join(productRoot, "dist");
  await mkdir(distDir, { recursive: true });
  const htmlPath = path.join(distDir, `${product.slug}.html`);
  const listingPath = path.join(etsyDraftDir, `${product.slug}.md`);
  const releasePath = path.join(productRoot, "release", "claims-scrub.md");

  await writeText(htmlPath, renderPrintHtml(product));
  await writeText(listingPath, renderListingMarkdown(product));
  await writeText(
    releasePath,
    `# Claims Scrub: ${product.title}

Status: draft-pass

- Blocked claim scan: passed.
- Disclaimer included: yes.
- AI disclosure included in listing draft: yes.
- Product framing: organization template only.
- Publication gate: human review still required before Etsy publish.
`,
  );

  if (withPdf) {
    await renderPdf(htmlPath, path.join(distDir, `${product.slug}.pdf`));
  }

  console.log(`Built product assets for ${product.slug}`);
  console.log(`  HTML:    ${path.relative(root, htmlPath)}`);
  console.log(`  Listing: ${path.relative(root, listingPath)}`);
  console.log(`  Release: ${path.relative(root, releasePath)}`);
}

async function main(): Promise<void> {
  const withPdf = process.argv.includes("--pdf");
  // Positional (non-flag) args select products by slug; none = build all.
  const slugs = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
  const selected =
    slugs.length > 0
      ? PRODUCTS.filter((product) => slugs.includes(product.slug))
      : PRODUCTS;

  const unknown = slugs.filter(
    (slug) => !PRODUCTS.some((product) => product.slug === slug),
  );
  if (unknown.length > 0) {
    throw new Error(
      `Unknown product slug(s): ${unknown.join(", ")}. Known: ${PRODUCTS.map(
        (product) => product.slug,
      ).join(", ")}`,
    );
  }

  for (const product of selected) {
    await buildProduct(product, withPdf);
  }
  console.log(`\nDone: ${selected.length} product(s).`);
}

await main();
