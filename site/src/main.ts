import "./style.css";
import {
  PRODUCT_TITLE,
  PRODUCT_SUBTITLE,
  HERO_POINTS,
  STATS,
  PROBLEM_POINTS,
  OFFER_STEPS,
  KIT_PAGES,
  HELP_POINTS,
  MARKET_POINTS,
  COMPETITORS,
  VALIDATION_PLAN,
  RISK_POINTS,
  FEEDBACK_PROMPTS,
  DISCLAIMER,
  PRODUCT_DETAILS,
} from "./data";
import {
  renderHero,
  renderStats,
  renderProblem,
  renderOffer,
  renderInside,
  renderHelp,
  renderMarket,
  renderCompetitors,
  renderValidation,
  renderRisks,
  renderCollaborate,
  renderFooter,
} from "./components";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Expected #app root element to exist.");
}

app.innerHTML = [
  renderHero(PRODUCT_TITLE, PRODUCT_SUBTITLE, HERO_POINTS),
  renderStats(STATS),
  renderProblem(PROBLEM_POINTS),
  renderOffer(OFFER_STEPS),
  renderInside(KIT_PAGES),
  renderHelp(HELP_POINTS),
  renderMarket(MARKET_POINTS),
  renderCompetitors(COMPETITORS),
  renderValidation(VALIDATION_PLAN),
  renderRisks(RISK_POINTS),
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
