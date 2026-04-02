"use client";

import { useEffect, useState } from "react";

const WORDS = ["pages", "products", "marketing"];

export function WordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="word-slot ml-2 text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]" aria-live="polite">
      {WORDS.map((w, j) => (
        <span key={w} className={j === index ? "is-active" : ""}>
          {w}
        </span>
      ))}
    </span>
  );
}
