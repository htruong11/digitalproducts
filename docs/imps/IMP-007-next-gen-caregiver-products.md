---
owner: bestrobot
tracking: IMP-007
status: active
created: 2026-05-31
source: IMP-005, IMP-006, docs/research/research-resource.md, product workspaces
---

# IMP-007: Next-Gen Caregiver Product Library

## What Is Left

1. [ ] Finish visual review for the remaining generated PDFs:
       hospital-to-home, aging-parent handoff, and executor admin.
2. [ ] Create 6-8 Etsy listing images per publish candidate from real generated
       pages, not generic mockups.
3. [ ] Human-review the executor kit before launch; it is a drafted product, not
       a publish-ready legal/probate product.
4. [ ] Build the **Senior Storyboard Kit** next if the caregiver library needs a
       low-risk, differentiated legacy/social-prescribing PDF.
5. [ ] Keep the IMP-008 chat-agent/site concept as an upgrade path only after
       the PDF catalog has sales or buyer messages.

## Abstract

IMP-006 chose the first publish path: Hospital-to-Home Discharge Kit, then Aging
Parent Handoff Kit. This IMP turns the research into a compact product library
roadmap and keeps the next-gen ideas in the right order.

The library should stay PDF-first until there is market signal. The current
near-term line is:

1. Hospital-to-Home Discharge Kit - urgent discharge moment.
2. Aging Parent Care Handoff Kit - ongoing family coordination.
3. Care Pact Sibling Coordination Kit - task ownership and accountability.
4. Executor First 30 Days Estate Admin Kit - higher-ticket draft, launch-parked.
5. Senior Storyboard Kit - next low-risk addition.

## Done

- [x] Researched the caregiver, discharge, executor, and adjacent product market
      in IMP-005 and IMP-006.
- [x] Added claims and Etsy policy gates in IMP-006.
- [x] Built typed product definitions for hospital-to-home discharge,
      aging-parent handoff, and executor admin.
- [x] Added the Care Pact Sibling Coordination Kit as the next caregiver-library
      PDF product definition.
- [x] Registered all four product definitions in the product build queue.
- [x] Generated the Care Pact PDF and checked the first-page render.
- [x] Asked Claude Code for a read-only follow-up review; incorporated its
      safety fixes and kept Senior Storyboard as the next low-risk spec.

## Product Queue

| Rank | Product                                 | Status                           | Launch posture                                   |
| ---- | --------------------------------------- | -------------------------------- | ------------------------------------------------ |
| 1    | Hospital-to-Home Discharge Kit          | Built definition + build assets  | Publish-ready after human image/listing review   |
| 2    | Aging Parent Care Handoff Kit           | Built definition + build assets  | Publish-ready after discharge listing exists     |
| 3    | Care Pact Sibling Coordination Kit      | Built definition + generated PDF | Next listing-image candidate                     |
| 4    | Executor First 30 Days Estate Admin Kit | Built definition                 | Drafted, launch-parked for legal-adjacent review |
| 5    | Senior Storyboard Kit                   | Spec next                        | Low-risk differentiator after Care Pact          |

## Research Synthesis

### Behavioral Economics: Care Pact

- Problem: family care work breaks down when help is vague, invisible, or left to
  the nearest caregiver.
- Product response: a sibling coordination packet with task ownership,
  if-then plans, weekly check-ins, a fairness ledger, and short group-update
  templates.
- Boundary: coordination only. Do not frame it as a legal agreement, family
  mediation product, reimbursement system, or conflict-reduction guarantee.

### Estate Administration: Executor Kit

- Problem: executors need order during the first calls, records, documents,
  bills, accounts, and family updates.
- Product response: printable admin tracker and asset/account locator.
- Boundary: launch-parked. Avoid probate instructions, legal deadlines,
  tax guidance, asset-transfer advice, password-sharing instructions, or any
  promise to settle an estate.

### Social Prescribing: Senior Storyboard

- Problem: many senior-care products treat the older adult as a task list rather
  than a person with identity, mastery, memories, and preferences.
- Product response: prompt-based story, recipe, life-history, skill-sharing, and
  family-interview worksheets that support connection and legacy.
- Boundary: do not claim loneliness treatment, mental-health benefits, clinical
  outcomes, or therapy.

### IMP-008 Chat Agent / Logged-In Upgrade

- Product idea: a site or chat workflow where buyers can fill out the same
  worksheets, ask follow-up questions, and export polished PDFs.
- Current decision: park until the PDF library gets signal. Build now only if
  buyer messages specifically ask for fillable/editable workflows.
- Likely proof-of-purchase options later: Etsy order verification by support
  workflow, Gumroad license keys, Lemon Squeezy, Shopify digital downloads, or a
  simple account system. Avoid building custom auth before sales.

## Next Product Spec: Senior Storyboard Kit

Suggested 12-page PDF:

1. Start Here: person, preferred name, and what they want remembered.
2. Life Chapters Timeline.
3. Favorite Stories Interview.
4. Recipe And Kitchen Memory Cards.
5. Skills I Can Teach.
6. Music, Photos, And Places Prompt Sheet.
7. Family Questions To Ask.
8. Grandchild / Younger Relative Interview Page.
9. Objects With Stories Inventory.
10. Voice Memo / Photo Session Planner.
11. Legacy Book Assembly Checklist.
12. Using This Organizer and non-therapy disclaimer.

## Tasks

1. [x] Define product specs for Care Pact.
2. [x] Create initial PDF source definition for Care Pact.
3. [x] Register Care Pact in the product build queue.
4. [x] Run `npm run product:pdf care-pact-sibling-coordination-kit` and inspect
       the generated PDF.
5. [ ] Create Etsy draft images for hospital-to-home and Care Pact.
6. [ ] Draft the Senior Storyboard product definition after the Care Pact PDF
       passes review.
7. [ ] Revisit the chat-agent offering after 100 qualified views or 10 sales.

## References & Research

- [IMP-006 Adjacent Product Research](./IMP-006-adjacent-product-research.md)
- [IMP-008 Chat Agent Offering](./IMP-008-chat-agent-offering.md)
- [Caregiver Product Research Resource](../research/research-resource.md)
- [Products README](../../products/README.md)
