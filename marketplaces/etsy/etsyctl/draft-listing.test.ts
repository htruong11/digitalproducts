import { describe, expect, it } from "vitest";
import {
  buildDraftListingPayload,
  validateDraftListing,
  type DraftListingInput,
} from "./draft-listing";

// A known-good digital caregiver listing used as the baseline; individual tests
// override single fields to assert one failure at a time.
function validInput(
  overrides: Partial<DraftListingInput> = {},
): DraftListingInput {
  return {
    title: "Family Caregiver Coordination Kit — Printable PDF Planner",
    description:
      "A printable organization tool for coordinating caregiving tasks, " +
      "medications, and appointments. This is an organizational tool and is " +
      "not medical, legal, or financial advice.",
    price: 7.0,
    quantity: 999,
    whoMade: "i_did",
    whenMade: "2020_2026",
    taxonomyId: 1234,
    type: "download",
    tags: ["caregiver planner", "medication log"],
    hasImage: true,
    hasDigitalFile: true,
    ...overrides,
  };
}

function codes(input: DraftListingInput): string[] {
  return validateDraftListing(input).issues.map((i) => i.code);
}

describe("buildDraftListingPayload", () => {
  it("maps inputs to Etsy snake_case fields", () => {
    const payload = buildDraftListingPayload(validInput());
    expect(payload).toMatchObject({
      quantity: 999,
      title: expect.stringContaining("Caregiver"),
      price: 7.0,
      who_made: "i_did",
      when_made: "2020_2026",
      taxonomy_id: 1234,
      type: "download",
    });
    expect(payload.tags).toEqual(["caregiver planner", "medication log"]);
  });

  it("omits tags when none are provided", () => {
    const payload = buildDraftListingPayload(validInput({ tags: [] }));
    expect(payload.tags).toBeUndefined();
  });
});

describe("validateDraftListing", () => {
  it("passes a complete, compliant digital listing", () => {
    const result = validateDraftListing(validInput());
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("flags missing required fields", () => {
    expect(codes(validInput({ title: "  " }))).toContain("title_missing");
    expect(codes(validInput({ description: "" }))).toContain(
      "description_missing",
    );
    expect(codes(validInput({ quantity: 0 }))).toContain("quantity_invalid");
    expect(codes(validInput({ taxonomyId: 0 }))).toContain("taxonomy_invalid");
  });

  it("enforces Etsy limits on title, price, and tags", () => {
    expect(codes(validInput({ title: "x".repeat(141) }))).toContain(
      "title_too_long",
    );
    expect(codes(validInput({ price: 0.1 }))).toContain("price_too_low");
    expect(codes(validInput({ tags: Array(14).fill("tag") }))).toContain(
      "tags_too_many",
    );
    expect(codes(validInput({ tags: ["x".repeat(21)] }))).toContain(
      "tag_too_long",
    );
  });

  it("enforces digital-download consistency", () => {
    expect(
      codes(validInput({ type: "physical", hasDigitalFile: true })),
    ).toContain("type_mismatch");
    expect(
      codes(validInput({ type: "download", hasDigitalFile: false })),
    ).toContain("download_file_missing");
  });

  it("blocks a risky medical claim as an error", () => {
    const input = validInput({
      description:
        "This planner will help cure caregiver stress and treat anxiety. " +
        "Not medical advice.",
    });
    const result = validateDraftListing(input);
    expect(result.valid).toBe(false);
    expect(result.issues.map((i) => i.code)).toContain("risky_claim");
  });

  it("blocks medical triage and recovery language", () => {
    const input = validInput({
      title:
        "Hospital Discharge Recovery Protocol With Warning Signs Checklist",
      description: "Know when to call 911 after discharge. Not medical advice.",
    });
    const result = validateDraftListing(input);
    expect(result.valid).toBe(false);
    expect(result.issues.map((i) => i.code)).toContain("risky_claim");
  });

  it("blocks legal, probate, tax, and compliance claims", () => {
    const input = validInput({
      title: "Executor Probate Guide For Settling The Estate",
      description:
        "Attorney-grade checklist with tax advice and state-compliant steps. " +
        "Not legal advice.",
    });
    const result = validateDraftListing(input);
    expect(result.valid).toBe(false);
    expect(result.issues.map((i) => i.code)).toContain("risky_claim");
  });

  it("warns (does not hard-fail) on a missing image", () => {
    const result = validateDraftListing(validInput({ hasImage: false }));
    const issue = result.issues.find((i) => i.code === "image_missing");
    expect(issue?.severity).toBe("warn");
    expect(result.valid).toBe(true);
  });

  it("warns on a missing non-advice disclaimer", () => {
    const result = validateDraftListing(
      validInput({
        description: "A printable planner for busy families coordinating care.",
      }),
    );
    expect(result.issues.map((i) => i.code)).toContain("disclaimer_missing");
  });
});
