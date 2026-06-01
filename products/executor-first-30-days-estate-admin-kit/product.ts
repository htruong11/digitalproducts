import type { ProductDefinition } from "../hospital-to-home-discharge-kit/product";

export const executorEstateAdminKit: ProductDefinition = {
  slug: "executor-first-30-days-estate-admin-kit",
  title: "Executor First 30 Days: Estate Admin Kit",
  subtitle:
    "A printable organizer for executors managing the initial administrative tasks after a family member passes.",
  audience:
    "Family members who have been named executor and need an orderly, task-based approach to the first 30 days of estate administration.",
  format: "Printable PDF, US Letter first, A4-ready layout",
  disclaimer:
    "This is a general organization template, not medical, legal, financial, tax, insurance, or estate guidance. Administration requirements vary by jurisdiction; consult with a qualified attorney regarding estate formalities.",
  aiDisclosure:
    "This original organizer was created by the seller with assistance from AI tools and edited/reviewed by the seller.",
  pages: [
    {
      number: 1,
      title: "Start Here: The Executor Roadmap",
      purpose: "Establish order in the immediate aftermath.",
      fields: [
        { label: "Deceased / Estate Name", lines: 1 },
        { label: "Executor Name", lines: 1 },
        {
          label: "Immediate administrative priorities (checklists)",
          kind: "checklist",
        },
      ],
    },
    {
      number: 2,
      title: "Immediate Administrative Actions",
      purpose: "Tasks to address within the first 48 hours.",
      fields: [
        { label: "Protect the property and assets", kind: "checklist" },
        {
          label: "Locate original Will and funeral instructions",
          kind: "checklist",
        },
        {
          label: "Notify family, close friends, and employer",
          kind: "checklist",
        },
      ],
    },
    {
      number: 3,
      title: "Asset and Account Locator",
      purpose: "Record where key financial and account documents are located.",
      fields: [
        { label: "Account or Asset Type", lines: 1 },
        { label: "Location of documents / digital credentials", lines: 2 },
        { label: "Institution / Contact", lines: 1 },
      ],
    },
    {
      number: 4,
      title: "Debts and Ongoing Obligations",
      purpose:
        "Track recurring payments, bills, and obligations that need attention.",
      fields: [
        { label: "Obligation / Creditor", lines: 1 },
        { label: "Due date / Frequency", lines: 1 },
        { label: "Contact information", lines: 1 },
        { label: "Status (Paid/Suspended/Notified)", lines: 1 },
      ],
    },
    {
      number: 5,
      title: "Executor Task Master-List",
      purpose:
        "A consolidated list of administrative to-dos, assigned to owners.",
      fields: [
        {
          label: "Task (e.g., File death cert, notify Social Security)",
          lines: 1,
        },
        { label: "Owner", lines: 1 },
        { label: "Due Date", lines: 1 },
        { label: "Status / Notes", lines: 2 },
      ],
    },
    {
      number: 6,
      title: "Communication Log",
      purpose: "Keep track of notifications made to agencies and institutions.",
      fields: [
        { label: "Agency / Institution", lines: 1 },
        { label: "Contact / Reference Number", lines: 1 },
        { label: "Date / Outcome", lines: 1 },
      ],
    },
  ],
  listing: {
    title:
      "Executor Admin Kit - First 30 Days Estate Admin Organizer, Asset Tracker, Task Checklist, Printable PDF",
    priceIntro: "$14.99",
    priceAnchor: "$19.99",
    tags: [
      "executor planner",
      "estate admin",
      "estate tracker",
      "executor checklist",
      "printable pdf",
      "asset tracker",
      "final arrangements",
      "death cert tracker",
      "family organizer",
      "executor kit",
    ],
    descriptionBullets: [
      "Printable organizer for executors managing the initial administrative tasks after a family member passes.",
      "Helps families locate assets, track debts, manage immediate notifications, and coordinate tasks.",
      "Designed as an organizer only. It does not provide medical, legal, financial, tax, insurance, or estate guidance.",
      "Use the kit to track the administrative steps you are taking to manage the estate.",
    ],
    faq: [
      {
        question: "Is this legal or estate guidance?",
        answer:
          "No. This is a printable organization template. It helps you track administrative tasks and record information for qualified estate, legal, or financial professionals.",
      },
      {
        question: "Is this a physical product?",
        answer:
          "No. This is a digital PDF download that you can print at home or through a local print service.",
      },
    ],
    postPurchaseNote:
      "Thank you for your order. Download and print the PDF to begin organizing administrative notes and records. This organizer is not medical, legal, financial, tax, insurance, or estate guidance; follow instructions from your qualified professionals.",
  },
};
