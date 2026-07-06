---
name: verify-and-commit
description: Runs lint and build validation in web/, then stages and commits changes with conventional commit messages. Use when a task is complete, user asks to verify and commit, ship changes, or says 完成并提交/自动化开发.
---

# Verify and Commit

End-to-end workflow: validate → stage → commit.

## Prerequisites

- Changes are in `web/` (or repo config files)
- Working directory is repo root

## Step 1: Validate

```bash
cd web && npm run validate
```

If `validate` script missing, run sequentially:

```bash
cd web && npm run lint && npm run build
```

**On failure:** read errors, fix code, re-run until exit code 0.

Also check linter diagnostics on edited files.

## Step 2: Review changes

Run in parallel:

```bash
git status
git diff
git log -3 --oneline
```

Confirm:

- No `.next/`, `out/`, `node_modules/`, `.env` in diff
- Only intentional files changed

## Step 3: Stage and commit

```bash
git add <paths>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <summary>

<why — one sentence>
EOF
)"
git status
```

### Scope examples

- `hero`, `shader`, `footer`, `ci`, `deps`, `a11y`

## Step 4: Report

Tell user:

- Validation result (lint + build)
- Commit hash and message
- Remaining unstaged/untracked files (if any)

## Do not

- Commit if validation fails
- Push unless user explicitly asked
- Stage build artifacts

## Example

Task: "Fix footer link color and commit"

```
1. cd web && npm run validate     → OK
2. git add web/components/landing-page-inner.tsx
3. git commit -m "fix(footer): improve link contrast for WCAG AA"
4. Report: committed abc1234
```
