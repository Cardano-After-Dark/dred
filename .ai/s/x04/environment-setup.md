# X04: Environment Setup Documentation

## Overview

This document describes the environment configuration setup for X04 infrastructure testing after the integration rebase.

## Key Finding: HTTP Protocol Enforcement

During the rebase conflict resolution in X03, the **hybrid approach** was chosen for `checkServerAvailability()` in `src/server/DredReplicator.ts:411-438`:

- ✅ **No NODE_ENV=test restriction** - Insecure HTTP is allowed in any environment when `DRED_USE_INSECURE=true`
- ✅ **Flexible protocol selection** - Based on the `insecure` flag in host details
- ✅ **Proper HTTP headers** - Includes content-type, accept, and clientId headers
- ✅ **Robust error handling** - Uses optional chaining for safety

This means we can test HTTP/insecure replication without requiring `NODE_ENV=test`, though we still set it for clarity.

## Configuration Files Created

### 1. `/devops/config/uk.env`

Server-specific configuration for UK server (217.154.34.155):

```bash
# UK Server Environment Configuration
REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
SERVER_IP=217.154.34.155
NODE_ENV=production
LOGGING=discovery:debug
DRED_NODE_ID=preprod-uk
BF_API_KEY=preprodB0ntxMUrqIeNgLlUvDqLxzQtGvXkfA5s
CARDANO_NETWORK=preprod
USE_STATIC_DISCOVERY=true
DRED_USE_INSECURE=true
```

**Used by:** `make vps-dred-deploy uk` - Loaded by `devops/scripts/vps-dred-deploy.sh` at line 20-30

### 2. `/devops/config/us.env`

Server-specific configuration for US server (74.208.13.84):

```bash
# US Server Environment Configuration
REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
SERVER_IP=74.208.13.84
NODE_ENV=production
LOGGING=default:debug
DRED_NODE_ID=preprod-us
BF_API_KEY=preprodB0ntxMUrqIeNgLlUvDqLxzQtGvXkfA5s
CARDANO_NETWORK=preprod
USE_STATIC_DISCOVERY=true
DRED_USE_INSECURE=true
```

**Used by:** `make vps-dred-deploy us` - Loaded by `devops/scripts/vps-dred-deploy.sh` at line 20-30

### 3. `/.env` (Project Root)

Local development configuration for testing HTTP/insecure replication:

```bash
# Local DRED Environment Configuration
# This file is automatically loaded by dotenv when running local DRED server
# Used by: bin/dredServer (import dotenv from 'dotenv/config')
# Launch with: make local-dred-run (from devops/ directory)

REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
SERVER_IP=127.0.0.1
NODE_ENV=test
LOGGING=default:info,discovery:debug,replication:debug
DRED_NODE_ID=local-dev
BF_API_KEY=preprodwj3I80hV2evfb5pVuPqhcM14pX4kLYJD
CARDANO_NETWORK=preprod
USE_STATIC_DISCOVERY=true
DRED_USE_INSECURE=true
```

**Used by:** `make local-dred-run` (from devops/ directory) - Automatically loaded by `dotenv/config` in `bin/dredServer`

### 4. `/devops/config/.env`

Updated to use the correct branch:

```bash
DRED_BRANCH=feature/onchain-replication-m2  # ✅ Updated from feature/onchain-nbh-discovery
```

## How Environment Loading Works

### Remote Server Deployment

1. Run `make vps-dred-deploy uk` (or `us`, `de`)
2. Makefile calls `devops/scripts/vps-dred-deploy.sh` with server IP and name
3. Script loads server-specific config:
   ```bash
   CONFIG_FILE="devops/config/uk.env"  # Converted from uppercase to lowercase
   source "$CONFIG_FILE"
   ```
4. Variables are exported to remote server via SSH heredoc
5. Remote `.env` file is created with these values

### Local Development

1. Run `make local-dred-run` (from devops/ directory)
2. Makefile builds and runs: `cd .. && pnpm exec node dist/dredServer.mjs`
3. `bin/dredServer` has: `import dotenv from 'dotenv/config'`
4. Dotenv automatically loads `/.env` from project root
5. All `process.env.*` variables are populated

## Testing Scenarios

### Test 1: UK Server - HTTP/Insecure Mode

**Remote Server:**
- Uses: `devops/config/uk.env`
- Protocol: HTTP (`DRED_USE_INSECURE=true`)
- Environment: `NODE_ENV=production`
- Deploy: `make vps-dred-deploy uk`

**Local Server:**
- Uses: `/.env`
- Protocol: HTTP (`DRED_USE_INSECURE=true`)
- Environment: `NODE_ENV=test`
- Launch: `make local-dred-run`

**Expected Behavior:**
- ✅ UK server accepts HTTP connections
- ✅ Local server can connect to UK via HTTP
- ✅ Messages replicate between servers
- ✅ No protocol enforcement errors

### Test 2: US Server - HTTPS/Secure Mode

**For HTTPS testing, update configurations:**

**`devops/config/us.env`:**
```bash
DRED_USE_INSECURE=false  # Change to false
```

**`/.env`:**
```bash
NODE_ENV=production       # Change to production
DRED_USE_INSECURE=false  # Change to false
```

**Expected Behavior:**
- ✅ US server enforces HTTPS
- ✅ Local server uses HTTPS
- ✅ SSL/TLS handshake successful
- ✅ Secure message replication

## Key Environment Variables

| Variable | Purpose | Values |
|----------|---------|--------|
| `DRED_USE_INSECURE` | Protocol selection | `true` = HTTP, `false` = HTTPS |
| `NODE_ENV` | Environment mode | `test`, `production`, `development` |
| `DRED_NODE_ID` | Server identification | `preprod-uk`, `preprod-us`, `local-dev` |
| `SERVER_IP` | Server external IP | `217.154.34.155` (UK), `74.208.13.84` (US), `127.0.0.1` (local) |
| `USE_STATIC_DISCOVERY` | Discovery method | `true` = Static, `false` = On-chain |
| `LOGGING` | Log verbosity | `default:info,discovery:debug,replication:debug` |
| `BF_API_KEY` | Blockfrost API key | `preprod...` |
| `CARDANO_NETWORK` | Cardano network | `preprod`, `mainnet` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `DRED_PORT` | Server port | `3029` |

## Next Steps

You are now ready to proceed with infrastructure testing:

1. **UK Server Testing (HTTP):**
   ```bash
   cd devops
   make vps-dred-deploy uk
   make local-dred-run
   # Test replication between UK and local
   ```

2. **US Server Testing (HTTPS):**
   - Update `devops/config/us.env`: `DRED_USE_INSECURE=false`
   - Update `/.env`: `DRED_USE_INSECURE=false`, `NODE_ENV=production`
   ```bash
   cd devops
   make vps-dred-deploy us
   make local-dred-run
   # Test secure replication between US and local
   ```

## Notes

- All configuration files have been created based on actual remote server configurations
- The hybrid approach allows HTTP in any environment when `DRED_USE_INSECURE=true`
- No code changes are needed for HTTP/HTTPS protocol selection
- Server-specific env files follow the pattern: `devops/config/<server>.env`
