"use client";

import { useContext } from "react";

import { DeviceDesktopIntroContext } from "@/components/device-preview";
import { LandingPageInner } from "@/components/landing-page-inner";

export function LandingPage() {
  const introCtx = useContext(DeviceDesktopIntroContext);

  return (
    <LandingPageInner
      embedPreview={false}
      skipHeroEntranceDelay={introCtx?.desktopIntroCompleted ?? false}
    />
  );
}
