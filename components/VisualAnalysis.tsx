"use client";

import { useState } from "react";
import { EnhancedMaterial } from "@/lib/types/material";

interface VisualAnalysisProps {
  material1: EnhancedMaterial;
  material2: EnhancedMaterial;
}

const normalize = (val: number, max: number) => (max > 0 ? val / max : 0);

export function VisualAnalysis({ material1, material2 }: VisualAnalysisProps) {
  const [activeView, setActiveView] = useState<"radar" | "relative">("radar");

  const properties = [
    { key: 'density', label: 'Density', unit: 'lb/in3' },
    { key: 'tensileStrength', label: 'Tensile', unit: 'ksi' },
    { key: 'yieldStrength', label: 'Yield', unit: 'ksi' },
    { key: 'hardness', label: 'Hardness', unit: 'HB' },
    { key: 'expansion', label: 'Expansion', unit: 'x10-6' },
  ] as const;

  const radarPoints = properties.map((prop, i) => {
    const val1 = material1[prop.key as keyof EnhancedMaterial] as number || 0;
    const val2 = material2[prop.key as keyof EnhancedMaterial] as number || 0;
    const max = Math.max(val1, val2) * 1.1;

    return {
      label: prop.label,
      val1,
      val2,
      norm1: normalize(val1, max),
      norm2: normalize(val2, max),
      angle: (i * 360) / properties.length
    };
  });

  const polarToCartesian = (angleDeg: number, radius: number) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: 100 + radius * 80 * Math.cos(angleRad),
      y: 100 + radius * 80 * Math.sin(angleRad)
    };
  };

  const path1 = radarPoints.map(p => {
    const pos = polarToCartesian(p.angle, p.norm1);
    return `${pos.x},${pos.y}`;
  }).join(" ");

  const path2 = radarPoints.map(p => {
    const pos = polarToCartesian(p.angle, p.norm2);
    return `${pos.x},${pos.y}`;
  }).join(" ");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white">Visual Analysis</h3>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveView("radar")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeView === "radar" ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"}`}
          >
            Radar
          </button>
          <button
            onClick={() => setActiveView("relative")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeView === "relative" ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"}`}
          >
            Relative
          </button>
        </div>
      </div>

      <div className="min-h-[300px] flex items-center justify-center">
        {activeView === "radar" ? (
          <div className="w-full max-w-sm relative">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                <polygon
                  key={i}
                  points={radarPoints.map(p => {
                    const pos = polarToCartesian(p.angle, r);
                    return `${pos.x},${pos.y}`;
                  }).join(" ")}
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-800"
                  strokeWidth="1"
                />
              ))}

              {radarPoints.map((p, i) => {
                const pos = polarToCartesian(p.angle, 1);
                return (
                  <g key={i}>
                    <line
                      x1="100"
                      y1="100"
                      x2={pos.x}
                      y2={pos.y}
                      stroke="currentColor"
                      className="text-gray-200 dark:text-gray-800"
                      strokeWidth="1"
                    />
                    <text
                      x={pos.x}
                      y={pos.y}
                      dx={pos.x > 100 ? 10 : -10}
                      dy={pos.y > 100 ? 10 : -10}
                      textAnchor={pos.x > 100 ? "start" : "end"}
                      dominantBaseline="middle"
                      className="text-[10px] fill-gray-500 dark:fill-gray-400 font-medium uppercase tracking-wider"
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}

              <polygon points={path1} className="fill-teal-500/20 stroke-teal-500" strokeWidth="2" />
              <polygon points={path2} className="fill-indigo-500/20 stroke-indigo-500" strokeWidth="2" />

              {radarPoints.map((p, i) => {
                const pos1 = polarToCartesian(p.angle, p.norm1);
                const pos2 = polarToCartesian(p.angle, p.norm2);
                return (
                  <g key={i}>
                    <circle cx={pos1.x} cy={pos1.y} r="3" className="fill-teal-500" />
                    <circle cx={pos2.x} cy={pos2.y} r="3" className="fill-indigo-500" />
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[100px]">{material1.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[100px]">{material2.name}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6">
            {properties.map((prop) => {
              const val1 = material1[prop.key as keyof EnhancedMaterial] as number;
              const val2 = material2[prop.key as keyof EnhancedMaterial] as number;
              
              if (val1 === undefined || val2 === undefined) return null;

              const total = val1 + val2;
              const pct1 = (val1 / total) * 100;
              const pct2 = (val2 / total) * 100;

              return (
                <div key={prop.key}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-mono font-medium text-teal-600 dark:text-teal-400">{val1}</span>
                    <span className="font-medium text-gray-500">{prop.label} ({prop.unit})</span>
                    <span className="font-mono font-medium text-indigo-600 dark:text-indigo-400">{val2}</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                    <div style={{ width: `${pct1}%` }} className="h-full bg-teal-500 transition-all duration-500"></div>
                    <div className="w-0.5 h-full bg-white dark:bg-black"></div>
                    <div style={{ width: `${pct2}%` }} className="h-full bg-indigo-500 transition-all duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
