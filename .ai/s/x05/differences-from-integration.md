# Differences from feature/integration

**Date:** 2025-10-09
**Branch:** feature/onchain-replication-m2
**Baseline:** feature/integration
**Purpose:** Document key differences after rebase and fixes

## Overview

This document describes the main differences between the current branch and `feature/integration` for two key files that had substantial changes. These differences exist due to:
1. The original M2 implementation on the branch
2. The rebase onto feature/integration
3. Bug fixes made during testing (x04 session)

---

## 1. bin/dredServer

### Key Differences

#### A. Signal Handler Registration (MOVED EARLIER)
**Current (M2):**
```javascript
let server = null;

// Register signal handlers EARLY - before any async operations
const gracefulShutdown = async (signal) => { ... };
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// ... registered at START of init()
```

**feature/integration:**
```javascript
const server = await createServer(...);

// Add graceful shutdown handlers
const gracefulShutdown = async (signal) => { ... };
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// ... registered AFTER server creation
```

**Reason:** Signal handlers need to be registered before any async operations to properly catch shutdown signals during startup.

---

#### B. Configuration Approach (REMOVED CONFIG OBJECT)
**Current (M2):**
```javascript
// Reads directly from environment variables
const nbh = process.env.NEIGHBORHOOD || "dred-dev";
const serverAddress = process.env.SERVER_IP || "0.0.0.0";
const serverPort = process.env.DRED_PORT || "3029";
const useStaticDiscovery = process.env.USE_STATIC_DISCOVERY == 'true';
```

**feature/integration:**
```javascript
// Uses config object
const config = {
    replication: {
        enabled: true,
        retryInterval: 60000,
    }
};
const nbh = config.discovery?.neighborhood || process.env.NEIGHBORHOOD || "dred-dev";
```

**Reason:** M2 simplified to use environment variables directly rather than a config object. The config object was commented out and not being used effectively.

---

#### C. Static Host Discovery (HARDCODED HOSTS)
**Current (M2):**
```javascript
if (useStaticDiscovery) {
    // Define known preprod hosts
    const knownHosts = [
        { address: "74.208.13.84", port: 3029, serverId: "preprod-us", ... },
        { address: "217.154.34.155", port: 3029, serverId: "preprod-uk", ... },
        { address: "127.0.0.1", port: 3029, serverId: "local-dev", ... }  // ADDED
    ];
    discovery = new StaticHostDiscovery({ hosts: knownHosts });
}
```

**feature/integration:**
```javascript
if (config.discovery?.type === "static") {
    const {staticHosts} = config.discovery;
    discovery = new StaticHostDiscovery({ hosts: staticHosts });
}
```

**Reason:**
- M2 hardcodes known preprod hosts for testing/deployment
- Added `local-dev` entry for local development testing
- feature/integration expected hosts to come from config file

---

#### D. Environment Variable Names
**Current (M2):**
- `SERVER_IP` for server address
- `DRED_PORT` for port
- `USE_STATIC_DISCOVERY` for discovery method

**feature/integration:**
- `LISTEN_ADDRESS` for server address
- `LISTEN_PORT` for port
- `config.discovery?.type` for discovery method

**Reason:** M2 uses different naming conventions that align with deployment scripts.

---

## 2. src/server/DredReplicator.ts

### Key Differences

#### A. Client Creation Method (MAJOR CHANGE)
**Current (M2):**
```javascript
this.repClient = this.homeServer.mkClient(this.targetHost.serverId, {
    name: `from-${this.homeServer.serverId}-to-${this.targetHost.serverId}`
}, false);
```

**feature/integration:**
```javascript
const focusedDiscovery = new StaticHostDiscovery({
    hosts: [this.targetHost],
    neighborhood: this.homeServer.nbh,
});

this.repClient = new DredClient({
    ...this.homeServer.clientArgs,
    name: this.name,
    neighborhood: this.homeServer.nbh,
    discovery: focusedDiscovery,
    bookmarkStorage: new NoBookmarkMemory(),
});
```

**Reason:**
- M2 uses `mkClient` helper method (had to be restored in DredServer during x04 fixes)
- feature/integration creates client directly with manual discovery setup
- `mkClient` approach is cleaner and avoids code duplication

---

#### B. Debug Logging (ADDED IN X04)
**Current (M2):**
```javascript
private async attemptConnection(): Promise<void> {
    try {
        this.retryState.lastAttemptTime = new Date();

        this.log(`attempting connection to ${this.targetHost.serverId} at ${this.targetHost.address}:${this.targetHost.port}`);  // ADDED

        const isAvailable = await this.checkServerAvailability();
        // ...
    } catch (error: any) {
        this.warn(`connection attempt failed: ${error.message}`);  // ADDED
        // ...
        this.scheduleRetry();
    }
}

private scheduleRetry(): void {
    // ...
    this.log(`scheduling retry in ${retryIntervalSeconds} seconds`);  // ADDED
    // ...
}
```

**feature/integration:**
```javascript
// No explicit logging in attemptConnection entry
// No explicit logging in catch block
// No explicit logging in scheduleRetry
```

**Reason:** Added during x04 debugging to track connection failures that were being silently swallowed.

---

#### C. Protocol Selection (SIMPLIFIED)
**Current (M2):**
```javascript
private async checkServerAvailability(): Promise<boolean> {
    try {
        const protocol = this.targetHost.insecure ? 'http' : 'https';
        const url = `${protocol}://${this.targetHost.address}:${this.targetHost.port}/channels`;
        // ...
    }
}
```

**feature/integration:**
```javascript
private async checkServerAvailability(): Promise<boolean> {
    try {
        let secureProtocol = "https";
        if (this.targetHost.insecure) {
            secureProtocol = "http";
        }
        const url = `${secureProtocol}://${this.targetHost.address}:${this.targetHost.port}/channels`;
        // ...
    }
}
```

**Reason:** M2 uses simpler ternary expression. Functionally identical.

---

#### D. Import Organization
**Current (M2):**
```javascript
import { DredClient } from "../client/DredClient.js";
import { Discovery } from "../types/Discovery.js";
import { DredServer } from "./DredServer.js";
import { type DredHostDetails } from "../types/DredHosts.js";
import { zonedLogger } from "@poshplum/utils";
import {colors} from "../picocolors/picocolors.js";
import { asyncDelay } from "../util/asyncDelay.js";
import { customAlphabet } from "nanoid";
```

**feature/integration:**
```javascript
import fetch from "cross-fetch";
import { autobind, zonedLogger } from "@poshplum/utils";
import { asyncDelay } from "../util/asyncDelay.js";
import { colors } from "../picocolors/picocolors.js";
import { nanoid } from "../util/nanoid.js";
import { ConnectionManager } from "../client/ConnectionManager.js";
import { DredClient } from "../client/DredClient.js";
// ... many more imports
```

**Reason:**
- M2 removed unused imports (`cross-fetch`, `autobind`, `ConnectionManager`, etc.)
- M2 uses `customAlphabet` from nanoid instead of pre-configured nanoid
- Imports are organized differently

---

#### E. Logger Type
**Current (M2):**
```javascript
export class DredReplicator{
    logger: ReturnType<typeof zonedLogger>
    // ...
}
```

**feature/integration:**
```javascript
export class DredReplicator {
    logger: Logger;
    // ...
}
```

**Reason:** M2 uses explicit type inference from zonedLogger function rather than custom Logger type.

---

#### F. Formatting & Style
**Current (M2):**
- More compact spacing
- Removed some progress logs
- Simplified some method signatures

**feature/integration:**
- More verbose logging with `.progress()` calls
- Different spacing conventions

**Reason:** Style differences from M2 development and rebase conflict resolutions.

---

## Summary of Major Functional Changes

### From feature/integration perspective:

1. **bin/dredServer:**
   - Signal handlers moved earlier (improvement)
   - Config object removed in favor of env vars (simplification)
   - Static hosts hardcoded instead of config-based (for testing)
   - Added local-dev host for local testing

2. **DredReplicator:**
   - Uses `mkClient` instead of manual DredClient creation (cleaner)
   - Added debug logging for connection attempts (debugging aid)
   - Simplified protocol selection (minor)
   - Removed unused imports (cleanup)

### Bug Fixes Applied (x04 session):
- Added `mkClient` method to DredServer (was missing after rebase)
- Added local-dev to static hosts (for local testing)
- Added connection attempt logging (for debugging)
- Fixed rollup config (separate file, not in this analysis)

---

## Recommendation

The current M2 implementation is **functionally correct** and includes:
- ✅ Proper signal handling
- ✅ Working replication between servers
- ✅ Better debugging capability
- ✅ Cleaner client creation via `mkClient`

The differences from feature/integration are mostly **stylistic** or represent **improvements** (early signal handlers, better logging) rather than regressions.
