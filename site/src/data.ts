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

export const PRODUCT_TITLE = "Hospital-to-Home Discharge Kit";
export const PRODUCT_SUBTITLE =
  "A printable transition kit for adult children bringing an aging parent home from the hospital, rehab, or urgent care.";

export const HERO_POINTS: string[] = [
  "Printable PDF",
  "No app or login",
  "Built for discharge week",
];

export const PROBLEM_POINTS: string[] = [
  "Families often get discharge instructions while tired, rushed, and unsure what has to happen first at home.",
  "Medication changes, follow-up appointments, equipment, home setup, and family tasks scatter across papers and texts.",
  "The first week home needs a simple operating packet, not a broad caregiving binder.",
];

export const KIT_PAGES: KitPage[] = [
  {
    label: "01",
    title: "Discharge Day Snapshot",
    text: "A first-page summary for the discharge reason as written by the care team, discharge date, pharmacy, follow-up contacts, and key instructions.",
  },
  {
    label: "02",
    title: "Medication Change Log",
    text: "A simple place to record what stopped, started, changed, and what still needs pharmacy follow-up.",
  },
  {
    label: "03",
    title: "First 7 Days Home",
    text: "Daily notes for symptoms to mention, open questions, meals, mobility, equipment, and family updates.",
  },
  {
    label: "04",
    title: "Follow-Up Tracker",
    text: "Appointments, referrals, labs, therapy, transportation, and tasks that need a named owner.",
  },
  {
    label: "05",
    title: "Home Readiness Checklist",
    text: "Room setup, meals, supplies, mobility aids, documents, and phone numbers to gather before the first night.",
  },
  {
    label: "06",
    title: "Questions For The Care Team",
    text: "A neutral prompt sheet for recording what the hospital, rehab team, pharmacist, or doctor actually said.",
  },
];

export const OFFER_STEPS: MarketingItem[] = [
  {
    title: "Capture the discharge instructions",
    text: "Put the discharge date, care team, pharmacy, follow-up plan, and unresolved questions in one place.",
  },
  {
    title: "Work the first week home",
    text: "Use one page per day to record changes, family updates, tasks, and anything to ask at follow-up.",
  },
  {
    title: "Hand off without re-explaining",
    text: "Give siblings, aides, or the next appointment a clean view of what changed and what still needs action.",
  },
];

export const HELP_POINTS: MarketingItem[] = [
  {
    title: "For adult children",
    text: "Built for families suddenly coordinating post-hospital care for an aging parent.",
  },
  {
    title: "For discharge week",
    text: "Focused on the first days home, medication changes, follow-ups, home setup, and family task ownership.",
  },
  {
    title: "For the first listing",
    text: "PDF-first, low support, and intentionally not an app, clinical guide, or broad caregiving advice product.",
  },
];

export const STATS: StatItem[] = [
  {
    value: "390+",
    label: "Hospital discharge items visible on Etsy market pages",
  },
  {
    value: "$9.99",
    label: "Recommended intro price for the first discharge listing",
  },
  {
    value: "$14.99",
    label: "Target anchor after the listing earns real buyer signal",
  },
  {
    value: "30 days",
    label: "Executor kit queued as the next higher-ticket product",
  },
];

export const MARKET_POINTS: MarketingItem[] = [
  {
    title: "Validated urgent moment",
    text: "Etsy has a live hospital-discharge market page with aging-parent discharge checklists and related care-transition downloads.",
  },
  {
    title: "Cleaner than generic caregiving",
    text: "Discharge language is narrower than caregiver planner or medical binder, while still matching the same adult-child buyer.",
  },
  {
    title: "Natural product ladder",
    text: "A discharge kit can cross-link into the broader handoff kit, then into a higher-ticket executor first-30-days kit.",
  },
];

export const COMPETITORS: CompetitorItem[] = [
  {
    cluster: "Hospital discharge checklists",
    evidence:
      "Etsy market page shows 390+ items, including aging-parent and caregiver discharge PDFs.",
    weakness:
      "Many are thin checklists; a sequenced first-week kit can look more useful.",
  },
  {
    cluster: "Generic caregiver planners",
    evidence: "Large Etsy result set, many $1-$8 printable PDFs.",
    weakness: "Crowded and easy to copy; many listings look interchangeable.",
  },
  {
    cluster: "Medical binders",
    evidence: "Large review signals and thousands of visible market items.",
    weakness:
      "Too broad for a new shop and not specific to the discharge-week job.",
  },
  {
    cluster: "Executor and end-of-life binders",
    evidence:
      "Higher willingness-to-pay, including $15-$30 estate and emergency organizers.",
    weakness:
      "Legal-adjacent claims risk is higher, so it should follow after the first caregiver-cluster listing.",
  },
];

export const VALIDATION_PLAN: MarketingItem[] = [
  {
    title: "First 100 qualified visits",
    text: "If there are no sales, revise the discharge-specific title, thumbnail, first image, and price before building another product.",
  },
  {
    title: "Favorites without purchases",
    text: "Treat that as a clarity or trust problem: improve previews, page list, and buyer-specific language.",
  },
  {
    title: "Buyer questions",
    text: "Use repeated questions to decide whether to add fillable fields, a Google Sheet, or a more specific rehab/surgery version.",
  },
];

export const RISK_POINTS: MarketingItem[] = [
  {
    title: "Zero traffic",
    text: "A new Etsy shop may not rank, even with a good product. The first listing is a distribution test.",
  },
  {
    title: "Price compression",
    text: "Many competing PDFs are cheap. The page and listing must prove why a sequenced discharge-week kit is worth more.",
  },
  {
    title: "Medical claims",
    text: "The kit must record care-team instructions, not provide clinical guidance or promises about outcomes.",
  },
];

export const FEEDBACK_PROMPTS: string[] = [
  "Would this help during the first week after discharge?",
  "Which page would you want before leaving the hospital or rehab facility?",
  "What should stay out so the kit remains an organizer, not medical advice?",
];

export const DISCLAIMER =
  "This is an organizer concept, not medical, legal, financial, or caregiving advice.";

export const PRODUCT_DETAILS: MarketingItem[] = [
  {
    title: "Format",
    text: "10-14 page printable PDF with US Letter and A4 layouts. A fillable or Google Sheets version comes later only if buyers ask for it.",
  },
  {
    title: "Channel",
    text: "Etsy-first, with a $9.99 intro price and $14.99 anchor while the listing earns real buyer signal.",
  },
  {
    title: "Market position",
    text: "More specific than a generic caregiver planner: the wedge is hospital-to-home transition, first-week coordination, and family task ownership.",
  },
];
