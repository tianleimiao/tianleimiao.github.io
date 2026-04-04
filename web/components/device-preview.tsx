"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "device-preview-mode";

export type DeviceMode = "pc" | "tablet" | "phone";

const MODES: { id: DeviceMode; label: string; icon: typeof Monitor }[] = [
  { id: "pc", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "phone", label: "Phone", icon: Smartphone },
];

function inferMode(width: number): DeviceMode {
  if (width < 640) return "phone";
  if (width < 1024) return "tablet";
  return "pc";
}

function DevicePreviewBar({
  mode,
  onChange,
}: {
  mode: DeviceMode;
  onChange: (next: DeviceMode) => void;
}) {
  const activeIndex = MODES.findIndex((m) => m.id === mode);

  return (
    <div
      className="fixed left-4 top-4 z-[10050] rounded-full border border-neutral-700/80 bg-neutral-900/95 p-1 shadow-lg backdrop-blur-md"
      role="toolbar"
      aria-label="Device preview"
    >
      <div className="relative flex">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-11 rounded-full bg-blue-600/90 shadow-inner shadow-blue-900/30 transition-transform duration-200 ease-out"
          style={{ transform: `translateX(${activeIndex * 2.75}rem)` }}
          aria-hidden
        />
        {MODES.map((m) => {
          const Icon = m.icon;
          const selected = mode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={cn(
                "relative z-10 flex h-9 w-11 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400/80",
                selected ? "text-white" : "text-neutral-400 hover:text-neutral-200"
              )}
              aria-pressed={selected}
              aria-label={m.label}
              title={m.label}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildEmbedPageUrl(): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = base ? `${base.replace(/\/$/, "")}/embed` : "/embed";
  return `${window.location.origin}${path}`;
}

function DevicePreviewInner({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<DeviceMode>("pc");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as DeviceMode | null;
    if (stored && MODES.some((m) => m.id === stored)) {
      setMode(stored);
    } else {
      setMode(inferMode(window.innerWidth));
    }
  }, []);

  const persistMode = useCallback((next: DeviceMode) => {
    setMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
  }, []);

  const embedUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return buildEmbedPageUrl();
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  const frameClass =
    "relative overflow-hidden rounded-[1.75rem] border border-neutral-700/80 bg-neutral-900 shadow-2xl shadow-black/50";

  if (mode === "phone") {
    return (
      <>
        <DevicePreviewBar mode={mode} onChange={persistMode} />
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-neutral-950 pt-14">
          <div
            className={cn(frameClass, "mx-auto w-[min(390px,calc(100vw-2rem))]")}
            style={{ height: "min(844px, 90vh)" }}
          >
            <iframe title="Phone preview" src={embedUrl} className="h-full w-full border-0 bg-neutral-950" />
          </div>
        </div>
      </>
    );
  }

  if (mode === "tablet") {
    return (
      <>
        <DevicePreviewBar mode={mode} onChange={persistMode} />
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-neutral-950 pt-14">
          <div
            className={cn(frameClass, "mx-auto w-[min(834px,calc(100vw-2rem))]")}
            style={{ height: "min(1024px, 90vh)" }}
          >
            <iframe title="Tablet preview" src={embedUrl} className="h-full w-full border-0 bg-neutral-950" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DevicePreviewBar mode={mode} onChange={persistMode} />
      {children}
    </>
  );
}

export function DevicePreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <DevicePreviewInner>{children}</DevicePreviewInner>
    </Suspense>
  );
}
