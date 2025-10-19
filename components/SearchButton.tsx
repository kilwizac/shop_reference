'use client';

import React from 'react';
import { useSearch } from '@/lib/contexts/SearchContext';
import { getKeyboardShortcut, getKeyboardShortcuts } from '@/lib/utils/platform';

interface SearchButtonProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'icon';
  children?: React.ReactNode;
}

export function SearchButton({ 
  className = '', 
  variant = 'default',
  children 
}: SearchButtonProps) {
  const { openSearch } = useSearch();
  const shortcuts = getKeyboardShortcuts();
  const currentShortcut = getKeyboardShortcut();
  
  if (variant === 'icon') {
    return (
      <button
        onClick={openSearch}
        className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
        title={`Search (${shortcuts.mac} / ${shortcuts.windows})`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    );
  }
  
  if (variant === 'minimal') {
    return (
      <button
        onClick={openSearch}
        className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {children || 'Search...'}
      </button>
    );
  }
  
  return (
    <button
      onClick={openSearch}
      className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {children || 'Search materials, threads, fits...'}
      <kbd className="ml-auto px-2 py-1 text-xs bg-gray-200 border border-gray-400 rounded font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <span className="hidden sm:inline">{currentShortcut}</span>
        <span className="sm:hidden">{currentShortcut.includes('⌘') ? '⌘' : 'Ctrl'}</span>
      </kbd>
    </button>
  );
}
