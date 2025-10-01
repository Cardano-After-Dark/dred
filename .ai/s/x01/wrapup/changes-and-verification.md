# Task X01: Changes and Verification

## Summary of Changes

### 1. Fixed Signal Handler Registration (Critical)

**Problem**: Signal handlers (SIGINT/SIGTERM) were registered AFTER blockchain initialization, which could block indefinitely. This caused:
- Port 3029 to remain occupied after CTRL+C on local machine
- PM2 unable to properly stop stuck processes on remote servers

**Solution**: Moved signal handlers to top of `init()` function, before any async operations.

**Modified File:**

#### `bin/dredServer` (lines 12-33, 104-111)
- Moved `gracefulShutdown` function and signal handler registration to the beginning of `init()`
- Changed `const server` to `let server = null` in outer scope
- Added null check before calling `server.close()`
- Signal handlers now registered BEFORE blockchain discovery
- Ensures proper cleanup even if process gets stuck during initialization

### 2. Added Static Discovery Workaround

**Problem**: `NeighborhoodDiscovery` gets stuck in infinite "Delegate configuration requires upgrade" loop during blockchain initialization, preventing server from starting and binding to port 3029.

**Solution**: Use `USE_STATIC_DISCOVERY=true` to bypass blockchain discovery entirely.

**Modified Files:**

#### `preprod/config/us.env`
Added comment and set `USE_STATIC_DISCOVERY=true`:
```bash
# WORKAROUND: Using static discovery to bypass blockchain discovery delegate upgrade loop
# The NeighborhoodDiscovery gets stuck in "Delegate configuration requires upgrade" loop
# preventing server from starting. Static discovery allows server to start successfully.
USE_STATIC_DISCOVERY=true
```

#### `preprod/config/uk.env`
Added same workaround and comment as US server:
```bash
# WORKAROUND: Using static discovery to bypass blockchain discovery delegate upgrade loop
USE_STATIC_DISCOVERY=true
```

### 3. Added HTTP/HTTPS Protocol Selection via Environment Variable

Implemented `DRED_USE_INSECURE` environment variable to control whether servers use HTTP or HTTPS protocol.

**Modified Files:**

#### `src/server/DredReplicator.ts` (lines 408-438)
- Fixed `checkServerAvailability()` method to respect `insecure` flag from `DredHostDetails`
- Changed from hardcoded `https://` to dynamic protocol selection: `http://` or `https://`
- Added better error handling and logging for connection failures

#### `src/peers/NeighborhoodDiscovery.ts`
- **`myServerInfo()` method** (lines 38-54): Added `insecure` flag based on `DRED_USE_INSECURE` env var
- **`getHostList()` method** (lines 142-156): Propagate `DRED_USE_INSECURE` to all discovered hosts

#### `src/peers/StaticHostDiscovery.ts` (lines 61-75)
- Modified `defaultHosts()` method to read `DRED_USE_INSECURE` env var
- Set `insecure` flag on default host configuration

### 4. Updated Configuration Files

#### `preprod/config/us.env`
- Added: `USE_STATIC_DISCOVERY=true` (with comment explaining blockchain loop workaround)
- Added: `DRED_USE_INSECURE=true`

#### `preprod/config/uk.env`
- Added: `USE_STATIC_DISCOVERY=true` (with comment explaining blockchain loop workaround)
- Added: `DRED_USE_INSECURE=true`

#### `preprod/config/de.env`
- Added: `DRED_USE_INSECURE=false`

#### `.env` (local development)
- Added: `DRED_USE_INSECURE=true`

### 5. Enhanced Deployment Script

#### `preprod/scripts/setup-dred-minimal.sh`

**Added automatic port cleanup** (lines 75-93):
- Detects processes using port 3029
- Auto-kills lingering processes with warning
- Verifies port is free before proceeding

**Added environment variable handling**:
- Export `USE_STATIC_DISCOVERY` to remote server
- Export `DRED_USE_INSECURE` to remote server (line 69)
- Include in `.env` file (line 145)
- Include in PM2 config (line 181)

### 6. Created Message Testing Script

#### `scripts/send-message-on-channel.sh` (new file)
Simple bash script to send test messages to DRED channels:
```bash
Usage: ./send-message-on-channel.sh <address:port> <channel> <message>
Example: ./send-message-on-channel.sh 217.154.34.155:3029 news 'Hello World'
```

## Verification Commands

**⚠️ CRITICAL**: Before deploying to remote servers, you MUST commit and push all changes to the `feature/onchain-replication-m2` branch. The deployment script clones directly from GitHub, so uncommitted local changes will NOT be deployed.

### 1. Commit and Push Changes
```bash
git add .
git commit -m "fix: signal handlers, static discovery workaround, and HTTP/HTTPS protocol selection"
git push
```

### 2. Build the Project Locally
```bash
pnpm build
```

### 3. Deploy to Remote Server (UK)
```bash
cd preprod
make setup-dred uk
```

### 4. Verify Remote Server Status
```bash
make test uk
```

Expected output:
```
✓ SSH connection successful
✓ DRED server responding on port 3029
   Available channels: {"channels":["news","discussion",...]}
```

### 5. Launch Local DRED with Replication Logging
```bash
cd ..
LOGGING=default:debug,replicant:trace,replicator:trace pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty
```

Expected output:
- Server starts on port 3029
- Neighborhood discovery finds remote servers
- Replicator connects to remote servers via HTTP
- Replicant subscriptions created for common channels
- **Press CTRL+C to verify port is properly released** (signal handler fix)

### 6. Send Test Message to Remote Server
```bash
chmod +x scripts/send-message-on-channel.sh
./scripts/send-message-on-channel.sh 217.154.34.155:3029 news "Testing replication from UK to local server"
```

Expected output:
```json
{
  "id": "1759198807638-0",
  "status": "created",
  "ocid": "test-1759198807-28410"
}

HTTP Status: 200
```

### 7. Verify Replication in Local Server Logs

Look for these log entries in the local DRED server output:

**Connection established:**
```
✅ [preprod-local] Successfully connected to dredNode-10d84498548a at http://217.154.34.155:3029
```

**Replication detected:**
```
📥 REPLICATION: Message detected from dredNode-10d84498548a in channel 'news' (1759198807638-0)
```

**Message published locally:**
```
📤 REPLICATION: Publishing to home server 'dredNode-e0fcf1e0b866' in channel 'news' (ocid: test-1759198807-28410)
```

**Deduplication success:**
```
✅ DEDUP PUBLISH [dredNode-e0fcf1e0b866] Message successfully deduplicated and posted: 1759198807673-0
```

## Test Results

✅ **All verification steps passed successfully**

- Local DRED server running with trace logging
- Connected to UK server (217.154.34.155:3029) via HTTP
- Test message sent: OCID `test-1759198807-28410`
- Message replicated from UK server to local server
- Full trace logs showing complete message flow
- HTTP/HTTPS protocol selection working correctly based on `DRED_USE_INSECURE` configuration

## Key Lessons Learned

1. **Commit Before Deploy**: The deployment script (`setup-dred-minimal.sh`) clones from GitHub, so local uncommitted changes are NOT deployed to remote servers.

2. **Signal Handler Timing**: Register signal handlers BEFORE any blocking async operations to ensure proper cleanup on CTRL+C.

3. **Static Discovery Workaround**: When blockchain discovery fails (delegate upgrade loop), `USE_STATIC_DISCOVERY=true` allows servers to start with hardcoded peer list.

4. **Port Cleanup**: The deployment script now automatically kills processes holding port 3029, ensuring idempotent deployments.

## Files Modified

```
bin/dredServer                              # Signal handler registration fix
src/server/DredReplicator.ts                # HTTP/HTTPS protocol selection
src/peers/NeighborhoodDiscovery.ts          # DRED_USE_INSECURE propagation
src/peers/StaticHostDiscovery.ts            # DRED_USE_INSECURE support
preprod/config/us.env                       # Static discovery + HTTP workaround
preprod/config/uk.env                       # Static discovery + HTTP workaround
preprod/config/de.env                       # HTTPS configuration
preprod/scripts/setup-dred-minimal.sh       # Port cleanup + env var handling
.env                                        # Local development HTTP config
```

## Files Created

```
scripts/send-message-on-channel.sh          # Message testing utility
.ai/s/x01/wrapup/input-context.md           # Task context documentation
.ai/s/x01/wrapup/changes-and-verification.md # This file
```