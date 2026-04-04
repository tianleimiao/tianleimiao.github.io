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

const BTN_W_REM = 2; /* w-8 */

function DevicePreviewBar({
  mode,
  onChange,
  visible,
}: {
  mode: DeviceMode;
  onChange: (next: DeviceMode) => void;
  visible: boolean;
}) {
  const activeIndex = MODES.findIndex((m) => m.id === mode);

  return (
    <div
      className={cn(
        "group fixed left-[var(--device-preview-left)] top-[var(--device-preview-top)] z-[10050] transition-opacity duration-700 ease-out",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      role="toolbar"
      aria-label="Device preview"
    >
      <div className="relative overflow-hidden rounded-full transition-[transform,box-shadow] duration-300 ease-out will-change-transform group-hover:scale-[1.035] group-hover:shadow-[0_0_28px_-6px_rgba(59,130,246,0.45)] motion-reduce:group-hover:scale-100">
        <div className="device-preview-ring pointer-events-none" aria-hidden />
        <div className="relative z-10 m-px rounded-full bg-neutral-950/92 p-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
          <div className="relative flex">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-8 rounded-full bg-gradient-to-b from-blue-500/95 to-blue-600/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.25,0.64,1)]"
              style={{ transform: `translateX(${activeIndex * BTN_W_REM}rem)` }}
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
                    "relative z-10 flex h-7 w-8 shrink-0 items-center justify-center rounded-full outline-none transition-[color,transform,background-color] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-blue-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 hover:scale-110 active:scale-90 hover:[&_svg]:drop-shadow-[0_0_7px_rgba(96,165,250,0.55)]",
                    selected
                      ? "text-white"
                      : "text-neutral-500 hover:bg-white/[0.07] hover:text-neutral-100"
                  )}
                  aria-pressed={selected}
                  aria-label={m.label}
                  title={m.label}
                >
                  <Icon className="h-3.5 w-3.5 transition-transform duration-200 ease-out" strokeWidth={1.65} />
                </button>
              );
            })}
          </div>
        </div>
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
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as DeviceMode | null;
    if (stored && MODES.some((m) => m.id === stored)) {
      setMode(stored);
    } else {
      setMode(inferMode(window.innerWidth));
    }
    const barTimer = window.setTimeout(() => setBarVisible(true), 6000);
    return () => window.clearTimeout(barTimer);
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
        <DevicePreviewBar mode={mode} onChange={persistMode} visible={barVisible} />
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
        <DevicePreviewBar mode={mode} onChange={persistMode} visible={barVisible} />
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
      <DevicePreviewBar mode={mode} onChange={persistMode} visible={barVisible} />
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
