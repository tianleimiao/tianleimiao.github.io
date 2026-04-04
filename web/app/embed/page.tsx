import { LandingPageInner } from "@/components/landing-page-inner";

/**
 * Standalone route for device-preview iframe. Does not import the intro ShaderAnimation
 * chunk (avoids conditional dynamic imports + dev chunk mismatch / 500 on `/`).
 */
export default function EmbedPage() {
  return (
    <main className="embed-preview min-h-screen w-full">
      <LandingPageInner embedPreview />
    </main>
  );
}
