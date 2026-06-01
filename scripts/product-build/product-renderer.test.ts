import { describe, expect, it } from "vitest";
import { hospitalToHomeDischargeKit } from "../../products/hospital-to-home-discharge-kit/product";
import {
  findBlockedClaims,
  renderListingMarkdown,
  renderPrintHtml,
} from "./product-renderer";

const escaped = (value: string): string => value.replaceAll("&", "&amp;");

describe("product renderer", () => {
  it("renders every product page into the print HTML", () => {
    const html = renderPrintHtml(hospitalToHomeDischargeKit);

    expect(html).toContain(escaped(hospitalToHomeDischargeKit.title));
    for (const page of hospitalToHomeDischargeKit.pages) {
      expect(html).toContain(escaped(page.title));
    }
  });

  it("renders an Etsy listing draft with 13 tags", () => {
    const listing = renderListingMarkdown(hospitalToHomeDischargeKit);

    expect(hospitalToHomeDischargeKit.listing.tags).toHaveLength(13);
    expect(listing).toContain("## AI Disclosure");
    expect(listing).toContain("## Disclaimer");
  });

  it("keeps the product definition clear of blocked claim terms", () => {
    expect(findBlockedClaims(hospitalToHomeDischargeKit)).toEqual([]);
  });
});
