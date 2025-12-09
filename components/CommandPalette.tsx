'use client';

import React, { useEffect, useRef } from 'react';
import { useSearch } from '@/lib/contexts/SearchContext';
import { SearchCategory, SearchResult } from '@/lib/types/search';
import { highlightMatch } from '@/lib/search/searchEngine';

interface CommandPaletteProps {
  className?: string;
}

const CATEGORY_COLORS: Record<SearchCategory, string> = {
  materials: 'bg-blue-100 text-blue-800',
  threads: 'bg-green-100 text-green-800',
  fits: 'bg-purple-100 text-purple-800',
  calculators: 'bg-orange-100 text-orange-800',
  standards: 'bg-gray-100 text-gray-800',
  processes: 'bg-red-100 text-red-800',
  drill: 'bg-yellow-100 text-yellow-800',
};

const iconBaseClasses = 'w-5 h-5 text-gray-500';

const CATEGORY_ICONS: Record<SearchCategory, React.ReactElement> = {
  materials: (
    <svg
      className={iconBaseClasses}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7.5 12 3l8 4.5-8 4.5L4 7.5Z" />
      <path d="M4 7.5v9L12 21l8-4.5v-9" />
      <path d="M12 12v9" />
    </svg>
  ),
  threads: (
    <svg
      className={iconBaseClasses}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
      <path d="M7 4v16" />
      <path d="M17 4v16" />
    </svg>
  ),
  fits: (
    <svg
      className={iconBaseClasses}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="12" r="4" />
      <circle cx="15" cy="12" r="4" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
    </svg>
  ),
  calculators: (
    <svg
      className={iconBaseClasses}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h3" />
      <path d="M13 11h3" />
      <path d="M8 15h3" />
      <path d="M13 15h3" />
    </svg>
  ),
  standards: (
    <svg
      className={iconBaseClasses}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 5h8" />
      <path d="M5 9h8" />
      <path d="M5 13h8" />
      <path d="M5 3v18" />
      <path d="M13 3v18" />
      <path d="M18 7v10" />
      <path d="M16 9h4" />
      <path d="M16 15h4" />
    </svg>
  ),
  processes: (
    <svg
      className={iconBaseClasses}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5V3" />
      <path d="M12 21v-2" />
      <path d="M7.05 7.05 5.64 5.64" />
      <path d="M18.36 18.36 16.95 16.95" />
      <path d="M5 12H3" />
      <path d="M21 12h-2" />
      <path d="M7.05 16.95 5.64 18.36" />
      <path d="M18.36 5.64 16.95 7.05" />
    </svg>
  ),
  drill: (
    <svg
      className={iconBaseClasses}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 3h10l2 4H5l2-4Z" />
      <path d="M12 7v14" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
      <path d="M9 19h6" />
    </svg>
  ),
};

const DEFAULT_COLOR = 'bg-gray-100 text-gray-800';

function getCategoryIcon(category: SearchCategory) {
  return CATEGORY_ICONS[category];
}

function getCategoryColor(category: SearchCategory) {
  return CATEGORY_COLORS[category] ?? DEFAULT_COLOR;
}

export function CommandPalette({ className = '' }: CommandPaletteProps) {
  const { state, closeSearch, setQuery, selectResult, executeAction } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Focus input when opened
  useEffect(() => {
    if (state.isOpen && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [state.isOpen]);
  
  // Scroll selected result into view
  useEffect(() => {
    if (state.isOpen && resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector('[data-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [state.selectedIndex, state.isOpen]);
  
  if (!state.isOpen) return null;
  
  const handleResultClick = (result: SearchResult) => {
    executeAction(result.action);
  };
  

  

  
  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center pt-8 sm:pt-16">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--z-modal-backdrop)]"
        onClick={closeSearch}
      />
      
      {/* Search Modal */}
      <div className={`relative z-[var(--z-modal)] w-full max-w-2xl mx-2 sm:mx-4 ${className}`}>
        <div className="bg-white dark:bg-black rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <svg 
              className="w-5 h-5 text-gray-400 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search materials, threads, fits, calculators..."
              value={state.query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-base sm:text-lg placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none bg-transparent text-gray-900 dark:text-white"
              autoComplete="off"
            />
            {state.query && (
              <button
                onClick={() => setQuery('')}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Results */}
          <div 
            ref={resultsRef}
            className="max-h-80 sm:max-h-96 overflow-y-auto"
          >
            {state.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-500">Searching...</span>
              </div>
            ) : state.results.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                {state.query ? 'No results found' : 'Start typing to search...'}
              </div>
            ) : (
              <div className="py-2">
                {state.results.map((result, index) => (
                  <div
                    key={result.id}
                    data-selected={index === state.selectedIndex}
                    onClick={() => handleResultClick(result)}
                    className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                      index === state.selectedIndex 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Category Icon */}
                    <div className="flex-shrink-0 mr-3 text-lg">
                      {getCategoryIcon(result.category)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 
                          className="font-medium text-gray-900 truncate"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(result.title, state.query)
                          }}
                        />
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(result.category)}`}>
                          {result.category}
                        </span>
                      </div>
                      
                      {result.description && (
                        <p 
                          className="text-sm text-gray-600 truncate"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(result.description, state.query)
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Action Indicator */}
                    <div className="flex-shrink-0 ml-2">
                      {result.action.type === 'navigate' && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                      {result.action.type === 'copy' && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Arrow keys</span>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Enter</span>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Esc</span>
                  <span>Close</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300">Ctrl</kbd>
                <span className="text-gray-400">+</span>
                <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300">K</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


