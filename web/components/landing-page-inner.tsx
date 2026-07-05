"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Brain, Infinity, Mail, Rocket, Shield } from "lucide-react";

import { SvgBeamDefs } from "@/components/svg-beam-defs";
import { heroShaderBackdropClassName } from "@/components/ui/hero-shader-backdrop";
import { WordRotator } from "@/components/word-rotator";
import { useLandingEffects } from "@/hooks/use-landing-effects";
import { cn } from "@/lib/utils";

const AnimatedShaderBackground = dynamic(
  () =>
    import("@/components/ui/animated-shader-background").then((m) => m.AnimatedShaderBackground),
  { ssr: false }
);

const year = new Date().getFullYear();
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const navItems = [
  { label: "Experience", href: "#build" },
  { label: "Path", href: "#path" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

const sidebarItems = [
  { label: "Experience", href: "#build", id: "build" },
  { label: "My Path", href: "#path", id: "path" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Proof", href: "#proof", id: "proof" },
  { label: "Skills & Stack", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const capabilities = [
  {
    title: "AI Product Discovery",
    text: "Frame ambiguous ideas into crisp product bets, prototype loops, and validation plans.",
  },
  {
    title: "Full-stack Shipping",
    text: "Move from interface to data, models, evaluation, and production without losing the user problem.",
  },
  {
    title: "Agentic Workflows",
    text: "Design AI-assisted workflows with tool use, human handoff, and operational guardrails.",
  },
  {
    title: "Autonomous Systems",
    text: "Bring a robustness-first mindset from maritime collision avoidance and multi-sensor systems.",
  },
  {
    title: "Rapid Prototyping",
    text: "Compress the path from concept to real feedback with AI-native build cycles.",
  },
  {
    title: "Product Judgment",
    text: "Balance speed, system shape, and adoption so demos can become useful products.",
  },
];

const experienceItems = [
  {
    eyebrow: "Now",
    title: "AI product builder",
    meta: "Product · Engineering · Launch",
    text: "Focused on using AI to compress the time from idea to product to validation, with a bias toward shipped work.",
  },
  {
    eyebrow: "Founder mode",
    title: "Working systems over demos",
    meta: "Discovery → prototype → adoption",
    text: "Builds across problem framing, product surfaces, data flows, model behavior, and the operational details that keep systems useful.",
  },
  {
    eyebrow: "Research depth",
    title: "Autonomous maritime systems",
    meta: "COLREGs-aware planning · Radar / AIS / LiDAR / camera",
    text: "Worked on systems that operate under uncertainty, where messy inputs and real-world constraints matter more than elegant slides.",
  },
  {
    eyebrow: "Operating principle",
    title: "Robustness beats elegance",
    meta: "PhD-trained thinking · Product-trained judgment",
    text: "PhD shaped the analytical foundation; building products sharpened the judgment for what survives real users.",
  },
];

const projects = [
  {
    title: "AI Product Launch Systems",
    status: "Active direction",
    text: "Rapid prototypes that test positioning, UX, workflows, and model behavior before the idea gets overdesigned.",
    tags: ["AI Product", "Validation", "Full Stack"],
  },
  {
    title: "Autonomous Collision Avoidance",
    status: "Research background",
    text: "COLREGs-aware planning and multi-sensor fusion for maritime environments with uncertainty and real consequences.",
    tags: ["Autonomy", "Planning", "Sensor Fusion"],
  },
  {
    title: "Conversion-focused Interfaces",
    status: "Portfolio surface",
    text: "High-signal landing pages and product narratives built to explain value quickly and move users toward action.",
    tags: ["Next.js", "WebGL", "Messaging"],
  },
  {
    title: "AI-native Build Workflow",
    status: "Daily practice",
    text: "Uses AI as a product and engineering multiplier: ideation, implementation, critique, and iteration in tight loops.",
    tags: ["LLM Workflow", "Prototyping", "Shipping"],
  },
];

const proofItems = ["Full Stack", "AI Native", "COLREGs-aware Systems", "Founder Mindset", "Ship Fast", "Robustness > Elegance"];

const skillGroups = [
  {
    title: "AI / Product",
    items: ["AI PRDs", "Agent workflows", "Evaluation thinking", "Product validation", "Rapid prototyping"],
  },
  {
    title: "Engineering",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Static export"],
  },
  {
    title: "Systems",
    items: ["Autonomous systems", "Sensor fusion", "COLREGs", "Uncertainty", "Reliability"],
  },
  {
    title: "Operating Style",
    items: ["Founder energy", "Bias to ship", "Full-stack ownership", "Clear writing", "User feedback loops"],
  },
];

export type LandingPageInnerProps =
  | { embedPreview: true }
  | { embedPreview: false; introComplete: boolean; skipHeroEntranceDelay?: boolean };

export function LandingPageInner(props: LandingPageInnerProps) {
  const introDone = props.embedPreview ? true : props.introComplete;
  const skipHeroEntranceDelay =
    props.embedPreview || (!props.embedPreview && Boolean(props.skipHeroEntranceDelay));
  const activeSection = useScrollSpy();

  useLandingEffects();

  return (
    <>
      <SvgBeamDefs />
      <HeroIntro introDone={introDone} skipHeroEntranceDelay={skipHeroEntranceDelay} />
      <ScrollSpySidebar activeSection={activeSection} />

      <main className="relative overflow-hidden bg-neutral-950">
        <div className="portfolio-page-glow pointer-events-none absolute inset-0" aria-hidden />
        <WhatIBuild />
        <ExperienceTimeline />
        <SelectedProjects />
        <ProofMetrics />
        <SkillsStack />
      </main>

      <ContactFooter />
    </>
  );
}

function useScrollSpy() {
  const [activeSection, setActiveSection] = useState(sidebarItems[0].id);

  useEffect(() => {
    const sections = sidebarItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.08, 0.2, 0.45, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

function ScrollSpySidebar({ activeSection }: { activeSection: string }) {
  return (
    <nav className="portfolio-scrollspy" aria-label="Current page section">
      {sidebarItems.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            className={cn("portfolio-scrollspy-link", isActive && "is-active")}
            aria-current={isActive ? "location" : undefined}
          >
            <span className="portfolio-scrollspy-dot" aria-hidden />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function HeroIntro({
  introDone,
  skipHeroEntranceDelay,
}: {
  introDone: boolean;
  skipHeroEntranceDelay: boolean;
}) {
  return (
    <header
      id="hero-intro"
      className={cn(
        "relative flex min-h-[92vh] flex-col justify-center overflow-hidden border-b border-neutral-800/80 bg-neutral-950 px-6 shadow-sm md:px-12 lg:px-20",
        skipHeroEntranceDelay && "hero-intro-skip-enter"
      )}
    >
      {introDone ? (
        <AnimatedShaderBackground className="pointer-events-none absolute inset-0 z-0 h-full min-h-[92vh] w-full opacity-80" />
      ) : (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-0 h-full min-h-[92vh] w-full opacity-80",
            heroShaderBackdropClassName
          )}
          aria-hidden
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-neutral-950/25 via-neutral-950/45 to-neutral-950/80"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute left-1/4 top-1/4 h-[50vw] w-[50vw] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen" />
        <div className="animation-delay-2000 animate-blob absolute right-1/4 top-1/3 h-[40vw] w-[40vw] rounded-full bg-indigo-500/10 blur-[100px] mix-blend-screen" />
        <div className="animation-delay-4000 animate-blob absolute -bottom-32 left-1/2 h-[40vw] w-[80vw] -translate-x-1/2 rounded-full bg-blue-900/20 blur-[140px] mix-blend-screen" />
      </div>

      <div className="perspective-grid-wrap pointer-events-none absolute inset-0 z-[2] opacity-30">
        <div className="perspective-grid" />
      </div>

      <BeamColumns className="z-[3] px-[8%] opacity-60 md:px-[12%]" />

      <div className="hero-animate-group pointer-events-none absolute right-6 top-6 z-20 md:right-12 md:top-10 lg:right-20">
        <div className="inline-block max-w-[min(100vw-3rem,20rem)] text-right">
          <p className="font-heading text-xs font-medium uppercase tracking-widest text-blue-500 sm:text-sm">
            AI · Product · Launch
          </p>
          <div className="mt-2 flex w-full justify-between text-blue-400/50 sm:mt-2.5" aria-hidden>
            <Infinity className="h-5 w-5 shrink-0 animate-float" strokeWidth={1.5} />
            <Rocket className="h-5 w-5 shrink-0 animate-float" style={{ animationDelay: "0.15s" }} strokeWidth={1.5} />
            <Shield className="h-5 w-5 shrink-0 animate-float" style={{ animationDelay: "0.3s" }} strokeWidth={1.5} />
            <Brain className="h-5 w-5 shrink-0 animate-float" style={{ animationDelay: "0.45s" }} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl">
        <div className="hero-animate-group grid gap-10 py-28 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-32">
          <div>
            <p className="mb-6 font-heading text-xs font-medium uppercase tracking-[0.35em] text-blue-400/80">
              Tianlei(Kai) Miao
            </p>
            <h1 className="font-heading text-[clamp(3.1rem,8.5vw,6.8rem)] font-bold leading-[0.95] tracking-[0.04em] text-white">
              <span className="animate-gradient-x block bg-gradient-to-r from-white via-blue-100 to-neutral-500 bg-clip-text text-transparent">
                AI-native
              </span>
              <span className="block text-neutral-200">builder.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[clamp(1.35rem,3.5vw,2rem)] font-semibold tracking-[0.03em] text-neutral-400">
              <span className="text-neutral-500">I craft</span>
              <WordRotator />
              <span className="text-neutral-500"> that convert.</span>
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/55 p-5 shadow-[0_0_60px_-28px_rgba(59,130,246,0.8)] backdrop-blur md:p-6">
            <p className="text-sm leading-6 text-neutral-300">
              I turn fuzzy ideas into working AI products: rapid prototypes, production-minded systems, and product
              narratives that help real users understand what to do next.
            </p>
            <nav className="mt-6 flex flex-wrap gap-2" aria-label="Portfolio sections">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-neutral-700/80 bg-neutral-900/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-neutral-300 transition hover:border-blue-400/60 hover:text-blue-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

function WhatIBuild() {
  return (
    <SectionShell id="build" eyebrow="Work Experience" title="End-to-end AI product work, from signal to shipped systems.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, index) => (
          <article key={item.title} className="flashlight-card reveal-item min-h-52 p-6" data-delay={index % 6}>
            <div className="card-inner">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-blue-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-xl font-semibold tracking-wide text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-neutral-400">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function ExperienceTimeline() {
  return (
    <SectionShell id="path" eyebrow="My path" title="A systems background shaped into product judgment.">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
        <div className="reveal-item" data-delay="0">
          <PortraitCard />
        </div>
        <div className="portfolio-timeline">
          {experienceItems.map((item, index) => (
            <article key={item.title} className="portfolio-timeline-item reveal-item" data-delay={index + 1}>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-blue-400">{item.eyebrow}</p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-wide text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{item.meta}</p>
              <p className="mt-4 text-sm leading-6 text-neutral-400">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function SelectedProjects() {
  return (
    <SectionShell id="projects" eyebrow="Selected projects" title="Current directions, research roots, and product surfaces.">
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project, index) => (
          <article key={project.title} className="portfolio-project-card reveal-item" data-delay={index}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-blue-400">{project.status}</p>
                <h3 className="mt-3 font-heading text-2xl font-semibold tracking-wide text-white">{project.title}</h3>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-neutral-600" strokeWidth={1.5} />
            </div>
            <p className="mt-5 text-sm leading-6 text-neutral-400">{project.text}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200/80">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function ProofMetrics() {
  return (
    <section id="proof" className="relative border-y border-neutral-800/80 px-6 py-14 md:px-12 lg:px-20">
      <BeamColumns className="px-[8%] opacity-35 md:px-[18%]" />
      <div className="reveal-section relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {proofItems.map((item, index) => (
            <div key={item} className="reveal-item rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-4" data-delay={index}>
              <p className="font-heading text-sm font-semibold tracking-[0.14em] text-neutral-100">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsStack() {
  return (
    <SectionShell id="skills" eyebrow="Skills stack" title="The tools and habits behind the build loop.">
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <article key={group.title} className="reveal-item rounded-3xl border border-neutral-800/80 bg-neutral-900/45 p-6" data-delay={index}>
            <h3 className="font-heading text-xl font-semibold tracking-wide text-white">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full border border-neutral-700/80 px-3 py-1.5 text-xs text-neutral-300">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-neutral-800/80 bg-neutral-950 px-6 py-16 shadow-sm md:px-12 lg:px-20">
      <div className="reveal-section mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="reveal-item mb-3 font-heading text-2xl font-bold tracking-[0.12em] text-white" data-delay="0">
            Tianlei(Kai) Miao
          </p>
          <p className="reveal-item max-w-xl text-sm leading-6 text-neutral-500" data-delay="1">
            AI · Product · Launch — building fast, useful systems for the space between intent and something real in the
            wild.
          </p>
        </div>
        <div className="reveal-item flex flex-col gap-5 md:items-end" data-delay="2">
          <nav className="flex flex-wrap gap-5" aria-label="Footer">
            {[...navItems, { label: "Contact", href: "#contact" }].map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-neutral-400 transition-colors hover:text-blue-500">
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com/tianleimiao/tianleimiao.github.io"
              className="text-sm text-neutral-400 transition-colors hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              Email TBD
            </span>
          </nav>
          <p className="text-xs text-neutral-600">© {year} Tianlei(Kai) Miao. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="portfolio-section-shell">
      <BeamColumns className="px-[10%] opacity-30 md:px-[16%]" />
      <div className="reveal-section relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="reveal-item font-heading text-sm font-medium uppercase tracking-[0.32em] text-blue-500" data-delay="0">
            {eyebrow}
          </p>
          <h2 className="reveal-item mt-4 font-heading text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-[0.04em] text-white" data-delay="1">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function PortraitCard() {
  return (
    <div className="relative mx-auto max-w-sm lg:mx-0">
      <div className="pointer-events-none absolute -inset-[3px] z-0 overflow-hidden rounded-[1.35rem] opacity-80" aria-hidden>
        <div className="hero2-photo-orbit absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(59,130,246,0.45)_95deg,transparent_190deg,rgba(96,165,250,0.25)_280deg,transparent_360deg)]" />
      </div>
      <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-3xl border border-neutral-800/90 bg-neutral-900 shadow-[0_0_40px_-12px_rgba(59,130,246,0.35)] ring-1 ring-blue-500/15">
        <picture className="absolute inset-0 block h-full w-full">
          <source srcSet={`${assetBase}/images/20260403002505_61_11.webp`} type="image/webp" />
          <Image
            src="/images/20260403002505_61_11.jpg"
            alt="Tianlei(Kai) Miao"
            fill
            priority
            className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 360px"
          />
        </picture>
      </div>
      <div className="hero2-corner-tl z-20" aria-hidden />
      <div className="hero2-corner-br z-20" aria-hidden />
    </div>
  );
}

function BeamColumns({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 flex justify-between", className)} aria-hidden>
      <svg className="h-full w-3" viewBox="0 0 12 800" preserveAspectRatio="none">
        <line x1="6" y1="0" x2="6" y2="800" className="beam-line-vertical" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="hidden h-full w-3 sm:block" viewBox="0 0 12 800" preserveAspectRatio="none">
        <line x1="6" y1="0" x2="6" y2="800" className="beam-line-vertical" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="hidden h-full w-3 md:block" viewBox="0 0 12 800" preserveAspectRatio="none">
        <line x1="6" y1="0" x2="6" y2="800" className="beam-line-vertical" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="h-full w-3" viewBox="0 0 12 800" preserveAspectRatio="none">
        <line x1="6" y1="0" x2="6" y2="800" className="beam-line-vertical" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
