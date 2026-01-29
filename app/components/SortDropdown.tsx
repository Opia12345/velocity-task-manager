"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  Clock,
  CheckSquare,
  Type,
  ArrowUpDown,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

export type SortOption =
  | "created"
  | "updated"
  | "title"
  | "completed"
  | "priority"
  | "dueDate"
  | "manual";
export type SortDirection = "asc" | "desc";

interface SortDropdownProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, direction: SortDirection) => void;
}

export function SortDropdown({
  sortBy,
  sortDirection,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: {
    value: SortOption;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { value: "manual", label: "Manual Order", icon: <ArrowUpDown size={16} /> },
    { value: "created", label: "Date Created", icon: <Calendar size={16} /> },
    { value: "updated", label: "Last Updated", icon: <Clock size={16} /> },
    { value: "title", label: "Alphabetical", icon: <Type size={16} /> },
    {
      value: "completed",
      label: "Completion Status",
      icon: <CheckSquare size={16} />,
    },
    { value: "priority", label: "Priority", icon: <AlertTriangle size={16} /> },
    { value: "dueDate", label: "Due Date", icon: <CalendarDays size={16} /> },
  ];

  const currentSort = sortOptions.find((option) => option.value === sortBy);

  const handleSortSelect = (newSortBy: SortOption) => {
    if (newSortBy === sortBy) {
      onSortChange(newSortBy, sortDirection === "asc" ? "desc" : "asc");
    } else {
      const defaultDirection =
        newSortBy === "completed" || newSortBy === "priority" ? "desc" : "asc";
      onSortChange(newSortBy, defaultDirection);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        {currentSort?.icon}
        <span className="text-sm font-medium text-gray-700">
          Sort: {currentSort?.label}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-gray-500" />
        </motion.div>
        {sortDirection === "desc" && sortBy !== "manual" && (
          <div className="w-2 h-2 bg-teal-500 rounded-full" />
        )}
      </motion.button>

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
              className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-xl z-20 overflow-hidden"
            >
              <div className="p-2">
                {sortOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSortSelect(option.value)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all
                      ${
                        sortBy === option.value
                          ? "bg-teal-50 text-teal-700 border border-teal-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {option.icon}
                    <span className="flex-1 text-sm font-medium">
                      {option.label}
                    </span>
                    {sortBy === option.value && (
                      <div className="flex items-center gap-1">
                        {sortDirection === "desc" &&
                          option.value !== "manual" && (
                            <div className="w-2 h-2 bg-teal-500 rounded-full" />
                          )}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
