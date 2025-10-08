# Preprod Optimization Recommendations

## High Signal Analysis

Current preprod infrastructure: **1,084 lines (8 scripts + Makefile)**

**Verdict:** 36% is utility/workaround code, not core infrastructure.

---

## Immediate Actions (Safe Deletions)

### 1. Delete Validation Artifact (119 lines)

**test-self-identification.sh** - One-time fix validation from development

**Reasoning:**
- Tests specific self-ID fix from session S00
- Fix is deployed and working on all servers
- No longer needed for infrastructure setup
- Just a validation script from development

**Command:**
```bash
rm preprod/scripts/test-self-identification.sh
```

**Impact:** Remove `test-self-id` from Makefile help (lines 45, 139-147)

### 2. Delete Workaround Script (78 lines)

**fix-api-key-v2.sh** - Manual API key fix

**Reasoning:**
- Created to fix API key without full redeploy
- Proper solution: use config/*.env files
- Workaround, not infrastructure
- If API key needs changing, edit config/*.env and redeploy

**Command:**
```bash
rm preprod/scripts/fix-api-key-v2.sh
```

### 3. Delete Redundant Setup Script (16 lines)

**make-executable.sh** - chmod +x scripts

**Reasoning:**
- Scripts already have +x permissions in git
- References non-existent setup-dred.sh (should be setup-dred-minimal.sh)
- Not called by anything
- Redundant

**Command:**
```bash
rm preprod/scripts/make-executable.sh
```

**Total immediate deletion: 213 lines (20% reduction)**

---

## Decision Required

### test-server.sh (177 lines) - Keep, Move, or Simplify?

**What it does:**
- SSH connectivity test
- PM2 command wrapper (env, logs, show, restart, status)
- Advanced log filtering (grep patterns, line counts)

**Options:**

**A. Keep in preprod/** (current)
- It's a deployment debug tool
- Useful for troubleshooting remote servers
- No changes needed

**B. Move to main scripts/**
- It's a dev tool, not deployment infrastructure
- Main scripts/ has dev utilities
- Aligns with "preprod = deployment only" philosophy

**C. Simplify to Makefile commands**
- Most features are just ssh wrappers
- Could inline common ones into Makefile
- Keep test-server.sh only for complex log filtering

**Recommendation:** Option B - Move to main scripts/

**Reasoning:**
- test-server.sh is a debugging tool, not deployment script
- Main scripts/ has check-status.sh, send-message.sh (similar tools)
- Keeps preprod/ focused on core infrastructure
- Still accessible via `./scripts/test-server.sh`

---

## Makefile Simplifications

### Remove Redundant Commands

**1. dred-logs command**

Current:
```makefile
dred-logs:
    @ssh devops@$IP "pm2 logs dred --lines 50"
```

**Replace with:** `make test $SERVER logs`

**Reasoning:** test-server.sh has more features (grep, custom lines)

**2. dred-status command**

Current: Shows PM2 + Redis + channels (inline in Makefile)

**Alternative:** Main Makefile's `make dred-check-status` checks ALL servers

**Reasoning:**
- Main command is more comprehensive
- Checks local + all remote servers
- No need for per-server status command

**Decision:** Keep dred-status for quick single-server check, OR use main's check-status.

---

## Final Structure

### After Cleanup

**preprod/scripts/ (4 core scripts, ~700 lines)**
```
├── setup-devops.sh              152 lines  ✅ Core
├── setup-infrastructure.sh      169 lines  ✅ Core
├── setup-dred-minimal.sh        255 lines  ✅ Core
└── update-dred.sh               118 lines  ✅ Core
```

**preprod/Makefile (~160 lines after removing deleted script commands)**
```
Commands:
  setup-devops [server]    # Step 1: User + SSH
  setup-infra [server]     # Step 2: Docker + Redis + Node
  setup-dred [server]      # Step 3: Deploy DRED
  dred-redeploy [server]   # Update DRED
  connect [server]         # SSH to server
  test [server]            # Test + PM2 commands (via main scripts/test-server.sh)
  list                     # List servers
```

### Moved to Main scripts/

```
scripts/test-server.sh    177 lines  📦 Moved (dev tool)
```

---

## Summary

### Current State
- 8 scripts, 1,084 lines
- Mixed: core infrastructure + dev tools + workarounds

### After Cleanup
- 4 core scripts, ~700 lines (35% reduction)
- 1 dev tool moved to main scripts/
- Clear separation: preprod = infrastructure setup only

### Commands to Execute

```bash
# Delete validation/workaround scripts
rm preprod/scripts/test-self-identification.sh
rm preprod/scripts/fix-api-key-v2.sh
rm preprod/scripts/make-executable.sh

# Move dev tool to main scripts
mv preprod/scripts/test-server.sh scripts/

# Update preprod/Makefile (remove references to deleted scripts)
```

### Impact
- ✅ Cleaner, focused infrastructure scripts
- ✅ Better separation: deployment vs dev tools
- ✅ Easier to understand and maintain
- ✅ No functionality lost (just reorganized)

---

## User Decision Points

1. **Delete 3 scripts?** (test-self-id, fix-api-key-v2, make-executable)
   - Safe: No longer needed

2. **Move test-server.sh to main scripts/?**
   - Preferred: Better organization
   - Alternative: Keep in preprod if you prefer

3. **Simplify Makefile commands?**
   - Remove dred-logs (use test instead)
   - Remove dred-status OR remove from main Makefile
   - Alternative: Keep both if you like per-server commands
