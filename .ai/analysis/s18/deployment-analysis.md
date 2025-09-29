# Session S18 - Deployment Analysis

## Current Status: ✅ DEPLOYMENT SUCCESSFUL, ❌ PORT NOT ACCESSIBLE

### Deployment Success Indicators
- ✅ **Correct Branch**: `feature/onchain-replication-m2` deployed (line 86-87)
- ✅ **Build Successful**: `dist/dredServer.mjs` created (line 155-156)
- ✅ **PM2 Running**: Process online, 5m uptime, 217.8mb memory (line 221)
- ✅ **Environment**: `preprod-us` node ID, correct API key (lines 158-160)
- ✅ **Auto-restart**: Configured with PM2 (line 172)

### Critical Issue: Port 3029 Not Accessible
```
❌ DRED port 3029 not accessible
⚠ DRED server not responding on port 3029
```

## Root Cause Analysis

### 1. **Firewall Configuration Issue**
The deployment script notes: `Note: Check cloud firewall settings` (line 192)

**Problem**: The server process is running internally but external access to port 3029 is blocked.

### 2. **Environment Variable Comparison**

#### Current Deployment (.env on server):
```bash
REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
NODE_ENV=production
LOGGING=default:info
DRED_NODE_ID=preprod-us
BF_API_KEY=preprodB0ntxMUrqIeNgLlUvDqLxzQtGvXkfA5s
```

#### Missing Variables (from current codebase):
- `STATUS_INTERVAL_SECONDS` (defaults to "5" in code)
- `REPLICATION_RETRY_INTERVAL_SECONDS` (defaults to 60)
- `DISABLE_AUTO_REPLICATION` (not needed in production)
- `CARDANO_NETWORK=preprod` (from us.env config)

### 3. **Server Configuration Analysis**

#### From setup-dred-minimal.sh:
- ✅ Uses correct branch: `feature/onchain-replication-m2`
- ✅ Loads us.env configuration properly
- ✅ Sets DRED_HOST=0.0.0.0 (should bind to all interfaces)
- ✅ Sets DRED_PORT=3029

#### From us.env:
```bash
BF_API_KEY=preprodB0ntxMUrqIeNgLlUvDqLxzQtGvXkfA5s
DRED_NODE_ID=preprod-us
CARDANO_NETWORK=preprod
LOGGING=default:debug
USE_STATIC_DISCOVERY=false
```

## Required Actions

### Immediate Fix: Open Firewall Port
The server needs port 3029 opened in the cloud firewall:

```bash
# Check if port is bound internally
ssh devops@74.208.13.84 "netstat -tlnp | grep 3029"

# Check firewall status
ssh devops@74.208.13.84 "sudo ufw status"

# Open port 3029 if needed
ssh devops@74.208.13.84 "sudo ufw allow 3029"
```

### Environment Variables Enhancement
Update deployment to include missing variables:

```bash
# Add to .env on server
CARDANO_NETWORK=preprod
STATUS_INTERVAL_SECONDS=5
REPLICATION_RETRY_INTERVAL_SECONDS=60
```

## Next Steps

1. **Fix Port Access** (Priority 1)
2. **Verify Server Logs** to ensure no startup errors
3. **Test External Connection** with updated client
4. **Monitor Replication** functionality

## Expected Result After Fix
- External access to `74.208.13.84:3029` should work
- Client connection should succeed
- Replication testing can proceed
