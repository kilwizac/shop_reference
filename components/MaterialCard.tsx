"use client";

import { useState } from "react";
import { EnhancedMaterial } from "@/lib/types/material";
import { MaterialPropertyCard } from "./Citation";
import { PropertyComparisonChart } from "./MiniChart";

interface MaterialCardProps {
  material: EnhancedMaterial;
  showCharts?: boolean;
  showCitations?: boolean;
  onSelect?: (material: EnhancedMaterial) => void;
  viewMode?: "grid" | "list";
}

export function MaterialCard({ 
  material, 
  showCharts = false, 
  showCitations = false,
  onSelect,
  viewMode = "grid"
}: MaterialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (onSelect) {
      onSelect(material);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Steel': 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-1 ring-blue-700/10 dark:ring-blue-400/20',
      'Stainless Steel': 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-slate-700/10 dark:ring-slate-400/20',
      'Aluminum': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 ring-1 ring-emerald-700/10 dark:ring-emerald-400/20',
      'Titanium': 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 ring-1 ring-purple-700/10 dark:ring-purple-400/20',
      'Copper Alloys': 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 ring-1 ring-orange-700/10 dark:ring-orange-400/20',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 ring-1 ring-gray-700/10 dark:ring-gray-400/20';
  };

  // List view layout
  if (viewMode === "list") {
    return (
      <div 
        className={`bg-white dark:bg-gray-900 rounded-lg transition-all duration-200 group
          ${onSelect ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50' : ''}
          border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm
        `}
        onClick={handleClick}
      >
        <div className="p-3">
          <div className="flex items-center gap-4">
            <div className="w-48 flex-shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {material.name}
                </h3>
              </div>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {material.subcategory || material.category}
              </p>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-4 items-center">
              <div className="text-right">
                <div className="text-sm font-mono text-gray-900 dark:text-gray-200">{material.density.toFixed(3)}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Density</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-gray-900 dark:text-gray-200">{material.expansion.toFixed(1)}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Exp</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-gray-900 dark:text-gray-200">{material.tensileStrength || '-'}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Tensile</div>
              </div>
              <div className="text-right">
                 <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${getCategoryColor(material.category)}`}>
                  {material.category}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Expanded Content */}
          <div 
            className={`grid transition-all duration-300 ease-in-out ${
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-4 pb-2" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
               <div className="pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {material.description || "No description available."}
                    </p>
                  </div>
                  {material.applications && material.applications.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Applications</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {material.applications.map((app, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout
  return (
    <div 
      className={`
        relative bg-white dark:bg-gray-900 rounded-xl transition-all duration-300 group
        ${onSelect ? 'cursor-pointer' : ''}
        border border-transparent hover:border-gray-200 dark:hover:border-gray-700
        hover:shadow-xl hover:-translate-y-1 shadow-sm
        h-full flex flex-col
      `}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider ${getCategoryColor(material.category)}`}>
            {material.category}
          </span>
          {material.hardness && (
             <span className="text-xs font-mono text-gray-400 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-100 dark:border-gray-700">
               {material.hardness} HB
             </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {material.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
          {material.description}
        </p>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="text-lg font-mono font-semibold text-gray-900 dark:text-white leading-none mb-1">
              {material.density.toFixed(2)}
            </div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Density</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="text-lg font-mono font-semibold text-gray-900 dark:text-white leading-none mb-1">
              {material.tensileStrength || '-'}
            </div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Tensile</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="text-lg font-mono font-semibold text-gray-900 dark:text-white leading-none mb-1">
              {material.yieldStrength || '-'}
            </div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Yield</div>
          </div>
        </div>
      </div>

      {/* Expand Button / Footer */}
      <div 
        className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/20 rounded-b-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        <span className="text-xs font-medium text-gray-500">
          {material.applications?.length || 0} applications
        </span>
        <button
          className={`
            w-6 h-6 flex items-center justify-center rounded-full 
            text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30
            transition-all duration-300
            ${isExpanded ? 'rotate-180 bg-blue-50 text-blue-600' : ''}
          `}
        >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
           </svg>
        </button>
      </div>

      {/* Expanded Details Overlay or Inline */}
      {/* We use a grid transition trick for height animation */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100 border-t border-gray-100 dark:border-gray-800" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 bg-white dark:bg-gray-900 rounded-b-xl">
             {/* Applications Tags */}
             {material.applications && material.applications.length > 0 && (
               <div className="flex flex-wrap gap-2 mb-4">
                 {material.applications.slice(0, 5).map((app, i) => (
                   <span key={i} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                     {app}
                   </span>
                 ))}
                 {material.applications.length > 5 && (
                   <span className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-400">+{material.applications.length - 5} more</span>
                 )}
               </div>
             )}

             {/* Detailed Charts/Citations if toggled */}
             {showCitations && material.properties && (
               <div className="space-y-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-bold text-gray-900 uppercase">Sources</h4>
                  {Object.entries(material.properties).map(([key, prop]) => prop && (
                    <div key={key} className="text-xs text-gray-500">
                      <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{key}:</span> {prop.citation}
                    </div>
                  ))}
               </div>
             )}

             {showCharts && (
               <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                 <div className="h-32 w-full bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">
                    Mini Comparison Chart Placeholder
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
