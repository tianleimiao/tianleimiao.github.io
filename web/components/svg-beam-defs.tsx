export function SvgBeamDefs() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden>
      <defs>
        <linearGradient id="beam-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0} className="beam-stop-animated" />
          <stop offset="45%" stopColor="#3b82f6" stopOpacity={0.9} className="beam-stop-animated" />
          <stop offset="55%" stopColor="#60a5fa" stopOpacity={0.7} className="beam-stop-animated" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} className="beam-stop-animated" />
        </linearGradient>
        <linearGradient id="beam-gradient-noodle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity={0.85} />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.15} />
        </linearGradient>
      </defs>
    </svg>
  );
}
