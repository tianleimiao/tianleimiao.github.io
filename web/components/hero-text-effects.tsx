"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Shared entrance timeline (seconds) — one cascade for the whole hero copy block. */
export const HERO_TIMELINE = {
  greeting: 0.12,
  headlineL1: 0.45,
  headlineL2: 0.95,
  headlineL3: 1.35,
  tagline: 1.75,
  chips: 2.05,
  signal: 2.35,
  nav: 2.65,
  rotatorCycle: 3.4,
} as const;

const ROTATING_WORDS = ["autonomy", "production AI", "real-time systems"];

type HeroSplitTextProps = {
  text: string;
  className?: string;
  charClassName?: string;
  baseDelay?: number;
  charStagger?: number;
  active: boolean;
};

/** Per-character stagger reveal with overflow mask (SplitText-style). */
export function HeroSplitText({
  text,
  className,
  charClassName,
  baseDelay = 0,
  charStagger = 0.028,
  active,
}: HeroSplitTextProps) {
  const tokens = text.split(/(\s+)/);
  let charIndex = 0;

  return (
    <span className={cn("hero-split-text", className)} aria-label={text}>
      {tokens.map((token, tokenIndex) => {
        if (/^\s+$/.test(token)) {
          const delay = baseDelay + charIndex * charStagger;
          charIndex += 1;
          return (
            <span
              key={`space-${tokenIndex}`}
              className={cn("hero-split-char hero-split-space", active && "is-active")}
              style={{ animationDelay: `${delay}s` }}
              aria-hidden
            >
              <span className="hero-split-char-inner">{token.replace(/ /g, "\u00A0")}</span>
            </span>
          );
        }

        return (
          <span key={`word-${tokenIndex}`} className="hero-split-word">
            {token.split("").map((char, index) => {
              const delay = baseDelay + charIndex * charStagger;
              charIndex += 1;
              return (
                <span
                  key={`${char}-${index}`}
                  className={cn("hero-split-char", charClassName, active && "is-active")}
                  style={{ animationDelay: `${delay}s` }}
                  aria-hidden
                >
                  <span className="hero-split-char-inner">{char}</span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function HeroGradientSplitText(props: HeroSplitTextProps) {
  return (
    <HeroSplitText
      {...props}
      charClassName={cn("hero-split-char-gradient", props.charClassName)}
    />
  );
}

type HeroLineRevealProps = {
  children: ReactNode;
  active: boolean;
  delay: number;
  className?: string;
};

/** Whole-line mask slide — pairs with char split on sibling lines in one sequence. */
function HeroLineReveal({ children, active, delay, className }: HeroLineRevealProps) {
  return (
    <span className={cn("hero-line-reveal", className)}>
      <span
        className={cn("hero-line-reveal-inner", active && "is-active")}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </span>
    </span>
  );
}

/** Unified h1 — three lines share one timeline; rotator starts after entrance completes. */
export function HeroHeadline({ active }: { active: boolean }) {
  return (
    <h1 className="font-heading text-[clamp(2.2rem,5.6vw,4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
      <span className="hero-headline-gradient block overflow-hidden">
        <HeroGradientSplitText
          text="Applied AI engineer"
          baseDelay={HERO_TIMELINE.headlineL1}
          charStagger={0.034}
          active={active}
        />
      </span>

      <HeroLineReveal active={active} delay={HERO_TIMELINE.headlineL2} className="block text-neutral-100">
        shipping <HeroRoleRotator active={active} />
      </HeroLineReveal>

      <HeroLineReveal active={active} delay={HERO_TIMELINE.headlineL3} className="block text-neutral-100">
        and <span className="font-semibold text-cyan-300">GenAI</span> systems.
      </HeroLineReveal>
    </h1>
  );
}

/** Vertical mask rotator — exits up, enters from below; cycles only after entrance. */
export function HeroRoleRotator({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [canCycle, setCanCycle] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const viewportRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!active || reduceMotion) return;
    const id = window.setTimeout(() => setCanCycle(true), HERO_TIMELINE.rotatorCycle * 1000);
    return () => window.clearTimeout(id);
  }, [active, reduceMotion]);

  useEffect(() => {
    if (!active || !canCycle || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => {
        setPrevIndex(current);
        return (current + 1) % ROTATING_WORDS.length;
      });
    }, 3400);
    return () => window.clearInterval(id);
  }, [active, canCycle, reduceMotion]);

  useEffect(() => {
    if (prevIndex === null) return;
    const id = window.setTimeout(() => setPrevIndex(null), 520);
    return () => window.clearTimeout(id);
  }, [prevIndex, index]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    const word = ROTATING_WORDS[index];
    node.style.setProperty("--hero-role-width", `${Math.max(word.length, 8)}ch`);
  }, [index]);

  const current = ROTATING_WORDS[index];

  return (
    <span ref={viewportRef} className="hero-role-rotator text-cyan-300" aria-live="polite">
      <span className="hero-role-rotator-track">
        {ROTATING_WORDS.map((word, wordIndex) => {
          const isActive = wordIndex === index;
          const isExiting = prevIndex === wordIndex;
          const isEntering = prevIndex !== null && wordIndex === index;

          return (
            <span
              key={word}
              className={cn(
                "hero-role-rotator-slot",
                isActive && "is-active",
                isExiting && "is-exiting",
                isEntering && "is-entering",
                active && canCycle && "is-ready"
              )}
            >
              {word}
            </span>
          );
        })}
      </span>
      <span className="sr-only">{current}</span>
    </span>
  );
}

export function HeroGreeting({ active }: { active: boolean }) {
  return (
    <p className="mb-5 text-[clamp(1.1rem,2vw,1.45rem)] font-semibold text-neutral-300">
      Hi, I&apos;m{" "}
      <span className="hero-name-glow text-cyan-300">
        <HeroSplitText
          text="Tianlei(Kai) Miao"
          baseDelay={HERO_TIMELINE.greeting}
          charStagger={0.024}
          active={active}
        />
      </span>
      ,
    </p>
  );
}

export function HeroTagline({ active }: { active: boolean }) {
  return (
    <HeroLineReveal
      active={active}
      delay={HERO_TIMELINE.tagline}
      className="mx-auto mt-7 block max-w-2xl text-[clamp(1.25rem,2.8vw,1.75rem)] font-semibold tracking-[0.01em] text-neutral-400 md:mx-0"
    >
      PhD-trained founder translating ambiguous operational problems into deployable software.
    </HeroLineReveal>
  );
}

export function HeroSignalItems({ items, active }: { items: string[]; active: boolean }) {
  return (
    <>
      {items.map((item, index) => (
        <span
          key={item}
          className={cn("hero-signal-item", active && "is-active")}
          style={{ animationDelay: `${HERO_TIMELINE.signal + index * 0.09}s` }}
        >
          {item}
        </span>
      ))}
    </>
  );
}

export function HeroNavPills({
  items,
  active,
}: {
  items: Array<{ label: string; href: string }>;
  active: boolean;
}) {
  return (
    <>
      {items.map((item, index) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            "hero-nav-pill rounded-full border border-neutral-700/80 bg-neutral-900/80 px-3.5 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-300 transition hover:border-blue-400/60 hover:text-blue-300",
            active && "is-active"
          )}
          style={{ animationDelay: `${HERO_TIMELINE.nav + index * 0.07}s` }}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}

export function useHeroEntranceActive(enabled: boolean) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setActive(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }

    let cancelled = false;
    let raf2 = 0;

    const start = () => {
      raf2 = window.requestAnimationFrame(() => {
        if (!cancelled) setActive(true);
      });
    };

    document.fonts.ready.then(() => {
      if (!cancelled) window.requestAnimationFrame(start);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf2);
    };
  }, [enabled]);

  return active;
}
