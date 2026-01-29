"use client";

import { motion } from "framer-motion";
import {
  Trash2,
  Edit2,
  Clock,
  AlertTriangle,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { Task } from "../lib/types";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onUpdate, onDelete, onEdit }: TaskItemProps) {
  const categoryStyles = {
    work: "bg-blue-50 text-blue-700 border-blue-200",
    personal: "bg-green-50 text-green-700 border-green-200",
    urgent: "bg-red-50 text-red-700 border-red-200",
    other: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const priorityConfig = {
    low: {
      icon: ArrowDown,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    medium: {
      icon: Minus,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    high: {
      icon: ArrowUp,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  };

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return "Today";
    if (date.getTime() === tomorrow.getTime()) return "Tomorrow";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatCreatedDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ y: -2 }}
      className={`
        group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md 
        transition-all duration-200 overflow-hidden
        ${task.completed ? "opacity-70" : ""}
        ${isOverdue ? "border-red-300 bg-red-50/30" : ""}
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="shrink-0 mt-1"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) =>
                onUpdate(task.id, { completed: e.target.checked })
              }
              className="w-5 h-5 rounded-md border-2 border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 cursor-pointer transition-all"
            />
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Text Content */}
              <div className="min-w-0 flex-1">
                <h3
                  className={`text-base md:text-lg font-semibold leading-tight mb-1 truncate ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>

                {task.description && (
                  <p
                    className={`text-sm leading-relaxed line-clamp-2 ${
                      task.completed ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {task.description}
                  </p>
                )}
              </div>

              {/* Badges Container */}
              <div className="flex flex-wrap items-center gap-2 mt-1 lg:mt-0">
                {/* Category Badge */}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 text-[10px] md:text-xs font-medium rounded-full border capitalize ${categoryStyles[task.category]}`}
                >
                  {task.category}
                </span>

                {/* Priority Badge */}
                {task.priority && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] md:text-xs font-medium rounded-full border ${priorityConfig[task.priority].bg} ${priorityConfig[task.priority].border}`}
                  >
                    {task.priority === "high" && (
                      <ArrowUp
                        size={12}
                        className={priorityConfig[task.priority].color}
                      />
                    )}
                    {task.priority === "medium" && (
                      <Minus
                        size={12}
                        className={priorityConfig[task.priority].color}
                      />
                    )}
                    {task.priority === "low" && (
                      <ArrowDown
                        size={12}
                        className={priorityConfig[task.priority].color}
                      />
                    )}
                    <span
                      className={`capitalize ${priorityConfig[task.priority].color}`}
                    >
                      {task.priority}
                    </span>
                  </span>
                )}

                {/* Due Date Badge */}
                {task.dueDate && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] md:text-xs font-medium rounded-full border ${
                      isOverdue
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {isOverdue ? (
                      <AlertTriangle size={12} />
                    ) : (
                      <Calendar size={12} />
                    )}
                    {formatDueDate(task.dueDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 lg:border-none lg:mt-1 lg:pt-0">
              <span className="inline-flex items-center gap-1 text-[10px] md:text-xs text-gray-400">
                <Clock size={10} />
                {formatCreatedDate(task.created)}
              </span>

              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Edit task"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
