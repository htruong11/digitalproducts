import { describe, expect, it } from "vitest";
import { CHECKLIST_CATEGORIES, PRODUCT_SUBTITLE, PRODUCT_TITLE } from "./data";
import { renderChecklist, renderHero } from "./components";

describe("site rendering", () => {
  it("renders the product title and subtitle in the hero", () => {
    const html = renderHero(PRODUCT_TITLE, PRODUCT_SUBTITLE);

    expect(html).toContain(PRODUCT_TITLE);
    expect(html).toContain(PRODUCT_SUBTITLE);
    expect(html).toContain("Internal Draft");
  });

  it("renders each checklist category", () => {
    const html = renderChecklist(CHECKLIST_CATEGORIES);

    for (const category of CHECKLIST_CATEGORIES) {
      expect(html).toContain(category.title);
    }
  });
});
