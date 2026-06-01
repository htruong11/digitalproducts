# Agent Operational Guide: `digitalproducts`

This repository is built for autonomous AI agents to manage, refine, and produce digital products. Agents should prioritize research-backed decisions and maintain the integrity of our safety/compliance protocols.

## 1. Agent Mandate

- **Research-First:** Never guess content. Ground product copy in `docs/research/research-resource.md`.
- **Surgical Autonomy:** When instructed to update a product, use `replace` on the product definition (`products/*/product.ts`).
- **Safety First:** All products must pass the safety scanner (the "claims-scrub"). If a build fails due to blocked claims, resolve by rewording to neutral, organizational language, *never* by disabling the scanner.

## 2. Research Hierarchy

1.  **`docs/imps/`:** Defines *processes*, strategies, and the roadmap. Use these to understand the *intent* of a task.
2.  **`docs/research/`:** Contains durable *facts* and scholarly references. Use these to ground product content in credible science (e.g., 4Ms, HELP).
3.  **`docs/decisions/`:** Immutable constraints. Treat these as "system architecture."

## 3. Product Generation Lifecycle

To update or create a product:
1.  **Edit Definition:** Modify `products/<slug>/product.ts`.
2.  **Verify Content:** Run `npm run product:build`. This triggers the `claims-scrub` scanner. If this fails, the build stops.
3.  **Generate Assets:** Run `npm run product:pdf <slug>` to generate the final high-fidelity PDF, HTML, and listing markdown.
4.  **Validate:** Ensure the output satisfies the requirements in `docs/imps/`.

## 4. State & Context Management

- **Local State:** Store temporary research or scratchpad notes in `/Users/bestrobot/.gemini/tmp/skn/memory/` to keep this repository clean.
- **Durable Memory:** New findings that have long-term value should be summarized into `docs/research/research-resource.md`.
- **Secrets:** Never commit account tokens, Etsy API keys, or personal identifiers. These belong in `.env` (ignored by git).

## 5. Tooling Standards

- **Renderer:** The `product-renderer.ts` controls the visual style. Use it to adjust typography (Serif/Sans) and layout.
- **Safety Scanner:** The `findBlockedClaims` function in `product-renderer.ts` is the final arbiter for Etsy publication readiness.
