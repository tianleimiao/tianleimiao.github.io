---
name: verify-and-commit
description: Runs lint, typecheck, and build in web/, then automatically stages and commits all intentional changes. Use after every code edit task, when validation completes, or when user says 验证/validate/commit/提交.
---

# Verify and Commit

Default end-of-task workflow: **validate → stage → commit** (automatic, no confirmation needed).

## Step 1: Validate

```bash
cd web && npm run validate
```

**On failure:** fix, re-run until exit code 0. Do not commit.

## Step 2: Review changes

Run in parallel:

```bash
git status
git diff
git log -3 --oneline
```

Skip commit if working tree is clean. Exclude `.next/`, `out/`, `node_modules/`, `.env`.

## Step 3: Stage and commit (automatic)

```bash
git add <relevant-files>
git commit -m "type(scope): summary"
git status
```

Commit is **mandatory** after validate passes when files changed.

## Step 4: Report

- Validation: lint ✓ typecheck ✓ build ✓
- Commit hash and message
- Unstaged files (if any)

## Skip commit only when

- No file changes
- User said "don't commit" / "不要提交"
- Read-only task (analysis, review)

## Do not

- Push unless user explicitly asked
- Commit if validation fails
