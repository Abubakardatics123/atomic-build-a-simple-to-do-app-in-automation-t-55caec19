"use client";

import { useState, useRef, useEffect } from "react";
import { Trash2, Check } from 'lucide-react';
import { Task } from "@/lib/types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [removing, setRemoving] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const prevCompleted = useRef(task.completed);

  useEffect(() => {
    if (!prevCompleted.current && task.completed) {
      setJustCompleted(true);
      const t = setTimeout(() => setJustCompleted(false), 600);
      return () => clearTimeout(t);
    }
    prevCompleted.current = task.completed;
  }, [task.completed]);

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => onDelete(task.id), 280);
  };

  const timeLabel = new Date(task.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const containerClass = [
    "group relative flex items-start gap-3 px-4 py-3 rounded-lg border transition-all duration-200",
    "bg-slate-900/60 backdrop-blur-sm",
    removing ? "task-exit" : "task-enter",
    task.completed
      ? "border-slate-700/40 opacity-70"
      : "border-slate-700/60 hover:border-cyan-500/30 hover:bg-slate-900/80",
    justCompleted ? "complete-pulse" : "",
  ].join(" ");

  const toggleClass = [
    "flex-shrink-0 mt-0.5 w-5 h-5 rounded border transition-all duration-200",
    "flex items-center justify-center",
    task.completed
      ? "bg-cyan-500/20 border-cyan-500/60 text-cyan-400 hover:bg-cyan-500/10"
      : "bg-transparent border-slate-600 hover:border-cyan-400/70 hover:bg-cyan-400/5",
  ].join(" ");

  const textClass = [
    "text-sm leading-relaxed break-words transition-all duration-300",
    task.completed ? "line-through text-slate-500" : "text-slate-200",
  ].join(" ");

  const badgeClass = [
    "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono tracking-wider",
    task.completed
      ? "bg-slate-800/80 text-slate-500 border border-slate-700/50"
      : "bg-cyan-500/10 text-cyan-400/80 border border-cyan-500/20",
  ].join(" ");

  const dotClass = [
    "w-1.5 h-1.5 rounded-full",
    task.completed ? "bg-slate-600" : "bg-cyan-400 animate-pulse",
  ].join(" ");

  const accentClass = [
    "absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300",
    task.completed ? "bg-slate-600" : "bg-cyan-400/60",
  ].join(" ");

  return (
    <li
      className={containerClass}
      aria-label={"Task: " + task.text + ". Status: " + (task.completed ? "completed" : "active")}
    >
      <div className={accentClass} aria-hidden="true" />

      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as active" : "Mark as complete"}
        aria-pressed={task.completed}
        className={toggleClass}
      >
        {task.completed && <Check size={11} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <span className={textClass}>{task.text}</span>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={badgeClass}>
            <span className={dotClass} aria-hidden="true" />
            {task.completed ? "DONE" : "RUNNING"}
          </span>
          <span className="text-xs text-slate-600 font-mono tabular-nums">{timeLabel}</span>
        </div>
      </div>

      <button
        onClick={handleDelete}
        aria-label={"Delete task: " + task.text}
        className="flex-shrink-0 mt-0.5 p-1.5 rounded transition-all duration-200 text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10 focus-visible:opacity-100"
      >
        <Trash2 size={13} />
      </button>
    </li>
  );
}
