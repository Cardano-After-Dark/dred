# Dynamic Discovery Implementation Guide

This guide provides step-by-step instructions for implementing dynamic host discovery in the DRED messaging system.

## 🎯 Overview

We've implemented a complete dynamic discovery system with:
- **DynamicHostDiscovery** class for runtime host updates
- **Comprehensive test suite** with unit and integration tests  
- **VPS testing infrastructure** for multi-server testing
- **BlockServerMapper** for blockchain integration
- **Differential replication** management

## 📋 Implementation Steps

### Phase 1: Core Implementation (Priority 1)

#### Step 1.1: Add DynamicHostDiscovery Class

**File:** `src/peers/DynamicHostDiscovery.ts`

Copy the implementation from `artifacts/dynamic-discovery/DynamicHostDiscovery.ts` and fix imports:

```typescript
import { Discovery, GenericDiscoveryOptions, ConnectionThresholds } from "../types/Discovery.js";
import { DredHostDetails } from "../types/DredHosts.js";
import { devMessage } from "../types/DredEvents.js";

// Copy the rest of the DynamicHostDiscovery class implementation
```

#### Step 1.2: Add Server Update Methods

**File:** `src/server/DredServer.ts`

Add the following method to the DredServer class:

```typescript
/**
 * Update discovery hosts dynamically at runtime.
 * This enables dynamic topology changes without server restart.
 */
async updateDiscovery(newHosts: DredHostDetails[]): Promise<void> {
    if (this.discovery instanceof DynamicHostDiscovery) {
        await this.discovery.updateHosts(newHosts);
        
        // Notify replicator of host changes with differential updates
        if (this.replicator) {
            await this.replicator.onHostsUpdated(newHosts);
        }
        
        this.log(`Discovery updated with ${newHosts.length} hosts`);
    } else {
        this.warn("Discovery update not supported - using static discovery");
    }
}
```

#### Step 1.3: Add Client Update Methods

**File:** `src/client/DredClient.ts`

Add the following method to the DredClient class:

```typescript
/**
 * Update discovery hosts dynamically from client side.
 * Triggers connection manager to refresh peer connections.
 */
async updateDiscovery(newHosts: DredHostDetails[]): Promise<void> {
    if (this.discovery instanceof DynamicHostDiscovery) {
        await this.discovery.updateHosts(newHosts);
        
        // Trigger host rediscovery in connection manager
        await this.connManager.freshenPeers();
        
        this.log(`Client discovery updated with ${newHosts.length} hosts`);
    } else {
        this.warn("Discovery update not supported - using static discovery");
    }
}
```

#### Step 1.4: Enhance Replication for Dynamic Discovery

**File:** `src/server/DredReplicator.ts`

Add the following method to the DredReplicator class:

```typescript
/**
 * Handle dynamic host updates with differential replicant management.
 * Adds new replicants, removes obsolete ones, preserves in-flight messages.
 */
async onHostsUpdated(newHosts: DredHostDetails[]): Promise<void> {
    if (!this.discovery instanceof DynamicHostDiscovery) {
        this.log("Replicator: Discovery not dynamic, ignoring host update");
        return;
    }

    const diff = this.discovery.getHostDiff(newHosts);
    
    this.log(`Replicator: Hosts diff - Add: ${diff.toAdd.length}, Remove: ${diff.toRemove.length}, Update: ${diff.toUpdate.length}`);
    
    // Add new replicants
    for (const host of diff.toAdd) {
        this.log(`Replicator: Adding replicant for ${host.serverId}`);
        const replicant = new Replicant(this, this.homeServer, host);
        await replicant.initialize();
        this.replicants.push(replicant);
    }
    
    // Remove obsolete replicants (gracefully handle in-flight messages)
    for (const hostToRemove of diff.toRemove) {
        this.log(`Replicator: Removing replicant for ${hostToRemove.serverId}`);
        const replicantIndex = this.replicants.findIndex(r => r.targetHost.serverId === hostToRemove.serverId);
        if (replicantIndex >= 0) {
            const replicant = this.replicants[replicantIndex];
            
            // Graceful shutdown - allow in-flight messages to complete
            await replicant.gracefulShutdown();
            
            // Remove from list
            this.replicants.splice(replicantIndex, 1);
        }
    }
    
    // Update changed replicants
    for (const hostToUpdate of diff.toUpdate) {
        this.log(`Replicator: Updating replicant for ${hostToUpdate.serverId}`);
        const replicant = this.replicants.find(r => r.targetHost.serverId === hostToUpdate.serverId);
        if (replicant) {
            // Update host details
            replicant.targetHost = { ...hostToUpdate };
            
            // Restart replicant with new details
            await replicant.gracefulShutdown();
            await replicant.initialize();
        }
    }
    
    this.log(`Replicator: Host update complete - ${this.replicants.length} active replicants`);
}
```

### Phase 2: Testing Implementation

#### Step 2.1: Add Dynamic Discovery Tests

**File:** `src/server/__tests__/dynamic-discovery.test.ts`

Copy the comprehensive test suite from `artifacts/dynamic-discovery/dynamic-discovery.test.ts` and adapt imports:

```typescript
import { beforeAll, afterAll, beforeEach, afterEach, describe, it, expect } from "vitest";
import { DynamicHostDiscovery } from "../../peers/DynamicHostDiscovery.js";
import { DredServer } from "../DredServer.js";
import { DredClient } from "../../client/DredClient.js";
import { testSetup } from "../testServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";

// Copy the rest of the test implementation
```

#### Step 2.2: Add Integration Tests to Existing Test Suites

**File:** `src/server/__tests__/replication.test.ts`

Add dynamic discovery tests to the existing replication test suite:

```typescript
describe("Dynamic Discovery Replication Tests", () => {
    it("should adapt replication when discovery hosts change", async () => {
        // Setup servers with dynamic discovery
        const initialHosts = [
            { serverId: "server1", address: "localhost", port: 3001, insecure: true },
            { serverId: "server2", address: "localhost", port: 3002, insecure: true }
        ];
        
        const discovery = new DynamicHostDiscovery({
            neighborhood: "test-dynamic-replication",
            initialHosts
        });
        
        const server1 = new DredServer({ discovery, neighborhood: "test-dynamic-replication" }, "server1", 1);
        await server1.listen();
        await server1.setupReplication();
        
        // Initial replication setup
        expect(server1.replicator?.replicants).toHaveLength(1); // Only server2
        
        // Update discovery to add server3, remove server2
        const newHosts = [
            { serverId: "server1", address: "localhost", port: 3001, insecure: true },
            { serverId: "server3", address: "localhost", port: 3003, insecure: true }
        ];
        
        await server1.updateDiscovery(newHosts);
        
        // Verify replication adapted
        expect(server1.replicator?.replicants).toHaveLength(1); // Only server3
        expect(server1.replicator?.replicants[0].targetHost.serverId).toBe("server3");
    });
});
```

### Phase 3: VPS Testing Infrastructure

#### Step 3.1: Copy VPS Infrastructure Files

Copy the essential VPS infrastructure files from s01 to the main codebase:

```bash
# Copy infrastructure scripts
cp .ai/analysis/s04/artifacts/scripts/* pre-prod/scripts/
cp .ai/analysis/s04/artifacts/README.md pre-prod/README-dynamic-discovery.md

# Copy Makefile if needed for dynamic discovery commands
# Modify pre-prod/Makefile to add dynamic discovery commands
```

#### Step 3.2: Add Dynamic Discovery VPS Commands

**File:** `pre-prod/Makefile`

Add the following commands for dynamic discovery testing:

```makefile
# Dynamic Discovery Management (NEW)
.PHONY: enable-dynamic-discovery
enable-dynamic-discovery:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make enable-dynamic-discovery [server]"; \
		exit 1; \
	fi
	@echo "Enabling dynamic discovery on $(call get_server_name,$(SERVER))"
	@./scripts/enable-dynamic-discovery.sh $(call get_server_ip,$(SERVER))

.PHONY: update-discovery
update-discovery:
	@if [ -z "$(SERVER)" ] || [ -z "$(HOSTS)" ]; then \
		echo "Usage: make update-discovery [server] HOSTS='server1:host1:port1,server2:host2:port2'"; \
		exit 1; \
	fi
	@echo "Updating discovery on $(call get_server_name,$(SERVER))"
	@./scripts/update-discovery.sh $(call get_server_ip,$(SERVER)) "$(HOSTS)"

.PHONY: test-dynamic-discovery
test-dynamic-discovery:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make test-dynamic-discovery [server]"; \
		exit 1; \
	fi
	@echo "Testing dynamic discovery on $(call get_server_name,$(SERVER))"
	@./scripts/test-dynamic-discovery.sh $(call get_server_ip,$(SERVER))
```

### Phase 4: Blockchain Integration (Future)

#### Step 4.1: Add BlockServerMapper

**File:** `src/peers/BlockServerMapper.ts`

Copy the implementation from `artifacts/dynamic-discovery/BlockServerMapper.ts` and fix imports:

```typescript
import { DredHostDetails } from "../types/DredHosts.js";

// Copy the rest of the BlockServerMapper implementation
```

#### Step 4.2: Add BlockchainHostDiscovery

**File:** `src/peers/BlockchainHostDiscovery.ts`

```typescript
import { DynamicHostDiscovery, DynamicDiscoveryOptions } from "./DynamicHostDiscovery.js";
import { DredHostDetails } from "../types/DredHosts.js";
import { BlockServerMapper } from "./BlockServerMapper.js";
// Import DredCapo when blockchain integration is ready
// import { DredCapo } from "../../onchain/src/DredCapo.js";

export interface BlockchainDiscoveryOptions extends DynamicDiscoveryOptions {
    capoConfig?: any; // Configuration for DredCapo instance
    pollingInterval?: number; // For future polling implementation
}

export class BlockchainHostDiscovery extends DynamicHostDiscovery {
    // private capo: DredCapo; // Uncomment when blockchain integration is ready
    
    constructor(options: BlockchainDiscoveryOptions) {
        super(options);
        // this.capo = new DredCapo(options.capoConfig); // Uncomment when ready
    }
    
    /**
     * Refresh discovery from blockchain node registry.
     * Called at startup and on specific method calls (not continuous polling).
     */
    async refreshFromBlockchain(): Promise<void> {
        try {
            // Uncomment when blockchain integration is ready:
            // const registryDgt = await this.capo.getNodeRegistryController();
            // const nodes = await registryDgt.findRecords();
            
            // For now, use mock data for testing
            const nodes = [
                { id: "blockchain-node-1", status: "active" },
                { id: "blockchain-node-2", status: "active" }
            ];
            
            // Use BlockServerMapper for hardcoded mapping
            const hosts = BlockServerMapper.mapBlockchainDataToHosts(nodes);
            
            this.logger.info(`Refreshed ${hosts.length} hosts from blockchain`);
            await this.updateHosts(hosts);
            
        } catch (error) {
            this.logger.error("Failed to refresh from blockchain:", error);
            throw error;
        }
    }
    
    /**
     * Initialize discovery from blockchain at startup.
     */
    async initializeFromBlockchain(): Promise<void> {
        await this.refreshFromBlockchain();
    }
}
```

## 🧪 Testing Strategy

### Local Testing

```bash
# Run dynamic discovery tests
pnpm test dynamic-discovery

# Run integration tests with replication
pnpm test replication
```

### VPS Testing

```bash
# Setup servers with dynamic discovery
make setup-dred uk
make setup-dred de

# Test discovery updates between servers
make update-discovery uk HOSTS="server1:uk:3029,server2:de:3029"
make test-dynamic-discovery uk
```

### Multi-Server Replication Testing

```bash
# Test replication across dynamically updated topology
make test-replication-dynamic uk de
```

## 🔧 Integration Checklist

- [ ] **Step 1.1**: Add DynamicHostDiscovery class
- [ ] **Step 1.2**: Add DredServer.updateDiscovery() method
- [ ] **Step 1.3**: Add DredClient.updateDiscovery() method  
- [ ] **Step 1.4**: Add DredReplicator.onHostsUpdated() method
- [ ] **Step 2.1**: Add comprehensive test suite
- [ ] **Step 2.2**: Add integration tests to existing suites
- [ ] **Step 3.1**: Copy VPS infrastructure files
- [ ] **Step 3.2**: Add VPS dynamic discovery commands
- [ ] **Step 4.1**: Add BlockServerMapper (future)
- [ ] **Step 4.2**: Add BlockchainHostDiscovery (future)

## 🎯 Usage Examples

### Basic Dynamic Discovery

```typescript
// Create server with dynamic discovery
const discovery = new DynamicHostDiscovery({
    neighborhood: "production",
    initialHosts: [
        { serverId: "server1", address: "prod1.dred.com", port: 443, insecure: false },
        { serverId: "server2", address: "prod2.dred.com", port: 443, insecure: false }
    ]
});

const server = new DredServer({ discovery, neighborhood: "production" }, "server1", 0);
await server.listen();

// Update discovery dynamically
const newHosts = [
    { serverId: "server1", address: "prod1.dred.com", port: 443, insecure: false },
    { serverId: "server3", address: "prod3.dred.com", port: 443, insecure: false } // server2 -> server3
];

await server.updateDiscovery(newHosts);
```

### Test-Based Discovery Updates

```typescript
// In tests
describe("Dynamic Discovery", () => {
    it("should update hosts dynamically", async () => {
        const discovery = new DynamicHostDiscovery({
            neighborhood: "test",
            initialHosts: testHosts
        });
        
        const server = new DredServer({ discovery }, "test-server", 1);
        await server.listen();
        
        // Test discovery update
        await server.updateDiscovery(newTestHosts);
        
        expect(server.discovery.getHostCount()).toBe(newTestHosts.length);
    });
});
```

### Future Blockchain Integration

```typescript
// Create blockchain-aware discovery
const discovery = new BlockchainHostDiscovery({
    neighborhood: "cardano-mainnet",
    capoConfig: { /* blockchain configuration */ }
});

// Initialize from blockchain
await discovery.initializeFromBlockchain();

// Manual refresh (not continuous polling)
await discovery.refreshFromBlockchain();
```

## 🚀 Deployment Notes

1. **Backward Compatibility**: Existing StaticHostDiscovery continues to work unchanged
2. **Opt-in Usage**: DynamicHostDiscovery is opt-in via constructor parameters
3. **Graceful Fallback**: Non-dynamic discovery instances handle updates gracefully
4. **Performance**: DynamicHostDiscovery has minimal overhead when not actively updating
5. **Thread Safety**: All operations are async and use immutable patterns

## 📝 Next Steps

After implementation:

1. **Test thoroughly** with local test suite
2. **Deploy to VPS** test environment
3. **Test multi-server replication** with dynamic discovery
4. **Implement command-line tools** for production discovery updates
5. **Add blockchain integration** when ready

This implementation provides a solid foundation for dynamic host discovery that can scale from local testing to production blockchain integration. 