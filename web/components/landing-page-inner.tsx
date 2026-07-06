"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Brain, Infinity, Mail, Rocket, Shield } from "lucide-react";

import {
  HeroGreeting,
  HeroHeadline,
  HeroNavPills,
  HeroSignalItems,
  HeroTagline,
  useHeroEntranceActive,
} from "@/components/hero-text-effects";
import { SvgBeamDefs } from "@/components/svg-beam-defs";
import { heroShaderBackdropClassName } from "@/components/ui/hero-shader-backdrop";
import { useLandingEffects } from "@/hooks/use-landing-effects";
import { cn } from "@/lib/utils";

const year = new Date().getFullYear();
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
];

const sidebarItems = [
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Skills & Stack", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const capabilities = [
  {
    title: "AI-Driven Project Delivery",
    text: "At RH Marine Autonomy / AI team: lead CAS lifecycle and drive AI-assisted tooling, RAG and agentic workflows into production engineering.",
  },
  {
    title: "Algorithms to Production",
    text: "Ship real-time C++ collision avoidance, sensor fusion, optimization and probabilistic tracking from research prototypes to industrial systems.",
  },
  {
    title: "Full DevOps Ownership",
    text: "Own CI/CD, automated testing, deployment, monitoring and release planning — grew from algorithm developer into end-to-end product delivery.",
  },
  {
    title: "Customer-Facing Validation",
    text: "Forward-deployed style work: customer requirements, vessel commissioning, acceptance testing and stakeholder handover (~3–5 deployments/year).",
  },
  {
    title: "Agentic AI & RAG Tooling",
    text: "Build internal assistants over proprietary code/docs, agentic automation and Cursor-first workflows — at RH Marine and in personal products.",
  },
  {
    title: "Founder-Led GenAI Products",
    text: "Helperhub, Lensdy virtual try-on, n8n bookkeeping automation and personal agentic AI systems shipped end-to-end.",
  },
];

const experienceItems = [
  {
    eyebrow: "Aug 2025 - Present",
    title: "Consultant & CAS Team Lead — Autonomy / AI",
    meta: "RH Marine · Rotterdam area · applied AI & product lifecycle",
    text: "Leads the Collision Avoidance System team while driving AI-driven initiatives across the Autonomy and AI teams — from RAG tooling to agentic engineering workflows in production.",
    bullets: [
      "Own full product lifecycle: development, CI/CD, automated testing, deployment, monitoring and release planning.",
      "Drive AI-assisted internal tooling and RAG over proprietary code/docs; visualization tools adopted as standard autonomy-team workflow.",
      "Standardized evaluation frameworks and scenario-based testing; contributed to full-lifecycle cybersecurity using CAS as case study.",
    ],
  },
  {
    eyebrow: "Oct 2023 - Jul 2025",
    title: "Consultant, Autonomous Systems",
    meta: "RH Marine · algorithms · DevOps · customer-facing",
    text: "Grew from algorithm development into industrial delivery: migrated collision-avoidance from research prototype to real-time C++, built DevOps pipelines and worked directly with customers on integration and commissioning.",
    bullets: [
      "Redesigned risk and COLREGs compliance models; deployed optimization and radar-based GPS-denied localization into safety-critical production.",
      "Supported pilot validation and on-board commissioning for integration, acceptance testing and handover.",
      "Built Python RAG assistant over proprietary code and technical documentation — early pivot toward applied AI in engineering.",
    ],
  },
  {
    eyebrow: "Oct 2019 - Oct 2023",
    title: "PhD Researcher, Autonomous Systems",
    meta: "KU Leuven / RH Marine · MSCA Fellow · robotics & autonomy",
    text: "PhD in autonomous sailing, collision avoidance and sensor fusion — foundation in robotics, probabilistic tracking and quantitative evaluation before moving fully into industry software delivery.",
    bullets: [
      "Thesis: Efficient Autonomous Sailing System in Real-life Scenarios.",
      "Published collision avoidance and radar–AIS sensor fusion in Ocean Engineering; validated in simulation and on-water experiments.",
      "MARIN secondment: ported algorithms to ROS C++; designed evaluation with GOSPA and baseline comparison.",
    ],
  },
  {
    eyebrow: "Ongoing / Apr 2023 - Present",
    title: "Founder Work: Helperhub and Lensdy",
    meta: "Founder · sole engineer · AI e-commerce",
    text: "Built Helperhub from zero with agent-first development; co-founded Lensdy and integrated AI virtual try-on — personal lab for agentic AI and GenAI product experiments.",
    bullets: [
      "Built Helperhub solo in 3–4 months with Django, React, PostgreSQL, Docker and AWS.",
      "Agent-first development with Cursor since early 2025; ships features via agentic workflows.",
      "Integrated AI-powered virtual try-on into Lensdy's live e-commerce workflow.",
    ],
  },
  {
    eyebrow: "3+ years",
    title: "Renovation Contractor, Self-Employed",
    meta: "Netherlands · primarily Dutch Chinese clients",
    text: "Ran renovation projects end-to-end alongside engineering roles.",
    bullets: [
      "Owned quoting, supplier coordination, on-site delivery and customer communication.",
      "Built Dutch Chinese community market knowledge that informed Helperhub and building-materials procurement product thinking.",
    ],
  },
];

const projects = [
  {
    title: "Helperhub",
    status: "Live founder product",
    text: "Two-sided marketplace built solo with agent-first development — Django, React, PostgreSQL, Docker and AWS.",
    tags: ["Django", "React", "Agentic AI", "AWS"],
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
    text: "Python assistant over proprietary source code and technical documentation — early applied-AI tooling that informed later RAG and agentic workflows at RH Marine.",
    tags: ["Python", "RAG", "Engineering AI"],
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

const proofItems = [
  "PhD autonomy & robotics",
  "Algorithm dev → DevOps",
  "1.5+ yrs applied GenAI",
  "RH Marine Autonomy / AI",
  "Agentic AI products",
  "3–5 vessel deployments / yr",
];

const educationItems = [
  {
    degree: "PhD, Autonomous Systems (Autonomous Sailing)",
    institution: "KU Leuven, Belgium",
    years: "2019 - 2023",
    details: "Thesis on efficient autonomous sailing in real-life scenarios, with advanced multi-object tracking and collision-avoidance algorithms.",
  },
  {
    degree: "MSc, Maritime Engineering",
    institution: "KTH Stockholm & NTNU Trondheim",
    years: "2017 - 2019",
    details: "Nordic Joint Master in maritime engineering.",
  },
  {
    degree: "BEng, Naval Architecture & Ocean Engineering",
    institution: "Zhejiang University, China",
    years: "2013 - 2017",
    details: "GPA 3.89/4.0, Outstanding Graduate, National Scholarship and Lixin Tang Scholarship.",
  },
  {
    degree: "Exchange Semester",
    institution: "TU Munich",
    years: "2016",
    details: "Exchange semester during undergraduate study.",
  },
];

const skillGroups = [
  {
    title: "AI / Product",
    items: ["LLMs & agents", "RAG", "Agentic workflows", "Evaluation frameworks & guardrails", "Human-in-the-loop", "Workflow automation", "Prompt engineering", "Document intelligence", "Agentic coding with Cursor"],
  },
  {
    title: "Engineering",
    items: ["Python", "C++ real-time systems", "JavaScript / React", "Django", "PostgreSQL", "Docker", "CI/CD", "Azure DevOps", "AWS", "Railway", "Git"],
  },
  {
    title: "Autonomy / Systems",
    items: ["Sensor fusion", "Radar / AIS", "Collision avoidance", "COLREGs", "Optimization", "Probabilistic modelling", "Bayesian inference", "State-space models"],
  },
  {
    title: "Delivery / DevOps",
    items: ["Requirements → deployment", "CI/CD & Azure DevOps", "Scenario-based acceptance", "Customer validation", "On-board commissioning", "Forward-deployed delivery"],
  },
  {
    title: "Languages",
    items: ["Chinese (native)", "English (full professional)"],
  },
];

export type LandingPageInnerProps =
  | { embedPreview: true }
  | { embedPreview: false; skipHeroEntranceDelay?: boolean };

export function LandingPageInner(props: LandingPageInnerProps) {
  const skipHeroEntranceDelay =
    props.embedPreview || (!props.embedPreview && Boolean(props.skipHeroEntranceDelay));
  const activeSection = useScrollSpy();

  useLandingEffects();

  return (
    <>
      <SvgBeamDefs />
      <HeroIntro skipHeroEntranceDelay={skipHeroEntranceDelay} />
      <ScrollSpySidebar activeSection={activeSection} />

      <main className="relative overflow-hidden bg-neutral-950">
        <div className="portfolio-page-glow pointer-events-none absolute inset-0" aria-hidden />
        <PersonalManifesto />
        <WhatIBuild />
        <SelectedProjects />
        <ProofMetrics />
        <EducationSection />
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

function HeroIntro({ skipHeroEntranceDelay }: { skipHeroEntranceDelay: boolean }) {
  const animate = useHeroEntranceActive(!skipHeroEntranceDelay);
  const showHero = animate || skipHeroEntranceDelay;

  return (
    <header
      id="hero-intro"
      className={cn(
        "relative flex min-h-[92vh] flex-col justify-center overflow-hidden border-b border-neutral-800/80 bg-neutral-950 px-6 shadow-sm md:px-12 lg:px-20",
        skipHeroEntranceDelay && "hero-intro-skip-enter",
        showHero && "hero-intro-ready",
        animate && "hero-intro-animate"
      )}
    >
      <div
        className={cn(
          "hero-static-backdrop pointer-events-none absolute inset-0 z-0 h-full min-h-[92vh] w-full",
          heroShaderBackdropClassName
        )}
        aria-hidden
      />

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
              PhD Autonomy → Applied AI · Founder
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
        <div className="grid gap-10 py-24 md:grid-cols-[12rem_1fr] md:items-start md:py-28 lg:grid-cols-[13rem_1fr] lg:gap-12">
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

          <div className="hero-copy text-center md:text-left">
            <HeroGreeting active={animate} />
            <HeroHeadline active={animate} />
            <HeroTagline active={animate} />

            <div className="hero-chip-row mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="hero-chip rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-[0.95rem] font-semibold text-cyan-100">
                Applied AI Engineer
              </span>
              <span className="hero-chip rounded-full border border-neutral-700/80 bg-neutral-950/70 px-4 py-2 text-[0.95rem] font-semibold text-neutral-300">
                Algorithms → DevOps → AI
              </span>
              <span className="hero-chip rounded-full border border-cyan-400/50 bg-neutral-950/70 px-4 py-2 text-[0.95rem] font-semibold text-neutral-100">
                Founder
              </span>
            </div>

            <div className="hero-signal-block mt-12 text-center md:text-left">
              <p className="hero-signal-label font-heading text-xs font-semibold uppercase tracking-[0.45em] text-neutral-600">
                Signal
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 md:justify-start">
                <HeroSignalItems items={["RH Marine Autonomy / AI", "Agentic products", "KU Leuven PhD"]} active={animate} />
              </div>
            </div>

            <nav className="mt-10 flex flex-wrap justify-center gap-2 md:justify-start" aria-label="Portfolio sections">
              <HeroNavPills items={navItems} active={animate} />
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
          <span className="text-cyan-300">PhD in autonomous systems and robotics</span> — collision avoidance, sensor fusion and on-water validation.
        </p>
        <p className="reveal-item mt-3 font-heading text-[clamp(1.2rem,2.8vw,1.7rem)] font-semibold leading-snug text-neutral-500" data-delay="1">
          In industry: started with algorithm development, grew into full DevOps ownership and customer-facing delivery at RH Marine.
        </p>
        <p className="reveal-item mt-8 font-heading text-[clamp(1.15rem,2.5vw,1.55rem)] font-semibold leading-snug text-neutral-500" data-delay="2">
          The last 1.5 years: a deliberate pivot to applied AI and GenAI.
        </p>
        <p className="reveal-item mt-2 font-heading text-[clamp(1.25rem,2.8vw,1.75rem)] font-bold leading-snug text-neutral-300" data-delay="3">
          Driving <span className="text-cyan-300">AI-driven projects</span> on the Autonomy / AI team — and building agentic systems as a founder.
        </p>
        <p className="reveal-item mx-auto mt-12 max-w-3xl text-[1.05rem] leading-8 text-neutral-500" data-delay="4">
          The through-line: translate ambiguous operational problems into deployable software — from research code to CI/CD pipelines,
          customer commissioning and now LLM agents, RAG and workflow automation.
        </p>
        <div className="reveal-item mt-10 space-y-2 font-heading text-[clamp(1.15rem,2.6vw,1.65rem)] font-semibold leading-snug" data-delay="5">
          <p className="text-neutral-100">Robotics foundation → algorithms → DevOps → customer validation → applied AI.</p>
          <p className="text-neutral-400">Research → implementation → testing → deployment → AI project delivery.</p>
          <p className="text-cyan-300">Agentic AI in production engineering and personal products.</p>
        </div>
      </div>
    </section>
  );
}

function WhatIBuild() {
  return (
    <SectionShell id="experience" eyebrow="Work Experience" title="From PhD robotics to algorithms, DevOps, and applied AI delivery.">
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

      <div className="mt-16 grid gap-6">
        {experienceItems.map((item, index) => (
          <article key={item.title} className="portfolio-experience-card reveal-item" data-delay={index % 6}>
            <div className="grid gap-5 lg:grid-cols-[0.32fr_1fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-blue-400">{item.eyebrow}</p>
                <h3 className="mt-3 font-heading text-2xl font-semibold tracking-wide text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{item.meta}</p>
              </div>
              <div>
                <p className="text-sm leading-6 text-neutral-300">{item.text}</p>
                <ul className="mt-5 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-neutral-400">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function SelectedProjects() {
  return (
    <SectionShell id="projects" eyebrow="Selected projects" title="Agentic AI, internal tooling and live products from the pivot to applied GenAI.">
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

function EducationSection() {
  return (
    <SectionShell id="education" eyebrow="Education" title="Autonomous systems, maritime engineering and naval architecture.">
      <div className="grid gap-4 md:grid-cols-2">
        {educationItems.map((item, index) => (
          <article key={`${item.degree}-${item.institution}`} className="reveal-item rounded-3xl border border-neutral-800/80 bg-neutral-900/45 p-6" data-delay={index}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-blue-400">{item.years}</p>
              <span className="rounded-full border border-neutral-700/80 px-3 py-1 text-xs text-neutral-400">
                {item.institution}
              </span>
            </div>
            <h3 className="mt-5 font-heading text-xl font-semibold tracking-wide text-white">{item.degree}</h3>
            <p className="mt-4 text-sm leading-6 text-neutral-400">{item.details}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function SkillsStack() {
  return (
    <SectionShell id="skills" eyebrow="Skills stack" title="Applied AI on top of autonomy, DevOps and customer-facing delivery.">
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
            PhD autonomy → algorithms & DevOps → applied AI. Driving AI-driven projects at RH Marine (Autonomy / AI team) and
            building agentic GenAI products as a founder. Based in Capelle aan den IJssel, Netherlands.
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
