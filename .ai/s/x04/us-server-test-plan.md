# US Server - HTTPS/Secure Replication Test Plan

## Objective
Deploy DRED to US server with HTTPS/secure configuration and verify secure replication works between US server and local development machine.

## Prerequisites
- US server already has infrastructure installed
- SSH access to US server
- Local machine has Redis running
- Repository on correct branch: `feature/onchain-replication-m2`
- **UK server test completed successfully** (recommended)

## Test Configuration

**US Server (Remote):**
- IP: 74.208.13.84
- Protocol: HTTPS (secure)
- Config: `devops/config/us.env` (needs update)
- Node ID: `preprod-us`

**Local Server:**
- IP: 127.0.0.1
- Protocol: HTTPS (secure)
- Config: `.env` (needs update)
- Node ID: `local-dev`

---

## Phase 1: Update Configuration for HTTPS

### Step 1: Update US Server Configuration

Edit `devops/config/us.env` and change the insecure flag:

```bash
# Open the file
nano devops/config/us.env

# Find and change:
DRED_USE_INSECURE=true

# To:
DRED_USE_INSECURE=false
```

**Full `devops/config/us.env` should be:**
```bash
# US Server Environment Configuration
# Server: 74.208.13.84 (US)
# HTTPS/Secure Mode

REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
SERVER_IP=74.208.13.84
NODE_ENV=production
LOGGING=default:debug
DRED_NODE_ID=preprod-us
BF_API_KEY=preprodB0ntxMUrqIeNgLlUvDqLxzQtGvXkfA5s
CARDANO_NETWORK=preprod
USE_STATIC_DISCOVERY=true
DRED_USE_INSECURE=false    # ← Changed to false for HTTPS
```

Save and exit (Ctrl+X, Y, Enter for nano).

### Step 2: Update Local Configuration

Edit `.env` in project root:

```bash
# Open the file
nano .env

# Find and change these lines:
NODE_ENV=test
DRED_USE_INSECURE=true

# To:
NODE_ENV=production
DRED_USE_INSECURE=false
```

**Updated `.env` should include:**
```bash
# Local DRED Environment Configuration
# HTTPS/Secure Mode for US server testing

REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
SERVER_IP=127.0.0.1
NODE_ENV=production          # ← Changed to production
LOGGING=default:info,discovery:debug,replication:debug
DRED_NODE_ID=local-dev
BF_API_KEY=preprodwj3I80hV2evfb5pVuPqhcM14pX4kLYJD
CARDANO_NETWORK=preprod
USE_STATIC_DISCOVERY=true
DRED_USE_INSECURE=false      # ← Changed to false for HTTPS
```

Save and exit.

### Step 3: Verify Configuration Changes

```bash
# Verify US config
cat devops/config/us.env | grep DRED_USE_INSECURE
# Expected: DRED_USE_INSECURE=false

# Verify local config
cat .env | grep -E "DRED_USE_INSECURE|NODE_ENV"
# Expected:
# NODE_ENV=production
# DRED_USE_INSECURE=false
```

---

## Phase 2: Deploy US Server

### Step 4: Test SSH Connection

```bash
cd devops
make srv-connect us
# You should successfully connect to devops@74.208.13.84
# Type 'exit' to disconnect
```

### Step 5: Verify Infrastructure

```bash
# Check if infrastructure is already installed
ssh devops@74.208.13.84 "node --version && redis-cli ping && pm2 --version"
```

**All should succeed.** If not:
```bash
cd devops
make vps-infra-setup us
```

### Step 6: Deploy DRED to US Server

```bash
cd devops
make vps-dred-deploy us
```

**What this does:**
1. Loads `devops/config/us.env` (with `DRED_USE_INSECURE=false`)
2. Clones DRED repository to US server
3. Checks out `feature/onchain-replication-m2` branch
4. Installs dependencies and builds
5. Creates `.env` with **HTTPS configuration**
6. Starts DRED with PM2

**Expected Output:**
```
✅ DRED running with PM2
✅ Auto-restart configured
✅ Environment file created
DRED is running on 74.208.13.84:3029
```

### Step 7: Verify US Server is Running

```bash
cd devops
make vps-check us
```

**Expected:**
- PM2 status shows `dred` process as `online`
- Port 3029 is accessible
- No errors in logs

**Check logs:**
```bash
make vps-dred-logs us
# Should show server startup, HTTPS mode enabled
```

**Test API (HTTPS):**
```bash
# Note: Using https:// instead of http://
curl https://74.208.13.84:3029/ping
# Expected: {"status":"ok"}

curl https://74.208.13.84:3029/channels
# Expected: JSON array of channels
```

**⚠️ SSL Certificate Warning:**
If you see certificate warnings, you may need to use `-k` flag:
```bash
curl -k https://74.208.13.84:3029/ping
```

---

## Phase 3: Start Local Server (HTTPS Mode)

### Step 8: Verify Local Configuration

```bash
# Verify local .env is configured for HTTPS
cat .env | grep -E "DRED_USE_INSECURE|NODE_ENV"
```

**Expected:**
```
NODE_ENV=production
DRED_USE_INSECURE=false
```

### Step 9: Ensure Local Redis is Running

```bash
redis-cli ping
# Expected: PONG
```

**If not running:**
```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis
```

### Step 10: Start Local DRED Server (HTTPS Mode)

**Open a new terminal window:**

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
[timestamp] INFO: Server listening on 0.0.0.0:3029 (HTTPS)
[timestamp] INFO: Replication initialized
```

**Look for:**
- ✅ Server starts in HTTPS/secure mode
- ✅ No protocol errors
- ✅ Replication attempting connections
- ⚠️ May see SSL/TLS handshake messages

**Keep this terminal open!**

---

## Phase 4: Test Secure Replication

### Step 11: Create Test Channel

```bash
# Create test channel on US server (HTTPS)
curl -k -X POST "https://74.208.13.84:3029/channel/test-us" \
  -H "Content-Type: application/json" \
  -H "clientid: test-admin"

# Create same channel on local server (HTTPS)
curl -k -X POST "https://localhost:3029/channel/test-us" \
  -H "Content-Type: application/json" \
  -H "clientid: test-admin"

# Verify channels exist
curl -k https://74.208.13.84:3029/channels | jq
curl -k https://localhost:3029/channels | jq
# Both should include "test-us"
```

**Note:** Using `-k` flag to bypass SSL certificate verification (for testing only).

### Step 12: Test US → Local Secure Replication

**Send a message to US server:**

```bash
curl -k -X POST "https://74.208.13.84:3029/channel/test-us/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-client-1" \
  -d '{
    "type": "test-message",
    "ocid": "us-to-local-secure-001",
    "msg": "Secure message from US to Local!"
  }'
```

**Expected Response:**
```json
{"status":"ok","mid":"..."}
```

**Check local server logs** (terminal running `make local-dred-run`):

Look for:
```
📥 REPLICATION: Message detected from preprod-us in channel 'test-us'
🔒 HTTPS connection established
📤 REPLICATION: Publishing to home server 'local-dev'
✅ Successfully replicated message
```

**Verify message arrived locally:**

```bash
curl -k https://localhost:3029/channel/test-us/messages | jq
```

**Expected:** Array containing message with `ocid: "us-to-local-secure-001"`

### Step 13: Test Local → US Secure Replication

**Send a message from local server:**

```bash
curl -k -X POST "https://localhost:3029/channel/test-us/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-client-2" \
  -d '{
    "type": "test-message",
    "ocid": "local-to-us-secure-001",
    "msg": "Secure message from Local to US!"
  }'
```

**Check US server logs:**

```bash
ssh devops@74.208.13.84 "pm2 logs dred --lines 100 --nostream" | grep -A 5 "local-to-us-secure-001"
```

**Verify message arrived on US:**

```bash
curl -k https://74.208.13.84:3029/channel/test-us/messages | jq
```

**Expected:** Array containing message with `ocid: "local-to-us-secure-001"`

### Step 14: Test Bidirectional Secure Replication

**Send multiple messages:**

```bash
# From US (HTTPS)
curl -k -X POST "https://74.208.13.84:3029/channel/test-us/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-client-3" \
  -d '{"type":"test","ocid":"us-secure-002","msg":"Secure message 2 from US"}'

# From Local (HTTPS)
curl -k -X POST "https://localhost:3029/channel/test-us/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-client-4" \
  -d '{"type":"test","ocid":"local-secure-002","msg":"Secure message 2 from Local"}'

# Wait for replication
sleep 3

# Check both servers have all messages
curl -k https://localhost:3029/channel/test-us/messages | jq '.[] | {ocid, msg}'
curl -k https://74.208.13.84:3029/channel/test-us/messages | jq '.[] | {ocid, msg}'
```

**Expected:** Both servers show all 4 messages with secure transmission.

---

## Phase 5: Verify Secure Communication

### Step 15: Verify HTTPS Protocol in Logs

**Check local server logs for HTTPS indicators:**

Look for:
- `https://` in connection URLs
- SSL/TLS handshake messages
- "Secure connection established" messages
- No "insecure" warnings

**Check US server logs:**

```bash
ssh devops@74.208.13.84 "pm2 logs dred --lines 100 --nostream" | grep -i "https\|ssl\|tls"
```

### Step 16: Test HTTP is Rejected (Optional)

Try connecting with HTTP (should fail or redirect):

```bash
# This should NOT work
curl http://74.208.13.84:3029/ping
# Expected: Connection error or redirect to HTTPS
```

---

## Phase 6: Verify Test Results

### Success Criteria ✅

- [ ] US server configuration updated to `DRED_USE_INSECURE=false`
- [ ] Local configuration updated to `DRED_USE_INSECURE=false`, `NODE_ENV=production`
- [ ] US server deployed successfully via `make vps-dred-deploy us`
- [ ] US server running with HTTPS
- [ ] Local server starts in HTTPS mode
- [ ] SSL/TLS connections established between servers
- [ ] Messages sent to US appear on Local within 2-3 seconds (via HTTPS)
- [ ] Messages sent to Local appear on US within 2-3 seconds (via HTTPS)
- [ ] No protocol errors
- [ ] No "insecure replication" errors
- [ ] Deduplication working (no duplicate messages)
- [ ] Logs show HTTPS connections

### Common Issues and Solutions

**Issue: SSL certificate errors**
```bash
# For testing, use -k flag with curl
curl -k https://...

# Check if server has valid SSL certificates
ssh devops@74.208.13.84 "ls -la ~/dred/certs/"
```

**Issue: "Cannot connect via HTTPS"**
- Check if firewall allows HTTPS (port 443 or 3029)
- Verify `DRED_USE_INSECURE=false` in both configs
- Check server logs for SSL/TLS errors

**Issue: Self-signed certificate warnings**
- Expected for development/testing
- Production should use proper SSL certificates
- Use `-k` flag for testing only

**Issue: Messages not replicating**
```bash
# Check protocol mismatch
# Local trying HTTP to HTTPS server will fail
cat .env | grep DRED_USE_INSECURE
ssh devops@74.208.13.84 "cat ~/dred/.env | grep DRED_USE_INSECURE"
# Both must be: false
```

**Issue: "Connection refused"**
```bash
# Test HTTPS connectivity
openssl s_client -connect 74.208.13.84:3029

# Check firewall
ssh devops@74.208.13.84 "sudo ufw status"
```

---

## Cleanup

**Stop local server:**
```bash
# In terminal running make local-dred-run
Press Ctrl+C
```

**Revert local config to HTTP (for UK testing):**
```bash
nano .env
# Change back:
# NODE_ENV=test
# DRED_USE_INSECURE=true
```

**Stop US server (optional):**
```bash
ssh devops@74.208.13.84 "pm2 stop dred"
```

---

## Document Results

After testing, update `.ai/s/x04/test-results.md` with US server results:

- HTTPS connection success/failure
- SSL/TLS handshake details
- Secure replication performance
- Any certificate issues
- Comparison with HTTP (UK) performance

---

## Quick Command Reference

```bash
# Update configs for HTTPS
nano devops/config/us.env  # Set DRED_USE_INSECURE=false
nano .env                   # Set DRED_USE_INSECURE=false, NODE_ENV=production

# Deploy US server
cd devops && make vps-dred-deploy us

# Check US status
make vps-check us

# View US logs
make vps-dred-logs us

# Start local server (HTTPS mode)
make local-dred-run

# Create test channel (HTTPS)
curl -k -X POST https://74.208.13.84:3029/channel/test-us \
  -H "Content-Type: application/json" -H "clientid: test-admin"

# Send test message (HTTPS)
curl -k -X POST https://74.208.13.84:3029/channel/test-us/message \
  -H "Content-Type: application/json" -H "clientid: test-1" \
  -d '{"type":"test","ocid":"secure-test-001","msg":"Secure test"}'

# Check messages (HTTPS)
curl -k https://localhost:3029/channel/test-us/messages | jq
curl -k https://74.208.13.84:3029/channel/test-us/messages | jq
```

---

## Security Notes

- `-k` flag bypasses SSL certificate verification (testing only)
- Production should use valid SSL certificates from trusted CA
- Self-signed certificates are acceptable for development
- HTTPS ensures encrypted communication between servers
- `NODE_ENV=production` enforces production security settings
