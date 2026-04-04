"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { LandingPageInner } from "@/components/landing-page-inner";

const ShaderAnimation = dynamic(
  () => import("@/components/ui/shader-animation").then((m) => m.ShaderAnimation),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[9999] bg-black" aria-hidden />,
  }
);

export function LandingPage() {
  const [introComplete, setIntroComplete] = useState(false);
  const onIntroEnd = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    const id = window.setTimeout(() => setIntroComplete(true), 6000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <ShaderAnimation onIntroEnd={onIntroEnd} />
      <LandingPageInner embedPreview={false} introComplete={introComplete} />
    </>
  );
}
