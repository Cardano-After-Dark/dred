# DRED Testing & VPS Deployment Workflows - Quick Reference

## Testing Workflow Overview

### Local Development Testing

**Prerequisites**: Redis running, ports 53032-53034 free, Node.js 20.x + pnpm 10.11.0

**Quick Commands**:
```bash
# Setup Redis
./scripts/setupEnvironment
# or
docker-compose up redis

# Run tests
pnpm test replication | pnpm exec pino-pretty           # Recommended
LOGGING=1 pnpm test replication | pnpm exec pino-pretty  # Detailed logs
pnpm test:debug                                          # Debug mode
```

**Success Indicators**:
- ✅ All tests pass with green checkmarks
- ✅ "server 'first' listening at localhost:53032"
- ✅ "DredReplicator-[first] initializing"
- ✅ "📤 REPLICATION: Publishing to home server"
- ✅ No Redis connection errors

### VPS Testing

**Prerequisites**: VPS servers deployed and accessible

**Quick Commands**:
```bash
# Update VPS server IPs in pre-prod/test.vps.ts
# Then run VPS tests
pnpm test pre-prod/test.vps.ts
```

**Success Indicators**:
- ✅ Health checks pass for all VPS servers
- ✅ API functionality tests succeed
- ✅ Cross-VPS replication works
- ✅ Response times < 5 seconds

## VPS Deployment Workflow Overview

### Streamlined Automated Deployment (Recommended)

**Prerequisites**: SSH keys configured, root access to servers

**4-Step Process**:
```bash
# Step 1: User setup
make setup-devops [server] && make test [server]

# Step 2: Infrastructure
make setup-infra [server] && make test [server]

# Step 3: DRED application
make setup-dred [server] && make test [server]

# Step 4: Verification
make dred-status [server]
```

**Available Servers**: `uk` (test), `de` (production), `us` (production)

**Management Commands**:
```bash
make dred-redeploy [server]    # Update DRED
make dred-status [server]      # Check status
make dred-logs [server]        # View logs
make connect [server]          # SSH access
```

### Manual Deployment (Learning/Custom)

**5-Phase Process**:
1. **Security Setup**: UFW, fail2ban, SSH keys
2. **Software Installation**: Node.js, pnpm, Redis, PM2
3. **User Management**: Create devops user with sudo
4. **Application Deployment**: Clone, build, configure DRED
5. **Service Management**: PM2 configuration and startup

**Success Verification**:
```bash
pm2 status                              # Process running
curl http://SERVER_IP:3029/channels     # API responding
make test [server]                      # External connectivity
```

## Environment Configuration for On-Chain Discovery

### Required Environment Variables

Each production VPS needs:
```bash
export DRED_NODE_ID="dred-production-server-01"  # Unique per server
export CARDANO_NETWORK="testnet"                 # Network type
export BF_API_KEY="your-blockfrost-api-key"      # Blockchain access
```

### Multi-Server Configuration

For replication networks:
```bash
# UK Server
export DRED_NODE_ID="dred-production-uk-01"

# DE Server  
export DRED_NODE_ID="dred-production-de-01"

# US Server
export DRED_NODE_ID="dred-production-us-01"
```

## Testing the On-Chain Discovery Fix

### Before Fix (Expected Issue)
```bash
# Should see servers trying to replicate to themselves
LOGGING=1 pnpm test replication | pnpm exec pino-pretty
# Look for: attempts to connect to same serverId
```

### After Fix (Expected Success)
```bash
# Set environment variable for testing
export DRED_NODE_ID="first"  # For test environment

# Run tests - should see self-filtering
LOGGING=1 pnpm test replication | pnpm exec pino-pretty
# Look for: "Filtering out self-node with ID: first"
```

### VPS Testing with Fix

```bash
# On each VPS, set appropriate DRED_NODE_ID
ssh devops@SERVER_IP
export DRED_NODE_ID="dred-production-server-01"
pm2 restart dred-vps-server

# Run VPS tests to verify replication
pnpm test pre-prod/test.vps.ts
```

## Common Issues and Quick Fixes

### Testing Issues

| Issue | Quick Fix |
|-------|-----------|
| Redis connection refused | `./scripts/setupEnvironment` |
| Port conflicts | `lsof -ti:53032,53033,53034 \| xargs kill -9` |
| Test timeouts | `redis-cli ping` (check Redis) |
| Hanging tests | `pkill -f "node.*vitest"` |

### VPS Issues

| Issue | Quick Fix |
|-------|-----------|
| SSH connection failed | `make setup-devops [server]` |
| DRED not responding | `make dred-status [server]` |
| Port blocked | `ssh devops@SERVER_IP "sudo ufw allow 3029/tcp"` |
| Service down | `ssh devops@SERVER_IP "pm2 restart dred-vps-server"` |

## Monitoring and Maintenance

### Daily Checks
```bash
# VPS health check
make dred-status [server]
make test [server]

# Local development  
pnpm test replication
```

### Weekly Maintenance
```bash
# Update VPS deployments
make dred-redeploy [server]

# Check logs for issues
make dred-logs [server]

# System resource check
ssh devops@SERVER_IP "htop; free -h; df -h"
```

## Complete MS2 Milestone Workflow

### 1. Fix Implementation (15 minutes)
```bash
# Implement self-identification fix
# Modify src/peers/NeighborhoodDiscovery.ts
# Add environment variable filtering
```

### 2. Local Testing (30 minutes)
```bash
# Test fix locally
export DRED_NODE_ID="first"
LOGGING=1 pnpm test replication | pnpm exec pino-pretty
# Verify self-filtering works
```

### 3. VPS Deployment (1 hour)
```bash
# Deploy to multiple VPS servers
make setup-devops uk de us
make setup-infra uk de us  
make setup-dred uk de us
```

### 4. Production Testing (30 minutes)
```bash
# Set unique node IDs on each server
# Test cross-server replication
pnpm test pre-prod/test.vps.ts
```

### 5. MS2 Validation (15 minutes)
- ✅ On-chain registry queried successfully
- ✅ Self-identification working (no self-replication)
- ✅ Multiple nodes connecting to each other
- ✅ Messages replicating between discovered nodes
- ✅ Production deployment with environment variables

**Total Time to Complete MS2**: ~2-3 hours

## Key Files and Locations

### Testing
- **Test Commands**: `development/testing-guide.md`
- **Local Tests**: `src/server/__tests__/replication.test.ts`
- **VPS Tests**: `pre-prod/test.vps.ts`
- **Test Setup**: `src/server/testServer.ts`

### VPS Deployment
- **Automated**: `pre-prod/Makefile` + scripts
- **Manual Guide**: `pre-prod/README.md`
- **Server Config**: `pre-prod/servers.conf`
- **Deployment Checklist**: `pre-prod/deployment-checklist.md`

### Implementation
- **Main Fix**: `src/peers/NeighborhoodDiscovery.ts`
- **Environment Variables**: Server-specific DRED_NODE_ID
- **Documentation**: `.ai/analysis/s06/` (complete analysis)

This workflow overview provides quick reference for all DRED testing and deployment procedures, ensuring consistent and successful operations across development and production environments.
