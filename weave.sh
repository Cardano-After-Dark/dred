#!/bin/bash
set -euo pipefail
ROOT=$(git rev-parse --show-toplevel)
CURRENT=$(git branch --show-current)
if [[ $# -gt 0 ]]; then
  TARGETS=("$@")
elif [[ -f "$ROOT/.weave" ]]; then
  mapfile -t TARGETS < <(grep -v '^\s*#' "$ROOT/.weave" | grep -v '^\s*$')
else
  echo "error: no arguments and no .weave file on branch '$CURRENT'" >&2
  exit 1
fi
[[ ${#TARGETS[@]} -eq 0 ]] && { echo "error: no source branches specified" >&2; exit 1; }
for branch in "${TARGETS[@]}"; do
  [[ "$branch" == "$CURRENT" ]] && { echo "skip: refusing to merge '$branch' into itself"; continue; }
  git rev-parse --verify "$branch" &>/dev/null || { echo "error: branch '$branch' does not exist" >&2; exit 1; }
  branch_tip=$(git rev-parse "$branch")
  git merge-base --is-ancestor "$branch_tip" HEAD 2>/dev/null && { echo "skip: '$branch' (${branch_tip:0:7}) already woven in"; continue; }
  echo "weaving '$branch' into $CURRENT..."
  git merge -s ours --no-edit --allow-unrelated-histories "$branch" \
    -m "weave: merge $branch into $CURRENT (content unchanged)"
done