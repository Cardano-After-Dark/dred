# Getting Started

## Prerequisites

```bash
docker --version  # Required
nvm use          # Should show Node 18
npm i -g pnpm yarn
```

## Quick Setup

```bash
git clone git@github.com:Cardano-After-Dark/dred.git
cd dred
pnpm install
scripts/setupEnvironment  # Creates Redis Docker container
pnpm build                # One-time build
```

## Run Development

```bash
pnpm dev
```

**Access:**
- Demo app: http://localhost:3030
- Docs: http://localhost:3034
- Server: port 3029 (backend)

## Verify Setup

```bash
pnpm test  # Should pass all tests
```

## Common Issues

**Docker not running:** Start Docker Desktop
**Port conflicts:** Kill processes on ports 3029, 3030, 3034
**Node version:** Run `nvm use` to switch to Node 18
