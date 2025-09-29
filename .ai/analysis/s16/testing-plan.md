# S16 Testing Plan - Message Replication Verification

## Current Status ✅
- Server running with 1 successful replication connection to `de.pp.node-01.dred.network:443`
- Shared channels: `news` and `discussion`
- Logging working at DEBUG and INFO levels

## Testing Strategy

### Phase 1: Create Simple Test Client
Create a minimal Node.js script that:
1. Connects to local DRED server (127.0.0.1:3029)
2. Sends a message to `news` or `discussion` channel
3. Listens for incoming messages

### Phase 2: Message Flow Testing
Test both directions:
1. **Local → Remote**: Send message from local client → should replicate to remote server
2. **Remote → Local**: Remote server message → should replicate to local server

### Phase 3: Log Analysis
Identify replication messages in logs at maximum verbosity level

## Implementation Plan

### Step 1: Determine Maximum Logging Level
Test these logging levels:
- `LOGGING=default:trace`
- `LOGGING=default:debug` (already tested)
- Any other levels?

### Step 2: Create Test Client Script
Based on `client.test.ts` pattern:
```typescript
import { DredClient } from "../client/DredClient";
import { StaticHostDiscovery } from "../peers/StaticHostDiscovery";

const client = new DredClient({
    discovery: new StaticHostDiscovery({
        hosts: [{ address: "127.0.0.1", port: 3029, serverId: "local" }]
    }),
    neighborhood: "dred-dev"
});

await client.connect();
await client.postMessage("news", {
    type: "test",
    msg: "Hello from test client!"
});
```

### Step 3: Run End-to-End Test
1. Start server with maximum logging
2. Run test client
3. Send test message
4. Verify in logs that message is replicated to `de.pp.node-01.dred.network:443`

## Questions to Resolve
1. What's the maximum logging level? (`trace`?)
2. Should we create the test script in `scripts/` directory?
3. Do you want to test both directions or just local → remote first?
