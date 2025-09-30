# Task X01: Input Context

## Objective
Verify that DRED server replication is working correctly with proper logging, and confirm that messages sent to remote servers are successfully replicated to the local server.

## Problem Statement
The DRED replication system was not working correctly because the `checkServerAvailability()` method in `DredReplicator.ts` was hardcoding `https://` for all servers, but some preprod servers (US, UK) run on HTTP (port 3029) without SSL certificates.

## Requirements

### 1. Workflow
After each code change:
1. Commit and push changes to GitHub
2. Redeploy to remote server via `make setup-dred us` (or other server)
3. Verify deployment: `make test us`
4. Test message sending with test-client.js or curl
5. Launch local DRED with replication trace logging
6. Verify local server replicates messages from remote servers

### 2. Environment Configuration
- Environment variables from `preprod/config/{server}.env` should be passed to VPS during deployment
- Support both HTTP and HTTPS servers based on configuration
- Use idempotent deployment script that's safe to run multiple times

### 3. Logging Requirements
Local DRED should run with trace-level replication logging:
```bash
LOGGING=default:debug,replicant:trace,replicator:trace pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty
```

### 4. Success Criteria
- Local server shows active replication connections in logs
- Test message sent to remote server appears in local server logs
- Replication trace logs show complete message flow
- All operations use correct HTTP/HTTPS protocol based on configuration

## Technical Context

### Server Configuration
- **US Server**: 138.68.73.100:3029 (HTTP)
- **UK Server**: 217.154.34.155:3029 (HTTP)
- **DE Server**: 195.201.165.42:3029 (HTTPS)
- **AT Server**: 167.235.73.252:3029 (HTTPS)

### Key Components
- `DredReplicator`: Manages replication for a server
- `Replicant`: Handles replication from a single target server
- `NeighborhoodDiscovery`: Blockchain-based peer discovery
- `StaticHostDiscovery`: Static host configuration
- `DredClient`: Client for connecting to remote DRED servers

### Environment Variables
- `DRED_NODE_ID`: Unique identifier for this server
- `DRED_HOST`: Host address to bind to
- `DRED_PORT`: Port to listen on
- `BF_API_KEY`: Blockfrost API key for Cardano network
- `CARDANO_NETWORK`: Network (preprod/mainnet)
- `USE_STATIC_DISCOVERY`: Discovery method (true/false)
- `LOGGING`: Log level configuration
- `DRED_USE_INSECURE`: New variable to control HTTP/HTTPS (true=HTTP, false=HTTPS)