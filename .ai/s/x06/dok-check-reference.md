# dok-check Quick Reference

## Overview

`dok-check` is a comprehensive testing and monitoring tool for Docker-based DRED deployments.

## Basic Syntax

```bash
make dok-check [server] [command] [args...]
```

## Commands

### 1. Default (No Command)
**Usage:** `make dok-check us`

Runs comprehensive diagnostics:
- SSH connection test
- Docker installation check
- Container status check
- HTTP/HTTPS endpoint tests
- Recent logs (last 10 lines)
- Available commands reference

### 2. status
**Usage:** `make dok-check us status`

Shows docker-compose container status (equivalent to `docker-compose ps`)

**Example output:**
```
NAME       IMAGE           STATUS      PORTS
dred-node  docker_dred-node  Up 5 hours  0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

### 3. logs
**Usage:**
```bash
make dok-check us logs                    # Last 50 lines
make dok-check us logs 100                # Last 100 lines
make dok-check us logs grep pattern       # Last 50 lines, grep filter
make dok-check us logs 1000 grep pattern  # Last 1000 lines, grep filter
```

**Examples:**
```bash
# View recent logs
make dok-check us logs

# View more context
make dok-check us logs 200

# Search for errors
make dok-check us logs grep error

# Search in more logs
make dok-check us logs 1000 grep "error|warn|fail"

# Search for specific patterns
make dok-check us logs grep "replication|discovery|peer"
```

### 4. ps
**Usage:** `make dok-check us ps`

Lists all Docker containers on the server (not just DRED)

**Useful for:**
- Checking if other containers are interfering
- Verifying Redis container status
- Seeing full Docker environment

### 5. exec
**Usage:** `make dok-check us exec "command"`

Executes arbitrary commands inside the DRED container

**Examples:**
```bash
# Check PM2 status
make dok-check us exec "pm2 status"

# View PM2 logs
make dok-check us exec "pm2 logs dred --lines 100"

# Check file structure
make dok-check us exec "ls -la /dred"

# Check running processes
make dok-check us exec "ps aux"

# Check environment inside container
make dok-check us exec "env | grep DRED"

# Test Redis connection
make dok-check us exec "redis-cli ping"
```

### 6. restart
**Usage:** `make dok-check us restart`

Restarts all containers via docker-compose

**When to use:**
- After .env file changes
- After configuration updates
- When containers are in bad state
- To apply minor fixes

**Note:** Does NOT rebuild images (use `make dok-dred-deploy` for that)

### 7. env
**Usage:** `make dok-check us env`

Shows environment variables inside the container

**Filters for DRED-related variables:**
- DRED_*
- CARDANO_*
- NODE_ENV
- HOST_DOMAIN
- BF_API_*

**Example output:**
```
BF_API_KEY=preprodB0ntxMUrqIeNgLlUvDqLxzQtGvXkfA5s
CARDANO_NETWORK=preprod
HOST_DOMAIN=us.pp.node-01.dred.network
NODE_ENV=production
```

### 8. health
**Usage:** `make dok-check us health`

Comprehensive health check including:

**Tests:**
1. ✓ HTTP (port 80) responding
2. ✓ HTTPS (port 443) responding
3. ✓ API endpoint (/channels) responding
4. ✓ SSL certificate present
5. ✓ JSON response validation

**Example output:**
```
✓ HTTP (port 80) responding
✓ HTTPS (port 443) responding

Testing API endpoint: https://us.pp.node-01.dred.network/channels
✓ API endpoint responding:
[
    "news",
    "discussion",
    "development"
]

Checking SSL certificate:
-rw-r--r-- 1 root root fullchain.pem -> /etc/letsencrypt/live/.../fullchain.pem
-rw-r--r-- 1 root root privkey.pem -> /etc/letsencrypt/live/.../privkey.pem
```

## Common Workflows

### Quick Health Check
```bash
make dok-check us health
```

### Troubleshooting Deployment
```bash
# 1. Check container status
make dok-check us status

# 2. View recent logs
make dok-check us logs 100

# 3. Check environment
make dok-check us env

# 4. Test endpoints
make dok-check us health
```

### Debugging SSL Issues
```bash
# Check if certbot succeeded
make dok-check us logs grep certbot

# Verify SSL files exist
make dok-check us exec "ls -la /etc/nginx/ssl"

# Check nginx status
make dok-check us exec "pm2 status nginx"

# View nginx logs
make dok-check us logs grep nginx
```

### Monitoring Replication
```bash
# Check replication status
make dok-check us logs grep "replication|peer|discovery"

# Monitor in real-time
make dok-dred-logs us
```

### Checking PM2 Status
```bash
# PM2 process status
make dok-check us exec "pm2 status"

# PM2 detailed info
make dok-check us exec "pm2 show dred"

# PM2 logs
make dok-check us exec "pm2 logs --lines 50"
```

### Testing After Deployment
```bash
# Full diagnostic
make dok-check us

# Specific checks
make dok-check us status
make dok-check us health
make dok-check us logs 50
```

## Comparison with vps-check

| Feature | dok-check | vps-check |
|---------|-----------|-----------|
| Target | Docker containers | PM2 processes |
| Logs | `docker logs` | `pm2 logs` |
| Restart | `docker-compose restart` | `pm2 restart` |
| Status | `docker-compose ps` | `pm2 status` |
| Exec | `docker exec` | Direct SSH |
| Health | HTTP/HTTPS/API tests | Port checks |
| Environment | Container env | Server env |

## Tips

1. **Always start with health check** after deployment:
   ```bash
   make dok-check us health
   ```

2. **Use grep for specific issues**:
   ```bash
   make dok-check us logs 1000 grep "error|fail|exception"
   ```

3. **Check environment if behavior is unexpected**:
   ```bash
   make dok-check us env
   ```

4. **Use exec for deep debugging**:
   ```bash
   make dok-check us exec "pm2 logs --lines 200"
   ```

5. **Monitor live logs during testing**:
   ```bash
   make dok-dred-logs us
   ```

## Exit Codes

- **0** - Success
- **1** - Error (SSH failed, Docker not installed, command failed, etc.)

## Notes

- All Docker commands use `sudo` to avoid group membership issues
- Grep searches are case-insensitive (-i flag)
- Log commands use `docker logs --tail` for efficiency
- Health check validates JSON responses from API
- Container name is always `dred-node`
