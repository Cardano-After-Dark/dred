# DRED Infrastructure Deployment - Quickstart Guide

## Overview

This guide covers deploying DRED to a fresh VPS.

**Prerequisites:**
- Fresh VPS with Ubuntu 20.04+
- Root access (password-based initially)
- Local SSH key configured
- Blockfrost API key (get from https://blockfrost.io)

**Deployment time:** ~10-15 minutes per server

---

## Part 1: Initial Deployment (Fresh Server)

### Step 0: Prepare Configuration

1. **Configure server settings:**

   Edit `config/.env` for common settings:
   ```bash
   BF_API_KEY=preprodXXXXXXXXXXXXXXXXXX  # Your Blockfrost API key
   CARDANO_NETWORK=preprod
   DRED_REPO=https://github.com/Cardano-After-Dark/dred.git
   DRED_BRANCH=feature/onchain-replication-m2
   DRED_PORT=3029
   LOGGING=discovery:debug
   USE_STATIC_DISCOVERY=false
   DRED_USE_INSECURE=true
   ```

2. **Configure server-specific settings:**

   Edit `config/uk.env` (or us.env, de.env):
   ```bash
   DRED_NODE_ID=dredNode-uk-12345        # Unique node identifier
   LOGGING=discovery:debug               # Override logging if needed
   ```

3. **Add your team SSH keys:**
   ```bash
   # Edit config/team-ssh-keys.private and add your public SSH key(s)
   # One key per line
   ```

### Step 1: Setup DevOps User (3 minutes)

Creates a `devops` user with SSH key authentication.

```bash
cd devops
make srv-setup uk
```

**What it does:**
- Prompts for root password (one-time only)
- Creates `devops` user with sudo access
- Copies SSH keys from config/team-ssh-keys.private
- Disables root password login
- Configures SSH security

**Verify:**
```bash
make srv-connect uk  # Should connect without password
```

### Step 2: Install Infrastructure (5 minutes)

Installs Docker, Redis, Node.js, PM2, and pnpm.

```bash
make vps-infra-setup uk
```

**What it does:**
- Updates system packages
- Installs Docker + Docker Compose
- Creates Redis container (port 6379, 512MB limit)
- Installs Node.js 20.x via nvm
- Installs pnpm and PM2 globally

**Verify:**
```bash
ssh devops@217.154.34.155 "docker ps && redis-cli ping && pnpm -v"
```

Expected output:
```
CONTAINER ID   IMAGE          STATUS
xyz123         redis:alpine   Up X minutes
PONG
9.x.x
```

### Step 3: Deploy DRED (5 minutes)

Clones, builds, and starts DRED application.

```bash
make vps-dred-deploy uk
```

**What it does:**
- Stops any existing DRED (idempotent)
- Clears port 3029 if occupied
- Clones DRED from GitHub (configured branch)
- Installs dependencies (pnpm install)
- Builds application (pnpm build)
- Creates .env and PM2 config from your settings
- Starts DRED with PM2
- Configures auto-restart on server reboot

**Verify:**
```bash
make vps-check uk
```

Expected output:
```
✓ SSH connection successful
✓ DRED server responding on port 3029
   Available channels: {"channels":["news","discussion"]}
```

---

## Part 2: Managing DRED

### Check Server Status

```bash
# Quick status check
make vps-check uk

# Check all servers
make dred-check-status

# View PM2 status
make vps-check uk status

# View environment variables
make vps-check uk env
```

### View Logs

```bash
# View last 50 lines
make vps-dred-logs uk

# View last 100 lines
make vps-check uk logs 100

# Filter logs
make vps-check uk logs 100 grep discovery
make vps-check uk logs 1000 grep "error|warn"
```

### Update/Redeploy DRED

To pull latest code and redeploy:

```bash
make vps-dred-deploy uk
```

This performs a full clean deployment (stops, removes old code, clones fresh, rebuilds).

### Restart DRED

```bash
make vps-check uk restart
```

### Send Test Messages

```bash
make dred-send-message uk news Hello from UK server
make dred-send-message us discussion Testing cross-server replication
```

---

## Part 3: Local Development

### Run DRED Locally

```bash
# Basic run
make local-dred-run

# With custom logging
make local-dred-run LOGGING=default:debug,replicant:trace,replicator:trace
```

This will:
- Build the project (pnpm build)
- Start DRED locally using your local .env
- Pipe output through pino-pretty for readable logs

### Test Against Remote Servers

```bash
# Send message from local to remote
make dred-send-message uk news Testing from local

# Check status of all servers (including local if running)
make dred-check-status
```

---

## Common Workflows

### Fresh Server Setup (Complete)

```bash
cd devops

# 1. Configure settings
vim config/.env        # Common settings
vim config/uk.env      # Server-specific settings

# 2. Deploy
make srv-setup uk
make vps-infra-setup uk
make vps-dred-deploy uk

# 3. Verify
make vps-check uk
make vps-dred-logs uk
```

### Update Existing Server

```bash
# Pull latest code and redeploy
make vps-dred-deploy uk

# Verify
make vps-check uk
make vps-dred-logs uk
```

### Debug Issues

```bash
# Check server connectivity
make vps-check uk

# View logs
make vps-dred-logs uk

# View more logs with filtering
make vps-check uk logs 500 grep error

# Check environment
make vps-check uk env

# SSH to server for manual debugging
make srv-connect uk
```

### Multi-Server Testing

```bash
# Deploy to all servers
make srv-setup uk
make vps-infra-setup uk
make vps-dred-deploy uk

make srv-setup us
make vps-infra-setup us
make vps-dred-deploy us

# Check all servers
make dred-check-status

# Test cross-server messaging
make dred-send-message uk news Testing replication
make vps-check us logs 100 grep "Testing replication"
```

---

## Quick Reference

### Configuration Files

- `config/.env` - Common DRED configuration
- `config/hosts.conf` - Server IPs and SSH settings
- `config/uk.env`, `config/us.env`, `config/de.env` - Server-specific overrides
- `config/team-ssh-keys.private` - Team SSH public keys

### Common Commands

```bash
# Setup
make srv-setup [server]           # Create devops user
make vps-infra-setup [server]     # Install infrastructure
make vps-dred-deploy [server]     # Deploy DRED

# Operations
make srv-connect [server]         # SSH to server
make vps-check [server]           # Check status
make vps-dred-logs [server]       # View logs
make dred-check-status            # Check all servers

# Local
make local-dred-run               # Run locally

# Help
make help                         # Show all commands
```

### Available Servers

- **UK**: 217.154.34.155
- **DE**: 85.215.215.192
- **US**: 74.208.13.84

### Ports

- **DRED API**: 3029
- **Redis**: 6379 (Docker)

---

## Troubleshooting

### Connection Issues

```bash
# Test SSH
make srv-connect uk

# Check if DRED is running
make vps-check uk status

# Check if port is accessible
curl http://217.154.34.155:3029/channels
```

### DRED Not Starting

```bash
# Check logs
make vps-dred-logs uk

# Check environment
make vps-check uk env

# Verify Redis is running
ssh devops@217.154.34.155 "docker ps | grep redis"

# Try manual restart
make vps-check uk restart
```

### Build Failures

```bash
# SSH to server and check
make srv-connect uk

# On server:
cd dred
pm2 logs dred --lines 100
```

### Redeploy from Scratch

```bash
# This will completely remove and redeploy
make vps-dred-deploy uk
```

This is safe to run multiple times - it's idempotent.

---

## Next Steps

- See `README.md` for detailed command reference
- Run `make help` for all available commands
- Check the main DRED repository for application-level documentation
