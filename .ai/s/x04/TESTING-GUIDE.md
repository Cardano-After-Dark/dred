# X04 Infrastructure Testing Guide

## Overview

This guide provides two complete test plans for verifying DRED infrastructure after the integration rebase.

## Quick Start

### Test 1: UK Server - HTTP/Insecure Mode ⚡
**Goal:** Verify insecure HTTP replication works

**Time:** ~20 minutes
**Document:** `.ai/s/x04/uk-server-test-plan.md`

```bash
# 1. Deploy UK server
cd devops
make vps-dred-deploy uk

# 2. Start local server (new terminal)
make local-dred-run

# 3. Test replication
curl -X POST http://217.154.34.155:3029/channel/test-uk/message \
  -H "Content-Type: application/json" -H "clientid: test-1" \
  -d '{"type":"test","ocid":"test-001","msg":"Hello UK!"}'

# 4. Verify on local
curl http://localhost:3029/channel/test-uk/messages | jq
```

### Test 2: US Server - HTTPS/Secure Mode 🔒
**Goal:** Verify secure HTTPS replication works

**Time:** ~25 minutes
**Document:** `.ai/s/x04/us-server-test-plan.md`

**Prerequisites:** Update configurations first!

```bash
# 1. Update configs for HTTPS
nano devops/config/us.env  # Set DRED_USE_INSECURE=false
nano .env                   # Set DRED_USE_INSECURE=false, NODE_ENV=production

# 2. Deploy US server
cd devops
make vps-dred-deploy us

# 3. Start local server (new terminal, HTTPS mode)
make local-dred-run

# 4. Test secure replication
curl -k -X POST https://74.208.13.84:3029/channel/test-us/message \
  -H "Content-Type: application/json" -H "clientid: test-1" \
  -d '{"type":"test","ocid":"secure-001","msg":"Secure message!"}'

# 5. Verify on local
curl -k https://localhost:3029/channel/test-us/messages | jq
```

## Document Index

| Document | Purpose |
|----------|---------|
| **requirements.md** | Original test requirements and objectives |
| **test-steps.md** | Detailed step-by-step procedures (generic) |
| **environment-setup.md** | Configuration files and environment details |
| **uk-server-test-plan.md** | ⚡ Complete UK HTTP test plan (START HERE) |
| **us-server-test-plan.md** | 🔒 Complete US HTTPS test plan |
| **test-results.md** | Document your test results here (TBD) |
| **TESTING-GUIDE.md** | This file - Quick reference |

## Configuration Files

All configuration files are ready to use:

- ✅ `.env` - Local server configuration (HTTP mode by default)
- ✅ `devops/config/.env` - Common deployment config
- ✅ `devops/config/uk.env` - UK server configuration (HTTP)
- ✅ `devops/config/us.env` - US server configuration (HTTP by default, change to HTTPS for Test 2)
- ✅ `devops/config/hosts.conf` - Server IP addresses

## Key Differences: HTTP vs HTTPS

| Aspect | UK (HTTP) | US (HTTPS) |
|--------|-----------|------------|
| Protocol | `http://` | `https://` |
| `DRED_USE_INSECURE` | `true` | `false` |
| `NODE_ENV` | `test` (local) | `production` (local) |
| curl flag | None | `-k` (ignore cert) |
| Port | 3029 | 3029 |
| Security | Unencrypted | TLS encrypted |

## Success Criteria

### UK Server (HTTP) ✅
- [ ] UK server deployed and running
- [ ] Local server connected via HTTP
- [ ] Messages replicate UK → Local
- [ ] Messages replicate Local → UK
- [ ] No protocol errors
- [ ] Replication delay < 3 seconds

### US Server (HTTPS) ✅
- [ ] US server deployed with HTTPS
- [ ] Local server connected via HTTPS
- [ ] SSL/TLS handshake successful
- [ ] Messages replicate US → Local securely
- [ ] Messages replicate Local → US securely
- [ ] No certificate errors (or expected self-signed warnings)
- [ ] Replication delay < 3 seconds

## Recommended Testing Order

1. **Start with UK Server (HTTP)** - Simpler, faster to debug
   - Read: `uk-server-test-plan.md`
   - Execute all steps
   - Document results

2. **Then US Server (HTTPS)** - More complex, requires config changes
   - Read: `us-server-test-plan.md`
   - Update configurations
   - Execute all steps
   - Document results

3. **Compare Results** - Note any differences in performance or behavior

## Common Commands

```bash
# Check server status
cd devops
make vps-check uk
make vps-check us

# View server logs
make vps-dred-logs uk
make vps-dred-logs us

# Connect to server
make srv-connect uk
make srv-connect us

# Restart server
ssh devops@217.154.34.155 "pm2 restart dred"  # UK
ssh devops@74.208.13.84 "pm2 restart dred"    # US

# Check local Redis
redis-cli ping

# Kill local server
# Press Ctrl+C in terminal running make local-dred-run
```

## Troubleshooting Quick Reference

**UK Server not replicating:**
```bash
# Check UK server logs
make vps-dred-logs uk | grep -i error

# Check local logs
# Look at terminal running make local-dred-run

# Test connectivity
curl http://217.154.34.155:3029/ping
```

**US Server SSL errors:**
```bash
# Use -k flag for testing
curl -k https://74.208.13.84:3029/ping

# Check HTTPS is enabled
ssh devops@74.208.13.84 "cat ~/dred/.env | grep DRED_USE_INSECURE"
# Should be: false
```

**Local server won't start:**
```bash
# Check Redis
redis-cli ping

# Check port not in use
lsof -i :3029

# Kill if needed
kill -9 <PID>

# Check .env file exists
cat .env
```

## After Testing

1. **Document results** in `.ai/s/x04/test-results.md`
2. **Note any issues** for fixes
3. **Compare HTTP vs HTTPS performance**
4. **Update this guide** if steps need refinement

## Key Findings

**Protocol Enforcement:**
- The hybrid approach from X03 rebase allows HTTP in ANY environment when `DRED_USE_INSECURE=true`
- No `NODE_ENV=test` restriction is enforced
- Located in: `src/server/DredReplicator.ts:411-438`

**Environment Loading:**
- Remote servers: `devops/config/<server>.env` loaded by deployment script
- Local server: `/.env` automatically loaded by `dotenv/config` in `bin/dredServer`

## Next Steps

After both tests complete successfully:
1. Create `.ai/s/x04/test-results.md` with findings
2. Identify any fixes needed in `.ai/s/x04/fixes-required.md`
3. Update `.ai/s/x04/summary.md` with session wrap-up

---

**Ready to begin?** Start with `.ai/s/x04/uk-server-test-plan.md`
