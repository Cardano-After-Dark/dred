# Session S07 - Task Assignment for On-Chain Discovery Fix

## Quick Summary
Complete MS2 milestone by fixing self-identification in on-chain node discovery. Servers currently replicate to themselves due to ID mismatch.

## Tasks for Assignment

### Task 1: Core Implementation (15 min)
**File**: `src/peers/NeighborhoodDiscovery.ts`
**Action**: Add self-filtering using `DRED_NODE_ID` environment variable
**Output**: Servers stop trying to replicate to themselves

### Task 2: Integration (10 min)  
**File**: `src/server/DredServer.ts`
**Action**: Pass node ID to discovery initialization
**Output**: Environment variable integration working

### Task 3: Testing (30 min)
**Files**: Local tests + VPS configuration
**Action**: Set `DRED_NODE_ID` per server, verify replication
**Output**: Multi-server replication working

## Success Criteria
- ✅ No self-replication attempts in logs
- ✅ Multiple servers discover and connect to each other
- ✅ Message replication between discovered nodes
- ✅ Production deployment with unique node IDs

## Total Estimated Time: 1 hour implementation + testing
