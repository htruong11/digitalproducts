import type { ChecklistCategory, ResearchNote } from "./data";

export function renderHero(title: string, subtitle: string): string {
  return `
    <section class="hero">
      <div class="container">
        <span class="badge">Digital Product — Internal Draft</span>
        <h1>${title}</h1>
        <p class="subtitle">${subtitle}</p>
        <div class="hero-cta">
          <a href="#checklist" class="btn btn-primary">See What's Inside</a>
          <a href="#research" class="btn btn-ghost">Research Notes</a>
        </div>
      </div>
    </section>
  `;
}

export function renderProblem(points: string[]): string {
  const items = points.map((p) => `<li>${p}</li>`).join("");
  return `
    <section class="problem">
      <div class="container">
        <h2>Does this sound familiar?</h2>
        <ul class="problem-list">${items}</ul>
        <p class="problem-close">This checklist gives caregivers a complete, organized system — so you can focus on care, not on trying to remember everything.</p>
      </div>
    </section>
  `;
}

export function renderCategoryCard(cat: ChecklistCategory): string {
  const items = cat.items
    .map(
      (item) => `
    <li class="check-item">
      <span class="check-box"></span>
      <span>${item}</span>
    </li>
  `,
    )
    .join("");

  return `
    <div class="category-card">
      <div class="category-header">
        <span class="category-icon">${cat.icon}</span>
        <div>
          <h3>${cat.title}</h3>
          <p class="category-desc">${cat.description}</p>
        </div>
      </div>
      <ul class="check-list">${items}</ul>
      <p class="items-note">+ more items in full version</p>
    </div>
  `;
}

export function renderChecklist(categories: ChecklistCategory[]): string {
  const cards = categories.map(renderCategoryCard).join("");
  return `
    <section class="checklist" id="checklist">
      <div class="container">
        <h2>What's Included</h2>
        <p class="section-subtitle">6 complete categories covering every aspect of home care.</p>
        <div class="category-grid">${cards}</div>
      </div>
    </section>
  `;
}

export function renderBenefits(
  benefits: { icon: string; title: string; text: string }[],
): string {
  const cards = benefits
    .map(
      (b) => `
    <div class="benefit-card">
      <span class="benefit-icon">${b.icon}</span>
      <h3>${b.title}</h3>
      <p>${b.text}</p>
    </div>
  `,
    )
    .join("");

  return `
    <section class="benefits">
      <div class="container">
        <h2>Why This Works</h2>
        <div class="benefits-grid">${cards}</div>
      </div>
    </section>
  `;
}

export function renderResearchNotes(notes: ResearchNote[]): string {
  const rows = notes
    .map(
      (n) => `
    <div class="note-row">
      <span class="note-label">${n.label}</span>
      <p class="note-content">${n.content}</p>
    </div>
  `,
    )
    .join("");

  return `
    <section class="research" id="research">
      <div class="container">
        <div class="research-header">
          <h2>Research Notes</h2>
          <span class="internal-tag">Internal Only</span>
        </div>
        <p class="section-subtitle">Working notes for content development and positioning.</p>
        <div class="notes-list">${rows}</div>
      </div>
    </section>
  `;
}

export function renderFooter(): string {
  return `
    <footer class="footer">
      <div class="container">
        <p>Internal draft — not for distribution &nbsp;·&nbsp; ${new Date().getFullYear()}</p>
        <p class="footer-updated">Last updated: 2026-05-30</p>
      </div>
    </footer>
  `;
}
