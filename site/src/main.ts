import "./style.css";
import {
  PRODUCT_TITLE,
  PRODUCT_SUBTITLE,
  PROBLEM_POINTS,
  KIT_PAGES,
  HELP_POINTS,
  FEEDBACK_PROMPTS,
  DISCLAIMER,
  PRODUCT_DETAILS,
} from "./data";
import {
  renderHero,
  renderProblem,
  renderInside,
  renderHelp,
  renderCollaborate,
  renderFooter,
} from "./components";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Expected #app root element to exist.");
}

app.innerHTML = [
  renderHero(PRODUCT_TITLE, PRODUCT_SUBTITLE),
  renderProblem(PROBLEM_POINTS),
  renderInside(KIT_PAGES),
  renderHelp(HELP_POINTS),
  renderCollaborate(PRODUCT_DETAILS, FEEDBACK_PROMPTS, DISCLAIMER),
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
