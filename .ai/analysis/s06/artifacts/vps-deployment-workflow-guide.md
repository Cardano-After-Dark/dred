# DRED VPS Deployment Workflow Guide

## Overview

This guide explains how DRED VPS deployment works, covering both the streamlined automated approach (pre-prod) and the manual deployment process. It provides step-by-step instructions for successful VPS setup, deployment, and testing.

## VPS Deployment Architecture

### Deployment Approaches

1. **Streamlined Automated** (Recommended): Uses Makefile with scripts for rapid deployment
2. **Manual Deployment**: Step-by-step manual setup for learning/customization
3. **Hybrid Approach**: Docker Redis + Direct DRED application

### Infrastructure Components

- **Server OS**: Ubuntu 22.04+ LTS
- **Runtime**: Node.js 20.x LTS + pnpm 10.11.0
- **Database**: Redis (Dockerized with 512MB memory limit)
- **Process Management**: PM2 for application lifecycle
- **Security**: UFW firewall + fail2ban + SSH key authentication
- **Monitoring**: PM2 process monitoring + log management

### Network Configuration

- **External Port**: 3029 (DRED server)
- **Internal Port**: 6379 (Redis)
- **SSH Port**: 22 (secure access)
- **Optional**: 80/443 (HTTP/HTTPS for monitoring)

## Streamlined Automated Deployment

### Prerequisites

#### Required Information
- Server IP addresses
- Root password for initial setup
- Team SSH public keys
- Domain names (optional)

#### Local Setup
```bash
# Navigate to deployment directory
cd pre-prod

# Configure SSH keys (required first step)
cp team-ssh-keys.private.example team-ssh-keys.private
# Edit team-ssh-keys.private with your team's SSH public keys
```

### Available Deployment Servers

Current server configuration:
- **US**: 74.208.13.84 (production)
- **DE**: 85.215.215.192 (production)  
- **UK**: 217.154.34.155 (test server)

### Automated Deployment Commands

#### 4-Step Deployment Workflow

```bash
# Step 1: Create devops user with SSH keys
make setup-devops [server] && make test [server]

# Step 2: Install infrastructure (Docker, Redis, Node.js)
make setup-infra [server] && make test [server]

# Step 3: Deploy DRED application
make setup-dred [server] && make test [server]

# Step 4: Verify deployment
make dred-status [server]
```

#### Management Commands

```bash
# Application Management
make dred-redeploy [server]    # Update DRED (pull latest + restart)
make dred-status [server]      # Check DRED status + channels
make dred-logs [server]        # View DRED logs (50 lines)

# Server Operations
make connect [server]          # Connect to server as devops user
make test [server]             # Test server connectivity

# Information
make list                      # List all available servers
make help                      # Show all commands
```

### Example Deployment Workflow

#### Test Server Deployment (UK)
```bash
# Complete deployment on test server
make setup-devops uk && make test uk
make setup-infra uk && make test uk  
make setup-dred uk && make test uk
make dred-redeploy uk && make test uk

# Verify deployment
make dred-status uk
```

#### Production Server Deployment (DE)
```bash
# Deploy to production server
make setup-devops de && make test de
make setup-infra de && make test de
make setup-dred de && make test de

# Verify and monitor
make dred-status de
make connect de  # SSH to server for manual verification
```

### Successful Deployment Indicators

#### Step 1: setup-devops Success
```
✓ Connected to server as root
✓ DevOps user created with sudo privileges
✓ SSH keys installed and working
✓ SSH key authentication verified
✓ make test [server] shows SSH connection success
```

#### Step 2: setup-infra Success
```
✓ Docker installed and running
✓ Redis container started with 512MB limit
✓ Node.js 20.x installed
✓ pnpm 10.11.0 installed globally
✓ PM2 process manager installed
✓ UFW firewall configured (ports 22, 3029)
```

#### Step 3: setup-dred Success
```
✓ DRED repository cloned to /home/devops/dred
✓ Dependencies installed (pnpm install)
✓ Project built successfully (pnpm build)
✓ PM2 ecosystem configured
✓ DRED server started and listening on port 3029
✓ External connectivity verified
```

#### Step 4: dred-status Success
```
✓ PM2 process running (status: online)
✓ DRED server responding to HTTP requests
✓ Channels endpoint accessible
✓ No error messages in logs
✓ External API connectivity confirmed
```

## Manual VPS Deployment

### Prerequisites Verification

```bash
# Check local requirements
ssh --version      # SSH client available
git --version      # Git for repository cloning
curl --version     # For API testing

# Test server connectivity (before deployment)
ping SERVER_IP     # Basic network connectivity
ssh root@SERVER_IP # Should prompt for password
```

### Step-by-Step Manual Setup

#### Phase 1: Basic Server Security

```bash
# Connect as root
ssh root@SERVER_IP

# Update system packages
apt update && apt upgrade -y

# Install security tools
apt install -y ufw fail2ban

# Configure basic firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 3029/tcp  # DRED server port
```

#### Phase 2: User Management

```bash
# Create DevOps user
useradd -m -s /bin/bash devops
usermod -aG sudo devops

# Setup SSH directory
mkdir -p /home/devops/.ssh
chmod 700 /home/devops/.ssh

# Add SSH keys (replace with actual keys)
cat > /home/devops/.ssh/authorized_keys << 'EOF'
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIENBxZSLdQP2YHIoolTdEUrOnH7o00FXdApNDuz8BQJX psuzzi@max1p.2208
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC4RQb2b7reG4A0UhoRApucNEjXtx5XNINoXtxHGoMAUOtY+VYJxQ34Pb+ZNl++gJVJ7mI6HHPw2pInZZrI7oSrO/soq4Fd5WnWqCIqI3ZShaVMXvjQ485/fvdcjT+zJews24VWnwyljcWeYg423BaGgpUWhCQB1mr8Tv2om0q4LR4j42ioeie9QsxZn47l7PzsK40qfxSpM2tA2RXIY2Ld3z6iXoxLO4YpP3AVsr6z0gqdmWAV1ajAIapsOzd19Gbm+Bdxyh6u8qqPm6NvftW/1SKH7I3j2jFDE2UMerUC5ThWVHdCJ4FsPIutKr6hNNyGbFktVAhWRVSFpYh1WCvhwn62+9HeQIG5BXF7+WQH3rG+kFWyxqX1n0P3IHX8T64+ZKUFD0SBj7nAqT9DlHmYZkbvqXzMUpWiiVPCM/ydWDaQaeNoO8WQC7SMlCq+67rjx5V2uMG9CwCFpDetL7g+FZA7pUC6Z5F/qB1baGaa6bJQLSkDDhDSCHdVox/Opjk= randall@dusty
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHs4I/NTiklVJATi+AG357VC0LtfG4xBHW/Wt/p0LOuQ jake.gon@proton.me
EOF

# Set proper permissions
chmod 600 /home/devops/.ssh/authorized_keys
chown -R devops:devops /home/devops/.ssh

# Test SSH key authentication
exit  # Logout as root
ssh devops@SERVER_IP  # Should work without password
```

#### Phase 3: Software Installation

```bash
# As devops user
sudo apt install -y curl wget build-essential git

# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs

# Install pnpm globally
sudo npm install -g pnpm@10.11.0

# Install Redis server
sudo apt install -y redis-server

# Configure Redis for production
sudo sed -i 's/^# maxmemory <bytes>/maxmemory 512mb/' /etc/redis/redis.conf
sudo sed -i 's/^# maxmemory-policy noeviction/maxmemory-policy allkeys-lru/' /etc/redis/redis.conf

# Start and enable Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Install PM2 for process management
sudo npm install -g pm2

# Verify installations
node --version    # Should show v20.x.x
pnpm --version    # Should show 10.11.0
redis-cli ping    # Should return PONG
pm2 --version     # Should show PM2 version
```

#### Phase 4: Firewall Configuration

```bash
# Configure firewall for DRED
sudo ufw allow 3029/tcp  # DRED server
sudo ufw allow 80/tcp    # HTTP (optional)
sudo ufw allow 443/tcp   # HTTPS (optional)

# Enable firewall
sudo ufw --force enable

# Verify firewall status
sudo ufw status
```

#### Phase 5: DRED Application Deployment

```bash
# Clone DRED repository
cd /home/devops
git clone https://github.com/Cardano-After-Dark/dred.git
cd dred

# Install dependencies
pnpm install

# Build the project
pnpm build

# Create PM2 ecosystem configuration
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'dred-vps-server',
    script: './bin/dredServer',
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
    max_memory_restart: '1G',
    log_file: '/home/devops/logs/dred-server.log',
    error_file: '/home/devops/logs/dred-error.log',
    out_file: '/home/devops/logs/dred-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF

# Create logs directory
mkdir -p /home/devops/logs

# Start DRED server with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup systemd
# Follow the instructions shown by the command above
```

### VPS Deployment Verification

#### Essential Verification Steps

```bash
# 1. Check PM2 status
pm2 status
# Expected: dred-vps-server should show "online" status

# 2. Check server logs
pm2 logs dred-vps-server --lines 20
# Expected: No error messages, server startup logs

# 3. Test local server connectivity
curl http://localhost:3029/channels
# Expected: JSON response with channel list

# 4. Check if port is listening
netstat -tulpn | grep :3029
# Expected: Shows process listening on 0.0.0.0:3029

# 5. Test external connectivity (from local machine)
curl http://SERVER_IP:3029/channels
# Expected: Same JSON response as local test
```

#### Advanced Verification

```bash
# Test API functionality
curl -X POST http://SERVER_IP:3029/channel/deployment-test \
  -H "Content-Type: application/json" \
  -d '{"approveJoins": "open", "description": "VPS deployment test"}'

# Verify channel was created
curl http://SERVER_IP:3029/channels | grep "deployment-test"

# Check system resources
htop
free -h
df -h

# Monitor Redis
redis-cli info memory
redis-cli info replication
```

## Multi-Server VPS Deployment

### Multi-Server Architecture

For production replication networks:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   VPS Server 1  │    │   VPS Server 2  │    │   VPS Server 3  │
│                 │    │                 │    │                 │
│ DRED:3029      │◄───┤ DRED:3029      │◄───┤ DRED:3029      │
│ Redis:6379     │    │ Redis:6379     │    │ Redis:6379     │
│                 │    │                 │    │                 │
│ UK Test Server  │    │ DE Production   │    │ US Production   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Multi-Server Deployment Process

#### Deploy All Servers
```bash
# Deploy each server individually
make setup-devops uk && make test uk
make setup-infra uk && make test uk
make setup-dred uk && make test uk

make setup-devops de && make test de
make setup-infra de && make test de
make setup-dred de && make test de

make setup-devops us && make test us
make setup-infra us && make test us
make setup-dred us && make test us
```

#### Configure Cross-Server Discovery

For on-chain discovery (current implementation):
```bash
# Each server needs environment variables:
export DRED_NODE_ID="dred-production-uk-01"   # UK server
export DRED_NODE_ID="dred-production-de-01"   # DE server  
export DRED_NODE_ID="dred-production-us-01"   # US server

export CARDANO_NETWORK="testnet"              # All servers
export BF_API_KEY="your-blockfrost-api-key"   # All servers
```

For static discovery (backup/testing):
```json
// config/vps/hosts.json
{
  "hosts": [
    {
      "serverId": "vps-uk-01",
      "address": "217.154.34.155",
      "port": 3029,
      "insecure": true
    },
    {
      "serverId": "vps-de-01", 
      "address": "85.215.215.192",
      "port": 3029,
      "insecure": true
    },
    {
      "serverId": "vps-us-01",
      "address": "74.208.13.84",
      "port": 3029,
      "insecure": true
    }
  ],
  "neighborhood": "production-nbh"
}
```

### Cross-Server Testing

#### Replication Verification

```bash
# Test 1: Create channel on UK server
curl -X POST http://217.154.34.155:3029/channel/cross-server-test \
  -H "Content-Type: application/json" \
  -d '{"approveJoins": "open", "description": "Cross-server replication test"}'

# Test 2: Wait for replication (5-10 seconds)
sleep 10

# Test 3: Verify channel exists on DE server
curl http://85.215.215.192:3029/channels | grep "cross-server-test"

# Test 4: Verify channel exists on US server  
curl http://74.208.13.84:3029/channels | grep "cross-server-test"
```

#### Message Flow Testing

```bash
# Send message to UK server
curl -X POST http://217.154.34.155:3029/channel/cross-server-test/message \
  -H "Content-Type: application/json" \
  -d '{"msg": "Hello from UK server", "type": "test"}'

# Verify message replication to other servers
# (Note: Message retrieval API may need implementation)
```

## Production Environment Configuration

### Environment Variables for Production

#### On-Chain Discovery (Recommended)
```bash
# Server-specific environment variables
export DRED_NODE_ID="dred-production-server-01"  # Unique per server
export CARDANO_NETWORK="testnet"                 # Or "mainnet"
export BF_API_KEY="your-blockfrost-api-key"      # Blockfrost API access

# Optional production settings
export NODE_ENV="production"
export REDIS_URL="redis://localhost:6379"
export DRED_PORT="3029"
export DRED_HOST="0.0.0.0"
export LOGGING="default:info"
```

#### Static Discovery (Backup)
```bash
# If on-chain discovery fails, use static configuration
export DRED_DISCOVERY_TYPE="static"
export DRED_STATIC_HOSTS="/home/devops/dred/config/vps/hosts.json"
export DRED_NEIGHBORHOOD="production-nbh"
```

### Security Hardening

#### SSH Security
```bash
# Disable password authentication (after SSH keys verified)
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Disable root login
sudo sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

#### Redis Security
```bash
# Bind Redis to localhost only (default)
sudo grep "bind 127.0.0.1" /etc/redis/redis.conf

# Set Redis password (optional)
sudo sed -i 's/# requirepass foobared/requirepass YOUR_STRONG_PASSWORD/' /etc/redis/redis.conf
sudo systemctl restart redis-server
```

#### Firewall Hardening
```bash
# Review and tighten firewall rules
sudo ufw status numbered
sudo ufw delete [rule_number]  # Remove unnecessary rules

# Rate limiting for SSH (optional)
sudo ufw limit ssh
```

### Monitoring and Maintenance

#### Regular Maintenance Tasks

```bash
# Daily/Weekly tasks
pm2 status                           # Check process health
pm2 logs dred-vps-server --lines 50  # Review recent logs
df -h                                # Check disk usage
free -h                              # Check memory usage
sudo ufw status                      # Verify firewall

# Monthly tasks
sudo apt update && sudo apt upgrade -y  # Security updates
pm2 save                                # Save PM2 configuration
```

#### Log Monitoring

```bash
# Real-time log monitoring
pm2 logs dred-vps-server --lines 0 --raw | pino-pretty

# Log rotation (automatic with PM2)
pm2 logs dred-vps-server --lines 1000 > /home/devops/logs/archived-$(date +%Y%m%d).log

# Error monitoring
pm2 logs dred-vps-server --err --lines 50
```

#### Performance Monitoring

```bash
# PM2 monitoring dashboard
pm2 monit

# System resource monitoring
htop
iotop
nethogs

# Redis monitoring
redis-cli --latency
redis-cli info stats
```

### Backup and Recovery

#### Configuration Backup

```bash
# Backup essential configuration
mkdir -p /home/devops/backups
cp /home/devops/dred/ecosystem.config.js /home/devops/backups/
cp /home/devops/.ssh/authorized_keys /home/devops/backups/
cp /etc/nginx/sites-available/default /home/devops/backups/ 2>/dev/null || true

# Backup script
cat > /home/devops/scripts/backup-config.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/devops/backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

cp /home/devops/dred/ecosystem.config.js $BACKUP_DIR/
cp /home/devops/.ssh/authorized_keys $BACKUP_DIR/
pm2 list > $BACKUP_DIR/pm2-list.txt
systemctl status redis-server > $BACKUP_DIR/redis-status.txt

echo "Backup completed: $BACKUP_DIR"
EOF

chmod +x /home/devops/scripts/backup-config.sh
```

#### Disaster Recovery Plan

```bash
# Recovery procedure documentation
cat > /home/devops/RECOVERY.md << 'EOF'
# DRED VPS Recovery Procedure

## Quick Recovery (if DRED stops)
1. pm2 restart dred-vps-server
2. Check logs: pm2 logs dred-vps-server
3. Verify: curl http://localhost:3029/channels

## Full Recovery (if server crashes)
1. Follow manual deployment guide
2. Restore configuration from backup
3. Update DNS/firewall if needed
4. Test connectivity and replication

## Emergency Contacts
- Technical Lead: [contact info]
- Server Provider: [support info]
- Backup Server: [alternative server]
EOF
```

## Troubleshooting VPS Issues

### Common Deployment Issues

#### SSH Connection Problems
```bash
# Check SSH service
sudo systemctl status ssh

# Test SSH keys
ssh -vvv devops@SERVER_IP

# Reset SSH keys if needed
ssh-copy-id -i ~/.ssh/id_rsa.pub devops@SERVER_IP
```

#### Port Access Issues
```bash
# Check if port is blocked
telnet SERVER_IP 3029

# Check firewall rules
sudo ufw status numbered

# Check if service is listening
sudo netstat -tulpn | grep :3029
```

#### DRED Application Issues
```bash
# Check PM2 status
pm2 status

# Restart DRED service
pm2 restart dred-vps-server

# Check application logs
pm2 logs dred-vps-server --lines 100

# Check environment variables
pm2 env 0  # Show environment for process ID 0
```

#### Redis Connection Issues
```bash
# Test Redis connectivity
redis-cli ping

# Check Redis logs
sudo journalctl -u redis-server -f

# Restart Redis if needed
sudo systemctl restart redis-server
```

#### Performance Issues
```bash
# Check system resources
htop
free -h
df -h

# Check Redis memory usage
redis-cli info memory

# Check network latency
ping -c 10 TARGET_SERVER_IP
```

### Emergency Recovery Procedures

#### Service Recovery
```bash
# If DRED stops responding
pm2 restart dred-vps-server
pm2 save

# If Redis stops
sudo systemctl restart redis-server
redis-cli ping

# If system is overloaded
sudo reboot  # Last resort
```

#### Network Recovery
```bash
# If external access blocked
sudo ufw status
sudo ufw allow 3029/tcp

# If internal networking issues
sudo systemctl restart networking
sudo systemctl restart ssh
```

## Success Metrics and Validation

### Deployment Success Checklist

#### Infrastructure Level
- [x] Server accessible via SSH with key authentication
- [x] UFW firewall configured and active  
- [x] Redis running and responding to ping
- [x] Node.js and pnpm installed and working
- [x] PM2 installed and configured for auto-start

#### Application Level
- [x] DRED repository cloned and dependencies installed
- [x] Application built successfully (pnpm build)
- [x] PM2 ecosystem configured with correct environment variables
- [x] DRED server process running and stable
- [x] External API endpoints responding correctly

#### Network Level
- [x] Port 3029 accessible from external networks
- [x] HTTP API returning valid JSON responses
- [x] Channel creation and listing working
- [x] Cross-server connectivity established (if multi-server)
- [x] Replication working between servers (if multi-server)

### Performance Benchmarks

#### Response Time Targets
- **Local API calls**: < 100ms
- **External API calls**: < 2000ms  
- **Cross-server replication**: < 5000ms
- **Channel creation**: < 1000ms

#### Resource Usage Targets
- **Memory usage**: < 512MB per DRED process
- **CPU usage**: < 20% under normal load
- **Disk usage**: < 80% of available space
- **Network usage**: Minimal unless actively replicating

### Ongoing Monitoring

#### Daily Checks
```bash
# Quick health check script
#!/bin/bash
echo "=== DRED VPS Health Check ==="
echo "Date: $(date)"
echo

echo "PM2 Status:"
pm2 status
echo

echo "Server Response:"
curl -s http://localhost:3029/channels | head -1
echo

echo "System Resources:"
free -h | grep Mem
df -h | grep "/$"
echo

echo "Recent Errors:"
pm2 logs dred-vps-server --err --lines 5
```

This comprehensive VPS deployment guide ensures reliable, secure, and scalable DRED server deployment across multiple VPS providers and configurations.
