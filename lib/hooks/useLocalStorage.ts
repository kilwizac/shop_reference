"use client";

import { useCallback, useEffect, useState } from 'react';
import type { SerializableState } from '../types/state';

/**
 * Hook for persisting state to localStorage
 * Automatically saves and restores state across sessions
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}"`, error);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}"`, error);
    }
  }, [key, storedValue]);

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}"`, error);
    }
  }, [key, initialValue]);

  return { 
    value: storedValue, 
    setValue, 
    removeValue,
    isHydrated 
  } as const;
}

/**
 * Hook for persisting multiple related values with a namespace
 */
export function useNamespacedStorage<T extends SerializableState>(
  namespace: string,
  initialState: T
) {
  const { value, setValue, isHydrated } = useLocalStorage(namespace, initialState);

  const updateValue = useCallback((updates: Partial<T>) => {
    setValue((prev) => ({ ...prev, ...updates }));
  }, [setValue]);

  return {
    state: value,
    updateState: updateValue,
    setState: setValue,
    isHydrated
  } as const;
}

