# DRED Replication Demo

## Quick Setup

1. **Clone and install**: `git clone <repo> && cd dred && pnpm install`
2. **Add server configs**: Copy your `us.env` and `uk.env` files to `preprod/config/`
3. **Setup servers**: see deployment instructions below
4. **Test Replication**: run the test `LOGGING=default:debug pnpm test preprod | pnpm exec pino-pretty `

Note: even if you read `Starting docker container`, the preprod tests are run in real VPS, but the test infrastructure by default creates a container.

## Demo Steps

### Terminal 1: Deploy US Server
```bash
make setup-dred us
make test us  # Verify deployment
```

### Terminal 2: Deploy UK Server  
```bash
make setup-dred uk
make test uk  # Verify deployment
```

### Terminal 3: Start Replication
```bash
# Start replication on US server
curl -X POST http://74.208.13.84:3029/admin/start-replication | jq

# Start replication on UK server
curl -X POST http://217.154.34.155:3029/admin/start-replication | jq
```

### Terminal 3: Run Replication Test

**Option A: Simple VPS Test (Recommended for demo)**
```bash
# Minimal, clean test - assumes servers online, starts replication, tests US → UK
pnpm test vps | pnpm exec pino-pretty
```

**Option B: Full Infrastructure Test**
```bash
# Full replication verification test with more comprehensive checks
pnpm test preprod | pnpm exec pino-pretty
```

**Note**: Option A is cleaner for demos. Option B verifies more but has more verbose output.

## Expected Results

### VPS Test (Option A) - Clean Output
Look for these key success indicators:
- `🌐 Starting VPS Replication Test`
- `🔄 Starting replication on US server...`
- `🔄 Starting replication on UK server...`
- `✅ Replication started on both servers`
- `🔗 Connecting clients...`
- `✅ Test setup complete`
- `📤 Client A sending message to US server...`
- `📥 Client B (UK) received: [message]`
- `🎉 SUCCESS: Message replicated from US to UK!`
- `🎉🎉🎉 VPS REPLICATION TEST PASSED! 🎉🎉🎉`

### Full Test (Option B) - Comprehensive Verification
- ✅ **Server Health**: Both US and UK servers responding
- ✅ **WebSocket Clients**: Connected to both servers
- ✅ **Message Replication**: US → UK and UK → US replication 
- ✅ **Live Verification**: Messages received via WebSocket subscriptions

**Key indicators:**
- `🌐 Starting VPS replication tests`
- `📤 Sending replication test message to US: "REPLICATION TEST: US to UK"`
- `📥 UK client received message: us-uk-[timestamp]`
- `🎉 SUCCESS: US → UK REPLICATION VERIFIED!`
- `🎉🎉🎉 DRED REPLICATION DEMO COMPLETE! 🎉🎉🎉`

**Note**: Option B may show cleanup messages at the end - focus on the clear success indicators above!

## Troubleshooting

If replication fails:
1. Check server status: `make test us && make test uk`
2. Verify replication active: `curl http://74.208.13.84:3029/admin/replication-status | jq`
3. Check server logs: `ssh devops@74.208.13.84 "pm2 logs dred --lines 20"`
