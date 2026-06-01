// Companion product to the discharge kit (products/README.md queue #2). Same
// ProductDefinition shape, consumed by scripts/product-build. Positioning is
// communication + recordkeeping only — no medical/legal/financial advice — so
// the copy is written to clear the claim gate in product-renderer.ts /
// draft-listing.ts (which substring-match terms like "heal", "cure", "treat").
import type { ProductDefinition } from "../hospital-to-home-discharge-kit/product";

export const agingParentHandoffKit: ProductDefinition = {
  slug: "aging-parent-handoff-kit",
  title: "Aging Parent Care Handoff Kit",
  subtitle:
    "A printable organizer for families coordinating ongoing care for an aging parent across relatives, aides, and appointments.",
  audience:
    "Adult children and family caregivers who need one shared place to record care details, appointments, contacts, and who is responsible for what.",
  format: "Printable PDF, US Letter first, A4-ready layout",
  disclaimer:
    "This is a general organization template, not medical, legal, financial, tax, insurance, or caregiving advice. Follow the instructions from your care team, attorney, insurer, or qualified professional.",
  aiDisclosure:
    "This original organizer was created by the seller with assistance from AI tools and edited/reviewed by the seller.",
  pages: [
    {
      number: 1,
      title: "Start Here",
      purpose: "A five-minute setup page for the facts to collect first.",
      fields: [
        { label: "Parent name", lines: 1 },
        { label: "Who is the main family contact?", lines: 1 },
        { label: "Who else helps with care?", lines: 2 },
        { label: "Fill these pages first", kind: "checklist" },
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
      title: "The One-Minute Handoff",
      purpose:
        "A structured protocol for shifting care duties between family members.",
      note: "Use this to ensure critical information is communicated clearly.",
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
      number: 4,
      title: "Family Meeting Protocol",
      purpose: "A framework for productive family coordination meetings.",
      note: "Grounding meetings in structured, neutral items reduces tension.",
      fields: [
        {
          label: "Review current wellness Snapshot (Page 2)",
          kind: "checklist",
        },
        {
          label: "Confirm task ownership (Who is doing what?)",
          kind: "checklist",
        },
        {
          label: "Identify upcoming appointments & transport",
          kind: "checklist",
        },
        { label: "Open family questions / concerns", kind: "box", lines: 4 },
      ],
    },
    {
      number: 5,
      title: "Care Team And Contacts",
      purpose:
        "Keep family, aides, offices, and pharmacy contacts in one place.",
      fields: [
        { label: "Name / role", lines: 1 },
        { label: "Phone / email", lines: 1 },
        { label: "Best time or reason to contact", lines: 2 },
      ],
    },
    {
      number: 6,
      title: "Appointment Tracker",
      purpose: "Give every appointment, referral, or call a named owner.",
      fields: [
        { label: "Appointment or call", lines: 1 },
        { label: "Office / contact", lines: 1 },
        { label: "Date and time", lines: 1 },
        { label: "Owner", lines: 1 },
        { label: "Notes and outcome", kind: "box", lines: 4 },
      ],
    },
    {
      number: 7,
      title: "Medicine List",
      purpose: "Record what the pharmacy or care team listed.",
      note: "Copy the wording exactly as provided. Do not rewrite it.",
      fields: [
        { label: "Medicine name", lines: 1 },
        { label: "Instructions copied from pharmacy or care team", lines: 3 },
        {
          label: "Questions to ask the pharmacist or care team",
          kind: "box",
          lines: 4,
        },
      ],
    },
    {
      number: 8,
      title: "Family Task Ownership",
      purpose: "Turn vague help offers by assigning concrete tasks.",
      fields: [
        { label: "Task", lines: 1 },
        { label: "Owner", lines: 1 },
        { label: "Due date", lines: 1 },
        { label: "Status / notes", lines: 2 },
      ],
    },
    {
      number: 9,
      title: "Weekly Update Log",
      purpose:
        "Keep repeated family updates short, factual, and easy to share.",
      fields: [
        { label: "Date / week", lines: 1 },
        { label: "What changed since the last update?", kind: "box", lines: 5 },
        { label: "Who needs to know?", lines: 2 },
        { label: "Open questions", kind: "box", lines: 3 },
      ],
    },
    {
      number: 10,
      title: "Document Inventory",
      purpose:
        "Track where important papers and records are kept and who has a copy.",
      fields: [
        { label: "Document or record", lines: 1 },
        { label: "Location", lines: 1 },
        { label: "Who has a copy?", lines: 1 },
        { label: "Notes", lines: 2 },
      ],
    },
    {
      number: 11,
      title: "Insurance And Benefits Reference",
      purpose:
        "Keep account numbers and contacts together for quick reference.",
      note: "This page records numbers and contacts only. Ask your insurer for any coverage questions.",
      fields: [
        { label: "Plan or account name", lines: 1 },
        { label: "Member or account number", lines: 1 },
        { label: "Phone / contact", lines: 1 },
        { label: "Notes", lines: 2 },
      ],
    },
    {
      number: 12,
      title: "Home And Supplies Notes",
      purpose:
        "Coordinate the setup and supply details families often scramble to collect.",
      fields: [
        { label: "Room and access setup", kind: "checklist" },
        { label: "Food, water, and basic supplies", kind: "checklist" },
        { label: "Mobility aids and equipment", kind: "checklist" },
        { label: "Still missing", kind: "box", lines: 4 },
      ],
    },
    {
      number: 13,
      title: "Questions For Professionals",
      purpose:
        "Prepare neutral questions and record the professional's answer.",
      fields: [
        { label: "Question", kind: "box", lines: 3 },
        {
          label: "Answer recorded from the professional",
          kind: "box",
          lines: 5,
        },
        { label: "Who answered and when", lines: 1 },
      ],
    },
    {
      number: 14,
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
  ],
  listing: {
    title:
      "Aging Parent Care Organizer - Family Caregiver Planner, Appointment & Medicine List, Emergency Contacts, Care Handoff Printable PDF",
    priceIntro: "$11.99",
    priceAnchor: "$16.99",
    tags: [
      "aging parent",
      "caregiver planner",
      "elder care planner",
      "care coordination",
      "family caregiver",
      "caregiver binder",
      "appointment tracker",
      "medication list",
      "emergency contacts",
      "family organizer",
      "printable pdf",
      "senior care",
      "care handoff",
    ],
    descriptionBullets: [
      "Printable organizer for families coordinating ongoing care for an aging parent across relatives, aides, and appointments.",
      "Helps families record care details, appointments, contacts, family tasks, and document locations in one shared place.",
      "Designed as an organizer only. It does not provide medical, legal, financial, insurance, or caregiving advice.",
      "Use the kit to record what your care team, pharmacy, insurer, or qualified professional told you.",
    ],
    faq: [
      {
        question: "Is this caregiving advice?",
        answer:
          "No. This is a printable organization template. It helps you record decisions from your care team and keep family coordination in one place.",
      },
      {
        question: "Is this a physical product?",
        answer:
          "No. This is a digital PDF download that you can print at home or through a local print service.",
      },
      {
        question: "Does it work with the discharge kit?",
        answer:
          "Yes. It is the ongoing companion to the Hospital-to-Home Discharge Kit and can be used on its own or alongside it.",
      },
    ],
    postPurchaseNote:
      "Thank you for your order. Download and print the PDF, then start with the Start Here and 4Ms Snapshot pages. This organizer is not medical, legal, financial, tax, insurance, or caregiving advice; follow instructions from your qualified professionals.",
  },
};
