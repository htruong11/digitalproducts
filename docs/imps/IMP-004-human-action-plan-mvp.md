---
owner: bestrobot
tracking: IMP-004
status: proposal
created: 2026-05-30
source: IMP-001 (Etsy launch), IMP-002 (strategy), IMP-003 (agent productionizing)
---

# IMP-004: Human Action Plan to Begin the MVP

## Purpose

IMP-001 → IMP-003 cover _what_ we're selling (caregiver printable PDFs on Etsy)
and _how_ the agent system will run. This is the **owner's checklist**: the
concrete things **you, the human**, must do to get the first product live and the
agent loop started.

The product and strategy are already decided, so this is not a strategy doc — it
is a ranked, do-this-now runbook. IMP-006 narrows the first publishable product
to the **Hospital-to-Home Discharge Kit** and supersedes older "Family Caregiver
Command Kit" wording for publication. Everything is sorted by priority. Each task is
tagged by who has to do it:

- 🔴 **HUMAN ONLY** — requires your legal identity, money, consent, or a
  strategic/taste judgment. An agent cannot do this for you, today or soon.
- 🟡 **HUMAN NOW / AGENT LATER** — you bootstrap it once; a future agent could
  take it over, but the tooling/trust isn't there yet.
- 🟢 **AGENT-READY** — a coding agent (Claude) can do this now. Listed so you know
  to _delegate_ it, not do it yourself.

**The whole point:** do the 🔴 gates, hand everything else to the agent. Your job
is to unblock, decide, and approve — not to do the labor. Per IMP-001, the one
success criterion that matters first is **one product published and selling on
Etsy.**

---

## Priority 0 — Decisions Only You Can Make (do first, ~20 min, $0)

Most strategy is already settled (caregiver niche, the ~10–14 page PDF kit, and
the price wedge — see IMP-001/IMP-002). Only two open decisions gate the rest.

### 0.1 🔴 Pick the shop name

- The product is decided — IMP-006's first publishable product is the
  **"Hospital-to-Home Discharge Kit"**. You still need an **Etsy-legal, memorable, non-trademarked
  Etsy shop name** (the storefront name, separate from the product title).
- Why human: brand identity is a judgment call you own.
- **How to apply:** write it into `docs/decisions/brand.md` (one line + 2-3
  backup names in case the first is taken).
- _Agent can help:_ ask Claude to brainstorm 20 names and pre-check Etsy/
  trademark availability — but **you pick**.

### 0.2 🔴 Confirm the AI-disclosure & claims posture

- Two policies, both already implied by IMP-001/IMP-002 — just confirm them so
  the agent treats them as hard rules:
  1. Products are **organizational tools, not medical/legal advice** (every PDF
     carries the disclaimer).
  2. If any listing image or copy is AI-assisted, **disclose it** per Etsy
     policy.
- **How to apply:** add a `claims_policy` line to `docs/decisions/brand.md`.

> Pricing is **not** an open decision — IMP-001 sets the MVP wedge at **$12–$17**
> for the PDF kit, and IMP-002 frames the value ladder ($17 wedge → $47 full
> Google-Sheets system → $497–$1,497 B2B facility kit). The MVP launches at the
> ~$17 wedge; the agent will use that.

---

## Priority 1 — The Hard Human Gates (the real blockers, ~1 hr + verification wait)

Nothing can be sold until these are done, and **no agent can do them** — they
need your legal identity, your bank, and your consent in a browser. Start 1.1
early; ID checks run async.

### 1.1 🔴 Create an Etsy seller account & open a shop

- **Link:** https://www.etsy.com/sell
- Requires real name, email, often **government ID verification**, and a shop
  region/currency.
- ⏳ ID verification can take hours-to-days — **kick this off before anything
  else** so it isn't the thing blocking launch day.

### 1.2 🔴 Link a bank account + payment method

- Etsy Payments needs a **bank account** for payouts and a **card on file** for
  listing/processing fees ($0.20 per listing + transaction fees).
- Appears during shop onboarding.
- Why human: only a legal person can be the payee.

### 1.3 🔴 Acknowledge the tax situation (don't solve it yet)

- Etsy income is reportable; in the US Etsy issues a **1099-K**.
- **Link (US):** https://www.etsy.com/legal/policy/taxes/
- **How to apply:** you don't need an accountant today — just keep records. The
  agent can later export sales summaries at tax time.

---

## Priority 2 — Stand Up the Tech Foundation (mix, ~45 min of _your_ time)

Bootstrap the accounts/keys, then hand the keyboard to the agent.

### 2.1 🟡 Register an Etsy app to get an API key

- Register an app to get a **keystring** (API key) and set an OAuth **redirect
  URI**. This is what `etsyctl` (IMP-003, Phase 2) will use.
- **Links:** https://www.etsy.com/developers/your-apps →
  https://developers.etsy.com/documentation/essentials/authentication
- ⚠️ **Write access (listing creation) needs Etsy approval** — request it now;
  it can take days (IMP-003, finding 10–11).
- Why human-now: app registration is tied to your account identity.

### 2.2 🔴 Do the first OAuth authorization

- Etsy OAuth 2.0 + PKCE needs **you to click "Allow" in a browser** once; tokens
  refresh programmatically afterward.
- **How to apply:** the agent builds the OAuth helper and gives you one URL to
  visit; you paste the returned code back. ~5 minutes.

### 2.3 🟡 Get an Anthropic API key (to run the agents)

- The daily agent loop (IMP-003) runs on Claude.
- **Link:** https://console.anthropic.com/ → API Keys
- Why human-now: account + billing setup.
- _Optional, later:_ Gemini API key (free tier) for the research scout, and a
  Firecrawl key if not already provided — both can wait.

### 2.4 🟢 (Optional) Listing-mockup image source

- The **products are PDFs**, so no AI image generator is required to ship. You
  _do_ need hero/preview **mockups** (the printable shown on a clipboard/in a
  binder — IMP-002 Listing Optimization).
- 🟢 The agent can render these mockups from the PDFs (or use a free mockup
  template). **Only fund a paid image tool if you later want fancier mockups** —
  not an MVP blocker. If you do, pick one with clear commercial licensing.

### 2.5 🟢 Create the `.env` file

- No `.env` exists in the repo yet. It needs roughly:
  ```
  ETSY_API_KEY=
  ETSY_OAUTH_REDIRECT_URI=
  ETSY_ACCESS_TOKEN=     # filled by the OAuth helper (2.2)
  ETSY_REFRESH_TOKEN=    # filled by the OAuth helper (2.2)
  ANTHROPIC_API_KEY=
  ```
- 🟢 **The agent creates `.env.example` + the OAuth helper.** Your only job is to
  paste the secret values from 2.1–2.3.
- ⚠️ Confirm `.env` is git-ignored before adding real keys. IMP-003 is explicit:
  **never commit credentials, tokens, or recovery codes** — store secrets in the
  `.env` (outside git) or macOS Keychain.

---

## Priority 3 — Validate Before You Scale (your judgment, agent does the work)

This is IMP-001's success gate and IMP-003's "supervised" autonomy tier — your
review establishes the quality bar before any automation runs unsupervised.

### 3.1 🟢→🔴 Review the first generated PDF product

- 🟢 Agent produces the first product — the **~10–14 page Hospital-to-Home
  Discharge Kit** (IMP-006 spec: discharge-day snapshot, care-team
  instructions, medication-change log, first-week home notes, follow-up
  tracker, home readiness, and family task ownership) as a print-ready,
  US-Letter/A4 PDF that reads cleanly in black & white, with the disclaimer.
- 🔴 **You check it.** Is it genuinely useful and good enough to sell? Your taste
  sets the standard before any second product.

### 3.2 🟢→🔴 Approve & publish the first listing end-to-end

- 🟢 Agent drafts the title, keyword-rich description, all 13 tags, FAQ, and
  mockups (IMP-002 Listing Optimization) and stages it via `etsyctl`.
- 🔴 **You approve and click Publish** for the very first listing (IMP-001
  success criterion: one product live and selling).
- After a few approved listings, the listing-edit action class can graduate to
  shadow/autonomous per IMP-003's graduated-autonomy model — you move from
  approving every change to auditing a sample.

---

## Priority 4 — Hand Off & Supervise (steady state, minutes/day)

### 4.1 🔴 Approve scaling decisions

- New niches, new product types, secondary storefronts (Gumroad), ads — strategic
  and money decisions stay with you (IMP-003 Tier 2).

### 4.2 🔴 Watch account health & the money/legal line

- Periodically confirm the shop is in good standing. Per IMP-003, **agents never
  touch** refunds, payouts, tax, ads spend, account/2FA/OAuth, customer-specific
  replies, or anything readable as medical/legal advice.

### 4.3 🟢 Everything else → agents

- Daily research, listing copy/SEO, PDF production, mockups, catalog management,
  metrics monitoring, buyer-feedback mining (IMP-003 four daily loops).

---

## The One-Screen Summary

| #   | Task                                               | Tag | Your time        |
| --- | -------------------------------------------------- | --- | ---------------- |
| 0.1 | Pick shop name (+ backups)                         | 🔴  | 10 min           |
| 0.2 | Confirm disclosure/claims posture                  | 🔴  | 10 min           |
| 1.1 | Create Etsy seller account & shop                  | 🔴  | 20 min + ID wait |
| 1.2 | Link bank + payment method                         | 🔴  | 15 min           |
| 1.3 | Acknowledge taxes, keep records                    | 🔴  | 5 min            |
| 2.1 | Register Etsy app → API key (request write access) | 🟡  | 20 min           |
| 2.2 | First OAuth authorization                          | 🔴  | 5 min            |
| 2.3 | Get Anthropic API key                              | 🟡  | 10 min           |
| 2.4 | (Optional) mockup image source                     | 🟢  | 0 — agent        |
| 2.5 | Paste secrets into `.env`                          | 🟢  | 5 min            |
| 3.1 | Review first PDF kit (10–14 pages)                 | 🔴  | 10 min           |
| 3.2 | Approve + publish first listing                    | 🔴  | 15 min           |

**Active human time to MVP: ~2 hrs**, plus async waits for ID verification and
Etsy API write-access approval (start both early).

---

## What to Tell the Agent (your first delegation)

Once Priority 0–1 are done, you can hand the agent the rest:

> "Create `docs/decisions/brand.md` from my choices, scaffold `.env.example` and
> the Etsy OAuth helper script, then produce the 10–14 page Family Caregiver
> Discharge Kit from the IMP-006 MVP spec as a print-ready PDF with the disclaimer,
> plus a draft Etsy listing (title, 13 tags, description, FAQ, mockups) staged in
> `marketplaces/etsy/drafts/` for me to review."

That kicks off the 🟢 work while you handle the 🔴 gates (Etsy account, bank,
OAuth) in parallel.

---

## How This Gets More Agentic Over Time

Today's 🔴 gates are mostly **trust and identity** problems, not capability
problems. As the ecosystem matures:

- **OAuth / account setup** → agent-driven once Etsy offers delegated agent auth.
- **Listing review** → once the agent has a track record you trust, you move from
  "approve every listing" to "audit a random sample" (IMP-003 graduated
  autonomy).
- **Stays human longest:** legal identity, bank ownership, brand strategy,
  pricing changes outside the set band, and final accountability for medical/
  legal-adjacent claims. Plan to keep those.

---

_Owner's runbook. Do the red items; delegate the rest._
