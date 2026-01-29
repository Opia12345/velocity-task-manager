"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          /* Changed w-64 to w-full */
          className="w-full pl-10 pr-10 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white shadow-sm text-sm transition-all hover:border-gray-400"
        />

        {/* Added a clear button for better mobile UX */}
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
