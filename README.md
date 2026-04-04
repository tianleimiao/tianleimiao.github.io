# PersonalPage

This is my **personal showcase site**—a single evening project built almost entirely with **AI assistance**. The layout, copy, visuals, and images on the page are **AI-generated**; my role was **prompt engineering**, wiring pieces together, and shipping the Next.js app. The **fullscreen entry animation** uses a shader pattern from the **[21st](https://21st.dev)** component / shader library (integrated in [`shader-animation.tsx`](web/components/ui/shader-animation.tsx)).

Technically, it’s a dark-theme landing page with multiple hero sections, **WebGL** shader backgrounds, and that intro overlay—**Next.js** static export on **GitHub Pages**.

## What’s in the site

- **Intro overlay**: Fullscreen shader [`ShaderAnimation`](web/components/ui/shader-animation.tsx) (entry effect inspired by **21st**’s shader snippet) that fades out to reveal the main page.
- **Hero 1**: [`AnimatedShaderBackground`](web/components/ui/animated-shader-background.tsx) (aurora-style fullscreen shader); gradients, blobs, perspective grid, vertical beam accents; headline and [`WordRotator`](web/components/word-rotator.tsx) copy.
- **Hero 2 / 3 and footer**: Capabilities, voice/CTA, footer nav and copyright; scroll reveals via [`useLandingEffects`](web/hooks/use-landing-effects.ts) using **IntersectionObserver** (`reveal-section` / `data-hero-on-view`).
- **Polish**: Animated SVG beam gradients, flashlight cards (`.flashlight-card`), holodex track, and shared styles in [`web/app/globals.css`](web/app/globals.css).

**Stack**: **Next.js 15** (App Router), **React 19**, **TypeScript**, **Tailwind CSS**, **Three.js** (shaders), **lucide-react** (icons). Component layout follows **shadcn** conventions ([`web/components.json`](web/components.json)).

## Repository layout

```
PersonalPage/
├── .github/
│   └── workflows/
│       └── deploy-github-pages.yml   # CI: build in web/, upload web/out to Pages
├── README.md
└── web/                              # App root (only site source)
    ├── app/
    │   ├── layout.tsx                # Root layout, fonts, metadata
    │   ├── page.tsx                  # Home → renders LandingPage
    │   └── globals.css               # Tailwind + global animations & tokens
    ├── components/
    │   ├── landing-page.tsx          # Main page (heroes + footer)
    │   ├── word-rotator.tsx
    │   ├── svg-beam-defs.tsx         # Shared SVG gradient defs
    │   └── ui/
    │       ├── animated-shader-background.tsx
    │       └── shader-animation.tsx
    ├── hooks/
    │   └── use-landing-effects.ts    # Client: reveal, beams, hero in-view, etc.
    ├── lib/
    │   └── utils.ts                  # cn() and helpers
    ├── next.config.ts                # Static export, basePath for project pages
    ├── tailwind.config.ts
    ├── package.json
    └── components.json               # shadcn path aliases
```

Production output is **`web/out`** (`next build` static export). The repo root does not host a separate static HTML site besides CI.

## Local development

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
cd web && npm run build   # writes web/out; matches CI
```

## Deploy to GitHub Pages

1. Push to **`main`** or **`master`**.
2. In the repo: **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.

See [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml): runs `npm ci` and `npm run build` in `web/`, then publishes **`web/out`** as the site root.

- **Project site** (`https://<user>.github.io/<repo>/`): CI sets `GITHUB_REPOSITORY`; [`next.config.ts`](web/next.config.ts) applies `basePath` so asset URLs resolve.
- **User site** (repo named `<user>.github.io`): `basePath` stays empty.
