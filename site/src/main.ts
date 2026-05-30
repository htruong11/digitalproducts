import "./style.css";
import {
  PRODUCT_TITLE,
  PRODUCT_SUBTITLE,
  PROBLEM_POINTS,
  CHECKLIST_CATEGORIES,
  BENEFITS,
  RESEARCH_NOTES,
} from "./data";
import {
  renderHero,
  renderProblem,
  renderChecklist,
  renderBenefits,
  renderResearchNotes,
  renderFooter,
} from "./components";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Expected #app root element to exist.");
}

app.innerHTML = [
  renderHero(PRODUCT_TITLE, PRODUCT_SUBTITLE),
  renderProblem(PROBLEM_POINTS),
  renderChecklist(CHECKLIST_CATEGORIES),
  renderBenefits(BENEFITS),
  renderResearchNotes(RESEARCH_NOTES),
  renderFooter(),
].join("");

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = (link as HTMLAnchorElement).getAttribute("href");
    if (!href) {
      return;
    }

    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  });
});
