---
name: feature-automation
description: End-to-end automated feature development for this portfolio site — plan, implement in web/, apply Google frontend standards, verify, and commit. Use when user asks for automated development, full-stack feature delivery, or 自动化开发/自动完成.
---

# Feature Automation

Full pipeline for delivering a feature in this repo without manual steps.

## Pipeline

```
1. Plan     → Scope change to web/; read AGENTS.md + relevant rules
2. Implement → Minimal diff; follow nextjs-frontend + google-frontend skills
3. Verify   → cd web && npm run validate
4. Commit   → verify-and-commit skill
5. Report   → Summary + commit hash + test notes
```

## Planning questions (answer internally)

- Which components/files change?
- Client vs server component?
- Does it affect shaders (need dynamic import)?
- a11y / perf impact?

## Implementation rules

- Read before write — match `landing-page-inner.tsx` patterns
- One concern per commit
- English comments in code only

## Trigger phrases

| User says | Action |
|-----------|--------|
| 自动化开发 / automate | Full pipeline including commit |
| 完成并提交 | Verify + commit |
| Just explore / 分析 | Plan only, no commit |

## Report template

```markdown
## Done: [feature name]

**Changed:** list files
**Validation:** lint ✓ typecheck ✓ build ✓
**Commit:** `<hash>` — `<message>`
**Manual check:** open localhost:3000 → [what to verify visually]
```

## Escalate to user

- Breaking API or new dependencies
- Needs backend / non-static-export features
- Validation fails after 2 fix attempts
