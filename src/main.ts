import './style.css';
import {
  PRODUCT_TITLE,
  PRODUCT_SUBTITLE,
  PROBLEM_POINTS,
  CHECKLIST_CATEGORIES,
  BENEFITS,
  RESEARCH_NOTES,
} from './data';
import {
  renderHero,
  renderProblem,
  renderChecklist,
  renderBenefits,
  renderResearchNotes,
  renderFooter,
} from './components';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = [
  renderHero(PRODUCT_TITLE, PRODUCT_SUBTITLE),
  renderProblem(PROBLEM_POINTS),
  renderChecklist(CHECKLIST_CATEGORIES),
  renderBenefits(BENEFITS),
  renderResearchNotes(RESEARCH_NOTES),
  renderFooter(),
].join('');

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector((link as HTMLAnchorElement).getAttribute('href')!);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});
