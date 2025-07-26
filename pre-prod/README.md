# DRED Pre-Production VPS Setup Guide

This guide helps you set up a DRED server on an Ubuntu VPS for pre-production testing and replication across network boundaries.

## Prerequisites

- Fresh Ubuntu 22.04+ server
- Root password access
- Server IP address
- Your SSH public key(s)

## Overview

This setup will:
1. Secure the Ubuntu server
2. Create a DevOps user with sudo access
3. Install required software (Node.js, pnpm, Git, Redis)
4. Clone and configure the DRED project
5. Launch DRED server on a specified port
6. Configure firewall for external access

## Manual Setup Steps

### 1. Initial Server Access

```bash
# Connect to your server as root
ssh root@YOUR_SERVER_IP

# Update system packages
apt update && apt upgrade -y
```

### 2. Basic Security Setup

```bash
# Install essential security tools
apt install -y ufw fail2ban

# Configure UFW firewall (start with SSH only)
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
```

### 3. Create DevOps User

```bash
# Create DevOps user with home directory
useradd -m -s /bin/bash devops

# Add to sudo group
usermod -aG sudo devops

# Set up SSH directory for DevOps user
mkdir -p /home/devops/.ssh
chmod 700 /home/devops/.ssh
```

### 4. Configure SSH Keys

Create authorized_keys file for the DevOps user:

```bash
# Edit the authorized_keys file
nano /home/devops/.ssh/authorized_keys
```

Add your team's SSH public keys (one per line):
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIENBxZSLdQP2YHIoolTdEUrOnH7o00FXdApNDuz8BQJX psuzzi@max1p.2208
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC4RQb2b7reG4A0UhoRApucNEjXtx5XNINoXtxHGoMAUOtY+VYJxQ34Pb+ZNl++gJVJ7mI6HHPw2pInZZrI7oSrO/soq4Fd5WnWqCIqI3ZShaVMXvjQ485/fvdcjT+zJews24VWnwyljcWeYg423BaGgpUWhCQB1mr8Tv2om0q4LR4j42ioeie9QsxZn47l7PzsK40qfxSpM2tA2RXIY2Ld3z6iXoxLO4YpP3AVsr6z0gqdmWAV1ajAIapsOzd19Gbm+Bdxyh6u8qqPm6NvftW/1SKH7I3j2jFDE2UMerUC5ThWVHdCJ4FsPIutKr6hNNyGbFktVAhWRVSFpYh1WCvhwn62+9HeQIG5BXF7+WQH3rG+kFWyxqX1n0P3IHX8T64+ZKUFD0SBj7nAqT9DlHmYZkbvqXzMUpWiiVPCM/ydWDaQaeNoO8WQC7SMlCq+67rjx5V2uMG9CwCFpDetL7g+FZA7pUC6Z5F/qB1baGaa6bJQLSkDDhDSCHdVox/Opjk= randall@dusty 
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHs4I/NTiklVJATi+AG357VC0LtfG4xBHW/Wt/p0LOuQ jake.gon@proton.me
```

Set proper permissions:
```bash
chmod 600 /home/devops/.ssh/authorized_keys
chown -R devops:devops /home/devops/.ssh
```

### 5. Install Node.js and pnpm

```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install pnpm globally
npm install -g pnpm@10.11.0

# Verify installations
node --version    # Should show v20.x.x
pnpm --version    # Should show 10.11.0
```

### 6. Install Redis

```bash
# Install Redis server
apt install -y redis-server

# Configure Redis for production
sed -i 's/^# maxmemory <bytes>/maxmemory 512mb/' /etc/redis/redis.conf
sed -i 's/^# maxmemory-policy noeviction/maxmemory-policy allkeys-lru/' /etc/redis/redis.conf

# Start and enable Redis
systemctl start redis-server
systemctl enable redis-server

# Test Redis
redis-cli ping  # Should return PONG
```

### 7. Install Additional Tools

```bash
# Install Git and other essential tools
apt install -y git curl wget build-essential

# Install PM2 for process management
npm install -g pm2
```

### 8. Configure Firewall for DRED

```bash
# Allow DRED server port (3029 by default)
ufw allow 3029/tcp

# Allow HTTP/HTTPS if needed for monitoring
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable

# Check status
ufw status
```

### 9. Switch to DevOps User

```bash
# Switch to devops user
su - devops

# Verify sudo access
sudo whoami  # Should return 'root'
```

### 10. Clone DRED Project

```bash
# As devops user, clone the repository
cd /home/devops
git clone https://github.com/YOUR_ORG/dred.git
cd dred

# Install dependencies
pnpm install

# Build the project
pnpm build
```

### 11. Configure DRED for VPS

Create VPS-specific configuration:

```bash
# Create VPS configuration directory
mkdir -p /home/devops/dred/config/vps

# Create host discovery configuration
cat > /home/devops/dred/config/vps/hosts.json << 'EOF'
{
  "hosts": [
    {
      "serverId": "vps-server-1",
      "address": "0.0.0.0",
      "port": 3029,
      "insecure": true
    }
  ],
  "neighborhood": "pre-prod-nbh"
}
EOF
```

### 12. Create DRED Startup Script

```bash
# Create startup script
cat > /home/devops/dred/scripts/start-vps-server.sh << 'EOF'
#!/bin/bash
set -e

cd /home/devops/dred

# Set environment variables
export NODE_ENV=production
export REDIS_URL=redis://localhost:6379
export DRED_PORT=3029
export DRED_HOST=0.0.0.0
export LOGGING=default:info

# Start DRED server
echo "Starting DRED server on VPS..."
node dist/dredServer.mjs
EOF

chmod +x /home/devops/dred/scripts/start-vps-server.sh
```

### 13. Create PM2 Configuration

```bash
# Create PM2 ecosystem file
cat > /home/devops/dred/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'dred-vps-server',
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
```

### 14. Start DRED Server

```bash
# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup systemd
# Follow the instructions shown by the command above
```

### 15. Verify Installation

```bash
# Check DRED server status
pm2 status

# Check server logs
pm2 logs dred-vps-server

# Test server connectivity
curl http://localhost:3029/channels

# Check if port is listening
netstat -tulpn | grep :3029
```

## Testing External Connectivity

From your local machine:

```bash
# Test basic connectivity
curl http://YOUR_SERVER_IP:3029/channels

# Should return JSON response with channel information
```

## Security Notes

1. **SSH Security**: Disable password authentication after SSH keys are working
2. **Firewall**: Only open necessary ports (3029 for DRED, 22 for SSH)
3. **Updates**: Keep system and dependencies updated regularly
4. **Monitoring**: Use PM2 for process monitoring and log management
5. **Backups**: Consider backing up configuration and data regularly

## Troubleshooting

### DRED Server Won't Start
```bash
# Check Redis is running
sudo systemctl status redis-server

# Check logs
pm2 logs dred-vps-server

# Check port availability
sudo netstat -tulpn | grep :3029
```

### Connection Refused from External
```bash
# Check firewall rules
sudo ufw status

# Check if server is binding to correct interface
sudo netstat -tulpn | grep :3029
# Should show 0.0.0.0:3029, not 127.0.0.1:3029
```

### Redis Connection Issues
```bash
# Test Redis locally
redis-cli ping

# Check Redis configuration
sudo nano /etc/redis/redis.conf

# Restart Redis if needed
sudo systemctl restart redis-server
```

## Next Steps

After successful setup:

1. Run the VPS connectivity tests (see `test.vps.ts`)
2. Configure additional VPS servers following this guide
3. Set up multi-server replication testing
4. Monitor server performance and logs

## Maintenance Commands

```bash
# Update DRED code
cd /home/devops/dred
git pull origin main
pnpm install
pnpm build
pm2 restart dred-vps-server

# View logs
pm2 logs dred-vps-server

# Monitor system resources
htop
df -h
free -h

# Check DRED server health
curl http://localhost:3029/channels
``` 