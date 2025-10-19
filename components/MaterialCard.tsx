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
      'Steel': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Stainless Steel': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      'Aluminum': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Titanium': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Copper Alloys': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Nickel Alloys': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Plastics': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Composites': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Ceramics': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Refractory Metals': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      'Magnesium': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      'Wood': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      'Elastomers': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
      'Foams': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
      'Cast Iron': 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  // List view layout
  if (viewMode === "list") {
    return (
      <div 
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow ${
          onSelect ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-600' : ''
        }`}
        onClick={handleClick}
      >
        <div className="p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Name and Category */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {material.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getCategoryColor(material.category)}`}>
                  {material.category}
                </span>
              </div>
              {material.subcategory && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {material.subcategory}
                </p>
              )}
            </div>

            {/* Middle: Key Properties */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-lg font-mono text-gray-900 dark:text-white">
                  {material.density.toFixed(3)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Density
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono text-gray-900 dark:text-white">
                  {material.expansion.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Expansion
                </div>
              </div>
              {material.tensileStrength && (
                <div className="text-center">
                  <div className="text-lg font-mono text-gray-900 dark:text-white">
                    {material.tensileStrength}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Tensile (ksi)
                  </div>
                </div>
              )}
              {material.hardness && (
                <div className="text-center">
                  <div className="text-lg font-mono text-gray-900 dark:text-white">
                    {material.hardness}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Hardness (HB)
                  </div>
                </div>
              )}
            </div>

            {/* Right: Expand Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {material.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {material.description}
                </p>
              )}
              
              {material.applications && material.applications.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Applications
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {material.applications.map((app, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid view layout (original)
  return (
    <div 
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
        onSelect ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-600' : ''
      }`}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {material.name}
            </h3>
            {material.subcategory && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {material.subcategory}
              </p>
            )}
            {material.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {material.description}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(material.category)}`}>
              {material.category}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Basic Properties */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-mono text-gray-900 dark:text-white">
              {material.density.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Density (lb/in³)
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono text-gray-900 dark:text-white">
              {material.expansion.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Expansion (×10⁻⁶)
            </div>
          </div>
        </div>

        {material.tensileStrength && (
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <div className="text-lg font-mono text-gray-900 dark:text-white">
                {material.tensileStrength}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Tensile (ksi)
              </div>
            </div>
            {material.yieldStrength && (
              <div>
                <div className="text-lg font-mono text-gray-900 dark:text-white">
                  {material.yieldStrength}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Yield (ksi)
                </div>
              </div>
            )}
            {material.hardness && (
              <div>
                <div className="text-lg font-mono text-gray-900 dark:text-white">
                  {material.hardness}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Hardness (HB)
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
          {/* Applications */}
          {material.applications && material.applications.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Applications
              </h4>
              <div className="flex flex-wrap gap-1">
                {material.applications.map((app, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Properties with Citations */}
          {showCitations && material.properties && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Detailed Properties
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {material.properties.density && (
                  <MaterialPropertyCard
                    property="Density"
                    value={material.properties.density.value}
                    unit={material.properties.density.unit}
                    range={material.properties.density.range}
                    citation={material.properties.density.citation}
                  />
                )}
                {material.properties.expansion && (
                  <MaterialPropertyCard
                    property="Thermal Expansion"
                    value={material.properties.expansion.value}
                    unit={material.properties.expansion.unit}
                    range={material.properties.expansion.range}
                    citation={material.properties.expansion.citation}
                  />
                )}
                {material.properties.tensileStrength && (
                  <MaterialPropertyCard
                    property="Tensile Strength"
                    value={material.properties.tensileStrength.value}
                    unit={material.properties.tensileStrength.unit}
                    range={material.properties.tensileStrength.range}
                    citation={material.properties.tensileStrength.citation}
                  />
                )}
                {material.properties.yieldStrength && (
                  <MaterialPropertyCard
                    property="Yield Strength"
                    value={material.properties.yieldStrength.value}
                    unit={material.properties.yieldStrength.unit}
                    range={material.properties.yieldStrength.range}
                    citation={material.properties.yieldStrength.citation}
                  />
                )}
                {material.properties.hardness && (
                  <MaterialPropertyCard
                    property="Hardness"
                    value={material.properties.hardness.value}
                    unit={material.properties.hardness.unit}
                    range={material.properties.hardness.range}
                    citation={material.properties.hardness.citation}
                  />
                )}
              </div>
            </div>
          )}

          {/* Mini Charts */}
          {showCharts && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Property Comparison
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PropertyComparisonChart
                  materials={[material]}
                  property="density"
                  unit="lb/in³"
                />
                <PropertyComparisonChart
                  materials={[material]}
                  property="expansion"
                  unit="×10⁻⁶ in/in/°F"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
