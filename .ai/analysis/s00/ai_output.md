# Session S00 - AI Output Summary

## Analysis Provided

### Key Finding: Existing Infrastructure Discovered
The DRED project already has comprehensive VPS deployment infrastructure:

1. **Automated Setup Scripts**: `pre-prod/setup-vps.sh` - Complete VPS setup automation (UNTESTED)
2. **Deployment Checklist**: `pre-prod/deployment-checklist.md` - 187-line comprehensive checklist
3. **Docker Configuration**: `Dockerfile` and `docker-compose.yml` for containerized deployment
4. **PM2 Configuration**: Process management with auto-restart and logging
5. **Security Setup**: SSH key management, firewall configuration, fail2ban
6. **Working Makefile**: Commands to test server connectivity and Redis status

### CRITICAL ARCHITECTURAL INSIGHT: Redis is Essential

**DRED absolutely requires Redis to function.** This is not optional - DRED will fail to start without Redis access.

#### Redis Usage in DRED:
- **Message Storage**: Redis Streams for message queuing and history
- **Channel Management**: Redis Hashes for channel metadata and options
- **Real-time Messaging**: Redis pub/sub for live message distribution
- **Message Deduplication**: Redis Sets to prevent duplicate messages during replication
- **Multi-server Replication**: Redis handles message synchronization between DRED servers

#### Redis Connection:
- **Environment Variable**: `REDIS_URL` (default: "redis://localhost:6379")
- **Multiple Connections**: DRED creates main connection + duplicates for different purposes
- **Failure Mode**: DRED server fails if Redis is unreachable

## Deployment Architecture Options

### Option 1: Pure Docker (Simplest) 🐳
```yaml
# docker-compose.yml (existing)
version: "3"
services:
  redis:
    image: redis:latest
    command: ["redis-server", "--bind", "redis", "--port", "6379"]
    ports:
      - '6379:6379'
  dred:
    build: ./
    environment:
      - 'REDIS_URL=redis://default:@redis:6379'
    ports:
      - '3000:3029'
    depends_on:
      - 'redis'
```

**Pros:**
- **Zero dependency management** - Docker handles everything
- **Isolated environments** - No conflicts with system packages
- **Easy port management** - Docker handles port mapping
- **Simple deployment** - Just `docker-compose up -d`
- **Built-in dependency ordering** - Redis starts before DRED

**Cons:**
- Requires Docker knowledge
- Additional resource overhead
- Harder to debug individual components

### Option 2: Hybrid Docker Redis + Direct DRED (Recommended) 🎯
```bash
# Start Redis in Docker
docker run -d --name dred-redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:alpine redis-server --appendonly yes

# Run DRED directly
cd /home/devops/dred
export REDIS_URL=redis://localhost:6379
pnpm run build
pm2 start ecosystem.config.js
```

**Pros:**
- **Best of both worlds** - Redis isolation + DRED control
- **Easy Redis management** - Container handles Redis complexity
- **Direct DRED debugging** - Full access to logs and processes
- **Flexible scaling** - Can move Redis to separate server later
- **Data persistence** - Redis data survives container restarts

**Cons:**
- Mixed deployment complexity
- Need to manage both Docker and system processes

### Option 3: Pure System Installation (Most Complex) 🔧
```bash
# Install Redis system-wide
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Install DRED dependencies
sudo apt install nodejs npm
sudo npm install -g pnpm pm2
cd /home/devops/dred
pnpm install
pnpm build
pm2 start ecosystem.config.js
```

**Pros:**
- **Full system control** - Everything is directly manageable
- **Lower resource usage** - No container overhead
- **System integration** - Uses systemd for Redis management

**Cons:**
- **Complex dependency management** - Must handle Node.js, Redis versions manually
- **Potential conflicts** - System packages may conflict
- **More maintenance** - Manual updates and configuration

## Network Architecture

### Port Configuration
- **DRED Server**: 3029 (main application port)
- **Redis**: 6379 (internal communication, can be containerized)
- **SSH**: 22 (secured access)

### Firewall Requirements
```bash
# UFW configuration
sudo ufw allow ssh
sudo ufw allow 3029/tcp  # DRED server
# Redis port 6379 should NOT be exposed externally
sudo ufw --force enable
```

## My Strong Recommendation: Hybrid Approach

**For your US server (DRED one), I recommend Option 2** because:

1. **Redis containerization eliminates complexity** - No Redis configuration, version management, or security hardening needed
2. **DRED runs directly for easy debugging** - Full access to logs, process management, and troubleshooting
3. **Proven pattern** - Many production systems use containerized databases with direct applications
4. **Scalability path** - Easy to move Redis to a separate server later
5. **Data safety** - Redis container with volume persistence

## Implementation Steps

### Phase 1: Basic Setup (Using existing Makefile)
```bash
# Test server connectivity
make test us

# This will show you Redis status and help verify the server is ready
```

### Phase 2: Redis Setup
```bash
# Install Docker
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker

# Start Redis container
docker run -d --name dred-redis \
  -p 6379:6379 \
  -v redis-data:/data \
  --restart unless-stopped \
  redis:alpine redis-server --appendonly yes
```

### Phase 3: DRED Setup
```bash
# Clone and build
git clone <your-repo-url> dred
cd dred
git checkout dev3/message-replication-rebased
pnpm install
pnpm build

# Configure environment
export REDIS_URL=redis://localhost:6379

# Start with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

## Hardware Optimization for 2GB RAM

### Memory-Optimized Redis Configuration
```bash
# Redis with 512MB limit (25% of total RAM)
docker run -d --name dred-redis \
  --restart unless-stopped \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:alpine redis-server \
  --appendonly yes \
  --maxmemory 512mb \
  --maxmemory-policy allkeys-lru
```

### PM2 Configuration with Memory Limits
```javascript
{
  max_memory_restart: '800M',  // Restart DRED if exceeds 800MB
  instances: 1,                // Single process (no clustering)
}
```

### Expected Memory Distribution
- **Ubuntu system**: ~300-400MB
- **Docker**: ~50-100MB  
- **Redis container**: ~100-200MB
- **DRED process**: ~200-400MB
- **Available buffer**: ~1GB

## Final Deliverable: Complete Manual Deployment Guide

Created comprehensive step-by-step guide in `artifacts/manual-deployment-guide.md` with:

✅ **10 phases** covering complete deployment  
✅ **Memory optimization** for 2GB RAM constraint  
✅ **Verification steps** for each phase  
✅ **Troubleshooting commands** for common issues  
✅ **Success criteria** for completion validation  
✅ **Resource monitoring** throughout process  

## Key Questions for You:

1. **Are you comfortable with Docker basics?** (pulling images, running containers) ✅ **ANSWERED: Yes**
2. **Do you want to test the existing Makefile commands first?** (`make test us`) ✅ **DONE: SSH OK, DRED not responding**
3. **Should we proceed with the hybrid approach?** (Docker Redis + Direct DRED) ✅ **CONFIRMED: Yes**
4. **Any specific Redis configuration requirements?** (memory limits, persistence, etc.) ✅ **CONFIRMED: 2GB RAM constraint handled**

## Next Steps

1. **Execute manual deployment** following the step-by-step guide
2. **Document any issues** or deviations encountered
3. **Validate resource usage** stays within 2GB limit
4. **Test DRED functionality** (create channels, send messages)
5. **Create automation script** for other servers based on manual experience

The hybrid approach gives you the best balance of simplicity and control, and you can always migrate to pure Docker later if needed.

## Key Discovery: DRED_HOST Environment Variable

During deployment, we discovered that DRED server was binding to `127.0.0.1` (localhost only) instead of respecting the `DRED_HOST=0.0.0.0` environment variable. This was because the server uses a discovery service to determine its bind address, and the `StaticHostDiscovery.defaultHosts()` method was hardcoded to use `127.0.0.1`.

**Fix Applied:**
- Modified `src/peers/StaticHostDiscovery.ts` to read from environment variables
- Added support for `DRED_HOST` and `DRED_PORT` environment variables
- Maintains backwards compatibility with default values

**Code Change:**
```typescript
static defaultHosts() : DredHostDetails[] {
    // Read host and port from environment variables for production deployment
    const host = process.env.DRED_HOST || "127.0.0.1";
    const port = parseInt(process.env.DRED_PORT || "3029");
    
    return [{
        serverId: "singleton",
        address: host,
        port: port,
        insecure: true,            
    }]
}
```

This fix allows DRED to properly bind to external interfaces in production deployments.

## Critical Deployment Discoveries

### 1. **VPS Provider Firewall is Critical**
The most common deployment failure point is **VPS provider cloud firewall**, not the OS firewall:
- **OS Firewall (UFW)**: Allows connections that reach the server
- **Cloud Firewall**: Controls what traffic reaches the server at all
- **IONOS specifically requires**: Adding TCP port 3029 to cloud firewall rules
- **Symptom**: `nc -v IP PORT` times out (not immediately rejected)

### 2. **Memory Constraints More Severe Than Expected**
- **Advertised**: 2GB RAM VPS
- **Actual Available**: 1.8GB RAM after OS overhead
- **Required Adjustment**: Redis 400MB (not 512MB), DRED 600MB (not 800MB)
- **Monitoring**: Use `free -h` and `docker stats` to verify limits

### 3. **PM2 Configuration File Extension**
- **Issue**: `ecosystem.config.js` failed with "module is not defined"
- **Solution**: Use `ecosystem.config.cjs` for CommonJS modules
- **Reason**: Node.js project configured as ES module, but PM2 config needs CommonJS

### 4. **Build Warnings Are Often Harmless**
- **Yarn warning**: "yarn: not found" during build (src/redis/streams subproject)
- **Stellar warnings**: Failed to create stellar-deploy bins
- **Result**: Main build succeeded despite warnings
- **Lesson**: Focus on final dist/ files, not intermediate warnings

### 5. **Testing Methodology is Crucial**
**Sequential Testing Approach:**
1. **Local server test**: `curl localhost:3029/channels` (on VPS)
2. **External IP test**: `curl VPS_IP:3029/channels` (on VPS)
3. **Port accessibility**: `nc -v VPS_IP 3029` (from local machine)
4. **External API test**: `curl VPS_IP:3029/channels` (from local machine)

This sequence isolates: app issues → binding issues → firewall issues → API issues

### 6. **Debugging Commands Reference**
```bash
# Check what's listening on port
ss -tlnp | grep 3029

# Check firewall rules
sudo ufw status verbose
sudo iptables -L -n

# Check memory usage
free -h
docker stats --no-stream

# Check process status
pm2 status
pm2 logs APP_NAME --lines 20

# Test connectivity
nc -v IP PORT
curl -s http://IP:PORT/endpoint
```

### 7. **Git Integration for Code Fixes**
**Proper workflow discovered:**
1. Fix code locally on development branch
2. Commit with descriptive message
3. Push to repository
4. Pull changes on VPS
5. Rebuild and restart

**Avoid**: Direct editing of files on production server

### 8. **Environment Variable Precedence**
**Discovery**: Environment variables set in PM2 config take precedence over .env files
- **Working**: PM2 ecosystem.config.cjs `env` section
- **Not working**: .env file for server binding
- **Lesson**: Use PM2 config for production environment variables

## Resource Usage Optimization

### Final Memory Distribution (1.8GB VPS)
- **Ubuntu OS**: ~400MB
- **Docker**: ~100MB  
- **Redis Container**: 400MB limit (actual: 4MB initial)
- **DRED Process**: 600MB limit (actual: 40MB initial)
- **Buffer**: 300MB for system operations
- **Total**: Well within 1.8GB available

### Performance Characteristics
- **Startup Time**: ~10 seconds for full stack
- **Memory Growth**: Minimal during testing
- **CPU Usage**: 0% idle, spikes during operations
- **Network**: No latency issues over internet

## IONOS-Specific Considerations

### Firewall Configuration
**Default IONOS Rules**: SSH (22), HTTP (80), HTTPS (443), Management (8443, 8447)
**Required Addition**: TCP port 3029 for DRED API
**Propagation Time**: 2-3 minutes for firewall changes

### VPS Characteristics
- **IP Assignment**: Static public IP
- **DNS**: No reverse DNS setup required
- **Networking**: Standard TCP/IP, no special routing
- **Security**: Default Ubuntu security + IONOS cloud firewall

## Production Readiness Checklist

### ✅ **Completed**
- [x] Application runs and responds to API calls
- [x] Memory usage within limits
- [x] Process management (PM2) configured
- [x] Firewall rules (both OS and cloud) configured
- [x] External connectivity verified
- [x] Code fixes committed to version control

### 🔄 **Future Enhancements**
- [ ] Auto-restart on VPS reboot (PM2 startup)
- [ ] Log rotation and monitoring
- [ ] SSL/TLS certificate for HTTPS
- [ ] Domain name configuration
- [ ] Backup and recovery procedures
- [ ] Performance monitoring and alerting 