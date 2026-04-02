"use client";

import { useEffect } from "react";

function initFlashlightCards() {
  const cards = document.querySelectorAll(".flashlight-card");
  const cleanups: Array<() => void> = [];
  cards.forEach((card) => {
    const el = card as HTMLElement;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

function updateHolodex() {
  document.querySelectorAll(".holodex-track").forEach((track) => {
    const items = track.querySelectorAll(".holodex-item");
    const n = items.length;
    if (!n) return;
    const mid = Math.floor(n / 2);
    items.forEach((el, i) => {
      el.classList.remove("is-center", "is-left", "is-right");
      if (i === mid) el.classList.add("is-center");
      else if (i < mid) el.classList.add("is-left");
      else el.classList.add("is-right");
    });
  });
}

function initReveal() {
  const sections = document.querySelectorAll(".reveal-section");
  if (!sections.length) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  sections.forEach((s) => io.observe(s));
  return () => io.disconnect();
}

function initBeamSvg() {
  const stops = document.querySelectorAll(".beam-stop-animated");
  if (!stops.length) return () => {};
  let t = 0;
  let raf = 0;
  const tick = () => {
    t += 0.02;
    stops.forEach((stop, i) => {
      const phase = t + i * 0.4;
      const o = 0.15 + Math.sin(phase) * 0.45 + 0.35;
      stop.setAttribute("stop-opacity", String(Math.max(0, Math.min(1, o))));
    });
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

function initHeroOnView() {
  const panels = document.querySelectorAll("[data-hero-on-view]");
  if (!panels.length) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
  );
  panels.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Attaches DOM-driven motion used by the static index (flashlight, holodex, reveal, beams). */
export function useLandingEffects() {
  useEffect(() => {
    const disFlash = initFlashlightCards();
    updateHolodex();
    const onResize = () => updateHolodex();
    window.addEventListener("resize", onResize);
    const disReveal = initReveal();
    const disBeam = initBeamSvg();
    const disHero = initHeroOnView();

    return () => {
      disFlash();
      window.removeEventListener("resize", onResize);
      disReveal();
      disBeam();
      disHero();
    };
  }, []);
}
