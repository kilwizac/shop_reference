"use client";

import { useState, useEffect } from "react";
import { MaterialFilter, MaterialCategory } from "@/lib/types/material";
import materialsData from "@/data/materials.json";

interface MaterialFiltersProps {
  onFilterChange: (filters: MaterialFilter) => void;
  categories: MaterialCategory[];
  currentFilters?: MaterialFilter;
}

export function MaterialFilters({ onFilterChange, categories, currentFilters }: MaterialFiltersProps) {
  const [filters, setFilters] = useState<MaterialFilter>(currentFilters || {});
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  const getPropertyRanges = () => {
    const materials = Object.values(materialsData);
    return {
      density: {
        min: Math.min(...materials.map(m => m.density)),
        max: Math.max(...materials.map(m => m.density)),
        step: 0.001
      },
      expansion: {
        min: Math.min(...materials.map(m => m.expansion)),
        max: Math.max(...materials.map(m => m.expansion)),
        step: 0.1
      },
      tensileStrength: {
        min: Math.min(...materials.filter(m => m.tensileStrength).map(m => m.tensileStrength!)),
        max: Math.max(...materials.filter(m => m.tensileStrength).map(m => m.tensileStrength!)),
        step: 1
      },
      yieldStrength: {
        min: Math.min(...materials.filter(m => m.yieldStrength).map(m => m.yieldStrength!)),
        max: Math.max(...materials.filter(m => m.yieldStrength).map(m => m.yieldStrength!)),
        step: 1
      },
      hardness: {
        min: Math.min(...materials.filter(m => m.hardness).map(m => m.hardness!)),
        max: Math.max(...materials.filter(m => m.hardness).map(m => m.hardness!)),
        step: 5
      }
    };
  };

  const propertyRanges = getPropertyRanges();

  const updateFilter = (key: keyof MaterialFilter, value: MaterialFilter[keyof MaterialFilter]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const RangeSlider = ({ 
    label, 
    property, 
    range, 
    unit 
  }: { 
    label: string; 
    property: keyof MaterialFilter; 
    range: { min: number; max: number; step: number }; 
    unit: string;
  }) => {
    const currentRange = filters[property] as [number, number] || [range.min, range.max];
    
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} ({unit})
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={currentRange[0]}
            onChange={(e) => updateFilter(property, [parseFloat(e.target.value), currentRange[1]])}
            min={range.min}
            max={range.max}
            step={range.step}
            className="w-20 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            value={currentRange[1]}
            onChange={(e) => updateFilter(property, [currentRange[0], parseFloat(e.target.value)])}
            min={range.min}
            max={range.max}
            step={range.step}
            className="w-20 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min={range.min}
            max={range.max}
            step={range.step}
            value={currentRange[0]}
            onChange={(e) => updateFilter(property, [parseFloat(e.target.value), currentRange[1]])}
            className="flex-1"
          />
          <input
            type="range"
            min={range.min}
            max={range.max}
            step={range.step}
            value={currentRange[1]}
            onChange={(e) => updateFilter(property, [currentRange[0], parseFloat(e.target.value)])}
            className="flex-1"
          />
        </div>
      </div>
    );
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden sticky top-6">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-red-600 dark:text-red-400 hover:underline font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Refine your material search
        </p>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => updateFilter('category', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {filters.category && (
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Subcategory
            </label>
            <select
              value={filters.subcategory || ''}
              onChange={(e) => updateFilter('subcategory', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Subcategories</option>
              {categories.find(c => c.name === filters.category)?.subcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
        >
          <span>Advanced Filters</span>
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

        {isExpanded && (
          <div className="space-y-4 pt-4">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Property Ranges
            </div>
            
            <RangeSlider
              label="Density"
              property="densityRange"
              range={propertyRanges.density}
              unit="lb/in³"
            />
            
            <RangeSlider
              label="Thermal Expansion"
              property="expansionRange"
              range={propertyRanges.expansion}
              unit="×10⁻⁶"
            />
            
            <RangeSlider
              label="Tensile Strength"
              property="tensileStrengthRange"
              range={propertyRanges.tensileStrength}
              unit="ksi"
            />
            
            <RangeSlider
              label="Yield Strength"
              property="yieldStrengthRange"
              range={propertyRanges.yieldStrength}
              unit="ksi"
            />
            
            <RangeSlider
              label="Hardness"
              property="hardnessRange"
              range={propertyRanges.hardness}
              unit="HB"
            />
          </div>
        )}
      </div>
    </div>
  );
}
