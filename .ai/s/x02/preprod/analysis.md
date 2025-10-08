# Preprod Infrastructure Analysis

## Current Structure

### Makefile (179 lines)

**Commands:**
1. **3-Step Setup:** setup-devops → setup-infra → setup-dred
2. **DRED Management:** dred-redeploy, dred-logs, dred-status
3. **Testing:** test-self-id, test
4. **Utilities:** connect, list

### Scripts (1,084 lines total)

| Script | Lines | Purpose |
|--------|-------|---------|
| setup-devops.sh | 152 | Create devops user + SSH keys |
| setup-infrastructure.sh | 169 | Install Docker, Redis, Node.js, PM2 |
| setup-dred-minimal.sh | 255 | Deploy DRED (clone, build, config, PM2) |
| update-dred.sh | 118 | Update running DRED (git pull, rebuild, restart) |
| test-server.sh | 177 | Test connectivity + PM2 commands (env, logs, show) |
| test-self-identification.sh | 119 | Test specific self-ID fix |
| fix-api-key-v2.sh | 78 | Fix API key in .env + PM2 config |
| make-executable.sh | 16 | chmod +x scripts (one-time setup) |

---

## Redundancy Analysis

### 1. dred-redeploy vs update-dred.sh

**Makefile:**
```makefile
dred-redeploy:
    @ssh devops@$IP "cd dred && bash scripts/update-dred.sh"
```

**Problem:** Calls `scripts/update-dred.sh` on **remote** server, but that script lives in preprod/ **locally**.

**Reality Check:**
- `update-dred.sh` is designed to run ON the VPS (uses /home/devops/dred paths)
- But it's stored in **preprod/scripts/** (local)
- `dred-redeploy` calls it remotely, so it must be on server

**Actual behavior:**
- During `setup-dred`, script gets copied to server
- `dred-redeploy` ssh's and runs it remotely

**Issue:** Unclear script location - is it a local util or remote script?

### 2. dred-logs vs test-server.sh logs

**dred-logs (Makefile):**
```bash
ssh devops@$IP "pm2 logs dred --lines 50"
```

**test-server.sh logs:**
```bash
./test-server.sh $IP logs [lines] [grep pattern]
```

**Redundancy:** Both show PM2 logs, but test-server.sh has more features (grep, custom lines).

**Could consolidate:** Remove dred-logs, use `make test $SERVER logs` instead.

### 3. dred-status vs test-server.sh

**dred-status (Makefile):**
```bash
ssh $IP "pm2 status | grep dred && docker ps | grep redis && curl /channels"
```

**test-server.sh (no args):**
- Shows SSH connectivity
- Shows env vars
- Available commands

**Different purposes:**
- dred-status: Quick runtime status
- test-server: Dev/debug tool with commands

**Verdict:** Not redundant - different use cases.

### 4. test-self-identification.sh

**Purpose:** Tests specific fix from development session
**Usage:** One-time validation during fix deployment

**Question:** Still needed now that fix is deployed and working?

**Status:** Development/validation artifact, not core infrastructure.

### 5. fix-api-key-v2.sh

**Purpose:** Manually fix API key without full redeploy
**Usage:** One-time fix when API key is wrong

**Question:** With proper config management (config/*.env), is this needed?

**Status:** Workaround script, not core infrastructure.

### 6. make-executable.sh

**Purpose:** Make scripts executable
**Usage:** One-time setup

**Question:** Needed? Scripts are already +x in git.

**Status:** Redundant - scripts have +x permissions.

---

## Optimality Assessment

### Infrastructure Setup Flow

**Current: 3-step setup (works well)**
```
1. make setup-devops uk    # User + SSH
2. make setup-infra uk     # Docker + Redis + Node
3. make setup-dred uk      # Clone + build + deploy DRED
```

**Optimal?** ✅ Yes - clear, idempotent, modular.

### DRED Management

**Current:**
```
make dred-redeploy uk      # Update code
make dred-logs uk          # View logs
make dred-status uk        # Check status
```

**Redundancy with main Makefile:**

Main Makefile already has:
```
make dred-run-local        # Run locally
make dred-send-message     # Send message
make dred-check-status     # Check all servers (better)
```

**Issue:** `preprod/Makefile` is for deployment, main `Makefile` is for development. Some overlap in status checking.

**Potential:** Main Makefile's `dred-check-status` checks ALL servers (local + remote). Could replace preprod's dred-status.

---

## Core vs. Utility Scripts

### Core (needed for infrastructure)

1. ✅ **setup-devops.sh** - Required: Initial server access
2. ✅ **setup-infrastructure.sh** - Required: Install dependencies
3. ✅ **setup-dred-minimal.sh** - Required: Deploy application
4. ✅ **update-dred.sh** - Required: Update deployments

**Total: 694 lines** (64% of scripts)

### Utility (dev/debug, not core infrastructure)

5. ⚠️ **test-server.sh** (177 lines) - Useful for debugging, but not core
6. ❌ **test-self-identification.sh** (119 lines) - One-time validation, done
7. ❌ **fix-api-key-v2.sh** (78 lines) - Workaround, proper config exists
8. ❌ **make-executable.sh** (16 lines) - Redundant, scripts already +x

**Total: 390 lines** (36% of scripts)

---

## Recommendations

### Delete These (390 lines)

1. **test-self-identification.sh** - Fix validated and deployed, no longer needed
2. **fix-api-key-v2.sh** - Use proper config/*.env instead
3. **make-executable.sh** - Scripts already have +x permissions

**Keep or consolidate:**
4. **test-server.sh** - Useful debug tool, BUT:
   - Could be moved to main scripts/ (it's a dev tool, not deployment)
   - OR simplified to just SSH commands in Makefile

### Simplify Makefile

**Remove redundant commands:**
- `dred-logs` → use `make test $SERVER logs` instead
- `dred-status` → use main Makefile's `make dred-check-status` instead

**Keep:**
- 3-step setup (setup-devops, setup-infra, setup-dred)
- dred-redeploy (core update workflow)
- connect, test, list (useful utilities)

### Clarify Script Locations

**Issue:** update-dred.sh confusion (local vs remote)

**Options:**
1. Keep in preprod/scripts/, copy to server during setup
2. Move to dred repo's scripts/ (it runs on server)
3. Inline into Makefile (it's simple enough)

**Recommendation:** Keep current approach but document it clearly.

---

## Summary

### Current: 1,084 lines (8 scripts)

- Core infrastructure: 694 lines (4 scripts) - ✅ Needed
- Dev/debug utilities: 390 lines (4 scripts) - ⚠️ Removable

### Optimal: ~700 lines (4-5 scripts)

**Remove:**
- test-self-identification.sh (119 lines) - validation artifact
- fix-api-key-v2.sh (78 lines) - workaround script
- make-executable.sh (16 lines) - redundant

**Decision point:**
- test-server.sh (177 lines) - Keep or move to main scripts/?

**Result:** ~36% reduction if removing utilities, ~50% reduction including test-server consolidation.
