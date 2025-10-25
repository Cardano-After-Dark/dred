# DRED DevOps

> ⚠️ **STATUS: EXPERIMENTAL / WORK IN PROGRESS**
>
> This devops tooling is experimental and primarily designed for centralized deployment
> scenarios. It represents ongoing work and may not be suitable for all use cases.
> Use with caution and expect changes.

Streamlined infrastructure management for DRED deployment.

## Quick Start

### 1. Configure Your Server

Edit the server-specific configuration in `config/`:

```bash
cd devops
# Edit config/.env for common settings
# Edit config/hosts.conf for server IPs
# Edit config/uk.env, us.env, or de.env for server-specific settings
```

### 2. Deploy to a Server (3 steps)

```bash
# Step 1: Create devops user with SSH keys
make srv-setup uk

# Step 2: Install infrastructure (Docker, Redis, Node.js)
make vps-infra-setup uk

# Step 3: Deploy DRED application
make vps-dred-deploy uk
```

### 3. Verify Deployment

```bash
# Check server status
make vps-check uk

# View logs
make vps-dred-logs uk

# Check all servers
make dred-check-status
```

## Available Commands

Run `make help` or `make` to see all available commands:

```bash
make help
```

### Local Development

```bash
make local-dred-run [LOGGING=...]     # Build and run DRED locally
```

### Server Operations

```bash
make srv-setup [server]               # Create devops user + SSH keys
make srv-connect [server]             # SSH to server
```

### VPS Operations

```bash
make vps-infra-setup [server]         # Install Docker, Redis, Node.js
make vps-dred-deploy [server]         # Deploy/redeploy DRED
make vps-check [server] [command]     # Check server status
make vps-dred-logs [server]           # View DRED logs
```

### DRED Operations

```bash
make dred-send-message [server] [channel] message...
make dred-check-status                # Check all servers
```

## Configuration

### Server Configuration Files

- `config/.env` - Common DRED settings (Blockfrost key, branch, etc.)
- `config/hosts.conf` - Server IPs and SSH settings
- `config/uk.env`, `config/us.env`, `config/de.env` - Server-specific overrides

### Available Servers

- **UK**: 217.154.34.155
- **DE**: 85.215.215.192
- **US**: 74.208.13.84

## Common Tasks

### Check Server Status

```bash
make vps-check uk
```

### View Logs

```bash
make vps-dred-logs uk
```

Or with filtering:

```bash
make vps-check uk logs 100 grep discovery
```

### Send Test Message

```bash
make dred-send-message uk news Hello from UK server
```

### Redeploy DRED

```bash
make vps-dred-deploy uk
```

This will pull latest code, rebuild, and restart.

### Run Locally

```bash
make local-dred-run LOGGING=default:debug,replicant:trace
```

## Troubleshooting

### Check All Servers

```bash
make dred-check-status
```

### SSH to Server

```bash
make srv-connect uk
```

### View Environment Variables

```bash
make vps-check uk env
```

### Restart DRED

```bash
make vps-check uk restart
```

## Infrastructure Overview

Each VPS runs:
- **Docker** - Container runtime
- **Redis** - Message queue (in Docker, port 6379)
- **Node.js 20.x** - Runtime via nvm
- **PM2** - Process manager
- **DRED** - Application running on port 3029

All managed through the unified `Makefile` interface.
