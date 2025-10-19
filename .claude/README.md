# DRED - Decentralized Real-time Communication for Cardano

## What is DRED?

DRED is a decentralized real-time messaging system specifically designed for Cardano blockchain applications. It provides critical communication infrastructure that dApps can leverage without having to build their own messaging servers. The network's decentralized nature ensures high availability and resilience while maintaining Cardano's core values of decentralization and community ownership.

### The Problem DRED Solves

Originally inspired by the need for a Poker dApp to have shared communication channels between multiple participants, DRED addresses the broader challenge of real-time messaging for blockchain applications. Traditional centralized messaging solutions don't align with the decentralized philosophy of blockchain, and building custom messaging infrastructure is complex and resource-intensive.

## Main Components

### 1. Node Network
A distributed network of server nodes that relay messages between clients. Each node runs:
- **Express.js server** with WebSocket handling
- **Redis backend** for message storage and pub/sub functionality
- **Replication system** for message synchronization between nodes

### 2. On-chain Registry
Blockchain-based registry system that enables:
- **Node discovery** - Find available DRED nodes
- **Node authentication** - Verify node legitimacy
- **Neighborhood management** - Application-specific node clusters
- **Protocol settings** - Network-wide configuration

### 3. Client Library
JavaScript/TypeScript library that applications use to connect to the DRED network:
```javascript
const dred = new DredClient({
  neighborhood: "your-app-name",
  waitFor: "minimum",
  name: "my-client"
});

await dred.connect();
await dred.joinChannel("room-123");
await dred.postMessage("room-123", { type: "chat", msg: "Hello" });
```

### 4. Redis Backend
High-performance, in-memory data store providing:
- **Message storage** - Temporary message persistence
- **Pub/Sub functionality** - Real-time message distribution
- **Channel management** - Dynamic channel creation and cleanup
- **Cross-node synchronization** - State sharing between DRED nodes

## Architecture Overview

```
Client Apps → DRED Client Library → Node Network → Redis Backend
                                        ↓
                               On-chain Registry (Cardano)
```

**Message Flow:**
1. User sends message from their app
2. DRED client encrypts message (optional)
3. Message goes to DRED servers
4. Servers replicate message to other servers
5. Connected users receive the message
6. Each user's app displays the decrypted message

## Development Workflow

### Quick Start Commands

```bash
# Build the server and client
cd ~/projects/cad/dred/ && pnpm build && cd ~/projects/cad/dred/src/client && pnpm build && cd ~/projects/cad/dred/ 

# Launch the server with detailed logging (in this case we want to trace all from replicant and replicator)
cd ~/projects/cad/dred/ && LOGGING=default:debug,replicant:trace,replicator:trace pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty

# Launch the test client (temp client used to send messages to a remote server)
cd ~/projects/cad/dred/ && LOGGING=test-client:info node scripts/test-replication-client.js
```

### Production Deployment

```bash
# Redeploy current code to US server
cd ~/projects/cad/dred/preprod && make setup-dred us

# Test the deployed server 
cd ~/projects/cad/dred/preprod && make test us
```

### Testing

```bash
# Run all tests
pnpm test

# Run specific test suite (e.g., replication tests)
pnpm test replication

# Run tests in watch mode
pnpm testing

# Debug tests
pnpm test:debug
```

## Technology Stack

- **Runtime:** Node.js 18 with TypeScript 5.3.3 (strict mode)
- **Package Manager:** pnpm (workspace configuration)
- **Web Framework:** Express.js with WebSocket support
- **Database:** Redis for real-time data operations
- **Testing:** Vitest with integration tests
- **Deployment:** Docker containers with PM2 process management
- **Blockchain:** Cardano (Helios framework for on-chain operations)

## Project Structure

This is a **pnpm workspace** with multiple packages:

- **Root:** Main server application (`src/server/`)
- **Client:** WebSocket client implementation (`src/client/`)
- **Documentation:** Next.js documentation site (`docs/`)
- **Sample App:** Example DRED application (`sampleApp/`)
- **On-chain:** Cardano smart contracts and utilities (`onchain/`)
- **Deployment:** Production deployment scripts (`preprod/`, `pre-prod/`)

## Recent Development Sessions

The `.ai/analysis/` folder contains detailed documentation of recent development work:

### Session S18 (Latest) - Production Deployment
- **Focus:** Deploying current `feature/onchain-replication-m2` branch to production servers
- **Achievement:** Successfully deployed to US server with replication functionality
- **Challenge:** Resolved firewall configuration issues preventing external access
- **Files:** `.ai/analysis/s18/`

### Session S16 - Replication Testing Implementation
- **Focus:** End-to-end replication testing between DRED nodes
- **Achievement:** Created comprehensive test client (`scripts/test-replication-client.js`)
- **Innovation:** Implemented structured logging following Randall's development philosophy
- **Files:** `.ai/analysis/s16/`

### Session S15 - Code Quality & Architecture
- **Focus:** Major code quality improvements and architectural refinements
- **Achievement:** Extracted and documented Randall's development philosophy
- **Impact:** Established patterns for logging, error handling, and performance optimization
- **Files:** `.ai/analysis/s15/`

### Earlier Sessions (S00-S14)
- **S00-S01:** Initial deployment automation and VPS setup
- **S03:** Cross-server replication implementation
- **S06-S10:** VPS deployment workflow and testing infrastructure
- **S11-S14:** Bug fixes and system stability improvements

## Development Philosophy

The project follows a "Direct and Purposeful" development approach emphasizing:

- **Simplicity over complexity** - Eliminate unnecessary abstraction
- **Framework leverage** - Use built-in capabilities rather than reinventing
- **Automatic over manual** - Systems that work without human intervention  
- **User-focused logging** - Meaningful messages that help users understand system state
- **Graceful degradation** - Continue operation when possible during failures

## Key Features

- **Decentralized messaging** - No single point of failure
- **Real-time communication** - WebSocket-based instant messaging
- **Cross-node replication** - Messages synchronized across network nodes
- **Cardano integration** - On-chain node registry and discovery
- **Developer-friendly** - Simple client library with comprehensive documentation
- **Production-ready** - Docker deployment with monitoring and logging

## Support & Documentation

- **Live Documentation:** https://cardano-after-dark.github.io/dred
- **Local Documentation:** Run `pnpm dev` and visit `http://localhost:3034`
- **Architecture Guide:** See `docs/src/pages/docs/core-architecture.md`
- **Development Guide:** See `development/getting-started.md`

## License

Dual-licensing model:
- Non-commercial use under source-available license
- Commercial use requires paid licensing
- Some Redis-related code under MIT license (see `src/redis/streams/LICENSE`)

---

*DRED enables the next generation of interactive Cardano applications by providing reliable, decentralized real-time communication infrastructure.*