---
owner: bestrobot
tracking: IMP-003
status: proposal
created: 2026-05-30
source: IMP-001, IMP-002, local agent CLI audit, May 2026 marketplace/agent research; 2026-05-30 refinement adds OpenClaw orchestration, MCP tooling, agentic-commerce/GEO, and los-cobanos SEO prior art
---

# IMP-003: Productionizing Agent Employment for Daily Sales Operations

## Abstract

Build a small, daily agent workforce around the caregiver digital product
business. The goal is **full autonomy for reversible actions, earned**: agents
wake up, collect marketplace evidence, decide one change, and either publish it
themselves (once that action class has earned the right) or leave a concise
approval packet for the human. Autonomy is granted per action class by
reversibility and track record, not all at once.

The highest-probability path is a Mac Mini scheduled workflow using local agent
CLIs, repo-owned skills, marketplace APIs, an automated safety gate with
rollback and a kill switch, and **hard human gates only for the irreversible**:
spend/ads, refunds, account, payout, tax, and policy-sensitive claims.

As of 2026-05-30, the best stack is:

1. **Claude Code CLI** for primary daily agent work because it already supports
   scheduled tasks, routines, hooks, skills, MCP, parallel agents, and `claude
-p` scripting.
2. **Codex CLI** as the second agent and code/review fallback because `codex
exec` is built for scripts, CI, JSON output, skills, subagents, GitHub
   Actions, and `/goal` can track long-running durable objectives when enabled.
3. **Gemini CLI** for cheap/current web research and second opinions because it
   has Google Search grounding, MCP, non-interactive mode, JSON/stream JSON
   output, and a generous local-auth free tier.
4. **Etsy Open API + custom thin CLI** for draft listings and shop data.
5. **Gumroad CLI/API** as the easiest secondary storefront automation once the
   Etsy offer proves itself.

## Scope

In scope:

- Research the May 2026 agent and marketplace automation surface.
- Rank tools by likelihood of producing daily sales improvement with low
  maintenance.
- Define a Mac Mini production loop agents can run daily.
- Define agent skills worth building for this repo.
- **Fully autonomous publishing of reversible actions** — listing edits,
  publish/renew, and marketing posts to Etsy, Gumroad, Pinterest, and Bluesky —
  under a graduated-autonomy model: agents earn auto-publish rights per action
  class after a supervised track record, behind an automated safety gate, with
  rollback, audit, and a kill switch (see Autonomy Tiers).
- Separate reversible auto-eligible actions from irreversible human-only
  actions (money, account, tax, legal/medical claims).

Out of scope:

- Autonomous actions that move money or are irreversible: ads/promoted spend,
  refunds, payouts, tax, account/2FA/OAuth/policy changes.
- Autonomous customer-specific replies or buyer-data handling.
- Browser scraping that violates marketplace terms.
- Replacing the core IMP-001 sales gate: first prove one Etsy product before
  granting any auto-publish rights.

## Findings

1. **The Mac Mini is enough for the first production system.** This business
   does not need a cloud agent platform yet. Daily jobs can run via `launchd`,
   local CLIs, checked-in prompts, local JSON state, and git diffs.

2. **Claude Code is the best first "employee."** Claude Code documentation now
   describes terminal, desktop, web, background agents, recurring tasks, MCP,
   hooks, skills, parallel agents, and `claude -p` scripting. That maps directly
   to daily product ops.

3. **Codex is the best second "employee."** `codex exec` is explicitly intended
   for scripts, CI, scheduled jobs, JSONL event output, and pre-set sandbox
   settings. It is ideal for structured repo edits, review, and deterministic
   approval packets.

4. **Codex `/goal` is relevant to this project.** Official Codex docs describe
   `/goal` as a CLI slash command for long-running work with a durable objective
   and verifiable stopping condition. It supports `/goal <objective>`, `/goal`
   to inspect, plus `/goal pause`, `/goal resume`, and `/goal clear`.

5. **`/goal` should be used for bounded production runs, not the daily scout.**
   Good uses here: "finish the Etsy draft automation phase until dry-run
   validation passes" or "iterate listing image generation until the render
   checklist passes." Bad uses: open-ended daily sales growth, broad backlog
   grooming, or marketplace actions requiring human approval.

6. **Local Codex needs a feature check before relying on `/goal`.** The local
   audit found `codex-cli 0.125.0`, while npm reported `@openai/codex 0.135.0`.
   The local `codex features list` output did not show `goals`; the docs say to
   enable `[features] goals = true` or run `codex features enable goals` if
   `/goal` is missing from the slash command list.

7. **Gemini CLI should be the research scout.** Gemini CLI has non-interactive
   mode, Google Search grounding, web fetch/search, shell/file tools, MCP, and
   JSON outputs. It is less likely to be the final editor but highly useful for
   daily market/current-info checks.

8. **OpenAI Agents SDK and Google ADK are production runtimes, not day-one
   needs.** They are strong when a workflow becomes stable and needs monitoring,
   traces, deployment, routing, or external customers. For the next 30 days,
   local CLI agents plus scripts are faster and cheaper.

9. **Anthropic Managed Agents and Claude Cowork are promising but should not be
   the first dependency.** Managed Agents are built for long-horizon hosted work;
   Cowork supports desktop knowledge work and scheduled tasks. Use them after
   the local daily loop proves which tasks repeat.

10. **There is no reliable first-party Etsy seller CLI in the research pass.**
    Etsy's official path is the Open API v3, not a CLI. The official Etsy Dev MCP
    server teaches agents the API spec but does not call Etsy directly. A small
    project-owned `etsyctl` wrapper is the safest production path.

11. **Etsy API coverage is enough for full listing automation.** The API
    supports listing lifecycle, `createDraftListing`, listing image upload,
    digital file upload via `uploadListingFile`, setting `type=download`, and
    `updateListing`/publish state — and an `updateListing` can revert a change,
    which is what makes listing edits a reversible (Tier-1) auto-eligible class.
    Publish is supervised first, then graduates (findings 28–29).

12. **Gumroad has the best CLI story for a second storefront.** Gumroad's API
    page documents a command-line tool, OAuth scopes, products, sales, payouts,
    subscribers, offer codes, and product edits. This is the easiest API/CLI
    channel after Etsy validation.

13. **Shopify is powerful but premature.** Shopify CLI and Admin GraphQL can
    automate products and bulk operations, but Shopify adds store operations,
    app/theme complexity, and traffic burden. It should wait until Etsy/Gumroad
    prove demand.

14. **Pinterest is a research and distribution loop, not the first checkout.**
    Pinterest API supports analytics, audience insights, trends, and pins, but
    business account/access-tier setup makes it a secondary daily loop after the
    Etsy listing exists.

15. **Agent skills are the leverage point.** Skills let agents load procedure,
    scripts, and references only when needed. This repo should package the
    repeatable seller workflows as skills before writing a large app.

16. **Marketplace writes start two-step, then graduate.** Every action class
    begins supervised — agents create diffs, draft payloads, and proposed pin
    batches for approval. Reversible classes then earn autonomous publishing
    (findings 28–29). Money/account/tax/refund/sensitive-reply actions never
    graduate and stay human-only (Tier 2).

17. **We should not hand-build the scheduler, state store, or delivery layer.**
    A local OpenClaw install (`OpenClaw 2026.5.12`, 53 skills) already provides
    the exact production scaffolding this IMP proposed to write from scratch:
    precise **cron jobs**, context-aware **heartbeat** polling, **standing
    orders** (instructions injected into every session — a natural home for the
    approval-gate rules), lifecycle **hooks**, durable **TaskFlow**
    orchestration (a native equivalent of Codex `/goal`), a **background task
    ledger** with audit, **Gmail pub/sub** ingestion, and **multi-channel
    delivery** (Telegram/WhatsApp/Slack/iMessage). The agent CLIs (Claude Code,
    Codex, Gemini) remain the _workers_; OpenClaw becomes the _orchestration,
    delivery, and approval_ layer. This collapses Phase 1 from "write launchd +
    JSON state + git plumbing" to "register a few jobs."

18. **The human approval gate should be a chat conversation, not a file.** The
    daily approval packet (Decision, finding 16) lands far better as a message
    to Telegram/WhatsApp where the human can reply "approve listing 2, skip 3"
    than as a markdown file nobody opens. OpenClaw's channel delivery plus a
    standing order ("never publish/charge/refund without an explicit human
    reply") turns the gate into an interactive, auditable loop. The dated report
    file stays as the durable record; the chat is the live decision surface.

19. **The agent already holds powerful tools beyond the CLIs.** This very
    environment exposes MCP servers for **Gmail** (draft/label/search),
    **Google Calendar** (schedule/list), **Google Drive** (deliver the editable
    Sheet/PDF), **Firecrawl** (search + scrape + structured JSON extraction —
    stronger than raw WebFetch for competitor/review mining), **Playwright**
    (drive marketplace UIs that lack an API), **Telegram** (notify/approve), and
    **context7** (fetch current API/CLI docs on demand). The daily loops should
    be built on these _first_ before writing new integrations.

20. **Agentic commerce is now a distribution channel, not a thought
    experiment.** As of 2026, the **Agentic Commerce Protocol (ACP)** by OpenAI
    - Stripe powers Instant Checkout inside ChatGPT (live since Sept 2025), and
      Google's **Universal Commerce Protocol (UCP)** plus **AP2 (Agent Payments
      Protocol)** target Search AI Mode and Gemini. Buyers increasingly ask an
      assistant "find me a caregiver coordination kit" and buy without visiting a
      storefront. Etsy is a participating surface, so the near-term lever is
      _machine-readable, well-structured listings_ (clear title, attributes,
      price, digital-delivery terms) so our product is eligible to be surfaced and
      transacted by agents. Building our own ACP endpoint is a Gumroad/Shopify-era
      concern, not day one.

21. **GEO/AEO is the new SEO and it is cheap to start.** Generative Engine
    Optimization (getting cited by ChatGPT, Perplexity, Gemini, Google AI
    Overviews, and Claude) rewards: semantically rich content that fully covers
    the buyer's problem, structured data, third-party reviews, freshness, and
    — critically — presence on **Reddit, YouTube, and Wikipedia**, which LLMs
    quote heavily. IMP-002's evidence base (clinical-gap, sibling-equity,
    care-penalty research) is exactly the kind of authoritative, citable content
    GEO favors. A small daily loop can publish that material where models read
    it and track whether our product/brand gets named.

22. **An owned email list is the highest-leverage marketing and feedback asset
    we do not yet have.** Marketplaces own the customer; an email list is ours.
    Creator-grade tools with clean REST APIs make this automatable: **Buttondown**
    (markdown-native, RSS-to-email, Stripe paid tier, pleasant API), **Kit**
    (formerly ConvertKit, automation-first), and **Resend** (newsletter-as-code).
    `himalaya` is a local IMAP/SMTP CLI for terminal email ops. Email doubles as
    the **feedback channel**: a one-question reply ("what almost stopped you from
    buying?") feeds the daily analyst better than any keyword tool.

23. **Social distribution should be community-first and cheap.** **Pinterest**
    (already ranked) remains the best fit for caregiver/planner discovery.
    **Bluesky** has a free, simple posting API (good for low-stakes build-in-
    public and evergreen tips). **Reddit** has the richest caregiver communities
    but aggressive anti-promotion defenses and costly commercial API access — so
    Reddit is _listen and participate_, never auto-post. Agents draft; the human
    posts anything promotional.

24. **Etsy SEO data has API-backed third-party sources for the research scout.**
    `eRank` (best free tier, strong competitor research), `EverBee`, `Marmalead`
    (keyword "engagement" scoring, trend forecasting, and notably the first tool
    optimizing for ChatGPT Shopping), and `Sale Samurai` all sit on Etsy API
    data. The scout can use one as a daily keyword/trend feed rather than
    re-deriving search demand from scratch.

25. **Feedback is a first-class daily loop, not an afterthought.** Buyer signal
    arrives across Etsy reviews/messages, email replies, Gumroad comments, and
    Pinterest/Bluesky engagement. A `feedback-miner` that aggregates these into
    one ranked "what buyers actually said" digest closes the loop: research →
    product → listing → sale → feedback → next change. Without it, the daily
    analyst optimizes on agent taste (the exact failure mode Phase 3's success
    gate warns against).

26. **Cron should be reserved for cheap polls; expensive agent runs should be
    few and bounded.** Heartbeat/cheap checks (inbox, new review, metric delta)
    can run often; full multi-agent worker runs (research → analyst → producer →
    reviewer) should run once or twice daily and stop. Prompt-cache economics and
    rate limits both favor batching over frequent wake-ups.

27. **We already have a proven, agent-built SEO/GEO playbook to copy:
    `los-cobanos.com`.** The internal `cobanos-tours` project
    (`~/.openclaw/workspace/projects/cobanos-tours`) is a working static
    marketing site built and maintained by agents, and it encodes the exact
    pattern this product line needs for owned discovery:
    - **Topic-cluster landing pages** mapped to real buyer intent, cross-linked
      for internal SEO (`snorkeling`, `whale-watching`, `reef-guide`,
      `day-trip`, plus a Spanish `es/` mirror).
    - **Rich JSON-LD structured data** (`TouristAttraction`, `LocalBusiness`,
      `TouristTrip`, `Offer`, `ItemList`, `Person`, `ContactPoint`, FAQ,
      `aggregateRating`) — the precise machine-readability that GEO/AEO and
      agentic shopping reward (findings 20–21).
    - **Entity pages** (`los-cobanos`, `punta-mango`, `victor-los-cobanos`) — a
      knowledge-graph approach that helps LLMs name the right entity.
    - **Zero-account distribution plumbing**: checked-in `sitemap.xml`,
      `robots.txt`, Google Search Console verification file, and an **IndexNow**
      key with `npm run submit:indexnow` to push changed URLs to Bing/Yandex
      without opening accounts.
    - **An SEO/content test harness** (`npm run check`, `check:production`) plus
      Playwright e2e smoke tests, and a `docs/promotion-playbook.md` with a
      conservative priority stack (Business Profile → Search Console →
      directory/registry listings → a few high-quality community posts).
    - **Ralph-loop automation** (`.ralph`) and repo-owned `.agents/skills`.

    The caregiver line should fork this pattern rather than reinvent it: a small
    static `los-cobanos`-style content site is the owned GEO surface that feeds
    ChatGPT/Gemini/Google AI citations and links to the Etsy/Gumroad listings,
    and the `npm run check` + IndexNow + structured-data approach becomes a
    reusable `geo-content-site` skill.

28. **Full autonomy is the goal for reversible actions, earned per action class.**
    The objective is agents that publish without waiting on a human — but trust
    is granted by reversibility and by track record, not all at once. The gating
    test is one question: _can this be undone in minutes with no money moved and
    no legal exposure?_
    - **Reversible** (listing title/tag/description/image edits, publish/renew,
      price changes within a pre-approved band, Pinterest/Bluesky posts, GEO
      content-site deploys) → **auto-publish eligible** once the action class has
      passed a supervised run.
    - **Irreversible or money/legal** (ad spend, refunds, payouts, tax, account/
      2FA/OAuth/policy, customer-specific replies, any medical/legal/financial
      claim) → **always human**, regardless of track record.

    The mechanism that makes this safe is not a human in the loop on every
    action; it is: (a) an automated **`marketplace-safety-reviewer`** that must
    pass before any auto-publish, (b) **rollback** — every autonomous change
    records the prior state so it can be reverted in one command, (c) a full
    **audit ledger** (OpenClaw `tasks`), (d) a **kill switch** (one flag/standing
    order that drops every loop back to draft-only), and (e) **bounded blast
    radius** — caps like "≤N autonomous listing edits/day," "price only within
    ±X% of a human-set floor/ceiling," and "new action classes start supervised."

29. **Autonomy is earned by graduating, not declared.** Each action class moves
    through three states: **supervised** (agent drafts, human approves N times)
    → **shadow** (agent would auto-publish; human still confirms but only to
    catch regressions) → **autonomous** (agent publishes, safety gate + rollback
    - caps only). A class auto-demotes to supervised on a safety-reviewer block,
      a reverted change, or a metric regression past threshold. This is the path
      that satisfies IMP-001's "prove one Etsy product first": the first product
      is published supervised; autonomy is granted afterward.

## Decision

Create a daily "Agent Employment System" with a graduated-autonomy promotion
path:

1. **Local daily ops first.** A scheduled orchestrator (OpenClaw cron, finding 17) runs every morning and writes a dated report plus a Telegram packet.
2. **Graduated marketplace autonomy.** Agents start draft-only, then earn
   auto-publish rights per reversible action class (listing edits, publish/
   renew, in-band price, marketing posts) by graduating supervised → shadow →
   autonomous. Every autonomous action passes the automated safety reviewer and
   records rollback state. Irreversible/money/legal actions stay human-only.
3. **Skills before apps.** Build repo-owned skills and small CLIs before using
   managed agent platforms.
4. **Measure before expanding.** Do not add Shopify, ads, or B2B outbound until
   the Etsy listing has real visits, favorites, messages, or sales — and do not
   grant any action class autonomy until it has a clean supervised track record.

## Ranked Tooling Bets

| Rank | Tool                         | Likelihood          | Use Now          | Why                                                                                                                                                                                                                     |
| ---- | ---------------------------- | ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Claude Code CLI              | Very high           | Yes              | Best coverage for scheduled local work, skills, hooks, MCP, parallel work, and file edits. Installed locally as `2.1.158`.                                                                                              |
| 2    | Codex CLI                    | Very high           | Yes              | Strong scripted automation via `codex exec`, JSON output, skills, subagents, GitHub Action, and `/goal` for bounded long-running objectives. Installed locally as `0.125.0`; latest observed npm package was `0.135.0`. |
| 3    | Etsy Open API + `etsyctl`    | High                | Yes              | Official API can create draft listings, upload files/images, and read shop/order data. Build our own thin CLI.                                                                                                          |
| 4    | Gemini CLI                   | High                | Yes              | Best low-friction current-info scout with Search grounding and JSON output. Installed locally as `0.26.0`.                                                                                                              |
| 5    | Gumroad CLI/API              | Medium-high         | Soon             | Strong official CLI/API surface; useful as a mirrored sales page after Etsy proof. Not installed locally yet.                                                                                                           |
| 6    | Pinterest API                | Medium              | Later            | Useful for daily trend/audience/pin reporting after the listing is live. Requires business/API setup.                                                                                                                   |
| 7    | OpenAI Agents SDK            | Medium              | Later            | Good for stable production agent workflows with tracing/evals, but slower than CLI jobs for this stage.                                                                                                                 |
| 8    | Google ADK                   | Medium              | Later            | Strong multi-agent production framework and deployment paths; overkill until workflows stabilize.                                                                                                                       |
| 9    | Claude Managed Agents/Cowork | Medium              | Later            | Excellent for hosted long-horizon or desktop knowledge work; test after local loop has clear ROI.                                                                                                                       |
| 10   | Shopify CLI/Admin API        | Low-now, high-later | Defer            | Excellent automation, but storefront/traffic complexity conflicts with the Etsy-first gate.                                                                                                                             |
| 11   | eBay Inventory API           | Low                 | Defer            | Strong API, wrong marketplace for caregiver PDFs and digital planner positioning.                                                                                                                                       |
| 12   | Third-party Etsy CLIs        | Low                 | Avoid dependency | Useful for reference only; do not put production shop control on unowned wrappers.                                                                                                                                      |

## Daily Agent Operating Model

Morning job, 6:30 AM Pacific:

1. Pull latest repo state and snapshot current worktree status.
2. Run marketplace scout:
   - Etsy keyword/review research for selected queries.
   - Pinterest trend/audience check when enabled.
   - Gumroad comparable scan when enabled.
3. Run product/listing analyst:
   - Compare yesterday's listing metrics against the success gate.
   - Identify one likely title, tag, image, price, FAQ, or product-content
     improvement.
4. Run production agent:
   - Generate proposed asset/content/listing diffs.
   - Build or render changed artifacts when scripts exist.
   - Run `npm run quality` when code/site files change.
5. Run reviewer agent:
   - Check claims, disclaimers, readability, support burden, and policy risk.
6. Write `docs/research/daily/YYYY-MM-DD-agent-report.md`.
7. Execute and report, split by autonomy state:
   - **Auto-published** (graduated classes): what changed, why, rollback handle,
     and the safety-reviewer verdict — informational, no approval needed.
   - **Awaiting approval** (supervised/shadow classes): the Telegram packet —
     what changed, expected sales impact, exact files, the one-tap approve/skip.

Use Codex `/goal` or OpenClaw TaskFlow for bounded follow-through runs spawned
from the daily report, for example:

```text
/goal Complete Phase 2 Etsy automation without stopping until scripts/etsyctl can generate, validate, and (for graduated action classes) publish one listing edit with recorded rollback state. Stay within the autonomy caps; never call money/account/tax/refund endpoints.
```

Evening job, 7:30 PM Pacific:

- Summarize sales/views/favorites/messages if credentials are available.
- Do not edit files unless there is a clear urgent correction.

## The Four Daily Loops (Sell · Market · Research · Feedback)

The business needs four small, repeatable loops, each cron-scheduled. Each loop
runs at the autonomy state its action class has earned (Autonomy Tiers): a class
still supervised ends in a draft + Telegram approval ask; a graduated class
publishes through the safety gate with rollback. Keep loops separate so one
failing loop never blocks the others.

| Loop         | Daily cadence            | Primary tools (in hand → later)                                                        | Output                                                                  | Autonomy state                                                  |
| ------------ | ------------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Research** | AM cheap poll + 1 deep   | Firecrawl (search/scrape/JSON), Gemini grounding, eRank/EverBee feed, context7         | Ranked keyword/competitor/review findings with source URLs + timestamps | Autonomous (read-only)                                          |
| **Sell**     | AM, after research       | `etsyctl` (Etsy API), Gumroad CLI (later), Drive (deliver files)                       | Listing/tag/FAQ/image edits, publish/renew, in-band price               | Per class: supervised → shadow → autonomous; payout/tax human   |
| **Market**   | AM draft, PM stage       | `geo-content-site` (los-cobanos pattern), IndexNow, Buttondown/Kit, Pinterest, Bluesky | Newsletter, pins, GEO page edits, structured-data updates               | Pins/Bluesky/GEO deploys auto once graduated; email + ads human |
| **Feedback** | PM, plus inbox heartbeat | Gmail MCP, Etsy/Gumroad messages, review scrape, Telegram                              | One ranked "what buyers actually said" digest → backlog items           | Autonomous (read-only); customer replies + refunds human        |

Loop interplay: **Research feeds Sell and Market; Feedback re-prioritizes all
three.** The daily analyst (IMP gate: one ranked recommendation, not a wishlist)
chooses the single highest-leverage change across loops and the producer
executes only that — auto-publishing if the class has graduated, else drafting
for approval.

## Orchestration & Approval Layer (use OpenClaw, don't rebuild it)

`OpenClaw 2026.5.12` is installed locally with 53 skills and supplies the
scaffolding Phase 1 originally proposed to hand-build:

| Need                        | OpenClaw mechanism     | Use here                                                      |
| --------------------------- | ---------------------- | ------------------------------------------------------------- |
| Exact-time daily jobs       | Scheduled Tasks (cron) | The four loops + AM/PM orchestrator runs                      |
| Cheap context-aware polling | Heartbeat              | Inbox/new-review/metric-delta checks                          |
| Always-on guardrails        | Standing Orders        | Inject the Human Approval Gates into every agent session      |
| Durable bounded objectives  | TaskFlow               | Native equivalent of Codex `/goal` for Phase-2 follow-through |
| Detached-run audit ledger   | Background Tasks       | `openclaw tasks list` / `audit` for every worker run          |
| Event-driven actions        | Hooks                  | Fire checks on session reset / tool calls                     |
| Approval as a conversation  | Multi-channel delivery | Send the approval packet to Telegram; human replies to act    |
| Inbound mail trigger        | Gmail pub/sub          | Wake the Feedback loop on a new buyer message                 |

The agent CLIs (Claude Code, Codex, Gemini) stay the _workers_. Codex `/goal`
and OpenClaw TaskFlow are interchangeable for bounded runs — pick one per task,
do not nest them. Mirror the local OpenClaw skill format (`himalaya`,
`taskflow`) when authoring this repo's skills so they are portable.

## Tooling Already In Hand (MCP)

Build the loops on capabilities the agent runtime already exposes before
writing new integrations:

- **Firecrawl** — search, scrape, and structured-JSON extraction for the
  Research and Feedback loops (preferred over raw fetch for competitor/review
  mining).
- **Gmail** — draft/label/search for newsletter drafts and feedback intake.
- **Google Calendar** — schedule the human's approval/review windows.
- **Google Drive** — deliver the editable Sheet / PDF kit to buyers.
- **Playwright** — drive marketplace or analytics UIs that lack an API (read
  and screenshot only; no unattended writes).
- **Telegram** — deliver approval packets and receive approve/skip replies.
- **context7** — pull current Etsy/Gumroad/Pinterest/Buttondown API + CLI docs
  on demand instead of relying on stale memory.

## Skills To Build

1. **`etsy-seller-ops`**
   - Uses Etsy Open API docs/MCP.
   - Creates local draft payloads for listings, images, digital files, tags, and
     descriptions.
   - Blocks publish/account/refund actions by default.

2. **`marketplace-review-miner`**
   - Mines Etsy competitor titles, screenshots, review complaints, prices,
     formats, and promise language.
   - Emits structured findings with source URLs and timestamps.

3. **`caregiver-product-factory`**
   - Turns validated buyer pain into PDF pages, sheet tabs, listing images,
     support snippets, and disclaimers.
   - Keeps claims neutral: organizer, not medical/legal/financial advice.

4. **`daily-sales-analyst`**
   - Reads Etsy/Gumroad/Pinterest metrics exports or API data.
   - Produces one ranked recommendation per day, not a list of speculative
     rewrites.

5. **`marketplace-safety-reviewer`**
   - Checks Etsy/Gumroad policy risk, health claims, privacy issues, support
     burden, file-size limits, and buyer confusion before public changes.

6. **`mac-mini-agent-ops`**
   - Owns scheduling (prefer OpenClaw cron/heartbeat over raw `launchd`), log
     rotation, secrets checks, rate-limit handling, and "do not loop on
     failures" behavior.

7. **`geo-content-site`** (forked from the `los-cobanos` pattern)
   - Generates/maintains a small static GEO/AEO content surface: topic-cluster
     pages on buyer-intent caregiver queries, JSON-LD structured data, FAQ
     schema, entity pages, `sitemap.xml`/`robots.txt`, an SEO test harness
     (`npm run check`), and IndexNow submission.
   - Links the content surface to the live Etsy/Gumroad listings; never invents
     medical/legal/financial claims.

8. **`newsletter-ops`**
   - Drafts the owned-audience email via Buttondown/Kit/Resend API or `himalaya`
     CLI; turns IMP-002 research into citable, value-first issues.
   - Drafts only — human sends. Includes a one-question feedback prompt to feed
     the Feedback loop.

9. **`social-distributor`**
   - Drafts Pinterest pin batches and Bluesky posts from approved content.
   - Reddit is listen-and-summarize only (no auto-post); flags promotable
     threads for the human.

10. **`feedback-miner`**
    - Aggregates Etsy/Gumroad reviews and messages, Gmail replies, and social
      engagement into one ranked digest of real buyer language and objections.
    - Emits backlog items with source + timestamp; never auto-replies to buyers.

11. **`agentic-commerce-readiness`**
    - Audits each listing for machine-readability against ACP/UCP expectations
      (clear title, attributes, price, digital-delivery terms, structured data)
      so the product is eligible to be surfaced and transacted by AI shopping
      agents. Reports gaps; does not change live listings.

## Proposed Repo Additions

Keep this small:

```text
.agents/skills/
scripts/agent-daily/
scripts/etsyctl/
docs/research/daily/
marketplaces/etsy/drafts/
marketplaces/gumroad/drafts/
```

Do not store credentials, cookies, payout, tax, 2FA, recovery codes, or OAuth
tokens in the repo. Store secrets in macOS Keychain, 1Password CLI, environment
files outside the repo, or the scheduler's private environment.

## Autonomy Tiers

Actions are sorted by reversibility, not by how impressive autonomy would look.
Each action class is promoted independently (supervised → shadow → autonomous,
finding 29). Tier 2 is never automated.

**Tier 0 — Autonomous always (read-only / local):**

- Read public marketplace pages and official APIs.
- Mine reviews/competitors; summarize metrics; recommend one change.
- Draft local product files, payloads, images, and support snippets.
- Open local PRs / leave git diffs.

\*\*Tier 1 — Autonomous once graduated (reversible writes, behind the safety gate

- rollback + caps):\*\*

* Publish/renew marketplace listings; edit title, tags, description, images.
* Price changes **within a human-set band** (±X% of a floor/ceiling).
* Pinterest and Bluesky posts from approved content.
* GEO content-site page edits and deploys (revertable via git + redeploy).
* Each requires: `marketplace-safety-reviewer` pass, recorded prior state for
  one-command rollback, audit ledger entry, and per-day volume caps.

**Tier 2 — Human only (irreversible, money, legal, or identity):**

- Ads, promoted listings, affiliate settings, or any spend.
- Refunds, disputes, customer-specific replies, or buyer-data handling.
- Account, payout, tax, 2FA, API app, OAuth scope, and shop-policy changes.
- Price changes outside the approved band.
- Any claim that could be read as medical, legal, financial, or clinical advice.

**Global kill switch:** a single standing-order flag drops every loop back to
Tier-0 draft-only. Trip it on any safety-reviewer block streak, an unexpected
rollback, a metric regression past threshold, or manually.

## Implementation Plan

### Phase 1: One-Week Local Loop

1. [ ] Create `docs/research/daily/`.
2. [ ] Add one prompt file for daily Etsy research.
3. [ ] Add one shell script that runs `gemini -p`, `codex exec`, or `claude -p`
       and writes a dated report.
4. [ ] Update or verify Codex `/goal` support; if missing, update Codex and
       run `codex features enable goals`.
5. [ ] Add a `launchd` plist outside the repo for the Mac Mini.
6. [ ] Run for seven days with no marketplace writes.

Success gate:

- Seven daily reports exist.
- At least three reports contain actionable Etsy listing/product findings.
- No credential leakage or unapproved public changes.

### Phase 2: Draft Automation

1. [ ] Build `scripts/etsyctl` around official Etsy API calls.
2. [ ] Support auth check, shop read, draft listing JSON generation, image
       upload, file upload, and dry-run validation.
3. [ ] Create `etsy-seller-ops` and `marketplace-safety-reviewer` skills.
4. [ ] Generate draft listing update packets, deliver to Telegram for approval.

Success gate:

- One complete listing draft can be generated from repo files.
- Safety reviewer catches missing disclaimer, risky claim, or missing image.

### Phase 2.5: Graduated Autonomy

1. [ ] Add to `etsyctl` (and each writer): a `--rollback-capture` that records
       prior state before any write, and an `etsyctl rollback <id>` command.
2. [ ] Add an autonomy registry: per action class, its state (supervised /
       shadow / autonomous), caps, and price band. Encode the kill switch as an
       OpenClaw standing order.
3. [ ] Require the `marketplace-safety-reviewer` to pass before any Tier-1
       write; log every write + verdict + rollback handle to the task ledger.
4. [ ] Graduate the first action class (listing tag/description edits) only
       after a clean supervised track record; start it in shadow.

Success gate:

- A graduated action class auto-publishes a reversible change through the safety
  gate, the change is visible live, and `etsyctl rollback` cleanly reverts it.
- A seeded bad change (risky claim / missing disclaimer) is blocked by the
  safety reviewer and never publishes.
- Tripping the kill switch returns all loops to draft-only within one run.

### Phase 3: Metrics and Secondary Storefront

1. [ ] Add Etsy metrics import if available through API/export.
2. [ ] Install and test Gumroad CLI.
3. [ ] Mirror the winning product to Gumroad only after Etsy has signal.
4. [ ] Add Pinterest API only after the core listing is live.

Success gate:

- Daily recommendations are driven by views, favorites, conversion, messages,
  and buyer language, not agent taste.

### Phase 4: Managed Agents

Move to OpenAI Agents SDK, Google ADK, Claude Agent SDK, or Managed Agents only
when:

- The same workflow has run successfully for 30 days.
- The workflow has clear inputs, outputs, approval gates, and error handling.
- Local scheduling is the bottleneck, not product-market uncertainty.

## Ranked Next Steps (2026-05-30 refinement)

Ranked by leverage per hour of setup, lowest-risk first. The first four are the
"this week" set; the rest are staged.

1. **Adopt OpenClaw as the scheduler/delivery layer (½ day).** Register the AM
   orchestrator + Research loop as OpenClaw cron jobs; encode the Human Approval
   Gates as a Standing Order; route the approval packet to Telegram. Replaces the
   launchd/JSON plumbing in Phase 1 with near-zero new code. _Unblocks
   everything else._
2. **Stand up the Research + Feedback loops on tools in hand (½ day).** Use
   Firecrawl + Gemini grounding for competitor/keyword/review mining and Gmail
   MCP for buyer-message intake. Output: dated report + ranked digest, read-only.
   Proves daily signal before any marketplace write.
3. **Fork the `los-cobanos` site into a caregiver `geo-content-site` (1 day).**
   Copy the structured-data + topic-cluster + sitemap/IndexNow + `npm run check`
   pattern; publish 3–5 buyer-intent pages that link to the (coming) Etsy
   listing. This is the owned GEO surface for ChatGPT/Gemini/Google citations.
4. **Build `etsyctl` draft-only + `agentic-commerce-readiness` audit (1–2 days,
   Phase 2).** Generate one validated dry-run listing packet from repo files;
   audit it for machine-readability. Human still publishes.
5. **Add `newsletter-ops` on Buttondown/Kit (½ day).** Start collecting an owned
   list and ship one value-first issue from IMP-002 research; embed the
   one-question feedback prompt.
6. **Verify Codex `/goal` or use OpenClaw TaskFlow for bounded runs.** Resolve
   the local-feature gap (finding 6); pick one durable-objective mechanism.
7. **Add `social-distributor` (Pinterest + Bluesky drafts).** Only after the
   listing and content site are live and there is something worth pointing at.
8. **Mirror the winner to Gumroad; add Pinterest API + Etsy metrics import
   (Phase 3).** Drive recommendations from real metrics, not agent taste.
9. **Revisit managed platforms (Phase 4).** Only after a loop has run 30 days
   with clear ROI and local scheduling is the actual bottleneck.

Reordering vs. the original plan: the GEO content site (los-cobanos fork) and
the OpenClaw orchestration layer are promoted into the first week because both
are low-risk, reuse proven internal work, and compound — the content surface
benefits from every day it is indexed, and the orchestration layer is a
prerequisite for every loop.

## Evidence Commands

Local CLI audit on 2026-05-30:

```bash
command -v claude codex gemini opencode pi gumroad shopify gh npm node
claude --version
codex --version
gemini --version
opencode --version
pi --version
npm view @shopify/cli version
npm view @google/gemini-cli version
npm view @openai/codex version
codex features --help
codex features list
```

Observed locally:

```text
claude: 2.1.158
codex: 0.125.0
gemini: 0.26.0
opencode: 1.2.27
pi: 4.1.0
@shopify/cli: 0.44.1
@openai/codex: 0.135.0
codex features list: did not show goals in local 0.125.0 output
gumroad: not installed
shopify: not installed
openclaw: 2026.5.12 (f066dd2), 53 skills installed
himalaya: not installed
gh: 2.86.0
node: v24.13.0
npm: 11.11.0
```

Internal prior art audited on 2026-05-30:

```text
~/openclaw                                  OpenClaw gateway: cron, heartbeat,
                                            standing orders, hooks, TaskFlow,
                                            Gmail pub/sub, multi-channel delivery
~/.openclaw/workspace/projects/cobanos-tours  los-cobanos.com static GEO site:
                                            JSON-LD structured data, topic-cluster
                                            pages, sitemap/robots, IndexNow,
                                            `npm run check` SEO harness, es/ mirror,
                                            promotion-playbook.md, Ralph automation
```

## References & Research

- Etsy Open API v3 documentation: https://developer.etsy.com/
- Etsy listings tutorial: https://developers.etsy.com/documentation/tutorials/listings/
- Etsy API rate limits: https://developers.etsy.com/documentation/essentials/rate-limits/
- Etsy Dev MCP server: https://developers.etsy.com/documentation/mcp_server/devmcpserver/
- Gumroad API and CLI: https://gumroad.com/api
- Shopify API docs: https://shopify.dev/docs/api
- Shopify CLI Admin API/bulk operations announcement:
  https://community.shopify.dev/t/admin-api-and-bulk-operations-in-shopify-cli/29467
- Pinterest analytics API:
  https://developers.pinterest.com/docs/analytics-and-reports/analytics-overview/
- Pinterest API access tiers:
  https://developers.pinterest.com/docs/key-concepts/access-tiers/
- OpenAI Agents docs: https://platform.openai.com/docs/guides/agents
- OpenAI Responses migration: https://platform.openai.com/docs/guides/migrate-to-responses
- OpenAI Codex non-interactive mode:
  https://developers.openai.com/codex/noninteractive
- OpenAI Codex `/goal` use case:
  https://developers.openai.com/codex/use-cases/follow-goals
- OpenAI Codex CLI slash commands:
  https://developers.openai.com/codex/cli/slash-commands
- OpenAI Codex GitHub Action: https://developers.openai.com/codex/github-action
- OpenAI Codex skills: https://developers.openai.com/codex/skills
- OpenAI Codex subagents: https://developers.openai.com/codex/subagents
- Claude Code overview: https://code.claude.com/docs/en/overview
- Claude Agent SDK: https://code.claude.com/docs/en/agent-sdk/overview
- Claude Code hooks: https://code.claude.com/docs/en/hooks
- Claude Cowork help: https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork
- Anthropic Managed Agents engineering note:
  https://www.anthropic.com/engineering/managed-agents
- Anthropic Agent Skills engineering note:
  https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Gemini CLI repository: https://github.com/google-gemini/gemini-cli
- Google ADK docs: https://adk.dev/
- Google ADK deployment docs: https://adk.dev/deploy/
- Agentic Commerce Protocol (OpenAI + Stripe): https://developers.openai.com/commerce
- ACP specification (GitHub): https://github.com/agentic-commerce-protocol/agentic-commerce-protocol
- Stripe Agentic Commerce docs: https://docs.stripe.com/agentic-commerce/acp
- Buy it in ChatGPT / Instant Checkout: https://openai.com/index/buy-it-in-chatgpt/
- GEO 2026 guide (LLMrefs): https://llmrefs.com/generative-engine-optimization
- GEO vs AEO overlap (eMarketer): https://www.emarketer.com/content/faq-on-geo-aeo--where-ai-search-seo-overlap-2026
- Buttondown email API: https://buttondown.com/features/api
- Kit (formerly ConvertKit): https://kit.com/
- Bluesky posting API overview: https://www.postpeer.dev/blog/best-bluesky-posting-api
- eRank vs Marmalead (2026): https://www.listifyai.net/blog/erank-vs-marmalead-2026
- Internal: OpenClaw automation docs (cron, heartbeat, standing orders,
  TaskFlow, hooks, Gmail pub/sub): ~/openclaw/docs/automation/
- Internal prior art: los-cobanos.com GEO site:
  ~/.openclaw/workspace/projects/cobanos-tours (see docs/promotion-playbook.md)
