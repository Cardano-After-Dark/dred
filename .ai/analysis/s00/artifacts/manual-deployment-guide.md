# DRED VPS Deployment Guide (Manual)

**Based on successful deployment testing on IONOS Ubuntu 24.04 VPS**

## Overview

This guide provides step-by-step instructions for manually deploying DRED (Distributed Redis State Channels) on a Ubuntu 24.04 VPS with 2GB RAM and 2 vCPUs.

**Tested Configuration:**
- **VPS Provider**: IONOS 
- **OS**: Ubuntu 24.04 LTS
- **RAM**: 1.8GB available (2GB advertised)
- **CPU**: 2 vCPUs
- **Architecture**: Hybrid (Docker Redis + Direct DRED)

**Key Requirements:**
- VPS with root/sudo access
- SSH access configured
- Minimum 1.5GB RAM available
- Port 3029 available for DRED API

---

## Phase 1: Initial Verification

### Step 1.1: Test SSH Connection
```bash
# From your local machine
ssh username@your-vps-ip

# Verify basic system info
free -h              # Check available RAM
nproc               # Check CPU cores  
df -h /             # Check disk space
lsb_release -a      # Check OS version
```
**Expected**: SSH access works, at least 1.5GB RAM available

### Step 1.2: Check Port Availability
```bash
# On the VPS - check if required ports are free
ss -tlnp | grep :3029    # DRED port should be free
ss -tlnp | grep :6379    # Redis port (will use Docker)
ss -tlnp | grep :22      # SSH port should be in use
```
**Expected**: Port 3029 available, SSH working

### Step 1.3: Test Make Command (Baseline)
```bash
# From your local machine in pre-prod directory
cd /path/to/dred/pre-prod
make test us
```
**Expected**: `SSH OK` ✓, `DRED server responding` ✗ (not yet deployed)

---

## Phase 2: Install Docker

### Step 2.1: Install Docker Engine
```bash
# On the VPS
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group (requires re-login)
sudo usermod -aG docker $USER

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### Step 2.2: Install Docker Compose
```bash
# On the VPS
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 2.3: Verify Installation
```bash
# On the VPS
docker --version
docker-compose --version
docker info
```
**Expected**: Docker version 20+, Compose version 2.23+, Docker service running

---

## Phase 3: Setup Redis Container

### Step 3.1: Start Redis with Memory Optimization
```bash
# On the VPS
docker run -d \
    --name dred-redis \
    --restart unless-stopped \
    -p 6379:6379 \
    -v redis-data:/data \
    redis:alpine \
    redis-server \
    --appendonly yes \
    --maxmemory 400mb \
    --maxmemory-policy allkeys-lru \
    --save 900 1 \
    --save 300 10 \
    --save 60 10000
```

### Step 3.2: Verify Redis
```bash
# On the VPS
docker ps | grep dred-redis
docker exec dred-redis redis-cli ping
docker exec dred-redis redis-cli info memory | grep used_memory_human
```
**Expected**: Container running, responds with "PONG", memory usage ~4MB initially

---

## Phase 4: Install Node.js Dependencies

### Step 4.1: Install Node.js 20.x
```bash
# On the VPS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 4.2: Install Package Managers
```bash
# On the VPS
sudo npm install -g pnpm@10.11.0
sudo npm install -g pm2@6.0.8
```

### Step 4.3: Verify Versions
```bash
# On the VPS
node --version    # Expected: v20.19.3
npm --version     # Expected: 10.x
pnpm --version    # Expected: 10.11.0
pm2 --version     # Expected: 6.0.8
```

---

## Phase 5: Clone and Build DRED

### Step 5.1: Clone Repository
```bash
# On the VPS
cd /home/devops
git clone https://github.com/Cardano-After-Dark/dred.git
cd dred
git checkout dev3/message-replication-rebased
```

### Step 5.2: Install Dependencies
```bash
# On the VPS
cd /home/devops/dred
pnpm install
```
**Note**: Warnings about yarn/stellar-deploy are normal and harmless

### Step 5.3: Build DRED
```bash
# On the VPS
cd /home/devops/dred
pnpm build
```

### Step 5.4: Verify Build
```bash
# On the VPS
ls -la dist/
cat dist/dredServer.mjs | head -20
```
**Expected**: dist/ directory with dredServer.mjs file (~153KB)

---

## Phase 6: Configure DRED Environment

### Step 6.1: Create Environment Configuration
```bash
# On the VPS
cd /home/devops/dred
cat > .env << 'EOF'
REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
NODE_ENV=production
LOGGING=default:info
EOF
```

### Step 6.2: Create PM2 Ecosystem Configuration
```bash
# On the VPS
cd /home/devops/dred
cat > ecosystem.config.cjs << 'EOF'
module.exports = {
  apps: [{
    name: 'dred-us-server',
    script: './dist/dredServer.mjs',
    cwd: '/home/devops/dred',
    env: {
      NODE_ENV: 'production',
      REDIS_URL: 'redis://localhost:6379',
      DRED_PORT: '3029',
      DRED_HOST: '0.0.0.0',
      LOGGING: 'default:info'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '600M',
    log_file: '/home/devops/logs/dred-server.log',
    error_file: '/home/devops/logs/dred-error.log',
    out_file: '/home/devops/logs/dred-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF
```
**Important**: Use `.cjs` extension, not `.js` (avoids module loading issues)

### Step 6.3: Create Log Directory
```bash
# On the VPS
mkdir -p /home/devops/logs
```

---

## Phase 7: Start DRED Server

### Step 7.1: Start DRED with PM2
```bash
# On the VPS
cd /home/devops/dred
pm2 start ecosystem.config.cjs
```

### Step 7.2: Verify DRED is Running
```bash
# On the VPS
pm2 status
pm2 logs dred-us-server --lines 20
```
**Expected**: Process status "online", logs show server starting on `0.0.0.0:3029`

### Step 7.3: Test Local Server Response
```bash
# On the VPS
curl -s http://localhost:3029/channels | jq .
```
**Expected**: JSON response with `{"channels": ["news", "discussion"]}`

---

## Phase 8: Configure Firewall

### Step 8.1: Configure UFW (Ubuntu Firewall)
```bash
# On the VPS
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 3029/tcp
sudo ufw --force enable
```

### Step 8.2: Verify UFW Status
```bash
# On the VPS
sudo ufw status verbose
```
**Expected**: SSH and 3029 ports allowed

### Step 8.3: Configure IONOS Cloud Firewall
**CRITICAL**: IONOS VPS requires cloud firewall configuration in addition to UFW.

1. **Log into IONOS Control Panel**
2. **Navigate to your VPS/Server settings**
3. **Find "Firewall" or "Security" section**
4. **Add inbound rule**:
   - **Direction**: Inbound/Incoming
   - **Protocol**: TCP
   - **Port**: 3029
   - **Source**: 0.0.0.0/0 (or your specific IP for security)
   - **Action**: Allow

5. **Save changes** (takes 2-3 minutes to propagate)

**Final rule list should include**: `Allow TCP: 22, 80, 443, 8443, 8447, 3029`

---

## Phase 9: Final Testing

### Step 9.1: Debug Network Connectivity
```bash
# On the VPS - verify server is binding to all interfaces
ss -tlnp | grep 3029
```
**Expected**: `0.0.0.0:3029` (not `127.0.0.1:3029`)

### Step 9.2: Test VPS-to-VPS External Access
```bash
# On the VPS - test external IP access from server itself
curl -s http://YOUR_VPS_IP:3029/channels | jq .
```
**Expected**: Same JSON response as localhost test

### Step 9.3: Test External Access from Local Machine
```bash
# From your local machine - test TCP connection first
nc -v YOUR_VPS_IP 3029
```
**Expected**: `Connection to YOUR_VPS_IP port 3029 [tcp/*] succeeded!`

```bash
# From your local machine - test API access
curl -s http://YOUR_VPS_IP:3029/channels | jq .
```
**Expected**: JSON response with channels array

### Step 9.4: Test Make Command (Final Verification)
```bash
# From your local machine in pre-prod directory
cd /path/to/dred/pre-prod
make test us
```
**Expected**: `SSH OK` ✓, `DRED server responding` ✓

---

## Phase 10: Setup Auto-Start

### Step 10.1: Configure PM2 Startup
```bash
# On the VPS
pm2 startup
# Copy and execute the command PM2 outputs
pm2 save
```

### Step 10.2: Test Reboot Persistence
```bash
# On the VPS
sudo reboot
```

### Step 10.3: Verify After Reboot
```bash
# Wait 2-3 minutes, then connect
ssh devops@YOUR_VPS_IP
docker ps                                          # Redis should be running
pm2 status                                         # DRED should be running
curl -s http://localhost:3029/channels | jq .     # API should respond
```
**Expected**: All services auto-started and working

---

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Server Binding to 127.0.0.1 Instead of 0.0.0.0
**Symptom**: Local access works, external access times out
**Cause**: StaticHostDiscovery hardcoded to localhost
**Solution**: Code fix applied in repository (included in current deployment)

#### 2. External Access Times Out
**Symptoms**: `nc -v IP 3029` times out, curl times out
**Diagnosis Steps**:
```bash
# On VPS - check server binding
ss -tlnp | grep 3029            # Should show 0.0.0.0:3029

# On VPS - check UFW
sudo ufw status verbose         # Should show 3029/tcp ALLOW

# On VPS - check iptables
sudo iptables -L -n | grep 3029 # Should show ACCEPT rule
```
**Solution**: Configure VPS provider cloud firewall (IONOS requires this)

#### 3. PM2 Ecosystem Config Error
**Symptom**: "module is not defined" error
**Cause**: Using `.js` extension in ES module project
**Solution**: Use `ecosystem.config.cjs` extension

#### 4. Memory Issues
**Symptoms**: Process restarts, out of memory errors
**Diagnosis**:
```bash
# Check memory usage
free -h
docker stats dred-redis --no-stream
pm2 monit
```
**Solution**: Adjust memory limits in PM2 config and Redis config

#### 5. Build Warnings
**Symptoms**: Yarn warnings, stellar-deploy warnings during build
**Diagnosis**: Check if dist/dredServer.mjs was created successfully
**Solution**: These warnings are typically harmless if build completes

### Debugging Commands Reference

```bash
# System Resources
free -h                                    # Memory usage
df -h                                      # Disk usage
top                                        # Process monitoring

# Network Debugging
ss -tlnp | grep 3029                      # Check port binding
sudo ufw status verbose                   # Check UFW firewall
sudo iptables -L -n                       # Check iptables rules
nc -v IP PORT                             # Test TCP connectivity

# Application Debugging
pm2 status                                # Check PM2 processes
pm2 logs APP_NAME --lines 50              # View application logs
pm2 monit                                 # Monitor resources
docker ps                                 # Check Docker containers
docker logs dred-redis                   # Check Redis logs

# API Testing
curl -s http://localhost:3029/channels    # Local API test
curl -s http://IP:3029/channels           # External API test
```

---

## Memory Optimization Notes

### Final Memory Distribution (1.8GB VPS)
- **Ubuntu OS**: ~400MB
- **Docker**: ~100MB  
- **Redis Container**: 400MB limit (4MB actual initially)
- **DRED Process**: 600MB limit (40MB actual initially)
- **Buffer**: 300MB for system operations
- **Total**: Well within 1.8GB available

### Redis Configuration Explained
- **maxmemory 400mb**: Limit Redis to 400MB (22% of 1.8GB total RAM)
- **maxmemory-policy allkeys-lru**: Evict least recently used keys when memory full
- **save settings**: Periodic persistence to disk
- **appendonly yes**: Enable AOF for better durability

### PM2 Configuration Explained
- **max_memory_restart '600M'**: Restart DRED if it exceeds 600MB
- **instances 1**: Single process (no clustering due to RAM constraints)

---

## Production Readiness Checklist

### ✅ **Deployment Complete**
- [x] Application runs and responds to API calls
- [x] Memory usage within limits
- [x] Process management (PM2) configured
- [x] Auto-restart on server reboot
- [x] Firewall rules (both OS and cloud) configured
- [x] External connectivity verified
- [x] Logging configured

### 🔄 **Future Enhancements**
- [ ] SSL/TLS certificate for HTTPS
- [ ] Domain name configuration  
- [ ] Log rotation and monitoring
- [ ] Performance monitoring and alerting
- [ ] Backup and recovery procedures
- [ ] Security hardening
- [ ] Load balancing (for multiple servers)

**End of Manual Deployment Guide** 