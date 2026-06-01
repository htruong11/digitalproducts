// Draft-listing builder + dry-run validator for the Etsy `createDraftListing`
// endpoint. This module never calls Etsy: it turns repo inputs into the request
// body Etsy expects and reports problems locally, so the daily loop can validate
// a listing packet (and the marketplace-safety-reviewer can block it) before any
// write is attempted. See IMP-003 Phase 2 / 2.5.

export type WhoMade = "i_did" | "someone_else" | "collective";
export type ListingType = "physical" | "download";

export interface DraftListingInput {
  title: string;
  description: string;
  /** Price in the shop currency major units, e.g. 7.5 == 7.50. */
  price: number;
  quantity: number;
  whoMade: WhoMade;
  whenMade: string;
  taxonomyId: number;
  type: ListingType;
  tags?: string[];
  /** Dry-run readiness flags; images/files are uploaded via separate endpoints. */
  hasImage?: boolean;
  hasDigitalFile?: boolean;
}

// Snake_case body matching Etsy's createDraftListing schema.
export interface DraftListingPayload {
  quantity: number;
  title: string;
  description: string;
  price: number;
  who_made: WhoMade;
  when_made: string;
  taxonomy_id: number;
  type: ListingType;
  tags?: string[];
}

export type IssueSeverity = "error" | "warn";

export interface ValidationIssue {
  code: string;
  severity: IssueSeverity;
  message: string;
}

export interface ValidationResult {
  valid: boolean; // false when any "error" issue is present
  issues: ValidationIssue[];
}

// Etsy hard limits / business rules.
export const TITLE_MAX = 140;
export const TAGS_MAX = 13;
export const TAG_LEN_MAX = 20;
export const PRICE_MIN = 0.2; // Etsy minimum listing price (USD)

// Claims that create medical/legal/financial liability for an organizer product.
export const RISKY_CLAIM =
  /\b(treat(?:s|ment)?|cures?|heal(?:s|ing)?|diagnos\w*|prevent(?:s|ion)?|reduce risk|warning signs?|red flags?|recovery protocol|clinically proven|doctor recommended|medically approved|dosage|when to call (?:911|the doctor)|prescri\w*|HIPAA[-\s]?compliant|guarantee\w*|FDA[-\s]?approved|legal advice|attorney[-\s]?grade|legally binding|guarantees compliance|probate guide|how to probate|tax advice|avoid probate|court[-\s]?approved|settle (?:an|the) estate|coverage advice|policy interpretation|claim valuation|payout promise|state[-\s]?compliant|survey[-\s]?ready)\b/i;
// A non-advice disclaimer keeps the product positioned as an organizer.
const DISCLAIMER =
  /(not (medical|legal|financial)|organization(al)? tool|not.*advice|informational purposes)/i;

/** Map validated inputs onto Etsy's createDraftListing request body. */
export function buildDraftListingPayload(
  input: DraftListingInput,
): DraftListingPayload {
  const payload: DraftListingPayload = {
    quantity: input.quantity,
    title: input.title,
    description: input.description,
    price: input.price,
    who_made: input.whoMade,
    when_made: input.whenMade,
    taxonomy_id: input.taxonomyId,
    type: input.type,
  };
  if (input.tags && input.tags.length > 0) {
    payload.tags = input.tags;
  }
  return payload;
}

export function findRiskyClaims(texts: string[]): string[] {
  return texts.filter((text) => RISKY_CLAIM.test(text));
}

/**
 * Dry-run validation. `error` issues mean the payload would be rejected by Etsy
 * or violates a hard business rule; `warn` issues are safety-reviewer concerns
 * that should block an autonomous publish but may be acceptable with a human.
 */
export function validateDraftListing(
  input: DraftListingInput,
): ValidationResult {
  const issues: ValidationIssue[] = [];
  const err = (code: string, message: string) =>
    issues.push({ code, severity: "error", message });
  const warn = (code: string, message: string) =>
    issues.push({ code, severity: "warn", message });

  // --- Required fields / Etsy schema rules ---
  const title = input.title?.trim() ?? "";
  if (!title) {
    err("title_missing", "Title is required.");
  } else if (input.title.length > TITLE_MAX) {
    err("title_too_long", `Title exceeds ${TITLE_MAX} characters.`);
  }

  if (!input.description?.trim()) {
    err("description_missing", "Description is required.");
  }

  if (!(input.price >= PRICE_MIN)) {
    err("price_too_low", `Price must be at least ${PRICE_MIN.toFixed(2)}.`);
  }

  if (!Number.isInteger(input.quantity) || input.quantity < 1) {
    err("quantity_invalid", "Quantity must be an integer >= 1.");
  }

  if (!Number.isInteger(input.taxonomyId) || input.taxonomyId <= 0) {
    err("taxonomy_invalid", "A valid taxonomy_id is required.");
  }

  // --- Tags ---
  if (input.tags) {
    if (input.tags.length > TAGS_MAX) {
      err("tags_too_many", `At most ${TAGS_MAX} tags are allowed.`);
    }
    for (const tag of input.tags) {
      if (tag.length > TAG_LEN_MAX) {
        err("tag_too_long", `Tag "${tag}" exceeds ${TAG_LEN_MAX} characters.`);
      }
    }
  }

  // --- Digital product rules ---
  if (input.hasDigitalFile && input.type !== "download") {
    err(
      "type_mismatch",
      'A listing with a digital file must have type "download".',
    );
  }
  if (input.type === "download" && !input.hasDigitalFile) {
    err(
      "download_file_missing",
      'A "download" listing must include a digital file before publish.',
    );
  }

  // --- Safety reviewer (warn-level, blocks autonomous publish) ---
  if (!input.hasImage) {
    warn("image_missing", "Listing has no image.");
  }
  const text = `${input.title ?? ""}\n${input.description ?? ""}`;
  if (findRiskyClaims([text]).length > 0) {
    err(
      "risky_claim",
      "Copy contains a medical/legal/financial claim that must be removed.",
    );
  }
  if (input.description && !DISCLAIMER.test(input.description)) {
    warn(
      "disclaimer_missing",
      "Description is missing a non-advice / organizational-tool disclaimer.",
    );
  }

  return {
    valid: !issues.some((issue) => issue.severity === "error"),
    issues,
  };
}
