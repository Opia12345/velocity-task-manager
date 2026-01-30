"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Filter,
  Briefcase,
  User,
  AlertTriangle,
  Hash,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { TaskCategory, TaskPriority } from "../lib/types";

interface FilterDropdownProps {
  activeCategory: TaskCategory | "all";
  activePriority: TaskPriority | "all";
  onCategoryChange: (category: TaskCategory | "all") => void;
  onPriorityChange: (priority: TaskPriority | "all") => void;
}

export function FilterDropdown({
  activeCategory,
  activePriority,
  onCategoryChange,
  onPriorityChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categoryOptions: {
    value: TaskCategory | "all";
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "all",
      label: "All Categories",
      icon: <Hash size={16} />,
    },
    {
      value: "work",
      label: "Work",
      icon: <Briefcase size={16} />,
    },
    {
      value: "personal",
      label: "Personal",
      icon: <User size={16} />,
    },
    {
      value: "urgent",
      label: "Urgent",
      icon: <AlertTriangle size={16} />,
    },
    {
      value: "other",
      label: "Other",
      icon: <Hash size={16} />,
    },
  ];

  const priorityOptions: {
    value: TaskPriority | "all";
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "all",
      label: "All Priorities",
      icon: <Minus size={16} />,
    },
    {
      value: "high",
      label: "High Priority",
      icon: <ArrowUp size={16} />,
    },
    {
      value: "medium",
      label: "Medium Priority",
      icon: <Minus size={16} />,
    },
    {
      value: "low",
      label: "Low Priority",
      icon: <ArrowDown size={16} />,
    },
  ];

  const hasActiveFilters = activeCategory !== "all" || activePriority !== "all";

  const handleClearFilters = () => {
    onCategoryChange("all");
    onPriorityChange("all");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 hover:scale-[1.1] rounded-lg border transition-all shadow-sm ${
          hasActiveFilters
            ? "bg-teal-50 border-teal-300 text-teal-700 shadow-teal-100"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
        }`}
      >
        <Filter size={18} />
        <span className="text-sm font-medium">
          {hasActiveFilters ? "Filters Active" : "Filter"}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg border border-gray-200 shadow-xl z-20 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-6">
                {/* Category Section */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Category
                  </label>
                  <div className="space-y-1">
                    {categoryOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onCategoryChange(option.value)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all
                          ${
                            activeCategory === option.value
                              ? "bg-teal-50 text-teal-700 border border-teal-200"
                              : "text-gray-700 hover:bg-gray-50"
                          }
                        `}
                      >
                        <span>{option.icon}</span>
                        <span className="flex-1 text-sm font-medium">
                          {option.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Priority Section */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Priority
                  </label>
                  <div className="space-y-1">
                    {priorityOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onPriorityChange(option.value)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all
                          ${
                            activePriority === option.value
                              ? "bg-teal-50 text-teal-700 border border-teal-200"
                              : "text-gray-700 hover:bg-gray-50"
                          }
                        `}
                      >
                        <span>{option.icon}</span>
                        <span className="flex-1 text-sm font-medium">
                          {option.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
