# X02 Requirements: Infrastructure Cleanup

## Primary Goal

Remove unused deployment infrastructure to reduce entropy and maintenance overhead.

## Scope

Investigate and clean up deployment-related folders:
- preprod/ (active)
- pre-prod/ (unknown)
- vps/ (likely old)
- vps_old/ (archived)

## Tasks

### 1. Folder Analysis
- Compare preprod/ vs pre-prod/ structure
- Check if vps/ and vps_old/ are referenced anywhere
- Verify preprod/ignore/ scripts are not in use

### 2. Cleanup Candidates
- Delete vps/ and vps_old/ if confirmed unused
- Delete preprod/ignore/ if scripts are obsolete
- Consolidate or delete pre-prod/ if duplicate

### 3. Documentation
- Document preprod/ workflow and structure
- Update main README if needed
- Create deletion summary

## Success Criteria

- Removed at least 1,500 lines of unused code
- Single, clear deployment folder structure
- No broken references
- Documented remaining infrastructure

## Constraints

- Do not delete anything currently referenced
- Do not break existing preprod/Makefile workflow
- Verify with git history before deletion
