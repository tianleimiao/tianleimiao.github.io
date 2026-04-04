"use client";

import dynamic from "next/dynamic";
import { useCallback, useContext, useEffect, useState } from "react";

import { DeviceDesktopIntroContext } from "@/components/device-preview";
import { LandingPageInner } from "@/components/landing-page-inner";
import type { ShaderAnimationProps } from "@/components/ui/shader-animation";

const ShaderAnimation = dynamic<ShaderAnimationProps>(
  () => import("@/components/ui/shader-animation").then((m) => m.ShaderAnimation),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[9999] bg-black" aria-hidden />,
  }
);

export function LandingPage() {
  const introCtx = useContext(DeviceDesktopIntroContext);
  const forceSkipIntro = introCtx?.desktopIntroCompleted ?? false;
  const markDesktopIntroComplete = introCtx?.markDesktopIntroComplete ?? (() => {});

  const [introComplete, setIntroComplete] = useState(() => introCtx?.desktopIntroCompleted ?? false);

  const onIntroEnd = useCallback(() => {
    setIntroComplete(true);
    markDesktopIntroComplete();
  }, [markDesktopIntroComplete]);

  useEffect(() => {
    if (forceSkipIntro) return;
    const id = window.setTimeout(() => setIntroComplete(true), 6000);
    return () => window.clearTimeout(id);
  }, [forceSkipIntro]);

  return (
    <>
      <ShaderAnimation forceSkipIntro={forceSkipIntro} onIntroEnd={onIntroEnd} />
      <LandingPageInner
        embedPreview={false}
        introComplete={introComplete}
        skipHeroEntranceDelay={forceSkipIntro}
      />
    </>
  );
}
