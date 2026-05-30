import { describe, expect, it } from "vitest";
import { KIT_PAGES, PRODUCT_SUBTITLE, PRODUCT_TITLE } from "./data";
import { renderHero, renderInside } from "./components";

describe("site rendering", () => {
  it("renders the product title and subtitle in the hero", () => {
    const html = renderHero(PRODUCT_TITLE, PRODUCT_SUBTITLE);

    expect(html).toContain(PRODUCT_TITLE);
    expect(html).toContain(PRODUCT_SUBTITLE);
    expect(html).toContain("Printable PDF");
  });

  it("renders each kit page", () => {
    const html = renderInside(KIT_PAGES);

    for (const page of KIT_PAGES) {
      expect(html).toContain(page.title);
    }
  });
});
