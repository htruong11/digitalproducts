import type { KitPage, MarketingItem } from "./data";

export function renderHero(title: string, subtitle: string): string {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero-copy">
          <span class="eyebrow">Printable PDF for aging-parent care handoffs</span>
          <h1>${title}</h1>
          <p class="subtitle">${subtitle}</p>
          <div class="hero-cta">
            <a href="#inside" class="btn btn-primary">See what's inside</a>
            <a href="#collaborate" class="btn btn-secondary">Share feedback</a>
          </div>
        </div>
        ${renderProductPreview()}
      </div>
    </section>
  `;
}

export function renderProductPreview(): string {
  return `
    <div class="product-preview" aria-label="Preview of printable caregiver kit pages">
      <div class="preview-page page-back">
        <span>Emergency Snapshot</span>
        <i></i><i></i><i></i>
      </div>
      <div class="preview-page page-mid">
        <span>Daily Handoff Log</span>
        <i></i><i></i><i></i><i></i>
      </div>
      <div class="preview-page page-front">
        <div class="sheet-top">
          <span>Aging Parent Handoff Kit</span>
          <b>PDF</b>
        </div>
        <h2>Today's Care Notes</h2>
        <div class="sheet-row"><span></span><p></p></div>
        <div class="sheet-row"><span></span><p></p></div>
        <div class="sheet-row"><span></span><p></p></div>
        <div class="sheet-box"></div>
      </div>
    </div>
  `;
}

export function renderProblem(points: string[]): string {
  const items = points.map((p) => `<li>${p}</li>`).join("");
  return `
    <section class="problem">
      <div class="container">
        <div class="section-kicker">The problem</div>
        <h2>Aging-parent care coordination usually lives in someone's head.</h2>
        <ul class="problem-list">${items}</ul>
      </div>
    </section>
  `;
}

export function renderKitPage(page: KitPage): string {
  return `
    <div class="kit-card">
      <span>${page.label}</span>
      <h3>${page.title}</h3>
      <p>${page.text}</p>
    </div>
  `;
}

export function renderInside(pages: KitPage[]): string {
  const cards = pages.map(renderKitPage).join("");
  return `
    <section class="inside" id="inside">
      <div class="container">
        <div class="section-kicker">What's inside</div>
        <h2>A practical handoff kit families can print and use the same day.</h2>
        <p class="section-subtitle">The first product stays intentionally small: emergency snapshot, daily handoff, doctor visit prep, and family task ownership.</p>
        <div class="kit-grid">${cards}</div>
      </div>
    </section>
  `;
}

export function renderHelp(points: MarketingItem[]): string {
  const cards = points
    .map(
      (point) => `
    <div class="help-card">
      <h3>${point.title}</h3>
      <p>${point.text}</p>
    </div>
  `,
    )
    .join("");

  return `
    <section class="help">
      <div class="container">
        <div class="section-kicker">Who it helps</div>
        <h2>A focused starting point for Etsy validation.</h2>
        <div class="help-grid">${cards}</div>
      </div>
    </section>
  `;
}

export function renderMarket(points: MarketingItem[]): string {
  const cards = points
    .map(
      (point) => `
    <div class="market-card">
      <h3>${point.title}</h3>
      <p>${point.text}</p>
    </div>
  `,
    )
    .join("");

  return `
    <section class="market">
      <div class="container">
        <div class="section-kicker">Market research</div>
        <h2>The research supports a narrow handoff product, not a generic planner.</h2>
        <div class="market-grid">${cards}</div>
      </div>
    </section>
  `;
}

export function renderCollaborate(
  details: MarketingItem[],
  prompts: string[],
  disclaimer: string,
): string {
  const detailRows = details
    .map(
      (detail) => `
        <div>
          <dt>${detail.title}</dt>
          <dd>${detail.text}</dd>
        </div>
  `,
    )
    .join("");
  const promptItems = prompts.map((prompt) => `<li>${prompt}</li>`).join("");

  return `
    <section class="collaborate" id="collaborate">
      <div class="container">
        <div>
          <div class="section-kicker">Collaborate</div>
          <h2>Help refine the first Etsy-ready version.</h2>
          <p class="section-subtitle">The goal is to test a narrow handoff promise before expanding into connected sheets, Notion systems, facility tools, or a broader product line.</p>
        </div>
        <div class="collab-grid">
          <dl class="detail-list">${detailRows}</dl>
          <div class="feedback-box">
            <h3>Feedback questions</h3>
            <ul>${promptItems}</ul>
            <p>${disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderFooter(): string {
  return `
    <footer class="footer">
      <div class="container">
        <p>Aging Parent Handoff Kit · ${new Date().getFullYear()}</p>
        <p class="footer-updated">Last updated: 2026-05-31</p>
      </div>
    </footer>
  `;
}
