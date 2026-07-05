"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Brain, Infinity, Mail, Rocket, Shield } from "lucide-react";

import { SvgBeamDefs } from "@/components/svg-beam-defs";
import { heroShaderBackdropClassName } from "@/components/ui/hero-shader-backdrop";
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
    title: "Collision-Avoidance Product Lifecycle",
    text: "Lead CAS development, CI/CD, automated testing, deployment, monitoring, release planning and evaluation at RH Marine.",
  },
  {
    title: "Scenario-Based Evaluation",
    text: "Standardize acceptance criteria, bounded failure conditions and scenario-based testing for systematic algorithm assessment.",
  },
  {
    title: "RAG & Internal AI Tooling",
    text: "Build Python and JavaScript tools over proprietary code/docs to support engineering analysis, debugging and visualization.",
  },
  {
    title: "Real-Time Autonomous Systems",
    text: "Ship C++ collision avoidance, radar-based GPS-denied localization, optimization and sensor-fusion systems into production.",
  },
  {
    title: "Founder-Led Product Shipping",
    text: "Built Helperhub solo in 3-4 months and led live e-commerce AI virtual try-on integration for Lensdy.",
  },
  {
    title: "Workflow Automation",
    text: "Build daily-production automations including n8n bookkeeping flows with extraction, validation and human review.",
  },
];

const experienceItems = [
  {
    eyebrow: "Aug 2025 - Present",
    title: "Consultant & CAS Team Lead, Autonomy",
    meta: "RH Marine · Rotterdam area, Netherlands",
    text: "Leads the Collision Avoidance System team and full product lifecycle across development, CI/CD, testing, deployment, monitoring and planning.",
  },
  {
    eyebrow: "Oct 2023 - Jul 2025",
    title: "Consultant, Autonomous Systems",
    meta: "RH Marine · real-time C++ · customer validation",
    text: "Migrated collision-avoidance systems from research prototype to industrial-grade real-time C++, with customer requirements, integration and vessel commissioning support.",
  },
  {
    eyebrow: "Oct 2019 - Oct 2023",
    title: "PhD Researcher, Autonomous Systems",
    meta: "KU Leuven / RH Marine · MSCA Fellow",
    text: "Researched autonomous sailing, collision avoidance, improved Hybrid A*, radar-AIS sensor fusion, PMBM tracking and quantitative evaluation.",
  },
  {
    eyebrow: "Founder work",
    title: "Helperhub, Lensdy and contracting",
    meta: "Founder · sole engineer · commercial delivery",
    text: "Built Helperhub from zero, co-founded Lensdy, integrated AI virtual try-on, and ran renovation projects end-to-end in the Netherlands.",
  },
];

const projects = [
  {
    title: "Helperhub",
    status: "Live founder product",
    text: "Two-sided task posting and matching platform for overseas Chinese, built solo with Django, React, PostgreSQL, Docker and AWS.",
    tags: ["Django", "React", "PostgreSQL", "AWS"],
  },
  {
    title: "Procurement Optimization Platform",
    status: "Railway deployment",
    text: "Compares Dutch building-material supplier prices and selects feasible low-cost orders under availability, delivery-cost and minimum-order constraints.",
    tags: ["Optimization", "Railway", "Commercial"],
  },
  {
    title: "Internal Engineering RAG Assistant",
    status: "RH Marine internal tooling",
    text: "Python assistant over proprietary source code and technical documentation for engineering analysis, debugging and knowledge retrieval.",
    tags: ["Python", "RAG", "Engineering"],
  },
  {
    title: "AI Day-Trading Toolkit",
    status: "Personal system",
    text: "Pre-market news analysis, live intraday monitoring, automated strategy execution and post-market review with structured outputs.",
    tags: ["AI", "Automation", "Evaluation"],
  },
  {
    title: "n8n Bookkeeping Automation",
    status: "Daily production",
    text: "Email ingestion, schema-based extraction and validation, confidence-thresholded human review and bookkeeping integration.",
    tags: ["n8n", "Document AI", "HITL"],
  },
  {
    title: "Lensdy AI Virtual Try-On",
    status: "Live e-commerce workflow",
    text: "AI-powered virtual try-on integrated into an online eyewear workflow while supporting early European business development.",
    tags: ["E-commerce", "AI Try-On", "Growth"],
  },
];

const proofItems = ["3+ yrs safety-critical software", "1.5+ yrs GenAI / agents", "3-4 months to ship Helperhub", "€200+/month service fees", "3+ yrs contracting", "3-5 vessel deployments / year"];

const skillGroups = [
  {
    title: "AI / Product",
    items: ["LLMs & agents", "RAG", "Evaluation frameworks", "Guardrails", "Human-in-the-loop", "Cursor"],
  },
  {
    title: "Engineering",
    items: ["Python", "C++", "JavaScript / React", "Django", "PostgreSQL", "Docker", "CI/CD"],
  },
  {
    title: "Autonomy / Systems",
    items: ["Sensor fusion", "Optimization", "Probabilistic modelling", "Bayesian inference", "State-space models"],
  },
  {
    title: "Delivery / Commercial",
    items: ["Requirements to deployment", "Scenario-based acceptance", "Customer validation", "Marketplace cold-start", "Quoting to delivery"],
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
        <PersonalManifesto />
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
              Applied AI · Autonomy · Founder
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
        <div className="hero-animate-group grid gap-10 py-24 md:grid-cols-[12rem_1fr] md:items-start md:py-28 lg:grid-cols-[13rem_1fr] lg:gap-12">
          <div className="relative mx-auto w-36 md:mx-0 md:mt-2 md:w-44 lg:w-48">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-400/40 via-blue-500/20 to-violet-500/30 blur-xl" aria-hidden />
            <div className="relative aspect-square overflow-hidden rounded-full border border-cyan-300/45 bg-neutral-900 p-1 shadow-[0_0_40px_-14px_rgba(34,211,238,0.9)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-neutral-950">
                <picture className="absolute inset-0 block h-full w-full">
                  <source srcSet={`${assetBase}/images/20260403002505_61_11.webp`} type="image/webp" />
                  <Image
                    src="/images/20260403002505_61_11.jpg"
                    alt="Tianlei(Kai) Miao"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 144px, 192px"
                  />
                </picture>
              </div>
            </div>
            <div className="absolute bottom-2 right-1 grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-cyan-400 text-neutral-950 shadow-[0_0_24px_rgba(34,211,238,0.65)]">
              <Shield className="h-5 w-5" strokeWidth={2} />
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="mb-5 text-[clamp(1.1rem,2vw,1.45rem)] font-semibold text-neutral-300">
              Hi, I&apos;m <span className="text-cyan-300">Tianlei(Kai) Miao</span>,
            </p>
            <h1 className="font-heading text-[clamp(2.2rem,5.6vw,4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
              <span className="animate-gradient-x block bg-gradient-to-r from-white via-blue-100 to-neutral-500 bg-clip-text text-transparent">
                Applied AI engineer
              </span>
              <span className="block text-neutral-100">shipping autonomy</span>
              <span className="block text-neutral-100">and GenAI systems.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-[clamp(1.25rem,2.8vw,1.75rem)] font-semibold tracking-[0.01em] text-neutral-400 md:mx-0">
              PhD-trained founder translating ambiguous operational problems into deployable software.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-[0.95rem] font-semibold text-cyan-100">
                Applied AI Engineer
              </span>
              <span className="rounded-full border border-neutral-700/80 bg-neutral-950/70 px-4 py-2 text-[0.95rem] font-semibold text-neutral-300">
                AI Solutions / Forward Deployed
              </span>
              <span className="rounded-full border border-cyan-400/50 bg-neutral-950/70 px-4 py-2 text-[0.95rem] font-semibold text-neutral-100">
                Founder
              </span>
            </div>

            <div className="mt-12 text-center md:text-left">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.45em] text-neutral-600">
                Signal
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 md:justify-start">
                <span>RH Marine</span>
                <span>Helperhub</span>
                <span>KU Leuven PhD</span>
              </div>
            </div>

            <nav className="mt-10 flex flex-wrap justify-center gap-2 md:justify-start" aria-label="Portfolio sections">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-neutral-700/80 bg-neutral-900/80 px-3.5 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-300 transition hover:border-blue-400/60 hover:text-blue-300"
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

function PersonalManifesto() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800/80 px-6 py-24 text-center md:px-12 md:py-28 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_30rem)]" aria-hidden />
      <div className="reveal-section relative z-10 mx-auto max-w-4xl">
        <p className="reveal-item font-heading text-[clamp(1.35rem,3.3vw,2.05rem)] font-semibold leading-snug text-neutral-600" data-delay="0">
          <span className="text-cyan-300">3+ years shipping production software</span> in safety-critical environments.
        </p>
        <p className="reveal-item mt-3 font-heading text-[clamp(1.2rem,2.8vw,1.7rem)] font-semibold leading-snug text-neutral-500" data-delay="1">
          1.5+ years building GenAI and agentic systems end-to-end.
        </p>
        <p className="reveal-item mt-8 font-heading text-[clamp(1.15rem,2.5vw,1.55rem)] font-semibold leading-snug text-neutral-500" data-delay="2">
          From collision avoidance at RH Marine to founder-built products.
        </p>
        <p className="reveal-item mt-2 font-heading text-[clamp(1.25rem,2.8vw,1.75rem)] font-bold leading-snug text-neutral-300" data-delay="3">
          Building <span className="text-cyan-300">deployable solutions from ambiguity.</span>
        </p>
        <p className="reveal-item mx-auto mt-12 max-w-3xl text-[1.05rem] leading-8 text-neutral-500" data-delay="4">
          Comfortable owning the path from problem framing and architecture through testing, deployment and customer-facing
          validation.
        </p>
        <div className="reveal-item mt-10 space-y-2 font-heading text-[clamp(1.15rem,2.6vw,1.65rem)] font-semibold leading-snug" data-delay="5">
          <p className="text-neutral-100">Autonomous systems, RAG tools, workflow automation and founder-led products.</p>
          <p className="text-neutral-400">Requirements → architecture → implementation → testing → deployment.</p>
          <p className="text-cyan-300">Customer validation included.</p>
        </div>
      </div>
    </section>
  );
}

function WhatIBuild() {
  return (
    <SectionShell id="build" eyebrow="Work Experience" title="Applied AI, autonomous systems and production delivery.">
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
    <SectionShell id="path" eyebrow="My path" title="From autonomous sailing research to deployed AI products.">
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
    <SectionShell id="projects" eyebrow="Selected projects" title="Live products, internal tools and AI automation from the CV.">
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
    <SectionShell id="skills" eyebrow="Skills stack" title="Skills from AI systems, production engineering and commercial delivery.">
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
            Applied AI Engineer · AI Solutions / Forward Deployed · Founder, based in Capelle aan den IJssel, Netherlands.
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
              href="https://www.linkedin.com/in/tianlei-miao-phd-772654133"
              className="text-sm text-neutral-400 transition-colors hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:tianlei.miao@gmail.com" className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-blue-500">
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              Email
            </a>
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
          <h2 className="reveal-item mt-4 font-heading text-[clamp(1.85rem,4vw,3.25rem)] font-bold leading-tight tracking-[0.035em] text-white" data-delay="1">
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
