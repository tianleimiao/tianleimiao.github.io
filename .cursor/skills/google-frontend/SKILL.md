---
name: google-frontend
description: Applies Google-level professional frontend standards — Core Web Vitals, accessibility (WCAG), semantic HTML, performance budgets, and UX polish for React/Next.js. Use when building UI, reviewing frontend code, optimizing performance, or when user mentions Google frontend, a11y, LCP, CLS, or web vitals.
---

# Google Professional Frontend

Apply production-grade frontend standards aligned with Google web.dev guidance.

## Core Web Vitals targets

| Metric | Target | This project |
|--------|--------|--------------|
| LCP | < 2.5s | Optimize hero/shader load; dynamic import shaders |
| INP | < 200ms | Minimize main-thread work in scroll handlers |
| CLS | < 0.1 | Reserve space for fonts, loading states |

## Performance checklist

- [ ] Critical CSS/fonts: `display: swap` (already in layout.tsx)
- [ ] Defer non-critical JS: `dynamic(..., { ssr: false })` for Three.js
- [ ] No layout thrashing in scroll/resize handlers
- [ ] Images have explicit dimensions or aspect-ratio
- [ ] Avoid large bundle additions without justification

## Accessibility (WCAG 2.1 AA)

- Semantic landmarks: `<main>`, `<nav>`, `<footer>`, heading hierarchy (h1 → h2)
- Interactive elements: keyboard focusable, visible `:focus-visible`
- Color contrast: 4.5:1 text, 3:1 large text/UI components
- Motion: respect `prefers-reduced-motion: reduce`
- Icons with meaning: `aria-label` or visible text
- Intro overlay: `aria-hidden` on decorative loading states

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## HTML & SEO

- One `<h1>` per page; descriptive `<title>` and meta description in layout
- `lang` attribute on `<html>` (currently `zh-CN`)
- Meaningful link text (not "click here")

## React / Next.js patterns

- Prefer composition over prop drilling; extract hooks for complex client logic
- Memoize expensive computations; avoid inline object/array props causing re-renders
- Error boundaries for shader failures (graceful fallback to static background)

## Code quality bar

- TypeScript strict — no `any` without comment
- Components < 200 lines; split when larger
- CSS: utility-first Tailwind; design tokens in globals.css
- No console.log in shipped code

## Review output format

When reviewing UI changes, report:

1. **Critical** — a11y/perf blockers
2. **Improve** — measurable enhancements
3. **Nice** — polish optional

## Reference

- [web.dev/vitals](https://web.dev/vitals/)
- [web.dev/accessibility](https://web.dev/accessibility/)
