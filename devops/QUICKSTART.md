# DRED DevOps - Quickstart

Get DRED running on a fresh VPS in under 5 minutes.

## Prerequisites

- Ubuntu 20.04+ VPS with root access
- Blockfrost API key from [blockfrost.io](https://blockfrost.io)
- SSH key configured locally

## Setup in 3 Commands

### 1. Configure

```bash
cd devops

# Edit server IP and your API key
vim config/.env           # Set BF_API_KEY
vim config/hosts.conf     # Set UK, US, or DE server IP
vim config/uk.env         # Set DRED_NODE_ID (e.g., dredNode-uk-12345)
```

### 2. Deploy

```bash
make srv-setup uk              # Create devops user (enter root password once)
make vps-infra-setup uk        # Install Docker, Redis, Node.js
make vps-dred-deploy uk        # Deploy and start DRED
```

### 3. Verify

```bash
make vps-check uk              # Check server status
make dred-send-message uk news "Hello DRED"  # Send test message
```

## Common Commands

```bash
make vps-dred-logs uk          # View logs
make vps-dred-deploy uk        # Update/redeploy
make srv-connect uk            # SSH to server
make local-dred-run            # Run locally
make help                      # Show all commands
```

## Need More Help?

- **Detailed Guide:** See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for complete documentation
- **Command Reference:** See [README.md](./README.md)
- **Troubleshooting:** Run `make help` or check DEPLOYMENT-GUIDE.md

## Server Names

Use these server names with make commands:
- `uk` - UK server
- `us` - US server
- `de` - DE server

Example: `make vps-check uk` or `make vps-dred-deploy us`
