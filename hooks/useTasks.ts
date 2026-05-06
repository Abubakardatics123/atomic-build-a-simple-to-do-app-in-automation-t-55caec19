"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, FilterType } from "@/lib/types";

const STORAGE_KEY = "automation-tasks";

function generateId(): string {
  return "task-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore storage errors
    }
  }, [tasks, hydrated]);

  const addTask = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask: Task = {
      id: generateId(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    activeCount,
    completedCount,
    hydrated,
  };
}
