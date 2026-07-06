---
name: shader-effects
description: Creates and modifies WebGL shader effects using Three.js for intro overlays and hero backgrounds. Use when working on shader-animation, animated-shader-background, WebGL, GLSL, or visual entry effects.
---

# Shader Effects

## Existing components

| File | Role |
|------|------|
| `shader-animation.tsx` | Fullscreen intro overlay, fades out |
| `animated-shader-background.tsx` | Aurora-style hero background |
| `hero-shader-backdrop.ts` | Shared backdrop utilities |

## Integration pattern

Parent component (`landing-page.tsx`):

```tsx
const ShaderAnimation = dynamic(
  () => import("@/components/ui/shader-animation").then((m) => m.ShaderAnimation),
  { ssr: false, loading: () => <div className="fixed inset-0 z-[9999] bg-black" aria-hidden /> }
);
```

## Component checklist

- [ ] `"use client"` at top
- [ ] Ref to canvas/container; mount Three.js in `useEffect`
- [ ] Cleanup: cancel rAF, dispose renderer/scene/materials
- [ ] Handle resize with debounced listener
- [ ] Export typed props (`onIntroEnd`, `forceSkipIntro`, etc.)

## GLSL tips

- Keep fragment shaders simple for mobile GPUs
- Use `precision mediump float` when acceptable
- Uniforms for time (`uTime`), resolution (`uResolution`)
- Test on integrated graphics

## Static export

Shaders run client-side only — no SSR. Build must succeed with `npm run build`.

## Inspiration source

Intro shader pattern from [21st.dev](https://21st.dev) component library (see README).

## After changes

Run `cd web && npm run validate` — shader syntax errors often surface at build time.
