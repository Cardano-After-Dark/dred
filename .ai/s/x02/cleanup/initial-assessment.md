# Session X02: Deployment Infrastructure Cleanup

## Goal

Reduce entropy by removing unused deployment scripts and consolidating infrastructure.

## Current State Assessment

### Deployment Folders (4 total)

```
├── preprod/          200K  ✅ ACTIVE (last commit: current session)
├── pre-prod/         ~50K  ⚠️  Different folder - investigate
├── vps/              48K   ❌ OLD (last commit: Aug 16, commit 5d6e253)
└── vps_old/          72K   ❌ OLDER (archived version)
```

### preprod/ Structure (Active)

**Active Scripts** (1,184 lines):
```
scripts/
├── setup-devops.sh              152 lines  (create devops user + SSH)
├── setup-infrastructure.sh      169 lines  (Docker, Redis, Node.js)
├── setup-dred-minimal.sh        255 lines  (deploy DRED app)
├── update-dred.sh               118 lines  (update running DRED)
├── test-server.sh               177 lines  (connectivity + status tests)
├── test-self-identification.sh  119 lines  (verify server identity)
├── fix-api-key.sh               100 lines  (API key management)
├── fix-api-key-v2.sh             78 lines  (API key v2)
└── make-executable.sh            16 lines  (chmod helper)
```

**Inactive Scripts** (1,361 lines) - in preprod/ignore/:
```
ignore/
├── setup-server.sh              330 lines  (old monolithic setup)
├── validate-installation.sh     301 lines  (old validation)
├── level3-install-components.sh 239 lines  (old step 3)
├── setup-dred.sh                216 lines  (old DRED setup)
├── level2-setup-user.sh         147 lines  (old step 2)
└── level1-check-root-access.sh  128 lines  (old step 1)
```

**Other Files:**
- Makefile (179 lines) - orchestration
- config/*.env - server configurations (us, de, uk)
- README.md, docs

### Findings

1. **preprod/ignore/** contains 1,361 lines of old scripts already replaced by current workflow
2. **vps/** and **vps_old/** are archived deployment attempts (120K total)
3. **pre-prod/** is a separate folder - unclear purpose vs preprod/
4. **fix-api-key.sh** and **fix-api-key-v2.sh** might be redundant

## Questions to Answer

1. Is **pre-prod/** still needed or is it a duplicate?
2. Can **vps/** and **vps_old/** be safely deleted?
3. Can **preprod/ignore/** be deleted?
4. Are both fix-api-key scripts needed?
5. What's the relationship between main Makefile and preprod/Makefile?

## Next Steps

1. Investigate pre-prod/ vs preprod/
2. Verify vps/ and vps_old/ are not referenced
3. Check if ignore/ scripts are referenced anywhere
4. Document preprod/ workflow
5. Create deletion plan
