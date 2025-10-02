# DRED On-Chain Discovery - Next Steps Summary

## What We've Learned

From analyzing the Discord conversation and codebase:

1. **90% Complete**: Randall has implemented most of the on-chain discovery in `feature/onchain-nbh-discovery` branch
2. **Single Missing Piece**: Self-identification so servers don't replicate to themselves 
3. **Root Cause**: Mismatch between server `serverId` and on-chain registry `serverId` format
4. **Simple Fix**: Environment variable approach for node identification (4-40 LoC estimate confirmed)

## Immediate Action Plan

### Step 1: Verify Current State (5 minutes)
```bash
# Ensure you're on the right branch
git checkout feature/onchain-nbh-discovery
git pull origin feature/onchain-nbh-discovery

# Check current discovery implementation
cat src/peers/NeighborhoodDiscovery.ts | grep -A 5 -B 5 "serverId"
```

### Step 2: Implement Self-Identification (15-30 minutes)

**Option A: Simple Filter in getHostList()**
```typescript
// In NeighborhoodDiscovery.ts, modify getHostList()
async getHostList(): Promise<DredHostDetails[]> {
    const allNodes = await this.fetchNodesFromChain();
    const nodeId = process.env.DRED_NODE_ID;
    
    if (nodeId) {
        return allNodes.filter(node => node.serverId !== nodeId);
    }
    
    return allNodes;
}
```

**Option B: Constructor-Based Approach**
```typescript
// Add nodeId parameter to constructor
constructor(options: GenericDiscoveryOptions & { nodeId?: string }) {
    super(options);
    this.nodeId = options.nodeId || process.env.DRED_NODE_ID;
}
```

### Step 3: Update Server Creation (10 minutes)
```typescript
// In DredServer.ts or where discovery is created
const discovery = new NeighborhoodDiscovery({
    neighborhood: args.neighborhood,
    nodeId: process.env.DRED_NODE_ID || serverId
});
```

### Step 4: Test and Verify (15-30 minutes)
1. Run with local environment variables
2. Check server logs for discovery behavior  
3. Verify multiple servers don't self-replicate

## Environment Setup for VPS

Each VPS node needs:
```bash
export DRED_NODE_ID="dred-node-01"  # Unique per node
export CARDANO_NETWORK="testnet"
export BF_API_KEY="your-blockfrost-api-key"
```

## Success Validation

You'll know it's working when:
- [x] Server logs show "found X hosts in neighborhood" 
- [ ] Server logs show filtered host list (excluding self)
- [ ] Multiple servers connect to each other
- [ ] Replication works between discovered nodes
- [ ] No self-replication attempts in logs

## Why This is the Right Approach

1. **Minimal Change**: Uses existing architecture, just adds self-filtering
2. **Environment-Based**: Standard pattern for deployment configuration  
3. **Backward Compatible**: Tests can continue using StaticHostDiscovery
4. **Production Ready**: Supports VPS deployment with unique node IDs

## Estimated Timeline

- **Core Implementation**: 30-60 minutes
- **Testing and Debug**: 1-2 hours  
- **VPS Integration**: 30 minutes
- **Total**: 2-3 hours

## MS2 Completion

This change should complete the Catalyst Milestone 2 requirements:
- ✅ On-chain node registry integration
- ✅ Automatic peer discovery
- ✅ Multi-node replication network
- ✅ Production deployment capability

The conversation shows this is the final missing piece for MS2 completion.
