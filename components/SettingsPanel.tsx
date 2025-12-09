"use client";

import { useState } from 'react';
import { useAppSettings, type PrecisionLevel, type UnitSystem } from '@/lib/contexts/AppSettingsContext';

interface SettingsPanelProps {
  className?: string;
}

export function SettingsPanel({ className = "" }: SettingsPanelProps) {
  const { settings, updateSettings } = useAppSettings();
  const [isOpen, setIsOpen] = useState(false);

  const precisionOptions: { value: PrecisionLevel; label: string; description: string }[] = [
    { value: 2, label: "2 decimals", description: "0.12" },
    { value: 3, label: "3 decimals", description: "0.123" },
    { value: 4, label: "4 decimals", description: "0.1234" },
    { value: 5, label: "5 decimals", description: "0.12345" },
    { value: 6, label: "6 decimals", description: "0.123456" },
  ];

  const altPrecisionOptions: { value: PrecisionLevel; label: string; description: string }[] = [
    { value: 2, label: "2 decimals", description: "0.12" },
    { value: 3, label: "3 decimals", description: "0.123" },
    { value: 4, label: "4 decimals", description: "0.1234" },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        title="Settings"
      >
        <span>⚙️</span>
        <span>Settings</span>
        <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-black border border-gray-300 dark:border-gray-700 shadow-lg z-[var(--z-dropdown)]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400">
                DISPLAY SETTINGS
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* Unit System */}
            <div className="mb-4">
              <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                UNIT SYSTEM
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSettings({ unitSystem: 'imperial' })}
                  className={`flex-1 px-3 py-1.5 text-xs border transition-colors ${
                    settings.unitSystem === 'imperial'
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Imperial
                </button>
                <button
                  onClick={() => updateSettings({ unitSystem: 'metric' })}
                  className={`flex-1 px-3 py-1.5 text-xs border transition-colors ${
                    settings.unitSystem === 'metric'
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Metric
                </button>
              </div>
            </div>

            {/* Primary Precision */}
            <div className="mb-4">
              <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                PRIMARY PRECISION
              </label>
              <div className="grid grid-cols-2 gap-2">
                {precisionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateSettings({ precision: option.value })}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      settings.precision === option.value
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    title={option.description}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Alternative Units */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={settings.showAltUnits}
                  onChange={(e) => updateSettings({ showAltUnits: e.target.checked })}
                  className="w-3 h-3"
                />
                SHOW ALTERNATIVE UNITS
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Display both imperial and metric values
              </p>
            </div>

            {/* Alternative Precision */}
            {settings.showAltUnits && (
              <div className="mb-4">
                <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                  ALTERNATIVE PRECISION
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {altPrecisionOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateSettings({ altUnitPrecision: option.value })}
                      className={`px-3 py-1.5 text-xs border transition-colors ${
                        settings.altUnitPrecision === option.value
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      title={option.description}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Preview */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">PREVIEW:</div>
              <div className="text-sm font-mono">
                <div className="mb-1">
                  Primary: <span className="text-black dark:text-white">1.234</span> {settings.unitSystem === 'imperial' ? 'in' : 'mm'}
                </div>
                {settings.showAltUnits && (
                  <div className="text-gray-500 dark:text-gray-400">
                    Alt: <span className="text-gray-600 dark:text-gray-300">31.35</span> {settings.unitSystem === 'imperial' ? 'mm' : 'in'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


