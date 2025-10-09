# UK Server - HTTP/Insecure Replication Test Plan

## Objective
Deploy DRED to UK server and verify HTTP/insecure replication works between UK server and local development machine.

## Prerequisites
- UK server freshly installed (or existing installation)
- SSH access to UK server
- Local machine has Redis running
- Repository on correct branch: `feature/onchain-replication-m2`

## Test Configuration

**UK Server (Remote):**
- IP: 217.154.34.155
- Protocol: HTTP (insecure)
- Config: `devops/config/uk.env`
- Node ID: `preprod-uk`

**Local Server:**
- IP: 127.0.0.1
- Protocol: HTTP (insecure)
- Config: `.env` (project root)
- Node ID: `local-dev`

---

## Phase 1: Deploy UK Server

### Step 1: Verify Configuration Files

```bash
# Check that all config files are in place
ls -la devops/config/uk.env
ls -la devops/config/.env
ls -la devops/config/hosts.conf

# Verify UK server configuration
cat devops/config/uk.env | grep DRED_USE_INSECURE
# Expected: DRED_USE_INSECURE=true

cat devops/config/.env | grep DRED_BRANCH
# Expected: DRED_BRANCH=feature/onchain-replication-m2
```

### Step 2: Test SSH Connection

```bash
cd devops
make srv-connect uk
# You should successfully connect to devops@217.154.34.155
# Type 'exit' to disconnect
```

**If SSH fails:** Run `make srv-setup uk` to configure SSH keys and devops user.

### Step 3: Verify/Install Infrastructure

```bash
# Check if infrastructure is already installed
ssh devops@217.154.34.155 "node --version && redis-cli ping && pm2 --version"
```

**If any command fails:**
```bash
cd devops
make vps-infra-setup uk
# This installs Node.js, Redis, PM2
# Takes ~5-10 minutes
```

### Step 4: Deploy DRED to UK Server

```bash
cd devops
make vps-dred-deploy uk
```

**What this does:**
1. Loads `devops/config/uk.env`
2. Clones DRED repository to UK server
3. Checks out `feature/onchain-replication-m2` branch
4. Installs dependencies (`pnpm install`)
5. Builds the project (`pnpm build`)
6. Creates `.env` file on remote server with UK configuration
7. Starts DRED with PM2

**Expected Output:**
```
✅ DRED running with PM2
✅ Auto-restart configured
✅ Environment file created
DRED is running on 217.154.34.155:3029
```

### Step 5: Verify UK Server is Running

```bash
cd devops
make vps-check uk
```

**Expected:**
- PM2 status shows `dred` process as `online`
- Port 3029 is accessible
- No errors in logs

**Check logs if needed:**
```bash
make vps-dred-logs uk
# Should show server startup messages, no errors
```

**Test API directly:**
```bash
curl http://217.154.34.155:3029/ping
# Expected: {"status":"ok"} or similar

curl http://217.154.34.155:3029/channels
# Expected: JSON array of channels, e.g., ["_auth","_chans"]
```

---

## Phase 2: Start Local Server

### Step 6: Verify Local Configuration

```bash
# Verify local .env file exists and is configured for HTTP
cat .env | grep -E "DRED_USE_INSECURE|NODE_ENV|DRED_NODE_ID"
```

**Expected:**
```
DRED_USE_INSECURE=true
NODE_ENV=test
DRED_NODE_ID=local-dev
```

### Step 7: Ensure Local Redis is Running

```bash
redis-cli ping
# Expected: PONG
```

**If Redis is not running:**
```bash
# macOS (Homebrew)
brew services start redis

# Linux
sudo systemctl start redis

# Or run manually
redis-server
```

### Step 8: Start Local DRED Server

**Open a new terminal window** (you'll need to keep this running):

```bash
cd devops
make local-dred-run
```

**Expected Output:**
```
Building DRED...
Starting local server...
  LOGGING=default:info,discovery:debug,replication:debug
  (using .env)

🚀 Starting DRED server initialization...
[timestamp] INFO: Starting discovery...
[timestamp] INFO: Server listening on 0.0.0.0:3029
[timestamp] INFO: Replication initialized
```

**Look for:**
- ✅ Server starts without errors
- ✅ Replication starts connecting to discovered servers
- ✅ No "insecure replication" errors
- ⚠️ May see connection retry messages initially (normal)

**Keep this terminal open!**

---

## Phase 3: Test Replication

### Step 9: Create Test Channel

**In a new terminal:**

```bash
# Create a test channel on UK server
curl -X POST "http://217.154.34.155:3029/channel/test-uk" \
  -H "Content-Type: application/json" \
  -H "clientid: test-admin"

# Create the same channel on local server
curl -X POST "http://localhost:3029/channel/test-uk" \
  -H "Content-Type: application/json" \
  -H "clientid: test-admin"

# Verify channels exist
curl http://217.154.34.155:3029/channels | jq
curl http://localhost:3029/channels | jq
# Both should include "test-uk" in the array
```

### Step 10: Test UK → Local Replication

**Send a message to UK server:**

```bash
curl -X POST "http://217.154.34.155:3029/channel/test-uk/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-client-1" \
  -d '{
    "type": "test-message",
    "ocid": "uk-to-local-001",
    "msg": "Hello from UK to Local!"
  }'
```

**Expected Response:**
```json
{"status":"ok","mid":"..."}
```

**Check local server logs** (the terminal running `make local-dred-run`):

Look for messages like:
```
📥 REPLICATION: Message detected from preprod-uk in channel 'test-uk'
📤 REPLICATION: Publishing to home server 'local-dev' in channel 'test-uk'
✅ Successfully replicated message
```

**Verify message arrived locally:**

```bash
curl http://localhost:3029/channel/test-uk/messages | jq
```

**Expected:** JSON array containing the message with `ocid: "uk-to-local-001"`

### Step 11: Test Local → UK Replication

**Send a message from local server:**

```bash
curl -X POST "http://localhost:3029/channel/test-uk/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-client-2" \
  -d '{
    "type": "test-message",
    "ocid": "local-to-uk-001",
    "msg": "Hello from Local to UK!"
  }'
```

**Check UK server logs:**

```bash
ssh devops@217.154.34.155 "pm2 logs dred --lines 100 --nostream" | grep -A 5 "local-to-uk-001"
```

**Verify message arrived on UK:**

```bash
curl http://217.154.34.155:3029/channel/test-uk/messages | jq
```

**Expected:** JSON array containing the message with `ocid: "local-to-uk-001"`

### Step 12: Test Bidirectional Replication

**Send multiple messages in both directions:**

```bash
# From UK
curl -X POST "http://217.154.34.155:3029/channel/test-uk/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-client-3" \
  -d '{"type":"test","ocid":"uk-msg-002","msg":"Message 2 from UK"}'

# From Local
curl -X POST "http://localhost:3029/channel/test-uk/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-client-4" \
  -d '{"type":"test","ocid":"local-msg-002","msg":"Message 2 from Local"}'

# Wait 2-3 seconds for replication
sleep 3

# Check both servers have both messages
curl http://localhost:3029/channel/test-uk/messages | jq '.[] | {ocid, msg}'
curl http://217.154.34.155:3029/channel/test-uk/messages | jq '.[] | {ocid, msg}'
```

**Expected:** Both servers show all 4 messages (uk-to-local-001, local-to-uk-001, uk-msg-002, local-msg-002)

---

## Phase 4: Verify Test Results

### Success Criteria ✅

- [ ] UK server deployed successfully via `make vps-dred-deploy uk`
- [ ] UK server running with PM2, no errors in logs
- [ ] Local server starts successfully via `make local-dred-run`
- [ ] Both servers using HTTP (DRED_USE_INSECURE=true)
- [ ] Replication logs show connections established
- [ ] Messages sent to UK appear on Local within 2-3 seconds
- [ ] Messages sent to Local appear on UK within 2-3 seconds
- [ ] No "insecure replication" errors
- [ ] No duplicate messages (deduplication working)

### Common Issues and Solutions

**Issue: "Connection refused" from local to UK**
```bash
# Check UK firewall allows port 3029
ssh devops@217.154.34.155 "sudo ufw status"
# Port 3029 should be ALLOW

# Test connectivity
telnet 217.154.34.155 3029
```

**Issue: "insecure replication is only allowed in test environment"**
- This should NOT happen with the hybrid approach
- Check code in `src/server/DredReplicator.ts:411-438`
- Verify no enforcement of NODE_ENV=test

**Issue: Messages not replicating**
```bash
# Check discovery is working
curl http://localhost:3029/channels | jq
curl http://217.154.34.155:3029/channels | jq
# Both should have the same channels

# Check logs for discovery/replication errors
# Local: Check terminal running make local-dred-run
# UK: ssh devops@217.154.34.155 "pm2 logs dred --lines 50"
```

**Issue: Redis not running locally**
```bash
redis-cli ping
# If fails: brew services start redis (macOS)
```

---

## Cleanup

**Stop local server:**
```bash
# In the terminal running make local-dred-run
Press Ctrl+C
```

**Stop UK server (optional):**
```bash
ssh devops@217.154.34.155 "pm2 stop dred"
```

**Restart UK server:**
```bash
ssh devops@217.154.34.155 "pm2 restart dred"
```

---

## Document Results

After testing, document your findings in `.ai/s/x04/test-results.md`:

- What worked ✅
- What failed ❌
- Error messages encountered
- Performance observations (replication delay)
- Log excerpts showing successful replication

---

## Quick Command Reference

```bash
# Deploy UK server
cd devops && make vps-dred-deploy uk

# Check UK status
make vps-check uk

# View UK logs
make vps-dred-logs uk

# Start local server (keep running)
make local-dred-run

# Create test channel
curl -X POST http://217.154.34.155:3029/channel/test-uk \
  -H "Content-Type: application/json" -H "clientid: test-admin"

# Send test message
curl -X POST http://217.154.34.155:3029/channel/test-uk/message \
  -H "Content-Type: application/json" -H "clientid: test-1" \
  -d '{"type":"test","ocid":"test-001","msg":"Test message"}'

# Check messages
curl http://localhost:3029/channel/test-uk/messages | jq
curl http://217.154.34.155:3029/channel/test-uk/messages | jq
```
