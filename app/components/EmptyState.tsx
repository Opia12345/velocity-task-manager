"use client";

import { motion } from "framer-motion";
import { Filter, Inbox } from "lucide-react";

interface EmptyStateProps {
  type: "no-tasks" | "no-filtered-tasks";
  onCreateTask?: () => void;
  activeCategory?: string;
}

export function EmptyState({ type, activeCategory }: EmptyStateProps) {
  if (type === "no-tasks") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
            <Inbox size={32} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No tasks yet
          </h3>
          <p className="text-gray-600 text-md max-w-md mx-auto leading-relaxed">
            Start organizing your work by creating your first task.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
          <Filter size={24} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No {activeCategory !== "all" ? activeCategory : ""} tasks found
        </h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          {activeCategory !== "all"
            ? `No tasks match your current filters. Try adjusting your search or create a new ${activeCategory} task.`
            : "No tasks match your current search or filters. Try adjusting your criteria."}
        </p>
      </div>
    </motion.div>
  );
}
