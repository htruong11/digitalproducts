export interface ProductField {
  label: string;
  lines?: number;
  kind?: "line" | "box" | "checklist";
}

export interface ProductPage {
  number: number;
  title: string;
  purpose: string;
  note?: string;
  fields: ProductField[];
}

export interface ListingDraft {
  title: string;
  priceIntro: string;
  priceAnchor: string;
  tags: string[];
  descriptionBullets: string[];
  faq: Array<{ question: string; answer: string }>;
  postPurchaseNote: string;
}

export interface ProductDefinition {
  slug: string;
  title: string;
  subtitle: string;
  audience: string;
  format: string;
  disclaimer: string;
  aiDisclosure: string;
  pages: ProductPage[];
  listing: ListingDraft;
}

export const hospitalToHomeDischargeKit: ProductDefinition = {
  slug: "hospital-to-home-discharge-kit",
  title: "Hospital-to-Home Discharge Kit",
  subtitle:
    "A printable organizer for families bringing an aging parent home from hospital, rehab, urgent care, or surgery recovery.",
  audience:
    "Adult children and family caregivers who need one calm place to record discharge instructions, follow-ups, and first-week tasks.",
  format: "Printable PDF, US Letter first, A4-ready layout",
  disclaimer:
    "This is a general organization template, not medical, legal, financial, tax, insurance, or caregiving advice. Follow the instructions from your care team, attorney, insurer, or qualified professional.",
  aiDisclosure:
    "This original organizer was created by the seller with assistance from AI tools and edited/reviewed by the seller.",
  pages: [
    {
      number: 1,
      title: "The First Hour Home",
      purpose:
        "Critical setup facts for the transition from transport to the house.",
      fields: [
        { label: "Parent / patient name", lines: 1 },
        { label: "Discharge date and location", lines: 1 },
        { label: "Pharmacy used for discharge medications", lines: 1 },
        { label: "Arrival time at home", lines: 1 },
        { label: "Who is the 'Captain' for the first 24 hours?", lines: 1 },
      ],
    },
    {
      number: 2,
      title: "The 4Ms Snapshot",
      purpose:
        "A structured overview for family and future medical appointments based on geriatric wellness standards.",
      note: "Focus on these 4 areas to give doctors a clear picture of the current state.",
      fields: [
        { label: "What Matters (Current priorities / goals)", lines: 2 },
        { label: "Medication (New changes or concerns)", lines: 2 },
        { label: "Mentation (Confusion, mood, or sleep changes)", lines: 2 },
        { label: "Mobility (Balance, walking, or equipment needs)", lines: 2 },
      ],
    },
    {
      number: 3,
      title: "Discharge-Day Summary",
      purpose:
        "Record the care team's core instructions and primary follow-up contacts.",
      note: "Use the care team's words. Do not guess or rewrite instructions.",
      fields: [
        { label: "Reason for visit, as written by the care team", lines: 2 },
        { label: "Care-team contact and phone", lines: 2 },
        { label: "Primary follow-up contact", lines: 2 },
        {
          label: "Instruction Highlights (Copy exactly as provided)",
          kind: "box",
          lines: 6,
        },
      ],
    },
    {
      number: 4,
      title: "Medication Change Log",
      purpose: "Track what the care team or pharmacy said changed.",
      fields: [
        { label: "Medicine name", lines: 1 },
        { label: "Started / stopped / changed", lines: 1 },
        { label: "Amount and Timing from care team", lines: 2 },
        {
          label: "Clarification needed from pharmacist or doctor",
          kind: "box",
          lines: 4,
        },
      ],
    },
    {
      number: 5,
      title: "Home Readiness Checklist",
      purpose: "Coordinate the environment details for the transition home.",
      fields: [
        {
          label: "Pathway Clear: No rugs or cords in walking paths",
          kind: "checklist",
        },
        {
          label: "Lighting: Nightlights or clear access to switches",
          kind: "checklist",
        },
        {
          label: "Seating: Sturdy chairs with arms (not low/soft)",
          kind: "checklist",
        },
        {
          label: "Kitchen: 3 days of easy-prep food and water nearby",
          kind: "checklist",
        },
        {
          label: "Sanitation: Spare linens, towels, and waste bins",
          kind: "checklist",
        },
        {
          label: "Accessibility: Walker/Cane at bedside or chair",
          kind: "checklist",
        },
      ],
    },
    {
      number: 6,
      title: "The One-Minute Handoff",
      purpose:
        "A structured shift-change protocol for family members or aides.",
      note: "Use this when changing who is 'on duty' to ensure records are complete.",
      fields: [
        { label: "Medications: What was given last and when?", lines: 2 },
        {
          label: "Updates: Any changes to appetite or bathroom habits?",
          lines: 2,
        },
        { label: "Observations: Changes in energy, mood, or sleep?", lines: 2 },
        {
          label:
            "Action: What is the single most important task for the next shift?",
          lines: 2,
        },
      ],
    },
    {
      number: 7,
      title: "First 7 Days: Daily Log",
      purpose:
        "Keep simple observations in one place for the doctor follow-up.",
      fields: [
        { label: "Day and date", lines: 1 },
        {
          label: "Observations (Energy, discomfort, appetite, mobility)",
          kind: "box",
          lines: 8,
        },
        {
          label: "Specific questions for the next call/visit",
          kind: "box",
          lines: 4,
        },
      ],
    },
    {
      number: 8,
      title: "ER Go-Bag Inventory",
      purpose: "Items to keep ready if a return to the hospital is needed.",
      note: "Keep practical items in one place so family members can find them quickly.",
      fields: [
        { label: "Glasses, Hearing Aids, and Dentures", kind: "checklist" },
        {
          label: "Current medication list (Copy of Page 4)",
          kind: "checklist",
        },
        { label: "Phone charger with long cord", kind: "checklist" },
        { label: "Clock or watch, if useful", kind: "checklist" },
        { label: "A comfortable change of clothes", kind: "checklist" },
        { label: "This binder / Discharge kit", kind: "checklist" },
      ],
    },
    {
      number: 9,
      title: "Follow-Up Appointments",
      purpose: "Give every referral, lab, or therapy visit a named owner.",
      fields: [
        { label: "Appointment / Lab / Therapy", lines: 1 },
        { label: "Office / Contact", lines: 1 },
        { label: "Date / Time", lines: 1 },
        { label: "Transportation Owner", lines: 1 },
        { label: "Notes / Prep needed", kind: "box", lines: 4 },
      ],
    },
    {
      number: 10,
      title: "Equipment & Supplies",
      purpose: "List what needs to be ordered, delivered, or borrowed.",
      fields: [
        { label: "Item (Oxygen, Walker, Commode, etc.)", lines: 1 },
        { label: "Provider / Phone", lines: 1 },
        { label: "Order Status", lines: 1 },
        { label: "Who is coordinating?", lines: 1 },
      ],
    },
    {
      number: 11,
      title: "Sibling & Family Task List",
      purpose: "Avoid burnout by splitting concrete duties early.",
      fields: [
        { label: "Grocery / Meal Prep", lines: 1 },
        { label: "Pharmacy Runs", lines: 1 },
        { label: "Insurance / Billing Calls", lines: 1 },
        { label: "Night Shift / Overnight", lines: 1 },
        { label: "Laundry / Cleaning", lines: 1 },
      ],
    },
    {
      number: 12,
      title: "Key Directory",
      purpose: "Every number you might need to dial in a hurry.",
      fields: [
        { label: "Primary Care Doctor", lines: 1 },
        { label: "Specialist / Surgeon", lines: 1 },
        { label: "Pharmacy (After hours number if available)", lines: 1 },
        { label: "Home Wellness Agency", lines: 1 },
        { label: "Medical Equipment Company", lines: 1 },
        { label: "Non-Emergency Medical Transport", lines: 1 },
      ],
    },
    {
      number: 13,
      title: "Using This Organizer",
      purpose: "Expectations for families and caregivers.",
      fields: [
        {
          label:
            "Keep this in a single, visible location (like the kitchen counter)",
          kind: "checklist",
        },
        { label: "Update the log at every shift change", kind: "checklist" },
        {
          label: "Bring the whole kit to every follow-up appointment",
          kind: "checklist",
        },
        {
          label: "Follow the care team's instructions above all else",
          kind: "checklist",
        },
        { label: "Notes", kind: "box", lines: 4 },
      ],
    },
    {
      number: 14,
      title: "Research-Informed Recordkeeping",
      purpose:
        "This organizer uses simple sections inspired by common family-care coordination frameworks.",
      fields: [
        {
          label:
            "The 4Ms Framework: A place to record What Matters, Medication, Mentation, and Mobility notes for appointments.",
          kind: "checklist",
        },
        {
          label:
            "Family Handoff Records: Simple pages for recording updates, contacts, and task ownership.",
          kind: "checklist",
        },
        {
          label:
            "Question Capture: Space to write down questions for the care team before calls or visits.",
          kind: "checklist",
        },
        {
          label:
            "Plain-Language Layout: Short sections designed for quick use during busy transitions.",
          kind: "checklist",
        },
      ],
    },
  ],
  listing: {
    title:
      "Hospital Discharge Planner for Aging Parents - First 7 Days Home Checklist, Medication Changes, Follow Up Tracker, Caregiver PDF",
    priceIntro: "$9.99",
    priceAnchor: "$14.99",
    tags: [
      "hospital discharge",
      "caregiver planner",
      "aging parent",
      "discharge planner",
      "caregiver binder",
      "medication tracker",
      "follow up tracker",
      "elder care planner",
      "family caregiver",
      "printable pdf",
      "care handoff",
      "doctor notes",
      "home care notes",
    ],
    descriptionBullets: [
      "Printable organizer for the first week after an aging parent comes home from hospital, rehab, urgent care, or surgery recovery.",
      "Helps families record discharge instructions, medication changes, follow-up tasks, contacts, and family ownership in one place.",
      "Designed as an organizer only. It does not provide medical, legal, financial, insurance, or caregiving advice.",
      "Use the kit to record what your care team, pharmacy, or qualified professional told you.",
    ],
    faq: [
      {
        question: "Is this medical advice?",
        answer:
          "No. This is a printable organization template. It helps you record instructions from your care team and keep family tasks in one place.",
      },
      {
        question: "Is this a physical product?",
        answer:
          "No. This is a digital PDF download that you can print at home or through a local print service.",
      },
      {
        question: "Can I edit it?",
        answer:
          "The first version is PDF-first for simple printing. A fillable or spreadsheet version may be added later if buyers ask for it.",
      },
    ],
    postPurchaseNote:
      "Thank you for your order. Download and print the PDF, then start with The First Hour Home and Discharge-Day Summary pages. This organizer is not medical, legal, financial, tax, insurance, or caregiving advice; follow instructions from your qualified professionals.",
  },
};
