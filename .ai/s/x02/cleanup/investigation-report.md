# X02: Infrastructure Investigation Report

## Summary

Identified **~2,900 lines of unused deployment code** across 3 obsolete folders.

## Findings

### 1. preprod/ vs pre-prod/

**Status:** Two separate folders with different purposes

**preprod/** (ACTIVE):
- Recent commits (current session)
- Modern structure: config/, scripts/, ignore/
- Used by main Makefile via `make dred-setup-remote`
- 9 active scripts (1,184 lines)

**pre-prod/** (OBSOLETE):
- Last commits: Aug-Sep 2024
- Different structure: conf/, scripts/
- Different scripts: connect-server.sh, initial-server-setup.sh, setup-ssh-keys.sh
- NOT referenced in main Makefile
- NOT referenced in package.json or top-level docs

**Conclusion:** ❌ **pre-prod/** is obsolete, superseded by **preprod/**

---

### 2. vps/ and vps_old/

**Status:** Both obsolete

**Evidence:**
- Last git commits: Aug 16 (5d6e253, 3cc090e, e4d2787, f99b4f9)
- NOT referenced in main Makefile
- NOT referenced in package.json
- NOT referenced in any top-level docs
- predates current preprod/ structure

**Conclusion:** ❌ Both **vps/** and **vps_old/** are obsolete

---

### 3. preprod/ignore/

**Status:** Old scripts already replaced

**Contents:** 6 scripts (1,361 lines)
- Old monolithic setup-server.sh (330 lines)
- Old validation scripts
- Old level-based setup (level1, level2, level3)

**Evidence:**
- In folder named "ignore"
- NOT referenced in preprod/Makefile
- NOT referenced in any preprod/scripts/
- Replaced by current setup-devops.sh, setup-infrastructure.sh, setup-dred-minimal.sh

**Conclusion:** ❌ **preprod/ignore/** is obsolete

---

### 4. preprod/scripts/ Redundancy Check

**fix-api-key.sh** (100 lines) vs **fix-api-key-v2.sh** (78 lines)

Need to investigate:
- Which version is currently used?
- Can we delete one?

**Status:** ⚠️ Needs investigation

---

## Deletion Plan

### Safe to Delete (verified not referenced)

```bash
# 1. Delete pre-prod/ folder
rm -rf pre-prod/

# 2. Delete vps/ folder
rm -rf vps/

# 3. Delete vps_old/ folder
rm -rf vps_old/

# 4. Delete preprod/ignore/ folder
rm -rf preprod/ignore/
```

**Total removal:** ~2,900 lines of obsolete code

### Further Investigation

1. Check which fix-api-key script is used
2. Verify preprod/scripts/ has no other redundancies
3. Review preprod/Makefile structure for optimization

---

## Impact Analysis

### What breaks if we delete?

**Nothing.** Verified:
- Main Makefile only references preprod/, not pre-prod/vps/vps_old
- preprod/ internal scripts don't reference ignore/ folder
- No package.json scripts reference deleted folders

### What remains?

**preprod/** folder with clean structure:
```
preprod/
├── config/              (server .env files)
├── scripts/             (9 active scripts, 1,184 lines)
├── Makefile             (179 lines)
└── README.md
```

---

## Recommendations

### Immediate Actions

1. ✅ Delete pre-prod/, vps/, vps_old/, preprod/ignore/
2. ⚠️ Investigate fix-api-key scripts redundancy
3. ✅ Update preprod/README.md if it references ignore/

### Follow-up

1. Document preprod/ workflow in main README
2. Review preprod/scripts/ for further consolidation
3. Consider if preprod/Makefile can be simplified further
