# Task X01: Changes and Verification

## Summary of Changes

### 1. Added HTTP/HTTPS Protocol Selection via Environment Variable

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

### 2. Updated Configuration Files

#### `preprod/config/us.env`
Added: `DRED_USE_INSECURE=true`

#### `preprod/config/uk.env`
Added: `DRED_USE_INSECURE=true`

#### `preprod/config/de.env`
Added: `DRED_USE_INSECURE=false`

#### `.env` (local development)
Added: `DRED_USE_INSECURE=true`

### 3. Enhanced Deployment Script

#### `preprod/scripts/setup-dred-minimal.sh`

**Added automatic port cleanup** (lines 75-93):
- Detects processes using port 3029
- Auto-kills lingering processes with warning
- Verifies port is free before proceeding

**Added environment variable handling**:
- Export `DRED_USE_INSECURE` to remote server (line 69)
- Include in `.env` file (line 145)
- Include in PM2 config (line 181)

### 4. Created Message Testing Script

#### `scripts/send-message-on-channel.sh` (new file)
Simple bash script to send test messages to DRED channels:
```bash
Usage: ./send-message-on-channel.sh <address:port> <channel> <message>
Example: ./send-message-on-channel.sh 217.154.34.155:3029 news 'Hello World'
```

## Verification Commands

### 1. Build the Project
```bash
pnpm build
```

### 2. Deploy to Remote Server (UK)
```bash
make setup-dred uk
```

### 3. Verify Remote Server Status
```bash
make test uk
```

Expected output: HTTP 200 response with channel list

### 4. Launch Local DRED with Replication Logging
```bash
LOGGING=default:debug,replicant:trace,replicator:trace pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty
```

Expected output:
- Server starts on port 3029
- Neighborhood discovery finds remote servers
- Replicator connects to remote servers via HTTP
- Replicant subscriptions created for common channels

### 5. Send Test Message to Remote Server
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

### 6. Verify Replication in Local Server Logs

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

## Files Modified

```
src/server/DredReplicator.ts
src/peers/NeighborhoodDiscovery.ts
src/peers/StaticHostDiscovery.ts
preprod/config/us.env
preprod/config/uk.env
preprod/config/de.env
preprod/scripts/setup-dred-minimal.sh
.env
```

## Files Created

```
scripts/send-message-on-channel.sh
.ai/s/x01/wrapup/input-context.md
.ai/s/x01/wrapup/changes-and-verification.md
```