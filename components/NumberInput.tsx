"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ValidationResult } from '@/lib/utils/validation';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  validation?: ValidationResult;
  className?: string;
  disabled?: boolean;
}

export function NumberInput({
  value,
  onChange,
  label,
  placeholder = "0",
  step = 0.1,
  min,
  max,
  unit,
  validation,
  className = "",
  disabled = false
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Handle arrow key increments
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentValue = Number.parseFloat(value) || 0;
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newValue = currentValue + (e.shiftKey ? step * 10 : step);
      if (max === undefined || newValue <= max) {
        onChange(newValue.toString());
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newValue = currentValue - (e.shiftKey ? step * 10 : step);
      if (min === undefined || newValue >= min) {
        onChange(newValue.toString());
      }
    }
  }, [value, step, min, max, onChange]);

  // Stepper functions
  const increment = useCallback(() => {
    const currentValue = Number.parseFloat(value) || 0;
    const newValue = currentValue + step;
    if (max === undefined || newValue <= max) {
      onChange(newValue.toString());
    }
  }, [value, step, max, onChange]);

  const decrement = useCallback(() => {
    const currentValue = Number.parseFloat(value) || 0;
    const newValue = currentValue - step;
    if (min === undefined || newValue >= min) {
      onChange(newValue.toString());
    }
  }, [value, step, min, onChange]);

  // Get validation styling
  const getInputClasses = () => {
    const baseClasses = "w-full px-3 py-2 border bg-white dark:bg-black font-mono text-lg transition-colors";
    
    if (disabled) {
      return `${baseClasses} border-gray-300 dark:border-gray-700 opacity-50 cursor-not-allowed`;
    }
    
    if (validation?.severity === 'error') {
      return `${baseClasses} border-red-500 dark:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900`;
    }
    
    if (validation?.severity === 'warning') {
      return `${baseClasses} border-yellow-500 dark:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-900`;
    }
    
    if (isFocused) {
      return `${baseClasses} border-black dark:border-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800`;
    }
    
    return `${baseClasses} border-gray-300 dark:border-gray-700`;
  };

  return (
    <div className={className}>
      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
        {label}
      </label>
      
      <div className="relative">
        {/* Input field */}
        <input
          ref={inputRef}
          type="number"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getInputClasses()}
          placeholder={placeholder}
          disabled={disabled}
        />
        
        {/* Unit suffix */}
        {unit && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 dark:text-gray-400 pointer-events-none">
            {unit}
          </div>
        )}
        
        {/* Stepper buttons */}
        {!disabled && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
            <button
              type="button"
              onClick={increment}
              className="px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-l border-gray-300 dark:border-gray-700"
              tabIndex={-1}
            >
              ▲
            </button>
            <button
              type="button"
              onClick={decrement}
              className="px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-l border-t border-gray-300 dark:border-gray-700"
              tabIndex={-1}
            >
              ▼
            </button>
          </div>
        )}
      </div>
      
      {/* Validation message */}
      {validation?.warning && (
        <div className={`mt-2 text-xs flex items-start gap-1 ${
          validation.severity === 'error' 
            ? 'text-red-600 dark:text-red-400' 
            : validation.severity === 'warning'
            ? 'text-yellow-600 dark:text-yellow-400'
            : 'text-blue-600 dark:text-blue-400'
        }`}>
          <span className="mt-0.5">
            {validation.severity === 'error' ? '⚠' : validation.severity === 'warning' ? '⚠' : 'ℹ'}
          </span>
          <span>{validation.warning}</span>
        </div>
      )}
      
      {/* Hint text for keyboard shortcuts */}
      {isFocused && !disabled && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Use ↑↓ arrows to adjust (hold Shift for ×10)
        </div>
      )}
    </div>
  );
}

