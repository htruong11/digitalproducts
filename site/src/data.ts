export interface MarketingItem {
  title: string;
  text: string;
}

export interface KitPage {
  label: string;
  title: string;
  text: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CompetitorItem {
  cluster: string;
  evidence: string;
  weakness: string;
}

export const PRODUCT_TITLE = "Aging Parent Handoff Kit";
export const PRODUCT_SUBTITLE =
  "A printable coordination kit that helps family members, aides, and doctors quickly understand what changed, what matters, and who is handling what.";

export const HERO_POINTS: string[] = [
  "Printable PDF",
  "No app or login",
  "Designed for family handoffs",
];

export const PROBLEM_POINTS: string[] = [
  "One family member becomes the default memory for medications, appointments, tasks, and daily changes.",
  "Care handoffs happen through rushed texts, phone calls, sticky notes, or whatever someone remembers.",
  "Doctor visits and emergency moments require a clean snapshot, but the details are scattered.",
];

export const KIT_PAGES: KitPage[] = [
  {
    label: "01",
    title: "Start Here",
    text: "A five-minute setup page that tells families which pages to fill out first.",
  },
  {
    label: "02",
    title: "Emergency Snapshot",
    text: "Key contacts, allergies, medication basics, care preferences, and where important records are stored.",
  },
  {
    label: "03",
    title: "Daily Handoff Log",
    text: "A repeatable page for what happened today, what changed, and what needs follow-up.",
  },
  {
    label: "04",
    title: "Doctor Visit Prep",
    text: "Questions to ask, recent changes to mention, appointment notes, and follow-up actions.",
  },
  {
    label: "05",
    title: "Family Task Ownership",
    text: "A plain-language who-does-what page for siblings, relatives, and helpers.",
  },
  {
    label: "06",
    title: "Weekly Care Summary",
    text: "A one-page review of what changed this week, what is open, and what needs a decision.",
  },
];

export const OFFER_STEPS: MarketingItem[] = [
  {
    title: "Fill the emergency snapshot first",
    text: "Start with contacts, medications, allergies, care preferences, and where important documents live.",
  },
  {
    title: "Use the handoff log daily",
    text: "Capture what changed, what was done, what is still open, and what the next helper needs to know.",
  },
  {
    title: "Bring a cleaner doctor visit brief",
    text: "Use the visit prep and notes pages to keep questions, recent changes, and follow-up tasks together.",
  },
];

export const HELP_POINTS: MarketingItem[] = [
  {
    title: "For adult children",
    text: "Built for families coordinating care for an aging parent, especially when one person keeps becoming the update hub.",
  },
  {
    title: "For family handoffs",
    text: "Focused on daily changes, open loops, and the information another helper needs before stepping in.",
  },
  {
    title: "For the first listing",
    text: "PDF-first, low support, and intentionally not an app, subscription, or broad caregiving advice product.",
  },
];

export const STATS: StatItem[] = [
  {
    value: "5,000+",
    label: "Caregiver planner items visible on Etsy market pages",
  },
  {
    value: "4,000+",
    label: "Medical binder items competing for broad buyer intent",
  },
  {
    value: "5.8k",
    label: "Sales shown by direct competitor CompetentCaregiver",
  },
  {
    value: "$9.99",
    label: "Recommended intro price before raising the anchor",
  },
];

export const MARKET_POINTS: MarketingItem[] = [
  {
    title: "Validated demand",
    text: "Etsy has thousands of caregiver planner, caregiving log, elder care planner, and medical binder listings with visible review activity.",
  },
  {
    title: "Crowded generic terms",
    text: "Generic caregiver planners often sell as low-priced printables, so the first listing should avoid sounding like another broad binder.",
  },
  {
    title: "Sharper wedge",
    text: "Aging-parent handoff, emergency readiness, doctor visit prep, and family task ownership are more specific buyer problems to test first.",
  },
];

export const COMPETITORS: CompetitorItem[] = [
  {
    cluster: "Generic caregiver planners",
    evidence: "Large Etsy result set, many $1-$8 printable PDFs.",
    weakness: "Crowded and easy to copy; many listings look interchangeable.",
  },
  {
    cluster: "Medical binders",
    evidence: "Large review signals and 4,000+ visible market items.",
    weakness:
      "Too broad for a new shop; competes with chronic illness and emergency binders.",
  },
  {
    cluster: "Caregiving daily logs",
    evidence:
      "Clear demand for task sheets, visit logs, and home-care reports.",
    weakness:
      "Single-page logs are highly commoditized and hard to price above impulse-buy range.",
  },
  {
    cluster: "Connected Notion systems",
    evidence:
      "Premium templates around $20-$30 validate the bigger system ladder.",
    weakness: "More setup friction for stressed, nontechnical caregivers.",
  },
];

export const VALIDATION_PLAN: MarketingItem[] = [
  {
    title: "First 100 qualified visits",
    text: "If there are no sales, revise title, thumbnail, first image, and price before building another product.",
  },
  {
    title: "Favorites without purchases",
    text: "Treat that as a clarity or trust problem: improve previews, page list, and buyer-specific language.",
  },
  {
    title: "Buyer questions",
    text: "Use repeated questions to decide whether the next product should be a sheet, Notion system, or narrower printable.",
  },
];

export const RISK_POINTS: MarketingItem[] = [
  {
    title: "Zero traffic",
    text: "A new Etsy shop may not rank, even with a good product. The first listing is a distribution test.",
  },
  {
    title: "Price compression",
    text: "Many competing PDFs are cheap. The page and listing must prove why a more complete handoff kit is worth more.",
  },
  {
    title: "Behavior change",
    text: "The buyer still needs family members or helpers to use the pages. Simplicity is part of the product.",
  },
];

export const FEEDBACK_PROMPTS: string[] = [
  "Would this help a sibling, aide, or spouse step in without a long explanation?",
  "Which page would be most useful before a doctor visit or emergency call?",
  "What should stay out so the kit remains simple, printable, and low support?",
];

export const DISCLAIMER =
  "This is an organizer concept, not medical, legal, financial, or caregiving advice.";

export const PRODUCT_DETAILS: MarketingItem[] = [
  {
    title: "Format",
    text: "10-14 page printable PDF with US Letter and A4 layouts. A connected sheet or Notion version comes later only if buyers ask for it.",
  },
  {
    title: "Channel",
    text: "Etsy-first, with a $9.99 intro price and $14.99 anchor while the listing earns real buyer signal.",
  },
  {
    title: "Market position",
    text: "More specific than a generic caregiver planner: the wedge is aging-parent handoff, emergency readiness, and family coordination.",
  },
];
