"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const ROTATING_WORDS = ["autonomy", "production AI", "GenAI systems"];

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

type HeroGradientSplitTextProps = HeroSplitTextProps;

/** Gradient headline chars with continuous shimmer after reveal. */
export function HeroGradientSplitText(props: HeroGradientSplitTextProps) {
  return (
    <HeroSplitText
      {...props}
      charClassName={cn("hero-split-char-gradient", props.charClassName)}
    />
  );
}

/** Rotating emphasis word in the hero headline (saniter-style slot). */
export function HeroRoleRotator({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!active || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % ROTATING_WORDS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [active, reduceMotion]);

  const current = ROTATING_WORDS[index];

  return (
    <span className="hero-role-rotator text-cyan-300" aria-live="polite">
      {ROTATING_WORDS.map((word, wordIndex) => (
        <span
          key={word}
          className={cn(
            "hero-role-rotator-slot",
            wordIndex === index && "is-active",
            active && "is-ready"
          )}
        >
          {word}
        </span>
      ))}
      <span className="sr-only">{current}</span>
    </span>
  );
}

/** Brief scramble resolve for GenAI label on entrance. */
export function HeroScrambleLabel({
  label,
  active,
  className,
}: {
  label: string;
  active: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(label);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const total = 18;
    const id = window.setInterval(() => {
      frame += 1;
      if (frame >= total) {
        setDisplay(label);
        window.clearInterval(id);
        return;
      }
      setDisplay(
        label
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor((frame / total) * label.length)) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
    }, 45);

    return () => window.clearInterval(id);
  }, [active, label]);

  return (
    <span className={cn("hero-scramble-label font-semibold text-cyan-300", className)}>
      {display}
    </span>
  );
}

/** Staggered signal row items. */
export function HeroSignalItems({
  items,
  active,
}: {
  items: string[];
  active: boolean;
}) {
  return (
    <>
      {items.map((item, index) => (
        <span
          key={item}
          className={cn("hero-signal-item", active && "is-active")}
          style={{ animationDelay: `${0.95 + index * 0.1}s` }}
        >
          {item}
        </span>
      ))}
    </>
  );
}

/** Staggered nav pills. */
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
          style={{ animationDelay: `${1.15 + index * 0.07}s` }}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}

export function useHeroMotionReady(introDone: boolean) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!introDone) {
      setReady(false);
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setReady(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, [introDone]);

  return ready;
}
