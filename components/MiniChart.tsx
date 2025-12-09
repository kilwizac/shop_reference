"use client";

import { useMemo } from "react";
import { ChartDataPoint, PropertyChartData } from "@/lib/types/material";

interface MiniChartProps {
  data: PropertyChartData;
  height?: number;
  showLegend?: boolean;
  colorByCategory?: boolean;
  type?: "line" | "bar";
  customColors?: string[];
}

export function MiniChart({ 
  data, 
  height = 120, 
  showLegend = false,
  colorByCategory = true,
  type = "line",
  customColors
}: MiniChartProps) {
  const chartData = useMemo(() => {
    if (!data.data.length) return null;

    const maxValue = Math.max(...data.data.map(d => d.value));
    // For bars, min is 0. For lines, dynamic.
    const minValue = type === "bar" ? 0 : Math.min(...data.data.map(d => d.value));
    
    // Ensure we don't divide by zero
    const range = maxValue - minValue || 1; // Fallback to 1 if flat

    return data.data.map((point, index) => ({
      ...point,
      normalizedValue: (point.value - minValue) / range,
      // Line chart x: distributed evenly. Bar chart x: distributed with gaps.
      x: type === "bar" 
         ? (index * (100 / data.data.length)) 
         : (index / (Math.max(data.data.length - 1, 1))) * 100,
      y: ((maxValue - point.value) / range) * 100, // Y is position from top (0 is top)
      barHeight: ((point.value - minValue) / range) * 100 // Height relative to 100%
    }));
  }, [data, type]);

  const getCategoryColor = (category: string) => {
    if (customColors && customColors.length > 0) {
        // If we have custom colors, cycle through them based on category index
        // We need consistent ordering of categories
        const categories = Array.from(new Set(data.data.map(d => d.category)));
        const categoryIndex = categories.indexOf(category);
        return customColors[categoryIndex % customColors.length];
    }

    const colors = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
      '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
    ];
    const categoryIndex = data.data.findIndex(d => d.category === category);
    return colors[categoryIndex % colors.length];
  };

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {data.property}
        </div>
        <div className="text-xs text-gray-500 font-mono">{data.unit}</div>
      </div>
      
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Background Tracks for Bars */}
        {type === "bar" && chartData.map((point, index) => {
           const barWidth = (100 / chartData.length) * 0.5; // 50% of slot width
           const xPos = point.x + (100 / chartData.length) * 0.25; // Center in slot
           return (
             <div 
               key={`track-${index}`}
               className="absolute bottom-0 bg-gray-100 dark:bg-gray-800 rounded-t-sm transition-all"
               style={{
                 left: `${xPos}%`,
                 width: `${barWidth}%`,
                 height: '100%'
               }}
             />
           );
        })}

        <svg
          width="100%"
          height="100%"
          className="relative z-10 overflow-visible"
        >
          {/* Axis Grid Lines */}
          <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="100%" x2="100%" y2="100%" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1" />

          {/* Axis Labels */}
          <g className="text-[10px] fill-gray-400 font-mono pointer-events-none select-none">
            <text x="-4" y="6" textAnchor="end">
              {Math.max(...data.data.map(d => d.value)).toFixed(1)}
            </text>
            <text x="-4" y="50%" textAnchor="end" dominantBaseline="middle">
              {type === "bar" 
                ? (Math.max(...data.data.map(d => d.value)) / 2).toFixed(1) 
                : ((Math.max(...data.data.map(d => d.value)) + Math.min(...data.data.map(d => d.value))) / 2).toFixed(1)
              }
            </text>
            <text x="-4" y="100%" textAnchor="end">
              {type === "bar" ? "0.0" : Math.min(...data.data.map(d => d.value)).toFixed(1)}
            </text>
          </g>

          {type === "line" ? (
            // Line Chart Visualization
            chartData.map((point, index) => {
              const color = colorByCategory ? getCategoryColor(point.category) : '#3B82F6';
              return (
                <g key={index}>
                  {index < chartData.length - 1 && (
                    <line
                      x1={`${point.x}%`}
                      y1={`${point.y}%`}
                      x2={`${chartData[index + 1].x}%`}
                      y2={`${chartData[index + 1].y}%`}
                      stroke={color}
                      strokeWidth="2"
                    />
                  )}
                  <circle
                    cx={`${point.x}%`}
                    cy={`${point.y}%`}
                    r="4"
                    fill={color}
                    stroke="white"
                    strokeWidth="1.5"
                    className="dark:stroke-gray-900"
                  />
                  <circle
                    cx={`${point.x}%`}
                    cy={`${point.y}%`}
                    r="8"
                    fill="transparent"
                    className="cursor-pointer hover:fill-black/5 dark:hover:fill-white/10 transition-colors"
                  >
                    <title>
                      {point.material}: {point.value.toFixed(2)} {data.unit}
                    </title>
                  </circle>
                </g>
              );
            })
          ) : (
            // Bar Chart Visualization
            chartData.map((point, index) => {
              const color = colorByCategory ? getCategoryColor(point.category) : '#3B82F6';
              const barWidth = (100 / chartData.length) * 0.5; // 50% of slot width
              const xPos = point.x + (100 / chartData.length) * 0.25; // Center in slot

              return (
                <g key={index}>
                  <rect
                    x={`${xPos}%`}
                    y={`${100 - point.barHeight}%`}
                    width={`${barWidth}%`}
                    height={`${point.barHeight}%`}
                    fill={color}
                    className="hover:opacity-90 transition-opacity cursor-pointer"
                    rx="2"
                  >
                    <title>
                      {point.material}: {point.value.toFixed(2)} {data.unit}
                    </title>
                  </rect>
                  {/* Value Label on top of bar if it fits, or above */}
                  <text
                    x={`${xPos + barWidth / 2}%`}
                    y={`${100 - point.barHeight - 8}%`}
                    textAnchor="middle"
                    className="text-[10px] fill-gray-700 dark:fill-gray-300 font-bold"
                  >
                    {point.value.toFixed(1)}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>

      {showLegend && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 justify-center">
          {Array.from(new Set(data.data.map(d => d.category))).map(category => (
            <div key={category} className="flex items-center space-x-2">
              <div 
                className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-900" 
                style={{ backgroundColor: getCategoryColor(category), '--tw-ring-color': getCategoryColor(category) } as any}
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type MaterialPropertyKey = 'density' | 'expansion' | 'thermalExpansion' | 'tensileStrength' | 'yieldStrength' | 'hardness';

interface MaterialForChart {
  name: string;
  category: string;
  density?: number;
  expansion?: number;
  thermalExpansion?: number;
  tensileStrength?: number;
  yieldStrength?: number;
  hardness?: number;
}

interface PropertyComparisonChartProps {
  materials: MaterialForChart[];
  property: MaterialPropertyKey;
  unit: string;
  customColors?: string[];
}

export function PropertyComparisonChart({ materials, property, unit, customColors }: PropertyComparisonChartProps) {
  const chartData: PropertyChartData = {
    property,
    unit,
    data: materials
      .filter(m => m[property] !== undefined)
      .map(m => ({
        material: m.name,
        value: m[property] as number,
        category: m.category
      }))
      // Don't sort for bar charts in comparison view to keep A/B order if desired,
      // but sorting usually helps reading. For direct compare A vs B, preserving order might be better.
      // Let's remove sort if length is 2 to preserve "Material 1" on left "Material 2" on right.
      .sort((a, b) => {
         if (materials.length === 2) return 0; 
         return a.value - b.value;
      })
  };

  // Use bar chart if we are comparing a small number of items (e.g. < 10)
  const chartType = chartData.data.length <= 10 ? "bar" : "line";

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm h-full flex flex-col">
      <MiniChart 
        data={chartData} 
        height={180} 
        showLegend={true} 
        type={chartType} 
        customColors={customColors}
      />
    </div>
  );
}
