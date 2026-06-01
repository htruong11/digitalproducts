# digitalproducts

Planning and production workspace for small digital products.

## Project Structure

- `site/` - current Vite/TypeScript internal product marketing site.
- `products/` - individual product workspaces (definition, content, output).
- `marketplaces/` - channel-specific drafts and tooling (e.g., Etsy).
- `docs/` - decision logs, strategy (IMPs), and research resources.
- `scripts/` - automation for product generation and building.

## Agent Documentation

For AI agents working on this project, please consult **[AGENTS.md](./AGENTS.md)** for operational instructions, research mandates, and compliance protocols.

## Getting Started

1. `npm install`
2. `npm run dev` - start the internal site locally to preview marketing copy and design.
3. `npm run product:pdf <slug>` - generate the print-ready PDF and Etsy listing drafts for a specific product.
