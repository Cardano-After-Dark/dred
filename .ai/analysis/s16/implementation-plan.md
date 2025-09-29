# S16 Implementation Plan - Message Replication Test

## Goal
Send a message from local client to local server's `news` channel and verify it gets replicated to the connected remote server (`de.pp.node-01.dred.network:443`).

## Logging Strategy
- **Server**: Run with `LOGGING=default:trace` to capture finest replication details
- **Expected**: See replication messages in logs when message is sent
- **Target Channel**: `news` (shared with connected remote peer)

## Implementation Steps

### Step 1: Create Test Client Script
Location: `scripts/test-replication-client.js`
- Connect to local server (127.0.0.1:3029)
- Send test message to `news` channel
- Exit cleanly

### Step 2: Test Execution
1. Start server: `LOGGING=default:trace pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty`
2. Run client: `node scripts/test-replication-client.js`
3. Observe replication logs

### Step 3: Verification
Look for trace/debug logs showing:
- Message received on local server
- Message being replicated to remote peer
- Replication success/failure

## Expected Log Patterns
Based on zonedLogger and Pino levels:
- `TRACE`: Fine-grained replication details
- `DEBUG`: Replication activities
- `PROGRESS`: Replication progress updates
