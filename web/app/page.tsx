import { DevicePreviewShell } from "@/components/device-preview";
import { LandingPage } from "@/components/landing-page";

export default function Home() {
  return (
    <DevicePreviewShell>
      <main className="min-h-screen w-full">
        <LandingPage />
      </main>
    </DevicePreviewShell>
  );
}
