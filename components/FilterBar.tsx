"use client";

import { FilterType } from "@/lib/types";

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

type FilterOption = {
  key: FilterType;
  label: string;
  icon: string;
};

const FILTERS: FilterOption[] = [
  { key: "all", label: "ALL", icon: "◈" },
  { key: "active", label: "ACTIVE", icon: "▶" },
  { key: "completed", label: "DONE", icon: "✓" },
];

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex items-center gap-1 p-1 rounded-lg bg-slate-900/80 border border-slate-700/50"
        role="tablist"
        aria-label="Filter tasks by status"
      >
        {FILTERS.map(({ key, label, icon }) => {
          const isActive = filter === key;
          const btnClass = [
            "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold tracking-widest",
            "transition-all duration-200 select-none border",
            isActive
              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(56,189,248,0.25)]"
              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 border-transparent",
          ].join(" ");

          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilterChange(key)}
              className={btnClass}
            >
              <span aria-hidden="true" className="text-xs">{icon}</span>
              <span>{label}</span>
              {key === "active" && activeCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 tabular-nums leading-none">
                  {activeCount}
                </span>
              )}
              {key === "completed" && completedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-xs bg-slate-700/60 text-slate-400 border border-slate-600/40 tabular-nums leading-none">
                  {completedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500 font-mono">
          <span className="text-cyan-400 font-semibold tabular-nums">{activeCount}</span>
          {" job"}{activeCount !== 1 ? "s" : ""}{" pending"}
        </span>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs font-mono text-slate-500 px-2 py-1 rounded border border-slate-700/50 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 transition-all duration-200"
            aria-label={"Clear " + completedCount + " completed task" + (completedCount !== 1 ? "s" : "")}
          >
            purge completed
          </button>
        )}
      </div>
    </div>
  );
}
