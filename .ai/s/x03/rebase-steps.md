# Rebase Steps: feature/onchain-replication-m2 onto feature/integration

## Quick Operations Guide

### 1. Prepare

```bash
git checkout feature/onchain-replication-m2
git branch feature/onchain-replication-m2-backup  # safety backup
```

### 2. Start Rebase

```bash
git rebase feature/integration
```

### 3. Resolve Conflicts (repeat for each commit)

When you hit conflicts:

```bash
# Accept integration's version for these files:
git checkout --theirs src/server/DredReplicator.ts
git checkout --theirs dist/
git checkout --theirs bin/

# Stage resolved files
git add src/server/DredReplicator.ts dist/ bin/

# Continue to next commit
git rebase --continue
```

**Note:** If conflict is only in other files (not DredReplicator.ts, dist/, or bin/), resolve manually and then `git add` + `git rebase --continue`.

### 4. Complete Rebase

Repeat step 3 until rebase completes. If a commit has no conflicts, it will automatically continue.

### 5. Rebuild & Verify

```bash
# Rebuild the project
pnpm run build

# Run tests
pnpm test

# Check result
git log --oneline -10
```

### 6. Push

```bash
git push --force-with-lease origin feature/onchain-replication-m2
```

## Abort if Needed

```bash
git rebase --abort  # Returns to pre-rebase state
```

## Summary

- **Accept from integration:** `checkServerAvailability()`, `dist/`, `bin/`
- **Keep from m2:** Everything else
- **Commands:** `git checkout --theirs <file>` → `git add <file>` → `git rebase --continue`
