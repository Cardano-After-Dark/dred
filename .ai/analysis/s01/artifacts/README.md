# DRED Pre-Production - Streamlined Setup

**4-Step Workflow for Testing & Deployment**

## Quick Start

### 1. Configure SSH Keys
```bash
cp team-ssh-keys.private.example team-ssh-keys.private
# Edit team-ssh-keys.private with your team's SSH public keys
```

### 2. Test on UK Server (217.154.34.155)
```bash
make setup-devops uk && make test uk
make setup-infra uk && make test uk  
make setup-dred uk && make test uk
make dred-redeploy uk && make test uk
```

### 3. Deploy to Production
```bash
make setup-devops de && make test de
make setup-infra de && make test de
make setup-dred de && make test de
```

## Available Commands

### Setup Commands
- `make setup-devops [server]` - Create devops user with SSH keys
- `make setup-infra [server]` - Install Docker, Redis, Node.js
- `make setup-dred [server]` - Deploy DRED application

### DRED Management
- `make dred-redeploy [server]` - Update DRED (pull latest + restart)
- `make dred-status [server]` - Check DRED status + channels
- `make dred-logs [server]` - View DRED logs (50 lines)

### Server Operations
- `make connect [server]` - Connect to server as devops user
- `make test [server]` - Test server connectivity

### Quick Reference
- `make list` - List all available servers
- `make help` - Show all commands

### Server Configuration
- **US**: 74.208.13.84 (production)
- **DE**: 85.215.215.192 (production)
- **UK**: 217.154.34.155 (test server)

### Examples
```bash
# Basic workflow
make test us              # Test US server
make connect de           # Connect to DE server
make dred-status uk       # Check DRED on UK server

# Full setup workflow
make setup-devops uk      # Step 1
make setup-infra uk       # Step 2  
make setup-dred uk        # Step 3
make dred-redeploy uk     # Update DRED
```

## Architecture

**Hybrid Approach**: Docker Redis + Direct DRED
- **Redis**: Dockerized with 512MB memory limit
- **DRED**: Direct Node.js application managed by PM2
- **External Port**: 3029 (DRED)
- **Internal Port**: 6379 (Redis)

## Requirements

- SSH access to servers (root password for initial setup)
- SSH public keys in `team-ssh-keys.private`
- Ubuntu 22.04+ servers with 2GB RAM

## Troubleshooting

### Common Issues
- **SSH connection failed**: Run `make setup-devops [server]` first
- **DRED not responding**: Check `make dred-status [server]`
- **Command not found**: Run `make help` to see available commands

## Directory Structure

```
artifacts/
├── Makefile                 # Main interface
├── .env                     # Server configuration
├── scripts/                 # Setup scripts
│   ├── setup-devops.sh      # Step 1: User setup
│   ├── setup-infrastructure.sh # Step 2: Infrastructure
│   ├── setup-dred.sh        # Step 3: DRED deployment
│   └── test-server.sh       # Progressive testing
├── team-ssh-keys.private    # SSH keys (gitignored)
└── README.md               # This file
```

## Next Steps

1. **Setup SSH keys**: `cp team-ssh-keys.private.example team-ssh-keys.private`
2. **Test workflow**: `make test uk` (should show SSH failed)
3. **Start setup**: `make setup-devops uk` (will prompt for root password)
4. **Continue**: `make setup-infra uk && make setup-dred uk`

**Need help?** Run `make help` for command reference. 