# Session S04 - AI Output Summary

## Analysis Provided

### Current Discovery Architecture

**Discovery Interface (`src/types/Discovery.ts`):**
- Abstract `Discovery` class with core methods: `getHostList()`, `getNeighborhoods()`, `getConnectionThresholds()`
- Event-driven architecture with `DiscoveryEvents` for host discovery lifecycle
- Neighborhood-focused design - each discovery instance serves one neighborhood
- Host discovery restart mechanism when neighborhood changes

**Current Implementation:**
- `StaticHostDiscovery` (`src/peers/StaticHostDiscovery.ts`) - hardcoded host lists
- Used by both `DredServer` and `DredClient` via `DredClient.resolveDiscovery()`
- Discovery injected at construction time: `this.discovery = DredClient.resolveDiscovery(args)`

**Server Usage (`src/server/DredServer.ts`):**
- Line 231: `this.discovery = DredClient.resolveDiscovery(args);`
- Line 506: `this.replicator = new DredReplicator(this, this.discovery);`
- Lines 640-652: `mkClient()` method creates single-host discovery for specific server connections

**Client Usage (`src/client/DredClient.ts`):**
- Lines 216-217: Discovery resolved in constructor
- Line 471: `let host = (await this.discovery.getHostList())[0];` - uses first host for fetch operations
- State machine depends on discovery: `discoveringHosts` → `discoveringChannels` → `ready`

**Test Setup (`src/server/testServer.ts`):**
- Lines 188-205: Creates `StaticHostDiscovery` with predefined host list
- Each server gets same discovery instance with full host list
- Uses neighborhood `"dredTestNbh"` for testing

### Blockchain Integration Context

**Current Blockchain Query Pattern (`onchain/src/DredCapoTestHelper.ts`):**
```typescript
async findFirstNode() {
    const registryDgt = await this.registryDgt();
    const nodes = await registryDgt.findRecords()
    if (nodes.length > 1) {
        throw new Error("expected only one node");
    }
    return nodes[0];
}
```

**Registry Access Pattern:**
- `DredCapo` instantiation provides registry access
- Registry delegate provides `findRecords()` method
- Results contain node registration data including network details

## Final Agreed Solution

### Phase 1: Dynamic Discovery Infrastructure (PRIORITY 1)

**1. Create `DynamicHostDiscovery` Class:**
```typescript
export class DynamicHostDiscovery extends Discovery {
    private _hosts: DredHostDetails[] = [];
    
    async updateHosts(newHosts: DredHostDetails[]): Promise<void> {
        const previousHosts = this._hosts;
        this._hosts = newHosts;
        
        // Emit discovery events for listening components
        this.events.emit("hosts:updated", {
            hosts: newHosts,
            message: `Updated to ${newHosts.length} hosts`,
            nbh: this.nbh,
            [devMessage]: "Discovery hosts updated dynamically"
        });
    }
    
    async getHostList(): Promise<DredHostDetails[]> {
        return [...this._hosts]; // Return copy to prevent mutation
    }
}
```

**2. Add Server-Side Discovery Update Methods:**
```typescript
// In DredServer.ts
async updateDiscovery(newHosts: DredHostDetails[]): Promise<void> {
    if (this.discovery instanceof DynamicHostDiscovery) {
        await this.discovery.updateHosts(newHosts);
        
        // Notify replicator of host changes with differential updates
        if (this.replicator) {
            await this.replicator.onHostsUpdated(newHosts);
        }
    }
}
```

**3. Enhanced Replication Integration:**
```typescript
// In DredReplicator.ts
async onHostsUpdated(newHosts: DredHostDetails[]): Promise<void> {
    const currentHosts = this.replicants.map(r => r.targetHost);
    const hostsToAdd = newHosts.filter(h => !currentHosts.find(c => c.serverId === h.serverId));
    const hostsToRemove = currentHosts.filter(c => !newHosts.find(h => h.serverId === c.serverId));
    
    // Add new replicants
    for (const host of hostsToAdd) {
        const replicant = new Replicant(this, this.homeServer, host);
        await replicant.initialize();
        this.replicants.push(replicant);
    }
    
    // Remove obsolete replicants (gracefully handle in-flight messages)
    for (const hostToRemove of hostsToRemove) {
        const replicant = this.replicants.find(r => r.targetHost.serverId === hostToRemove.serverId);
        if (replicant) {
            await replicant.gracefulShutdown(); // Allow in-flight messages to complete
            this.replicants = this.replicants.filter(r => r !== replicant);
        }
    }
}
```

### Phase 2: Test Implementation (PRIORITY 1)

**Create Dynamic Discovery Test:**
```typescript
// In src/server/__tests__/dynamic-discovery.test.ts
describe("Dynamic Host Discovery", () => {
    it("should update discovery hosts dynamically during runtime", async () => {
        // Initial setup with DynamicHostDiscovery
        const initialHosts: DredHostDetails[] = [
            { serverId: "server1", address: "localhost", port: 3001, insecure: true },
            { serverId: "server2", address: "localhost", port: 3002, insecure: true }
        ];
        
        const discovery = new DynamicHostDiscovery({ neighborhood: "test-nbh" });
        await discovery.updateHosts(initialHosts);
        
        // Create server with dynamic discovery
        const server = new DredServer({ discovery, neighborhood: "test-nbh" }, "server1", 1);
        await server.listen();
        
        // Update hosts and verify replication adapts
        const newHosts: DredHostDetails[] = [
            { serverId: "server1", address: "localhost", port: 3001, insecure: true },
            { serverId: "server3", address: "localhost", port: 3003, insecure: true } // server2 removed, server3 added
        ];
        
        await server.updateDiscovery(newHosts);
        
        // Verify server adapted to new topology
        expect(server.discovery.hosts).toEqual(newHosts);
        // Verify replication connections updated accordingly
    });
});
```

### Phase 3: VPS Infrastructure (PRIORITY 2)

**Copy and Adapt s01 VPS Scripts:**
- Copy relevant Makefile and scripts from `.ai/analysis/s01/artifacts/` to `.ai/analysis/s04/artifacts/`
- Modify for dynamic discovery testing:
  - Add API endpoint for discovery updates: `POST /admin/discovery`
  - Add CLI command for discovery updates: `dred-admin update-discovery --hosts server1:host1:port1,server2:host2:port2`
  - Test discovery changes during runtime on multiple VPS instances

### Phase 4: Blockchain Integration (PRIORITY 4)

**1. Create `BlockServerMapper` Class:**
```typescript
export class BlockServerMapper {
    // Hardcoded mapping for initial implementation
    private static SERVER_MAPPING: Record<string, DredHostDetails> = {
        "blockchain-node-1": { serverId: "prod-1", address: "dred1.example.com", port: 443, insecure: false },
        "blockchain-node-2": { serverId: "prod-2", address: "dred2.example.com", port: 443, insecure: false },
        // Add more mappings as needed
    };
    
    static mapBlockchainDataToHosts(blockchainNodes: any[]): DredHostDetails[] {
        return blockchainNodes
            .map(node => this.SERVER_MAPPING[node.id])
            .filter(host => host !== undefined);
    }
}
```

**2. Create `BlockchainHostDiscovery`:**
```typescript
export class BlockchainHostDiscovery extends DynamicHostDiscovery {
    private capo: DredCapo;
    
    constructor(options: BlockchainDiscoveryOptions) {
        super(options);
        this.capo = new DredCapo(/* blockchain config */);
    }
    
    async refreshFromBlockchain(): Promise<void> {
        const registryDgt = await this.capo.getNodeRegistryController();
        const nodes = await registryDgt.findRecords();
        
        // Use BlockServerMapper for hardcoded mapping
        const hosts = BlockServerMapper.mapBlockchainDataToHosts(nodes);
        
        await this.updateHosts(hosts);
    }
    
    // Called at system startup and on specific method calls
    async initializeFromBlockchain(): Promise<void> {
        await this.refreshFromBlockchain();
    }
}
```

## Implementation Strategy

### Immediate Focus (This Session)
1. **Implement `DynamicHostDiscovery`** with update capabilities
2. **Add `updateDiscovery()` methods** to DredServer and DredClient  
3. **Create comprehensive tests** for dynamic discovery functionality
4. **Copy VPS infrastructure** from s01 to s04 artifacts

### Key Design Decisions
- **Differential Replication**: Add/remove replicants based on host diff, preserve in-flight messages
- **Test-Driven Updates**: Start with `server.updateDiscovery(newHosts)` method calls
- **VPS Command-Line Integration**: Add CLI commands for discovery updates during runtime
- **Blockchain Polling**: Startup + method-call triggered updates (not continuous polling)
- **Hardcoded Mapping**: Use `BlockServerMapper` to bridge blockchain data to server details

### Backward Compatibility
- Existing `StaticHostDiscovery` remains unchanged
- New classes extend `Discovery` interface
- Opt-in usage via constructor parameters
- Graceful fallback for non-dynamic discovery instances 