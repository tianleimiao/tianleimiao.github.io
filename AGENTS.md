# Agent Guide — tianleimiao.github.io

This repository is optimized for **agentic development** with Cursor. Read this file first when starting any automated task.

## Project overview

| Item | Value |
|------|-------|
| Type | Personal portfolio (static site) |
| App root | `web/` |
| Stack | Next.js 15, React 19, TypeScript, Tailwind, Three.js shaders |
| Deploy | GitHub Pages via `.github/workflows/deploy-github-pages.yml` |
| Output | `web/out` (static export, gitignored) |

## Agent workflow (mandatory)

Every code change task follows this loop:

```
Understand → Edit → Verify → Commit → (optional) Push
```

1. **Understand** — Read relevant files; app code lives under `web/`.
2. **Edit** — Minimal diff; match existing patterns (see `.cursor/rules/`).
3. **Verify** — Run validation before marking done:
   ```bash
   cd web && npm run validate
   ```
   Or step-by-step: `npm run lint` then `npm run build`.
4. **Commit** — **Automatically** after verification passes (always, unless user said "不要提交"). See `.cursor/rules/git-automation.mdc`.
5. **Push** — Only when the user explicitly asks.

If validation fails, fix issues and re-run until green. Never commit broken builds.

## Rules (`.cursor/rules/`)

| Rule | Scope | Purpose |
|------|-------|---------|
| `agent-workflow.mdc` | Always | Verify-after-edit, task completion checklist |
| `git-automation.mdc` | Always | Commit message format, staging, safety |
| `nextjs-frontend.mdc` | `web/**/*.{ts,tsx}` | Next.js App Router, React, Tailwind conventions |
| `webgl-shaders.mdc` | Shader components | Three.js / WebGL patterns for this site |

## Skills (`.cursor/skills/`)

Invoke by name or let the agent auto-discover from descriptions:

| Skill | Use when |
|-------|----------|
| `verify-and-commit` | Task is done; run lint/build and commit |
| `google-frontend` | UI/UX, performance, a11y, Core Web Vitals |
| `github-pages-deploy` | basePath, CI, static export, deployment issues |
| `feature-automation` | Full plan → implement → verify → commit pipeline |

## Key paths

```
web/app/              App Router pages & globals.css
web/components/       React components (landing-page, ui/shaders)
web/hooks/            Client hooks (use-landing-effects)
web/lib/utils.ts      cn() helper
web/next.config.ts    static export + basePath for GitHub Pages
```

## Automation policy

**Default:** every code-change task ends with `validate` → **auto-commit**.

Skip commit only when:
- Read-only task (分析 / review / explain) with no edits
- User explicitly says "不要提交" / "don't commit"
- Working tree is clean

Push still requires explicit user request.

## Constraints

- **Never** commit `.env`, secrets, `node_modules/`, `.next/`, `web/out/`
- **Never** force-push to `main`/`master`
- **Never** skip git hooks (`--no-verify`)
- Static export only — no API routes or server-only features without user approval
- Shader components use `"use client"` + `dynamic(..., { ssr: false })` for WebGL

## Quick commands

```bash
cd web && npm install          # first-time setup
cd web && npm run dev          # local dev :3000
cd web && npm run validate     # lint + build (agent gate)
cd web && npm run build        # production static export
```
