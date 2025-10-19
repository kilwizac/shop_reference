"use client";

import { useState } from "react";

interface CitationProps {
  citation: string;
  property?: string;
  className?: string;
}

export function Citation({ citation, property, className = "" }: CitationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
        title="View citation"
      >
        <svg
          className="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        {property ? `${property} source` : 'Source'}
      </button>

      {isExpanded && (
        <div className="absolute z-10 mt-2 w-80 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <div className="font-medium mb-1">Reference:</div>
            <div className="text-xs leading-relaxed">{citation}</div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

interface MaterialPropertyCardProps {
  property: string;
  value: number;
  unit: string;
  range?: [number, number];
  citation?: string;
  className?: string;
}

export function MaterialPropertyCard({ 
  property, 
  value, 
  unit, 
  range, 
  citation, 
  className = "" 
}: MaterialPropertyCardProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {property}
        </span>
        {citation && (
          <Citation citation={citation} property={property} />
        )}
      </div>
      
      <div className="text-lg font-mono text-gray-900 dark:text-white">
        {value.toFixed(3)} {unit}
      </div>
      
      {range && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Range: {range[0].toFixed(3)} - {range[1].toFixed(3)} {unit}
        </div>
      )}
    </div>
  );
}
