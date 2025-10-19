"use client";

import { useMemo } from "react";
import { ChartDataPoint, PropertyChartData } from "@/lib/types/material";

interface MiniChartProps {
  data: PropertyChartData;
  height?: number;
  showLegend?: boolean;
  colorByCategory?: boolean;
}

export function MiniChart({ 
  data, 
  height = 120, 
  showLegend = false,
  colorByCategory = true 
}: MiniChartProps) {
  const chartData = useMemo(() => {
    if (!data.data.length) return null;

    const maxValue = Math.max(...data.data.map(d => d.value));
    const minValue = Math.min(...data.data.map(d => d.value));
    const range = maxValue - minValue;

    return data.data.map((point, index) => ({
      ...point,
      normalizedValue: range > 0 ? (point.value - minValue) / range : 0.5,
      x: (index / (data.data.length - 1)) * 100,
      y: range > 0 ? ((maxValue - point.value) / range) * 100 : 50
    }));
  }, [data]);

  const getCategoryColor = (category: string) => {
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
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {data.property} ({data.unit})
      </div>
      
      <div className="relative" style={{ height: `${height}px` }}>
        <svg
          width="100%"
          height="100%"
          className="border border-gray-200 dark:border-gray-700 rounded"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Y-axis labels */}
          <g className="text-xs fill-gray-500 dark:fill-gray-400">
            <text x="5" y="15" textAnchor="start">
              {Math.max(...data.data.map(d => d.value)).toFixed(1)}
            </text>
            <text x="5" y="50%" textAnchor="start" dominantBaseline="middle">
              {((Math.max(...data.data.map(d => d.value)) + Math.min(...data.data.map(d => d.value))) / 2).toFixed(1)}
            </text>
            <text x="5" y="95%" textAnchor="start">
              {Math.min(...data.data.map(d => d.value)).toFixed(1)}
            </text>
          </g>

          {/* Data points and lines */}
          {chartData.map((point, index) => {
            const color = colorByCategory ? getCategoryColor(point.category) : '#3B82F6';
            
            return (
              <g key={index}>
                {/* Line to next point */}
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
                
                {/* Data point */}
                <circle
                  cx={`${point.x}%`}
                  cy={`${point.y}%`}
                  r="4"
                  fill={color}
                  stroke="white"
                  strokeWidth="1"
                />
                
                {/* Tooltip on hover */}
                <circle
                  cx={`${point.x}%`}
                  cy={`${point.y}%`}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer hover:fill-blue-100 dark:hover:fill-blue-900"
                >
                  <title>
                    {point.material}: {point.value.toFixed(2)} {data.unit}
                  </title>
                </circle>
              </g>
            );
          })}
        </svg>
      </div>

      {showLegend && (
        <div className="mt-2 flex flex-wrap gap-2">
          {Array.from(new Set(data.data.map(d => d.category))).map(category => (
            <div key={category} className="flex items-center space-x-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getCategoryColor(category) }}
              />
              <span className="text-xs text-gray-600 dark:text-gray-400">{category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface PropertyComparisonChartProps {
  materials: Array<{
    name: string;
    category: string;
    [key: string]: any;
  }>;
  property: string;
  unit: string;
}

export function PropertyComparisonChart({ materials, property, unit }: PropertyComparisonChartProps) {
  const chartData: PropertyChartData = {
    property,
    unit,
    data: materials
      .filter(m => m[property] !== undefined)
      .map(m => ({
        material: m.name,
        value: m[property],
        category: m.category
      }))
      .sort((a, b) => a.value - b.value)
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <MiniChart data={chartData} height={150} showLegend={true} />
    </div>
  );
}
