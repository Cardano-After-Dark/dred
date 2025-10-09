# X04: Step-by-Step Test Procedures

## Pre-Test Preparation

### 1. Verify Current Branch and Build

```bash
# Confirm you're on the rebased branch
git branch --show-current
# Expected: feature/onchain-replication-m2

# Check git status
git status

# Rebuild the project with integrated changes
pnpm run build

# Verify build artifacts
ls -la dist/
```

### 2. Check DevOps Configuration

```bash
# Verify config files exist
ls -la devops/config/.env
ls -la devops/config/hosts.conf
ls -la devops/config/team-ssh-keys.private

# Review current DRED_BRANCH setting
cat devops/config/.env | grep DRED_BRANCH
# Should be: feature/onchain-replication-m2 or current branch

# Update DRED_BRANCH if needed
# Edit devops/config/.env and set:
# DRED_BRANCH=feature/onchain-replication-m2
```

---

## Test 1: UK Server - HTTP/Insecure Mode

### Phase 1: UK Server Setup

**Step 1: Reset UK Server**
- Log into your VPS provider
- Reinstall Ubuntu on UK server (217.154.34.155)
- Wait for server to come online
- Note: You'll need root password for first connection

**Step 2: Initial Server Setup**

```bash
# Setup DevOps user with SSH keys
make srv-setup uk
# This will:
# - Prompt for root password
# - Create devops user
# - Install team SSH keys
# - Configure firewall
```

**Step 3: Verify SSH Access**

```bash
# Test SSH connection
make srv-connect uk
# Expected: SSH connection to devops@217.154.34.155 succeeds
# Exit the SSH session: exit
```

**Step 4: Install Infrastructure**

```bash
# Install Node.js, Redis, PM2
make vps-infra-setup uk
# This will:
# - Install Node.js 20.x
# - Install Redis
# - Install PM2
# - Configure services
```

**Step 5: Deploy DRED Application**

```bash
# Deploy DRED from feature/onchain-replication-m2
make vps-dred-deploy uk
# This will:
# - Clone DRED repository
# - Install dependencies
# - Build the project
# - Configure PM2
# - Start DRED server
```

**Step 6: Verify DRED is Running**

```bash
# Check DRED server status
make vps-check uk

# Expected output:
# - PM2 process running
# - Server responds to /ping
# - No errors in logs
```

### Phase 2: Local DRED Setup for HTTP/Insecure

**Step 7: Configure Local Environment for Test Mode**

```bash
# Create or edit .env file in project root
cat > .env << 'EOF'
NODE_ENV=test
DRED_USE_INSECURE=true
DRED_PORT=3029
BF_API_KEY=preprodwj3I80hV2evfb5pVuPqhcM14pX4kLYJD
CARDANO_NETWORK=preprod
LOGGING=default:info,discovery:debug,replication:debug
EOF

# Verify the file
cat .env
```

**Step 8: Start Local DRED Server**

```bash
# Start local DRED in test mode (HTTP/insecure)
make local-dred-run

# Expected output:
# - Server starts on port 3029
# - Logs show: "insecure mode enabled" or similar
# - No errors about protocol enforcement
# - Server ready to accept connections
```

**Keep this terminal open.** Open a new terminal for next steps.

### Phase 3: Test Replication

**Step 9: Send Test Message to UK Server**

In a **new terminal**:

```bash
# Send message to UK server
make dred-send-message uk news "Hello from local - test 1"

# Expected response:
# - HTTP 200 OK
# - Message accepted by UK server
```

**Step 10: Verify Local Server Received Message**

Check the **local DRED terminal** (from Step 8):

```bash
# Look for replication logs showing:
# - Message received from UK server
# - Message replicated to local database
# - No errors
```

Alternative - query local server:

```bash
# In new terminal, query local server for messages
curl http://localhost:3029/channel/news/messages | jq

# Expected: Should see the test message replicated
```

**Step 11: Send Message from Local to UK**

```bash
# Send message from local server
curl -X POST "http://localhost:3029/channel/news/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-local-client" \
  -d '{"type": "test-message", "ocid": "local-test-1", "msg": "Hello from local to UK"}'

# Check UK server received it
make vps-check uk
# Or SSH and check logs:
ssh devops@217.154.34.155 "pm2 logs dred --lines 50 --nostream" | grep "local-test-1"
```

**Step 12: Stop Local Server**

In the local DRED terminal, press `Ctrl+C` to stop.

---

## Test 2: US Server - HTTPS/Secure Mode

### Phase 1: US Server Configuration

**Step 13: Deploy DRED to US Server (with HTTPS)**

```bash
# Update devops/config/.env for secure mode
# Edit devops/config/.env and set:
# DRED_USE_INSECURE=false

# Deploy to US server
make vps-dred-deploy us

# Verify DRED is running with HTTPS
make vps-check us
```

### Phase 2: Local DRED Setup for HTTPS/Secure

**Step 14: Configure Local Environment for Production Mode**

```bash
# Update .env file for secure mode
cat > .env << 'EOF'
NODE_ENV=production
DRED_USE_INSECURE=false
DRED_PORT=3029
BF_API_KEY=preprodwj3I80hV2evfb5pVuPqhcM14pX4kLYJD
CARDANO_NETWORK=preprod
LOGGING=default:info,discovery:debug,replication:debug
EOF

# Verify
cat .env
```

**Step 15: Start Local DRED Server (HTTPS Mode)**

```bash
# Start local DRED in production mode (HTTPS)
make local-dred-run

# Expected output:
# - Server starts on port 3029
# - Using HTTPS protocol
# - SSL/TLS configuration loaded
# - Server ready for secure connections
```

**Keep this terminal open.**

### Phase 3: Test Secure Replication

**Step 16: Send Test Message to US Server**

In a **new terminal**:

```bash
# Send message to US server via HTTPS
make dred-send-message us news "Hello from local - secure test"

# Expected response:
# - HTTPS connection successful
# - HTTP 200 OK
# - Message accepted
```

**Step 17: Verify Local Server Received Message Securely**

Check the **local DRED terminal**:

```bash
# Look for replication logs showing:
# - Secure HTTPS connection from US server
# - Message received and replicated
# - SSL/TLS handshake successful
# - No protocol errors
```

Alternative - query local server:

```bash
# Query local server for messages
curl https://localhost:3029/channel/news/messages | jq

# Expected: Should see the secure test message
```

**Step 18: Send Message from Local to US (Secure)**

```bash
# Send message from local server via HTTPS
curl -X POST "https://localhost:3029/channel/news/message" \
  -H "Content-Type: application/json" \
  -H "clientid: test-local-secure" \
  -d '{"type": "test-message", "ocid": "local-secure-1", "msg": "Hello from local to US via HTTPS"}'

# Check US server received it
ssh devops@74.208.13.84 "pm2 logs dred --lines 50 --nostream" | grep "local-secure-1"
```

**Step 19: Stop Local Server**

Press `Ctrl+C` in the local DRED terminal.

---

## Post-Test Activities

### Step 20: Document Results

Create `.ai/s/x04/test-results.md` with:
- What worked ✅
- What failed ❌
- Errors encountered
- Performance observations
- Log excerpts

### Step 21: Identify Required Fixes

If any issues were found, create `.ai/s/x04/fixes-required.md` with:
- Problem description
- Root cause analysis
- Proposed solution
- Code changes needed

### Step 22: Apply Fixes (if needed)

```bash
# Make necessary code changes
# Test locally
# Commit changes with descriptive message
git add <files>
git commit -m "fix: <description of fix>"
```

### Step 23: Re-test After Fixes

Repeat failed test scenarios to verify fixes work.

### Step 24: Clean Up

```bash
# Stop all local servers
# Close SSH sessions
# Update .ai/s/x04/summary.md
```

---

## Troubleshooting

### Issue: "insecure replication is only allowed in test environment"

**Cause:** `NODE_ENV` is not set to `test` when using `DRED_USE_INSECURE=true`

**Solution:**
```bash
# Set NODE_ENV=test in .env file
echo "NODE_ENV=test" >> .env

# Or run with environment variable
NODE_ENV=test make local-dred-run
```

### Issue: Local server won't start

**Check:**
```bash
# Port already in use?
lsof -i :3029

# Kill existing process if needed
kill -9 <PID>

# Check logs
tail -f logs/dred-server.log
```

### Issue: Replication not working

**Check:**
```bash
# Network connectivity
curl http://217.154.34.155:3029/ping

# Redis running locally
redis-cli ping

# Check discovery configuration
cat .env | grep DISCOVERY
```

### Issue: SSH connection fails

**Check:**
```bash
# Verify IP in hosts.conf
cat devops/config/hosts.conf

# Try direct SSH
ssh devops@217.154.34.155

# Check SSH keys
ls -la ~/.ssh/
```

---

## Quick Reference

### Server IPs (from hosts.conf)

```bash
UK_SERVER=217.154.34.155
US_SERVER=74.208.13.84
DE_SERVER=85.215.215.192
```

### Key Environment Variables

```bash
# Test Mode (HTTP/insecure)
NODE_ENV=test
DRED_USE_INSECURE=true

# Production Mode (HTTPS/secure)
NODE_ENV=production
DRED_USE_INSECURE=false
```

### Essential Commands

```bash
# Server setup
make srv-setup <server>
make vps-infra-setup <server>
make vps-dred-deploy <server>
make vps-check <server>

# Local development
make local-dred-run

# Testing
make dred-send-message <server> <channel> <message>
```
