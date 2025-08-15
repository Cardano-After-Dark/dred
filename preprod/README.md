# DRED Pre-Production Testing

Testing the self-identification fix on VPS servers.

## Quick Start

### 1. Deploy to UK Server

```bash
cd preprod
make setup-dred uk
```

This will:
- Pull the `feature/onchain-nbh-discovery` branch
- Configure `DRED_NODE_ID` automatically 
- Build and start DRED with the self-identification fix

### 2. Add Blockfrost API Key (Required)

```bash
cd preprod
./scripts/fix-api-key.sh 217.154.34.155 preprodXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

This will:
- Add your Blockfrost API key to the server
- Restart DRED with the new configuration
- Enable on-chain discovery functionality

**Get your API key at: https://blockfrost.io** (select 'Preprod' testnet)

### 3. Test the Self-Identification Fix

```bash
make test-self-id uk
```

This will:
- Check that `DRED_NODE_ID` is configured
- Look for self-filtering messages in the logs  
- Test API connectivity
- Provide debugging commands

### 4. Update to Latest Changes

```bash
make dred-redeploy uk
```

This will:
- Pull latest changes from `feature/onchain-nbh-discovery`
- Rebuild and restart DRED
- Preserve the existing `DRED_NODE_ID`

## Key Features

### Automatic Node ID Generation

Each server gets a unique `DRED_NODE_ID` based on hostname and IP:
```
DRED_NODE_ID=preprod-hostname-ip
```

### Self-Identification Fix

The fix prevents servers from replicating to themselves by:
1. Setting `DRED_NODE_ID` environment variable
2. Filtering self from peer discovery list
3. Logging the filtering action

### What to Look For

**Success indicators in logs:**
```bash
ssh devops@217.154.34.155 'pm2 logs dred --lines 50'
```

Look for:
- `Filtered out self-node: X -> Y hosts` 
- No self-replication loops
- Normal startup and operation

## Commands

```bash
# Basic server management
make test uk           # Test connectivity
make connect uk        # SSH to server
make dred-status uk    # Check DRED status
make dred-logs uk      # View logs

# Self-identification testing
make test-self-id uk   # Test the fix
make dred-redeploy uk  # Update code

# API key setup
./scripts/fix-api-key.sh 217.154.34.155 preprodXXXXX  # Add Blockfrost key

# Full setup (if needed)
make setup-devops uk   # Create devops user
make setup-infra uk    # Install infrastructure
make setup-dred uk     # Deploy DRED
```

## Configuration

### Branch
- **Current**: `feature/onchain-nbh-discovery`
- **Previous**: `dev3/message-replication-rebased`

### Environment Variables
```bash
REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
NODE_ENV=production
LOGGING=default:info
DRED_NODE_ID=preprod-hostname-ip  # AUTO-GENERATED
BF_API_KEY=preprodXXXXXXXXXXXXXX   # BLOCKFROST API KEY
```

### Servers
- **UK**: 217.154.34.155
- **DE**: 85.215.215.192  
- **US**: 74.208.13.84

## Testing the Fix

The self-identification fix should prevent this issue:
- **Before**: Servers replicated to themselves causing loops
- **After**: Servers filter themselves out of peer lists

### Expected Behavior
1. Server starts with unique `DRED_NODE_ID`
2. NeighborhoodDiscovery.getHostList() filters out self
3. Replication only targets other servers
4. Logs show: "Filtered out self-node: X -> Y hosts"

### Troubleshooting

**Error: required env variable BF_API_KEY is not set**
- Get Blockfrost API key: https://blockfrost.io (select 'Preprod')
- Add key: `./scripts/fix-api-key.sh 217.154.34.155 preprodXXXXX`
- Check logs: `make dred-logs uk`

**No filtering messages?**
- Check `DRED_NODE_ID` is set: `make test-self-id uk`
- Restart with logging: `ssh devops@ip 'cd dred && LOGGING=1 pm2 restart dred'`

**Still seeing self-replication?**
- Verify branch: Should be `feature/onchain-nbh-discovery`
- Check environment: `make dred-status uk`
- Review logs: `make dred-logs uk`

**API not responding?**
- Check firewall: Port 3029 should be open
- Verify PM2: `make dred-status uk`
- Test locally: `ssh devops@ip 'curl localhost:3029/channels'`