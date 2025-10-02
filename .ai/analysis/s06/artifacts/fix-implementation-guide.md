# DRED On-Chain Discovery Self-Identification Fix

## Problem Statement

The DRED server's on-chain neighborhood discovery is 90% complete, but servers attempt to replicate to themselves because they cannot identify which discovered node represents their own instance.

## Root Cause Analysis

### The Issue
The `DredReplicator.initialize()` method attempts to filter out the current server from the discovered host list:

```typescript
// src/server/DredReplicator.ts:75
const otherHosts = hosts.filter((host) => host.serverId !== this.homeServer.serverId);
```

### Why It Fails
1. **Server Constructor ID**: `this.homeServer.serverId` is set from constructor parameter (simple string like "first", "second", etc.)
2. **On-Chain Discovery ID**: `host.serverId` comes from `NeighborhoodDiscovery.getHostList()` which returns `bytesToText(h.data!.id)` (complex blockchain-derived string)
3. **Mismatch Result**: These never match, so filtering fails and servers try to replicate to themselves

### Evidence
- **Test Environment**: Uses `StaticHostDiscovery` with simple serverIds - filtering works
- **Production Environment**: Uses `NeighborhoodDiscovery` with blockchain serverIds - filtering fails

## Solution Architecture

### Approach: Environment Variable Self-Identification

Use `DRED_NODE_ID` environment variable to specify which discovered node represents the current server instance.

### Implementation Strategy

1. **Environment Variable**: `DRED_NODE_ID` specifies the node's identity as it appears in the on-chain registry
2. **Discovery Filtering**: `NeighborhoodDiscovery` filters out the self-identified node
3. **Fallback Support**: Maintain backward compatibility for test environments

## Detailed Implementation

### Step 1: Modify NeighborhoodDiscovery

**File**: `src/peers/NeighborhoodDiscovery.ts`

**Location**: In the `getHostList()` method, around line 102

**Change**: Add self-filtering logic after fetching nodes from chain

```typescript
async getHostList(): Promise<DredHostDetails[]> {
    this.logger.info("Getting host list");
    const hosts = await this.registryController.findRecords();
    const capo = this.capo;
    const capoUtxos = await capo.findCapoUtxos();
    this.logger.info("utxos:",capoUtxos.length);
    const charterData = await capo.findCharterData(undefined, {
        optional: false,
        capoUtxos,
    });

    const nodeEntries = await capo.findNodeOpEntries({
        capoUtxos,
        charterData,
    });

    console.log(hosts.map(h => h.data!));
    this.logger.info(`^ found ${hosts.length} hosts in neighborhood ${this.neighborhood}`);
    
    // Map node entries to DredHostDetails
    const allNodes = nodeEntries.map((h) => {
        const details : DredHostDetails = {
            address: h.data!.nodeDetails.address,
            port: h.data!.nodeDetails.port,
            serverId: bytesToText(h.data!.id),                
            publicKey: h.data!.nodeDetails.pubKey.toString(),
            pubKeyHash: h.data!.nodeDetails.pubKeyHash.toString(),
        };
        return details;
    });

    // NEW: Filter out self if DRED_NODE_ID is specified
    const nodeId = process.env.DRED_NODE_ID;
    if (nodeId) {
        this.logger.info(`Filtering out self-node with ID: ${nodeId}`);
        const filteredNodes = allNodes.filter(node => node.serverId !== nodeId);
        this.logger.info(`Before filtering: ${allNodes.length} nodes, After filtering: ${filteredNodes.length} nodes`);
        
        if (filteredNodes.length === allNodes.length) {
            this.logger.warn(`⚠️  DRED_NODE_ID "${nodeId}" not found in discovered nodes. Available nodes: ${allNodes.map(n => n.serverId).join(', ')}`);
        }
        
        return filteredNodes;
    } else {
        this.logger.info("No DRED_NODE_ID specified, returning all discovered nodes");
        return allNodes;
    }
}
```

### Step 2: Environment Configuration

#### For VPS Deployment

Each node needs a unique `DRED_NODE_ID` that matches its on-chain registry entry:

```bash
# Node 1
export DRED_NODE_ID="dred-production-node-01"
export CARDANO_NETWORK="testnet"
export BF_API_KEY="your-blockfrost-api-key"

# Node 2  
export DRED_NODE_ID="dred-production-node-02"
export CARDANO_NETWORK="testnet"
export BF_API_KEY="your-blockfrost-api-key"

# Node 3
export DRED_NODE_ID="dred-production-node-03"
export CARDANO_NETWORK="testnet"
export BF_API_KEY="your-blockfrost-api-key"
```

#### For Development/Testing

```bash
# Local development - no DRED_NODE_ID needed (uses StaticHostDiscovery)
export CARDANO_NETWORK="testnet"
export BF_API_KEY="your-blockfrost-api-key"

# Or set DRED_NODE_ID if testing with NeighborhoodDiscovery
export DRED_NODE_ID="test-node-01"
```

### Step 3: Node Registry Synchronization

**Critical**: The `DRED_NODE_ID` must exactly match the `serverId` returned by the on-chain registry.

#### To Find Your Node's On-Chain ID:

1. **Run Discovery Without DRED_NODE_ID**: Let it return all nodes and log their serverIds
2. **Check Node Operator UI**: Use https://cardano-after-dark.github.io/dred/operator to see registered nodes
3. **Match Environment Variable**: Set `DRED_NODE_ID` to match the exact string from on-chain data

## Testing Strategy

### Phase 1: Local Verification

1. **Add Debug Logging** (temporary):
   ```typescript
   // In NeighborhoodDiscovery.getHostList()
   this.logger.info(`DEBUG: DRED_NODE_ID = "${process.env.DRED_NODE_ID}"`);
   this.logger.info(`DEBUG: All discovered serverIds:`, allNodes.map(n => `"${n.serverId}"`));
   ```

2. **Test Without DRED_NODE_ID**:
   ```bash
   unset DRED_NODE_ID
   # Run server and observe all discovered nodes
   ```

3. **Test With DRED_NODE_ID**:
   ```bash
   export DRED_NODE_ID="actual-node-id-from-chain"
   # Run server and verify self-filtering works
   ```

### Phase 2: Multi-Node Testing

1. **Deploy Multiple Nodes**: Each with different `DRED_NODE_ID`
2. **Verify No Self-Replication**: Check logs for replication attempts to self
3. **Verify Cross-Replication**: Confirm nodes replicate to each other

### Phase 3: Production Validation

1. **VPS Deployment**: Use proper environment variables
2. **Monitor Logs**: Watch for discovery and replication behavior
3. **Test Message Flow**: Verify messages replicate between nodes

## Verification Checklist

### Server Startup Logs Should Show:
- ✅ "Getting host list"
- ✅ "found X hosts in neighborhood"
- ✅ "Filtering out self-node with ID: [your-node-id]"
- ✅ "Before filtering: X nodes, After filtering: X-1 nodes"

### Replication Logs Should Show:
- ✅ Replication clients connecting to other nodes (not self)
- ✅ No connection attempts to own serverId
- ✅ Messages flowing between different nodes

### Warning Signs:
- ❌ "DRED_NODE_ID not found in discovered nodes" (ID mismatch)
- ❌ Replication attempts to same serverId as homeServer
- ❌ Before/after filtering counts are identical (no filtering occurred)

## Deployment Configuration

### Docker Environment

```dockerfile
# In Dockerfile or docker-compose.yml
ENV DRED_NODE_ID=dred-production-node-01
ENV CARDANO_NETWORK=testnet
ENV BF_API_KEY=your-api-key
```

### Systemd Service

```ini
# /etc/systemd/system/dred-node.service
[Service]
Environment=DRED_NODE_ID=dred-production-node-01
Environment=CARDANO_NETWORK=testnet
Environment=BF_API_KEY=your-api-key
ExecStart=/path/to/dred-server
```

### Manual Deployment

```bash
#!/bin/bash
# start-dred-node.sh

export DRED_NODE_ID="dred-production-node-01"
export CARDANO_NETWORK="testnet"
export BF_API_KEY="your-blockfrost-api-key"

./bin/dredServer
```

## Troubleshooting

### Issue: "DRED_NODE_ID not found in discovered nodes"

**Cause**: Environment variable doesn't match on-chain registry entry

**Solution**: 
1. Check actual serverIds from discovery logs
2. Update environment variable to match exactly
3. Verify node is properly registered on-chain

### Issue: Still replicating to self

**Cause**: DRED_NODE_ID not set or filtering not working

**Solution**:
1. Verify `DRED_NODE_ID` environment variable is set
2. Check logs for filtering messages
3. Ensure you're using `NeighborhoodDiscovery` (not `StaticHostDiscovery`)

### Issue: No nodes discovered

**Cause**: On-chain registry empty or network issues

**Solution**:
1. Check `BF_API_KEY` and `CARDANO_NETWORK` settings
2. Verify nodes are registered via Node Operator UI
3. Check network connectivity to Blockfrost

## Completion Criteria

### MS2 Milestone Success:
- [x] On-chain registry queried successfully
- [ ] Self-identification working (no self-replication)
- [ ] Multiple nodes connecting to each other
- [ ] Messages replicating between discovered nodes
- [ ] Production deployment with environment variables
- [ ] All existing tests continue to pass

### Estimated Implementation Time:
- **Core Fix**: 15-30 minutes (single function modification)
- **Testing**: 1-2 hours (verification and debugging)
- **VPS Integration**: 30 minutes (environment setup)
- **Total**: 2-3 hours

## Code Changes Summary

**Files Modified**: 1 file (`src/peers/NeighborhoodDiscovery.ts`)  
**Lines Added**: ~15-20 lines  
**Breaking Changes**: None (backward compatible)  
**Environment Variables**: 1 new optional variable (`DRED_NODE_ID`)

This fix completes the final missing piece for MS2 milestone completion.
