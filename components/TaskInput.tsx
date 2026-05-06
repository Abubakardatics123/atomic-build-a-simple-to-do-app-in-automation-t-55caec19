"use client";

import { useState, useRef, FormEvent } from "react";
import { Plus, Terminal } from 'lucide-react';

interface TaskInputProps {
  onAdd: (text: string) => void;
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" aria-label="Add new task">
      {/* Terminal prompt header */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <Terminal size={12} className="text-cyan-400" />
        <span className="text-xs text-cyan-400/70 tracking-widest uppercase">
          new_job.queue
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
      </div>

      <div
        className={[
          "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300",
          "bg-slate-900/80 border",
          focused
            ? "border-cyan-400/70 shadow-[0_0_8px_rgba(56,189,248,0.5),0_0_20px_rgba(56,189,248,0.15)]"
            : "border-slate-700/60 shadow-[inset_0_0_12px_rgba(56,189,248,0.03)]",
        ].join(" ")}
      >
        {/* Prompt symbol */}
        <span
          className={[
            "text-sm font-bold select-none transition-colors duration-200",
            focused ? "text-cyan-400" : "text-slate-500",
          ].join(" ")}
          aria-hidden="true"
        >
          &gt;_
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="describe task to automate..."
          aria-label="New task description"
          className={[
            "flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600",
            "outline-none font-mono tracking-wide",
          ].join(" ")}
          maxLength={200}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Character count */}
        {value.length > 0 && (
          <span className="text-xs text-slate-600 tabular-nums select-none">
            {value.length}/200
          </span>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Add task"
          className={[
            "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold tracking-widest uppercase",
            "transition-all duration-200 select-none",
            value.trim()
              ? [
                  "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50",
                  "hover:bg-cyan-500/30 hover:border-cyan-400 hover:text-cyan-200",
                  "hover:shadow-[0_0_8px_rgba(56,189,248,0.4)]",
                  "active:scale-95",
                ].join(" ")
              : "bg-slate-800/50 text-slate-600 border border-slate-700/50 cursor-not-allowed",
          ].join(" ")}
        >
          <Plus size={12} />
          <span>Deploy</span>
        </button>
      </div>

      {/* Hint text */}
      <p className="mt-2 px-1 text-xs text-slate-600">
        <span className="text-slate-500">↵</span> press enter or click deploy to queue job
      </p>
    </form>
  );
}
