# DRED On-Chain Discovery - Task Assignments

## Overview
Fix self-identification in on-chain node discovery to complete MS2 milestone.

## Task Breakdown

### 🎯 Task 1: Self-Filtering Implementation
**Owner**: [Assign to developer]  
**File**: `src/peers/NeighborhoodDiscovery.ts`  
**Time**: 15 minutes  
**Priority**: HIGH

**Requirements**:
- Add `nodeId?: string` to constructor options
- Read `process.env.DRED_NODE_ID` if provided
- Filter self from `getHostList()` results using node ID
- Add debug logging for filtered nodes

**Acceptance Criteria**:
- Environment variable `DRED_NODE_ID` controls self-identification
- Servers don't appear in their own discovery results
- Backwards compatible (works without environment variable)

### 🔧 Task 2: Server Integration
**Owner**: [Assign to developer]  
**File**: `src/server/DredServer.ts`  
**Time**: 10 minutes  
**Priority**: HIGH  
**Dependency**: Task 1

**Requirements**:
- Update discovery initialization to pass `nodeId`
- Ensure `DRED_NODE_ID` is used consistently
- Verify integration with existing replication logic

**Acceptance Criteria**:
- Node ID properly passed to `NeighborhoodDiscovery`
- No breaking changes to existing functionality
- Environment variable integration working

### 🧪 Task 3: Testing & Validation  
**Owner**: [Assign to tester/developer]  
**Files**: Test configuration + VPS setup  
**Time**: 30 minutes  
**Priority**: MEDIUM  
**Dependency**: Tasks 1 & 2

**Requirements**:
- Set unique `DRED_NODE_ID` for each test server
- Verify local replication tests pass
- Test VPS deployment with environment variables
- Validate cross-server replication

**Acceptance Criteria**:
- `pnpm test replication` passes with no self-replication
- Multiple VPS servers connect via on-chain discovery  
- Messages replicate between discovered nodes
- Production environment variables configured

## Environment Configuration

### Production VPS
```bash
# Server 1
export DRED_NODE_ID="dred-production-uk-01"

# Server 2  
export DRED_NODE_ID="dred-production-de-01"

# Server 3
export DRED_NODE_ID="dred-production-us-01"
```

### Testing
```bash
# Local testing
export DRED_NODE_ID="first"  # or "second", "third"
pnpm test replication
```

## Validation Commands

```bash
# 1. Test locally with environment variable
export DRED_NODE_ID="first"
LOGGING=1 pnpm test replication | pnpm exec pino-pretty

# 2. Deploy to VPS and test
make setup-dred uk de us
make test uk de us

# 3. Verify replication logs
make dred-logs uk
```

## Expected Outcomes

### Before Fix
```
❌ DredReplicator connecting to self (same serverId)
❌ Replication loops and inefficiency
```

### After Fix  
```
✅ "Filtering out self-node with ID: dred-production-uk-01"
✅ "DredReplicator connecting to: dred-production-de-01"
✅ "📤 REPLICATION: Publishing to remote server"
```

## Completion Checklist

- [ ] **Task 1**: Self-filtering implemented in `NeighborhoodDiscovery`
- [ ] **Task 2**: Server integration with environment variables  
- [ ] **Task 3**: Testing completed (local + VPS)
- [ ] **Validation**: No self-replication in logs
- [ ] **Deployment**: Production servers with unique node IDs
- [ ] **MS2**: On-chain discovery milestone completed

**Total Timeline**: 1 hour implementation + testing  
**Risk Level**: LOW (minimal code changes, well-defined scope)
