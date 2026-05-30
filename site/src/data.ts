export interface ChecklistCategory {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export interface ResearchNote {
  label: string;
  content: string;
}

export const PRODUCT_TITLE = "Elderly Home Care Checklist";
export const PRODUCT_SUBTITLE =
  "A complete system for families & caregivers to organize, track, and simplify daily home care for aging loved ones.";

export const PROBLEM_POINTS: string[] = [
  "Worried you're forgetting something important in daily care routines?",
  "Struggling to coordinate care between family members or hired help?",
  "Unsure what safety risks to look for around the home?",
  "Feeling overwhelmed managing medications, appointments, and daily tasks?",
];

export const CHECKLIST_CATEGORIES: ChecklistCategory[] = [
  {
    icon: "🏠",
    title: "Home Safety",
    description: "Identify and eliminate fall risks and hazards room by room.",
    items: [
      "Remove loose rugs and clutter from walkways",
      "Install grab bars in bathroom and near toilet",
      "Ensure adequate lighting in all rooms and hallways",
      "Check smoke and carbon monoxide detectors",
      "Secure stair railings and check for loose steps",
    ],
  },
  {
    icon: "💊",
    title: "Medication Management",
    description: "Track prescriptions, dosages, and refill schedules reliably.",
    items: [
      "Maintain an up-to-date medication list with dosages",
      "Set up a daily/weekly pill organizer",
      "Note medication interactions and side effects to watch",
      "Track refill dates and pharmacy contact info",
      "Log who administered medication and when",
    ],
  },
  {
    icon: "🍽️",
    title: "Nutrition & Hydration",
    description: "Ensure consistent, appropriate meals and fluid intake.",
    items: [
      "Plan weekly meals accounting for dietary restrictions",
      "Track daily fluid intake (goal: 6–8 glasses)",
      "Monitor appetite changes or difficulty swallowing",
      "Stock easy-to-prepare, nutrient-dense foods",
      "Note food allergies and preferences",
    ],
  },
  {
    icon: "🏃",
    title: "Daily Routines & Mobility",
    description: "Maintain independence and physical activity safely.",
    items: [
      "Morning hygiene checklist (bathing, grooming, dressing)",
      "Daily mobility exercises or physical therapy log",
      "Track use of mobility aids (walker, cane, wheelchair)",
      "Record sleep patterns and quality",
      "Monitor skin condition for pressure sores",
    ],
  },
  {
    icon: "🩺",
    title: "Medical & Appointments",
    description: "Stay on top of healthcare visits and health monitoring.",
    items: [
      "Upcoming doctor, specialist, and dental appointments",
      "Blood pressure, glucose, and vitals log",
      "List of current doctors and contact numbers",
      "Insurance cards and Medicare/Medicaid info",
      "Post-visit notes and follow-up instructions",
    ],
  },
  {
    icon: "💬",
    title: "Emotional & Social Wellbeing",
    description: "Support mental health and meaningful connection.",
    items: [
      "Weekly social activities or family visits scheduled",
      "Mood and cognitive changes log",
      "Contact list for friends, neighbors, and community",
      "Hobbies and engagement activities",
      "Signs of depression or isolation to watch for",
    ],
  },
];

export const BENEFITS: { icon: string; title: string; text: string }[] = [
  {
    icon: "✅",
    title: "Nothing Falls Through the Cracks",
    text: "Every critical care task is documented so medications, appointments, and safety checks are never missed.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Easy to Share with Family",
    text: "Anyone stepping in to help — whether a sibling or a hired aide — can pick up exactly where you left off.",
  },
  {
    icon: "🧘",
    title: "Less Stress, More Confidence",
    text: "Replace mental load with a clear system. Know what needs to happen today, this week, and this month.",
  },
];

export const RESEARCH_NOTES: ResearchNote[] = [
  {
    label: "Target Audience",
    content:
      "Adult children (35–60) acting as primary caregivers for an aging parent at home. Often juggling work, their own family, and caregiving. May be long-distance.",
  },
  {
    label: "Core Pain Point",
    content:
      "Fear of missing something critical. Decision fatigue. Coordination friction when multiple people are involved in care.",
  },
  {
    label: "Competing Products",
    content:
      "Generic caregiver apps (CareZone, CaringBridge), generic PDF checklists on care blogs. Gap: nothing that's printable + digital + organized by category.",
  },
  {
    label: "Potential Formats",
    content:
      "PDF checklist bundle, Notion template, printable binder inserts. Consider a tiered product: free sample category + paid full bundle.",
  },
  {
    label: "Pricing Research",
    content:
      "Similar digital products on Etsy: $5–$25. Notion templates: $10–$30. Could bundle with a 'caregiver's guide' doc for higher price point.",
  },
  {
    label: "Content To Write",
    content:
      "Full checklist items for each category (draft above is ~5 items each, expand to 15–20). Add a 'Getting Started' guide. Add emergency info sheet template.",
  },
];
