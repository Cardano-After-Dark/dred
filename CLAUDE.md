# CLAUDE.md

This file provides guidance specific to maintaining the dred
repository itself. For architectural concepts, patterns, and reference material
that applies to both this repo and downstream dApps, see `ARCHITECTURE.md`.

## Development Commands

### Build & Development
- `pnpm build` — Full production build (runs rollup, generates types, builds docs)
- `pnpm dev` — Development mode with watch/rebuild on file changes

Always use `pnpm`. Never use `npx` or `pnpx` if a direct `pnpm` command will do.

See README.md for more details

### Node Version

Use `nvm use` to switch to the correct Node.js version (Node 18)

## MUST LOAD Related skills index

Before you do anything, you MUST ensure you loaded ../skillz/index.md and use
this to load any of the mentioned skills just in time when needed.

