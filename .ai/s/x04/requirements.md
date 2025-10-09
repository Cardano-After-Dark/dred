# X04: Infrastructure Testing After Integration Rebase

## Context

After rebasing `feature/onchain-replication-m2` onto `feature/integration` (see `.ai/s/x03/`), we need to verify that the DevOps infrastructure still works correctly with the integrated changes.

**Key Integration Changes:**
- Accepted integration's `checkServerAvailability()` with stricter HTTP protocol enforcement
- Integration enforces: insecure HTTP only allowed in `NODE_ENV=test`
- Accepted integration's build artifacts (`dist/`, `bin/`)

## Objectives

1. **Verify DevOps workflow** - Ensure all Makefile commands work correctly after integration
2. **Test HTTP (insecure) replication** - UK server + local server communication (non-SSL)
3. **Test HTTPS (secure) replication** - US server + local server communication (SSL)
4. **Validate protocol enforcement** - Verify `NODE_ENV=test` requirement for insecure connections
5. **Document any required fixes** - Capture changes needed for successful deployment

## Test Scenarios

### Test 1: UK Server - HTTP/Insecure Communication

**Environment:**
- UK server: Fresh Linux install, HTTP only
- Local server: HTTP only, `NODE_ENV=test` (to allow insecure)
- Goal: Verify message replication works in test mode

**Steps:**
1. Reset UK server (reinstall Linux image)
2. `make srv-setup uk` - Setup DevOps user and SSH
3. `make srv-connect uk` - Verify SSH access
4. `make vps-infra-setup uk` - Install infrastructure (Node, Redis, PM2)
5. `make vps-dred-deploy uk` - Deploy DRED application
6. `make vps-check uk` - Verify DRED is running
7. `make local-dred-run` - Start local DRED server (with `NODE_ENV=test`)
8. `make dred-send-message uk news "Test message"` - Send message to UK server
9. **Verify:** Message replicates to local DRED server

**Expected Challenges:**
- Need to set `NODE_ENV=test` for local server to allow insecure HTTP
- May need to adjust environment variables for HTTP protocol selection
- Integration's `checkServerAvailability()` will throw error if `NODE_ENV != test` for insecure connections

### Test 2: US Server - HTTPS/Secure Communication

**Environment:**
- US server: HTTPS/SSL enabled
- Local server: HTTPS/SSL enabled
- Goal: Verify secure replication works in production mode

**Steps:**
1. Configure US server for HTTPS (may already be configured)
2. `make vps-dred-deploy us` - Deploy/update DRED on US server
3. `make vps-check us` - Verify DRED is running with HTTPS
4. Configure local DRED for HTTPS
5. `make local-dred-run` - Start local DRED server (HTTPS mode)
6. `make dred-send-message us news "Test message"` - Send message to US server
7. **Verify:** Message replicates securely to local DRED server

**Expected Challenges:**
- SSL certificate configuration
- Environment variable changes for secure mode
- Port configuration for HTTPS

## Environment Variables to Check

Based on integration changes, these variables are critical:

```bash
# For insecure (HTTP) communication - TEST ONLY
NODE_ENV=test                    # Required for insecure connections
DRED_USE_INSECURE=true          # Enable HTTP instead of HTTPS

# For secure (HTTPS) communication - PRODUCTION
NODE_ENV=production              # Or unset (defaults to production behavior)
DRED_USE_INSECURE=false         # Use HTTPS (default)
```

## Success Criteria

- [ ] UK server successfully deployed and running
- [ ] Local DRED server can run in test mode (HTTP/insecure)
- [ ] Message sent to UK server replicates to local server
- [ ] US server successfully deployed with HTTPS
- [ ] Local DRED server can run in production mode (HTTPS/secure)
- [ ] Message sent to US server replicates securely to local server
- [ ] All Makefile commands work as expected
- [ ] Any necessary fixes are documented and committed

## Out of Scope

**X05: Full Dockerization** (next session, work by Benedikt)
- Docker container setup
- Docker Compose configuration
- Container orchestration

## Artifacts

This session will produce:
- `requirements.md` - This document
- `test-steps.md` - Detailed step-by-step test procedures
- `test-results.md` - Execution results and findings
- `fixes-required.md` - Any code changes needed (if applicable)
- `summary.md` - Session wrap-up and conclusions
