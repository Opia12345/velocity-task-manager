"use client";

import { Reorder, AnimatePresence } from "framer-motion";
import { Task, TaskCategory } from "../lib/types";
import { TaskItem } from "./TaskItem";
import { EmptyState } from "./EmptyState";
import { SortOption } from "./SortDropdown";

interface TaskListProps {
  tasks: Task[];
  activeCategory: TaskCategory | "all";
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onReorder: (tasks: Task[]) => void;
  onEdit: (task: Task) => void;
  sortBy?: SortOption;
  isFiltering?: boolean;
}

export default function TaskList({
  tasks,
  activeCategory,
  onUpdate,
  onDelete,
  onReorder,
  onEdit,
  sortBy = "manual",
  isFiltering = false,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        type={isFiltering ? "no-filtered-tasks" : "no-tasks"}
        activeCategory={activeCategory}
      />
    );
  }

  if (sortBy !== "manual") {
    return (
      <div className="w-full space-y-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <div key={task.id}>
              <TaskItem
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={onReorder}
        className="space-y-4"
      >
        <AnimatePresence>
          {tasks.map((task) => (
            <Reorder.Item key={task.id} value={task}>
              <TaskItem
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
