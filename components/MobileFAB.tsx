"use client";

import { useState } from "react";
import { useSearch } from "@/lib/contexts/SearchContext";
import { SearchButton } from "@/components/SearchButton";

interface MobileFABProps {
  className?: string;
}

export function MobileFAB({ className = "" }: MobileFABProps) {
  const { openSearch } = useSearch();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      label: "Thread Calculator",
      href: "/thread-calculator",
      icon: "🔧"
    },
    {
      label: "Material Calculator", 
      href: "/material-calculator",
      icon: "📊"
    },
    {
      label: "Tolerance Calculator",
      href: "/tolerance-calculator", 
      icon: "📏"
    },
    {
      label: "Materials",
      href: "/materials",
      icon: "🔩"
    }
  ];

  return (
    <div className={`lg:hidden fixed bottom-4 right-4 z-40 ${className}`}>
      {/* Quick Actions Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[200px]">
          {quickActions.map((action, index) => (
            <a
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsExpanded(false)}
            >
              <span className="text-lg">{action.icon}</span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <div className="flex flex-col items-end gap-2">
        {/* Search Button */}
        <button
          onClick={openSearch}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          aria-label="Search"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Menu Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-12 h-12 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
            isExpanded ? 'rotate-45' : ''
          }`}
          aria-label="Toggle quick actions"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
