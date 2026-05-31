import type { CompetitorItem, KitPage, MarketingItem, StatItem } from "./data";

export function renderHero(
  title: string,
  subtitle: string,
  points: string[],
): string {
  const pointItems = points.map((point) => `<span>${point}</span>`).join("");

  return `
    <section class="hero">
      ${renderProductPreview()}
      <div class="container">
        <div class="hero-copy">
          <span class="eyebrow">Printable PDF for aging-parent discharge week</span>
          <h1>${title}</h1>
          <p class="subtitle">${subtitle}</p>
          <div class="hero-points">${pointItems}</div>
          <div class="hero-cta">
            <a href="#inside" class="btn btn-primary">See what's inside</a>
            <a href="#proof" class="btn btn-secondary">See the market proof</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderProductPreview(): string {
  return `
    <div class="product-preview" aria-label="Preview of printable hospital discharge kit pages">
      <div class="preview-page page-back">
        <span>Follow-Up Tracker</span>
        <i></i><i></i><i></i><i></i>
      </div>
      <div class="preview-page page-mid">
        <span>First 7 Days Home</span>
        <i></i><i></i><i></i><i></i>
      </div>
      <div class="preview-page page-front">
        <div class="sheet-top">
          <span>Hospital-to-Home Discharge Kit</span>
          <b>PDF</b>
        </div>
        <h2>Discharge Day Notes</h2>
        <p class="sheet-note">What changed? What is due? Who needs to know?</p>
        <div class="sheet-row"><span></span><p></p></div>
        <div class="sheet-row"><span></span><p></p></div>
        <div class="sheet-row"><span></span><p></p></div>
        <div class="sheet-box"></div>
      </div>
      <div class="preview-note note-top">Care-team questions</div>
      <div class="preview-note note-bottom">Pharmacy follow-up</div>
    </div>
  `;
}

export function renderStats(stats: StatItem[]): string {
  const statItems = stats
    .map(
      (stat) => `
        <div class="stat-card">
          <strong>${stat.value}</strong>
          <span>${stat.label}</span>
        </div>
      `,
    )
    .join("");

  return `
    <section class="stats" id="proof">
      <div class="container stats-grid">${statItems}</div>
    </section>
  `;
}

export function renderProblem(points: string[]): string {
  const items = points.map((p) => `<li>${p}</li>`).join("");
  return `
    <section class="problem">
      <div class="container">
        <div class="section-kicker">The problem</div>
        <h2>Hospital discharge turns family care into a same-week operations problem.</h2>
        <ul class="problem-list">${items}</ul>
      </div>
    </section>
  `;
}

export function renderOffer(steps: MarketingItem[]): string {
  const items = steps
    .map(
      (step, index) => `
        <div class="offer-step">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${step.title}</h3>
          <p>${step.text}</p>
        </div>
      `,
    )
    .join("");

  return `
    <section class="offer">
      <div class="container">
        <div class="section-kicker">Buyer moment</div>
        <h2>Built for the first week after discharge.</h2>
        <p class="section-subtitle">The product is not a medical guide. It is a small operating packet for the tasks families have to coordinate immediately.</p>
        <div class="offer-grid">${items}</div>
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
        <h2>A practical discharge kit families can print and use the same day.</h2>
        <p class="section-subtitle">The first product stays intentionally small: discharge notes, medication changes, follow-ups, home readiness, and family task ownership.</p>
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
        <h2>The research supports a narrow discharge-week product, not a generic planner.</h2>
        <p class="section-subtitle">The category has visible demand, but the first product must avoid looking like another low-price printable checklist.</p>
        <div class="market-grid">${cards}</div>
      </div>
    </section>
  `;
}

export function renderCompetitors(competitors: CompetitorItem[]): string {
  const rows = competitors
    .map(
      (competitor) => `
        <div class="competitor-row">
          <h3>${competitor.cluster}</h3>
          <p>${competitor.evidence}</p>
          <span>${competitor.weakness}</span>
        </div>
      `,
    )
    .join("");

  return `
    <section class="competitors">
      <div class="container">
        <div class="section-kicker">Competitor map</div>
        <h2>Where this product should and should not compete.</h2>
        <div class="competitor-table">${rows}</div>
      </div>
    </section>
  `;
}

export function renderValidation(items: MarketingItem[]): string {
  const cards = items
    .map(
      (item) => `
        <div class="validation-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      `,
    )
    .join("");

  return `
    <section class="validation">
      <div class="container">
        <div class="section-kicker">Validation plan</div>
        <h2>Success is measured by buyer behavior, not how polished the PDF feels.</h2>
        <div class="validation-grid">${cards}</div>
      </div>
    </section>
  `;
}

export function renderRisks(points: MarketingItem[]): string {
  const items = points
    .map(
      (point) => `
        <li>
          <strong>${point.title}</strong>
          <span>${point.text}</span>
        </li>
      `,
    )
    .join("");

  return `
    <section class="risks">
      <div class="container risk-layout">
        <div>
          <div class="section-kicker">Why it may still fail</div>
          <h2>The honest risk is distribution, not whether the pages can be made.</h2>
        </div>
        <ul class="risk-list">${items}</ul>
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
        <p class="footer-updated">Last updated: 2026-05-31 · Organizer only, not medical, legal, financial, or caregiving advice.</p>
      </div>
    </footer>
  `;
}
