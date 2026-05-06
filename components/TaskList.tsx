"use client";

import { Task, FilterType } from "@/lib/types";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, filter, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <ul
      className="flex flex-col gap-2"
      aria-label="Task list"
      aria-live="polite"
      aria-relevant="additions removals"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
