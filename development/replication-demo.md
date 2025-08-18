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
```bash
# Full replication verification test
pnpm test preprod | pnpm exec pino-pretty
```

**Note**: This verifies actual replication using WebSocket clients. There may be some cleanup messages at the end, but the replication success is clearly visible!

## Expected Results

The replication test verifies:
- ✅ **Server Health**: Both US and UK servers responding
- ✅ **WebSocket Clients**: Connected to both servers
- ✅ **Message Replication**: US → UK and UK → US replication 
- ✅ **Live Verification**: Messages received via WebSocket subscriptions

## Key Output Indicators

**Focus on the important success messages:**
- `🌐 Starting VPS replication tests`
- `✅ Test environment ready`
- `📤 Sending replication test message to US: "REPLICATION TEST: US to UK"`
- `📥 UK client received message: us-uk-[timestamp]`
- `🎉 SUCCESS: US → UK REPLICATION VERIFIED!`
- `📤 Sending replication test message to UK: "REPLICATION TEST: UK to US"`
- `📥 US client received message: uk-us-[timestamp]`
- `🎉 SUCCESS: UK → US REPLICATION VERIFIED!`
- `🎉🎉🎉 DRED REPLICATION DEMO COMPLETE! 🎉🎉🎉`

**Note**: You may see some cleanup messages at the end - focus on the clear replication success indicators above!

## Troubleshooting

If replication fails:
1. Check server status: `make test us && make test uk`
2. Verify replication active: `curl http://74.208.13.84:3029/admin/replication-status | jq`
3. Check server logs: `ssh devops@74.208.13.84 "pm2 logs dred --lines 20"`
