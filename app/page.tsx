"use client";

import { useTasks } from "@/hooks/useTasks";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import FilterBar from "@/components/FilterBar";
import { Activity, GitBranch, Terminal, Zap } from 'lucide-react';

export default function HomePage() {
  const {
    filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    activeCount,
    completedCount,
    tasks,
    hydrated,
  } = useTasks();

  const totalCount = tasks.length;
  const successRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0f172a] grid-bg relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none fixed top-0 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed bottom-0 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* ── Header ── */}
        <header className="mb-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="ml-2 text-xs text-slate-600 font-mono tracking-widest">
                autotask v1.0.0
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              <span>PIPELINE ONLINE</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10"
                aria-hidden="true"
              >
                <Zap size={20} className="text-cyan-400" />
              </div>
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-tight text-glow-cyan"
                style={{ color: "#38bdf8" }}
              >
                AutoTask
              </h1>
            </div>
            <p className="text-sm text-slate-500 font-mono tracking-wide">
              {"// Automate your workflow. Execute with precision."}
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Activity size={12} className="text-cyan-400" aria-hidden="true" />
                <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                  Total
                </span>
              </div>
              <span className="text-xl font-bold text-slate-200 tabular-nums font-mono">
                {totalCount}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-slate-700/50">
              <div className="flex items-center gap-1.5">
                <GitBranch size={12} className="text-purple-400" aria-hidden="true" />
                <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                  Active
                </span>
              </div>
              <span className="text-xl font-bold text-cyan-400 tabular-nums font-mono">
                {activeCount}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Terminal size={12} className="text-green-400" aria-hidden="true" />
                <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                  Done
                </span>
              </div>
              <span className="text-xl font-bold text-green-400 tabular-nums font-mono">
                {completedCount}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          {totalCount > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-600 font-mono">pipeline progress</span>
                <span className="text-xs text-cyan-400 font-mono tabular-nums">{successRate}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: successRate + "%",
                    background: "linear-gradient(90deg, #38bdf8, #7c3aed)",
                    boxShadow: "0 0 8px rgba(56,189,248,0.5)",
                  }}
                  role="progressbar"
                  aria-valuenow={successRate}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={"Pipeline " + successRate + "% complete"}
                />
              </div>
            </div>
          )}
        </header>

        {/* ── Main panel ── */}
        <main>
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Panel header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 border-b border-slate-700/50">
              <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
                job_queue.pipeline
              </span>
              <div className="flex-1 h-px bg-slate-700/50" />
              <span className="text-xs text-slate-600 font-mono">
                {new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>

            <div className="p-4 sm:p-6 space-y-5">
              {/* Input */}
              <TaskInput onAdd={addTask} />

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-700/50" />
                <span className="text-xs text-slate-600 font-mono tracking-widest">QUEUE</span>
                <div className="flex-1 h-px bg-slate-700/50" />
              </div>

              {/* Filter bar */}
              <FilterBar
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeCount}
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
              />

              {/* Task list */}
              <div className="min-h-[200px]">
                {!hydrated ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
                        style={{ animation: "spin 1s linear infinite" }}
                        aria-hidden="true"
                      />
                      <span className="text-xs text-slate-600 font-mono">
                        initializing pipeline...
                      </span>
                    </div>
                  </div>
                ) : (
                  <TaskList
                    tasks={filteredTasks}
                    filter={filter}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="mt-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-600 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" aria-hidden="true" />
              {totalCount} total jobs
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" aria-hidden="true" />
              {successRate}% success rate
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" aria-hidden="true" />
              system nominal
            </span>
          </div>
          <p className="text-xs text-slate-700 font-mono">
            {"// tasks persisted to local storage"}
          </p>
        </footer>
      </div>
    </div>
  );
}
