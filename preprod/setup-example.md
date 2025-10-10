# DRED Pre-Production Setup Example

This document shows the complete 4-step workflow for setting up a DRED server from scratch, using the UK server as an example.

## Prerequisites

- Server with Ubuntu 24.04 LTS
- Root access via SSH
- SSH keys configured in `team-ssh-keys.private`

## Step 1: DevOps User Setup

**Command:** `make setup-devops uk`

**What it does:**
- Creates devops user with passwordless sudo access
- Installs team SSH keys for authentication
- Configures SSH security (disables password auth)
- Sets up basic firewall (UFW)

**Sample Output:**
```
🔐 Step 1: DevOps User Setup
=============================
Server: 217.154.34.155

🔧 Connecting to root user...
You will be prompted for the root password

🔧 Copying SSH keys and setting up devops user...
This will:
1. Copy SSH keys to server
2. Create devops user with sudo access
3. Configure SSH security

root@217.154.34.155's password: 
team-ssh-keys.private                                100% 1150    24.6KB/s   00:00    

🔧 Creating devops user...
info: Adding user `devops' ...
info: Adding new group `devops' (1000) ...
info: Adding new user `devops' (1000) with group `devops (1000)' ...
info: Creating home directory `/home/devops' ...
DevOps user created successfully

🔧 Configuring passwordless sudo...
Passwordless sudo configured for devops user

🔧 Setting up SSH directories...
🔧 Installing SSH keys...
🔧 Configuring SSH security...
🔧 Installing basic security...
🔧 Cleaning up...
✅ DevOps setup completed successfully!

🔧 Verifying devops access...
✅ DevOps SSH access verified
🔧 Testing sudo access...
✅ Sudo access verified
✅ SSH keys installed: 15

✅ 🎉 Step 1 completed successfully!

✅ DevOps user created with sudo access
✅ SSH keys installed for team members
✅ SSH security configured
✅ Basic firewall enabled

Next step: make setup-infrastructure UK
```

**Key Points:**
- **Interactive**: Prompts for root password
- **Security**: Disables password SSH auth, enables key-based only
- **Automation**: DevOps user gets passwordless sudo for scripts
- **Verification**: Tests SSH keys and sudo access before completing

## Step 2: Infrastructure Setup

**Command:** `make setup-infra uk`

**What it does:**
- Installs Docker and starts Redis container (512MB limit)
- Installs Node.js 20.x, pnpm, and PM2
- Configures firewall for DRED port
- Verifies all components are working

**Sample Output:**
```
🏗️  Step 2: Infrastructure Setup
=================================
Server: 217.154.34.155

🔧 Verifying devops access...
✅ DevOps access confirmed
🔧 Installing infrastructure components...

🔧 Installing essential packages...
🐳 Installing Docker...
Docker installed successfully

🗄️  Setting up Redis container...
Unable to find image 'redis:alpine' locally
alpine: Pulling from library/redis
[Docker pull progress...]
Status: Downloaded newer image for redis:alpine
Redis container started successfully

📦 Installing Node.js and tools...
Node.js installed
pnpm installed
PM2 installed

🔒 Configuring firewall...
✅ Infrastructure setup completed!

Components installed:
- Docker: Docker version 28.3.1, build 38b7060
- Redis: redis-cli 7.0.15
- Node.js: v20.19.3
- pnpm: 10.11.0
- PM2: 6.0.8

🔧 Verifying infrastructure...
✅ Redis container running
✅ Redis responding
✅ Node.js tools verified
✅ Firewall configured

✅ 🎉 Step 2 completed successfully!

✅ Docker installed and running
✅ Redis container running (512MB limit)
✅ Node.js, pnpm, PM2 installed
✅ Firewall configured for DRED port

Next step: make setup-dred UK
```

**Key Points:**
- **Docker**: Uses Redis Alpine image for minimal footprint
- **Memory Limit**: Redis container limited to 512MB
- **Node.js**: Installs latest LTS version (20.x)
- **Process Management**: PM2 for DRED application lifecycle
- **Security**: Firewall configured for DRED port (8080)

## Step 3: DRED Application Setup

**Command:** `make setup-dred uk`

**What it does:**
- **Idempotent cleanup**: Stops existing DRED, removes directory
- Clones DRED repository fresh from GitHub
- Installs dependencies with pnpm
- Builds the application (creates dist/dredServer.mjs)
- Creates environment and PM2 configuration files
- Starts DRED with PM2 and configures auto-restart

**Sample Output:**
```
🚀 DRED Setup (Minimal & Idempotent)
====================================
Server: 217.154.34.155
Based on S00 Success Pattern

🔧 Verifying prerequisites...
✅ Prerequisites verified
🔧 Setting up DRED (idempotent)...

🔧 IDEMPOTENT CLEANUP: Stopping existing DRED...
🔧 IDEMPOTENT CLEANUP: Removing existing directory...
🔧 FRESH START: Cloning DRED...
Cloning into 'dred'...
Switched to a new branch 'dev3/message-replication-rebased'

🔧 Installing dependencies...
Scope: all 5 workspace projects
Packages: +1530
Done in 6.9s using pnpm v10.11.0

🔧 Building DRED...
bin/dredServer → dist/dredServer.mjs...
created dist/dredServer.mjs in 487ms

🔧 Verifying build (S00 pattern)...
✅ Build successful: dist/dredServer.mjs exists
-rw-rw-r-- 1 devops devops 153396 Jul  7 05:32 dist/dredServer.mjs

🔧 Creating environment file...
🔧 Creating PM2 config (S00 pattern)...
🔧 Starting DRED with PM2...
[PM2] App [dred] launched (1 instances)

🔧 Configuring auto-restart...
🔧 Waiting for startup...
✅ DRED setup completed!

PM2 Status:
┌────┬─────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name    │ mode        │ pid     │ uptime  │ status    │ cpu    │ mem    │ user     │ watching │
├────┼─────────┼─────────────┼─────────┼─────────┼───────────┼────────┼────────┼──────────┼──────────┤
│ 0  │ dred    │ cluster     │ 52756   │ 5s      │ online    │ 0%     │ 79.3mb │ devops   │ disabled │
└────┴─────────┴─────────────┴─────────┴─────────┴───────────┴────────┴────────┴──────────┴──────────┘

Testing local API:
✅ Local API responding

🔧 Verifying deployment...
✅ DRED process is online
❌ DRED port 3029 not accessible
Note: Check cloud firewall settings

✅ 🎉 DRED Setup Completed Successfully!

✅ DRED running with PM2
✅ Auto-restart configured  
✅ Environment file created
✅ Using S00 success pattern

DRED is running on 217.154.34.155:3029

🔄 This script is IDEMPOTENT - safe to run multiple times
```

**Key Points:**
- **Idempotent Design**: Safe to run multiple times - always does clean setup
- **S00 Success Pattern**: Uses proven working configuration from previous session
- **Fresh Build**: Always clones fresh to avoid git conflicts or stale builds
- **Memory Efficient**: DRED starts at ~79MB, well within 600MB limit
- **Environment Files**: Creates .env and ecosystem.config.cjs for configuration
- **Auto-verification**: Tests local API and PM2 status before completing
- **Cloud Firewall Required**: External access needs VPS provider firewall configuration

## Step 4: DRED Updates

**Command:** `make dred-redeploy uk`

**What it does:**
- Executes the update script created during Step 3
- Stops DRED service gracefully
- Pulls latest changes from GitHub
- Updates dependencies with pnpm
- Rebuilds application
- Restarts DRED service with PM2

**Sample Output:**
```
Redeploying DRED on UK
🔄 Updating DRED...
Stopping DRED...
[PM2] Applying action stopProcessId on app [dred](ids: [ 0 ])
[PM2] [dred](0) ✓

Pulling latest changes...
Already up to date.

Updating dependencies...
Packages: +1530
Done in 2.3s using pnpm v10.11.0

Building DRED...
bin/dredServer → dist/dredServer.mjs...
created dist/dredServer.mjs in 487ms

Starting DRED...
[PM2] Applying action restartProcessId on app [dred](ids: [ 0 ])
[PM2] [dred](0) ✓

✅ DRED update completed!
┌────┬─────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name    │ mode        │ pid     │ uptime  │ status    │ cpu    │ mem    │ user     │ watching │
├────┼─────────┼─────────────┼─────────┼─────────┼───────────┼────────┼────────┼──────────┼──────────┤
│ 0  │ dred    │ cluster     │ 53128   │ 3s      │ online    │ 0%     │ 67.2mb │ devops   │ disabled │
└────┴─────────┴─────────────┴─────────┴─────────┴───────────┴────────┴────────┴──────────┴──────────┘
```

**Key Points:**
- **Graceful Updates**: PM2 stop → update → restart sequence
- **Dependency Management**: Updates pnpm packages if needed
- **Fresh Build**: Always rebuilds to ensure latest code
- **Quick Turnaround**: Typically completes in under 30 seconds
- **Process Continuity**: Same PM2 process ID, maintains configuration

## Testing and Verification

**Command:** `make test uk`

**What it does:**
- Tests SSH connectivity
- Verifies DRED service is running
- Checks Redis connectivity
- Tests channel creation/messaging

**Sample Output:**
```
Testing UK server (217.154.34.155)...
SSH OK
✓ SSH connection successful
✓ DRED server responding
```

## Security Architecture

**Current Implementation:**
- **SSH Keys**: Passwordless authentication for team members
- **Sudo Access**: Passwordless for devops user (automation-friendly)
- **Firewall**: UFW configured with minimal required ports
- **Redis**: Containerized with memory limits
- **Process Isolation**: PM2 manages application lifecycle

**Security Notes:**
- UK server uses passwordless sudo for automation
- US server uses password-required sudo for enhanced security
- Future enhancement: Standardize security model across servers

## Architecture Overview

```
Internet → Firewall → SSH (Port 22) → DevOps User
                   → DRED (Port 8080) → Redis Container
                   
Process Flow:
1. SSH Key Authentication
2. DevOps User (Passwordless Sudo)
3. PM2 Process Manager
4. DRED Application
5. Redis Container (512MB)
```

## Troubleshooting

**Common Issues:**
- **SSH Key Issues**: Ensure `team-ssh-keys.private` exists and contains valid public keys
- **Root Access**: Initial setup requires root password
- **Firewall**: DRED port 8080 must be accessible
- **Redis**: Container must be running before DRED starts

**Verification Commands:**
```bash
# Check infrastructure
make test uk

# Check DRED status
make dred-status uk

# View logs
make dred-logs uk

# Connect to server
make connect uk
```

## Next Steps

After completing all 4 steps, your DRED server will be:
- ✅ Accessible via SSH with team keys
- ✅ Running Redis for message storage
- ✅ Running DRED application on port 8080
- ✅ Configured for automatic restarts
- ✅ Ready for development and testing 