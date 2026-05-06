"use client";

import { FilterType } from "@/lib/types";

interface EmptyStateProps {
  filter: FilterType;
}

const messages: Record<FilterType, { title: string; subtitle: string }> = {
  all: {
    title: "Pipeline Idle",
    subtitle: "No jobs queued. Add a task to initialize the workflow.",
  },
  active: {
    title: "No Active Jobs",
    subtitle: "All processes complete. Queue a new task to resume.",
  },
  completed: {
    title: "No Completed Jobs",
    subtitle: "No tasks have been executed yet. Deploy your first job.",
  },
};

export default function EmptyState({ filter }: EmptyStateProps) {
  const { title, subtitle } = messages[filter];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      {/* ASCII Robot SVG */}
      <div className="mb-6 relative">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="opacity-60"
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Robot head */}
          <rect x="30" y="20" width="60" height="45" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" filter="url(#glow)" />

          {/* Antenna */}
          <line x1="60" y1="20" x2="60" y2="10" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="60" cy="8" r="3" fill="#38bdf8" filter="url(#glow)" />

          {/* Eyes */}
          <rect x="40" y="32" width="14" height="10" rx="2" fill="#0d1b2e" stroke="#38bdf8" strokeWidth="1" />
          <rect x="66" y="32" width="14" height="10" rx="2" fill="#0d1b2e" stroke="#38bdf8" strokeWidth="1" />
          {/* Eye pupils - blinking */}
          <rect x="44" y="35" width="6" height="4" rx="1" fill="#38bdf8" opacity="0.9" />
          <rect x="70" y="35" width="6" height="4" rx="1" fill="#38bdf8" opacity="0.9" />

          {/* Mouth / status bar */}
          <rect x="42" y="50" width="36" height="6" rx="3" fill="#0d1b2e" stroke="#334155" strokeWidth="1" />
          <rect x="43" y="51" width="10" height="4" rx="2" fill="#38bdf8" opacity="0.4" />

          {/* Neck */}
          <rect x="52" y="65" width="16" height="8" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1" />

          {/* Body */}
          <rect x="22" y="73" width="76" height="36" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

          {/* Body details - circuit lines */}
          <line x1="35" y1="85" x2="55" y2="85" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />
          <line x1="55" y1="85" x2="55" y2="95" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />
          <line x1="55" y1="95" x2="85" y2="95" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />
          <circle cx="35" cy="85" r="2.5" fill="#38bdf8" opacity="0.5" />
          <circle cx="85" cy="95" r="2.5" fill="#7c3aed" opacity="0.5" />

          {/* Power indicator */}
          <circle cx="60" cy="87" r="5" fill="#0d1b2e" stroke="#334155" strokeWidth="1" />
          <circle cx="60" cy="87" r="2.5" fill="#334155" />

          {/* Arms */}
          <rect x="6" y="75" width="16" height="8" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="98" y="75" width="16" height="8" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />

          {/* Legs */}
          <rect x="36" y="109" width="18" height="8" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="66" y="109" width="18" height="8" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        </svg>

        {/* Idle pulse ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-28 h-28 rounded-full border border-cyan-400/10 animate-ping" style={{ animationDuration: "3s" }} />
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-2 h-2 rounded-full bg-slate-600 animate-pulse" />
        <span className="text-xs text-slate-500 tracking-widest uppercase font-mono">
          STATUS: IDLE
        </span>
      </div>

      {/* Message */}
      <h3 className="text-base font-semibold text-slate-400 mb-1 tracking-wide">
        {title}
      </h3>
      <p className="text-sm text-slate-600 text-center max-w-xs leading-relaxed">
        {subtitle}
      </p>

      {/* ASCII art divider */}
      <div className="mt-6 text-slate-700 text-xs font-mono select-none">
        {"[ "}
        <span className="text-slate-600">· · · · · · · · · ·</span>
        {" ]"}
      </div>
    </div>
  );
}
