# X02: Deployment Cleanup Action Plan

## Verified Deletions

All items below confirmed to be:
- ✅ Not referenced in Makefiles
- ✅ Not referenced in package.json
- ✅ Not referenced in active scripts
- ✅ Obsolete/replaced by current infrastructure

### Delete These Folders (~2,900 lines)

```bash
# 1. Old deployment attempt folders
rm -rf vps/              # 48K, last commit Aug 16 (5d6e253)
rm -rf vps_old/          # 72K, archived version

# 2. Old pre-production folder (superseded by preprod/)
rm -rf pre-prod/         # ~50K, different structure, not referenced

# 3. Obsolete scripts in preprod/
rm -rf preprod/ignore/   # 1,361 lines, old monolithic scripts
```

**Total cleanup:** ~370KB, ~2,900 lines of code

---

## Optional Deletions

### fix-api-key.sh (100 lines)

**Status:** Utility script, not in workflow
- Superseded by fix-api-key-v2.sh (fixed variable expansion)
- Neither version referenced in Makefile
- Both are manual utility scripts

**Recommendation:** Keep v2, delete v1 (saves 100 lines)

```bash
rm preprod/scripts/fix-api-key.sh  # Keep only v2
```

---

## Execution Order

### Step 1: Backup Check
```bash
# Verify current branch is clean
git status

# Optional: Create backup branch
git checkout -b backup-before-cleanup
git checkout -
```

### Step 2: Delete Folders
```bash
# From project root
rm -rf vps/ vps_old/ pre-prod/ preprod/ignore/

# Optional: delete old fix-api-key
rm preprod/scripts/fix-api-key.sh
```

### Step 3: Verify Nothing Broke
```bash
# Test main Makefile commands still work
make help
cd preprod && make help

# Verify scripts exist
ls -la preprod/scripts/
```

### Step 4: Commit
```bash
git add -A
git status  # Review what will be deleted

git commit -m "chore: remove obsolete deployment folders

Removed:
- vps/ and vps_old/ (old deployment attempts, ~120K)
- pre-prod/ (superseded by preprod/, ~50K)
- preprod/ignore/ (old monolithic scripts, 1,361 lines)
- preprod/scripts/fix-api-key.sh (superseded by v2)

Total: ~370KB, ~3,000 lines of obsolete code removed
"
```

---

## Post-Cleanup State

### Remaining Structure

```
dred/
├── Makefile                    (62 lines - dev commands)
├── scripts/                    (248 lines - dev utilities)
│   ├── check-status.sh
│   ├── deploy-remote.sh
│   ├── run-local.sh
│   ├── send-message.sh
│   ├── send-message-on-channel.sh
│   └── [other utilities]
└── preprod/                    (clean deployment folder)
    ├── Makefile                (179 lines - deployment orchestration)
    ├── config/                 (server .env files: us, de, uk)
    ├── scripts/                (1,084 lines after cleanup)
    │   ├── setup-devops.sh
    │   ├── setup-infrastructure.sh
    │   ├── setup-dred-minimal.sh
    │   ├── update-dred.sh
    │   ├── test-server.sh
    │   ├── test-self-identification.sh
    │   ├── fix-api-key-v2.sh
    │   └── make-executable.sh
    ├── servers.conf
    └── README.md
```

### Code Reduction Summary

| Component | Before | After | Reduction |
|-----------|--------|-------|-----------|
| Deployment folders | 4 | 1 | -75% |
| preprod scripts | 2,545 | 1,084 | -57% |
| Total deployment code | ~3,500 | ~1,500 | -57% |

---

## Risk Assessment

**Risk Level:** ✅ **Very Low**

**Why safe:**
1. All deleted code is not referenced anywhere
2. Git history preserved - can recover if needed
3. Active preprod/ folder untouched (only ignore/ subfo lder deleted)
4. All current workflows remain intact

**Rollback plan:** `git revert HEAD` if issues arise

---

## Next Session (Optional)

After cleanup, consider:
1. Review preprod/Makefile for simplification opportunities
2. Document preprod workflow in main README
3. Consolidate preprod/scripts if patterns emerge
