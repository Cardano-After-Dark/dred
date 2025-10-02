# DRED On-Chain Discovery Implementation Plan

## Problem Analysis

Based on code inspection, the core issue is **node self-identification mismatch**:

1. **Current State**: `DredReplicator` tries to filter self using `this.homeServer.serverId` 
2. **Issue**: The `serverId` from constructor doesn't match `serverId` from on-chain registry
3. **Root Cause**: On-chain registry returns `bytesToText(h.data!.id)` but server uses simple string IDs

## Current Code Flow

```typescript
// DredServer constructor (line 230)
this.serverId = serverId; // Simple string like "first", "second", "third"

// NeighborhoodDiscovery.getHostList() (line 124) 
serverId: bytesToText(h.data!.id), // Complex byte-to-text conversion

// DredReplicator.initialize() (line 75)
const otherHosts = hosts.filter((host) => host.serverId !== this.homeServer.serverId);
// ❌ FAILS: "first" !== "complex-byte-string-from-chain"
```

## Solution Architecture

### Phase 1: Environment-Based Node ID
Add environment variable `DRED_NODE_ID` to specify node identity:

```typescript
// In DredServer or discovery initialization
const nodeId = process.env.DRED_NODE_ID || serverId;
```

### Phase 2: Self-Identification in Discovery
Modify `NeighborhoodDiscovery` to accept and use node ID for filtering:

```typescript
export class NeighborhoodDiscovery extends Discovery {
    private nodeId?: string;

    constructor(options: GenericDiscoveryOptions & { nodeId?: string }) {
        super(options);
        this.nodeId = options.nodeId || process.env.DRED_NODE_ID;
    }

    async getHostList(): Promise<DredHostDetails[]> {
        const allNodes = await this.fetchNodesFromChain();
        
        // Filter out self if nodeId is specified
        if (this.nodeId) {
            return allNodes.filter(node => node.serverId !== this.nodeId);
        }
        
        return allNodes;
    }
}
```

### Phase 3: Server Integration
Update server creation to pass node ID:

```typescript
// In production deployment
process.env.DRED_NODE_ID = "production-node-01";

// In createServer or DredServer constructor
const discovery = new NeighborhoodDiscovery({
    neighborhood: args.neighborhood,
    nodeId: process.env.DRED_NODE_ID || serverId
});
```

## Implementation Details

### Files to Modify

1. **`src/peers/NeighborhoodDiscovery.ts`**
   - Add `nodeId` parameter to constructor
   - Add self-filtering in `getHostList()`
   - Estimated: 10-15 lines

2. **`src/server/DredServer.ts`** 
   - Update discovery initialization to pass node ID
   - Ensure `serverId` matches discovery node ID
   - Estimated: 5-10 lines

3. **Environment Configuration**
   - VPS deployment scripts to set `DRED_NODE_ID`
   - Test setup to use consistent IDs
   - Estimated: 5-10 lines

### Testing Strategy

1. **Unit Tests**: Verify self-filtering logic in `NeighborhoodDiscovery`
2. **Integration Tests**: Test with multiple servers using environment variables
3. **VPS Testing**: Deploy with proper node IDs and verify replication

## Deployment Configuration

### VPS Environment Variables
```bash
# Node 1
export DRED_NODE_ID="dred-node-01"
export CARDANO_NETWORK="testnet"
export BF_API_KEY="your-blockfrost-key"

# Node 2  
export DRED_NODE_ID="dred-node-02"
export CARDANO_NETWORK="testnet"
export BF_API_KEY="your-blockfrost-key"
```

### Test Environment
```typescript
// Ensure test node IDs match on-chain registry entries
const testHosts = [
    { serverId: "test-node-01", ... },
    { serverId: "test-node-02", ... },
    { serverId: "test-node-03", ... }
];
```

## Expected Results

After implementation:
- ✅ Servers identify themselves correctly
- ✅ Replication connects to other nodes (not self)
- ✅ On-chain discovery works in production
- ✅ Tests continue to pass
- ✅ MS2 milestone criteria met

## Risk Mitigation

- **Backward Compatibility**: Keep existing StaticHostDiscovery for tests
- **Fallback Logic**: Use constructor `serverId` if `DRED_NODE_ID` not set
- **Validation**: Log discovered nodes and self-identification for debugging
- **Graceful Degradation**: Continue working even if node ID mismatch occurs

## Completion Criteria

1. Server logs show successful on-chain discovery
2. Multiple servers connect to each other via on-chain discovery
3. Replication works between discovered nodes
4. VPS deployment uses environment-based node identification
5. All existing tests pass
