export interface MarketingItem {
  title: string;
  text: string;
}

export interface KitPage {
  label: string;
  title: string;
  text: string;
}

export const PRODUCT_TITLE = "Family Caregiver Command Kit";
export const PRODUCT_SUBTITLE =
  "A simple printable kit to keep appointments, tasks, handoffs, and emergency details in one place while your family coordinates care for an aging parent.";

export const PROBLEM_POINTS: string[] = [
  "One person is carrying the mental list, and everyone else is asking for updates.",
  "Appointment notes, contacts, medication details, and daily tasks live in different places.",
  "Family handoffs happen by memory, text threads, or rushed phone calls.",
];

export const KIT_PAGES: KitPage[] = [
  {
    label: "01",
    title: "Start Here",
    text: "A five-minute setup page that tells families what to fill out first.",
  },
  {
    label: "02",
    title: "Emergency Info",
    text: "Key contacts, care preferences, allergies, and where important records are stored.",
  },
  {
    label: "03",
    title: "Care Handoff Log",
    text: "A repeatable page for what happened today, what changed, and what needs follow-up.",
  },
  {
    label: "04",
    title: "Appointments",
    text: "Visit notes, questions to ask, follow-ups, and who is responsible next.",
  },
  {
    label: "05",
    title: "Task Tracker",
    text: "A plain-language who-does-what page for family members and helpers.",
  },
  {
    label: "06",
    title: "Optional Sheet",
    text: "A lightweight Google Sheet bonus only if it stays easy for buyers to copy and use.",
  },
];

export const HELP_POINTS: MarketingItem[] = [
  {
    title: "For family caregivers",
    text: "Built for adult children and relatives coordinating care at home, especially when several people are helping.",
  },
  {
    title: "For collaborators",
    text: "Short enough to review, practical enough to critique, and focused on what could become a clear Etsy digital product.",
  },
  {
    title: "For the first listing",
    text: "PDF-first, low support, and intentionally not an app, subscription, or broad caregiving advice product.",
  },
];

export const FEEDBACK_PROMPTS: string[] = [
  "Which pages would a real caregiver use every week?",
  "What would make the kit clearer for siblings, hired help, or facility staff?",
  "What should stay out so the product remains simple and low support?",
];

export const DISCLAIMER =
  "This is an organizer concept, not medical, legal, financial, or caregiving advice.";

export const PRODUCT_DETAILS: MarketingItem[] = [
  {
    title: "Format",
    text: "10-14 page printable PDF, with an optional simple Google Sheet bonus.",
  },
  {
    title: "Channel",
    text: "Etsy-first so the first version can test buyer interest before any website, app, or broader product line.",
  },
  {
    title: "Next refinement",
    text: "Use care-sector feedback to sharpen the page list, Etsy promise, and first listing images.",
  },
];
