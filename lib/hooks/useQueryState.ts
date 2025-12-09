"use client";

import { useCallback, useEffect, useState } from "react";
import type { SerializableState, SerializableValue } from "../types/state";

const isObjectLike = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isSerializableValue = (value: unknown): value is SerializableValue =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean" ||
  value === null ||
  (Array.isArray(value) && value.every(isSerializableValue)) ||
  (isObjectLike(value) && Object.values(value).every(isSerializableValue));

const coerceParamValue = (
  paramValue: string,
  template: SerializableValue | undefined
): SerializableValue | undefined => {
  const decodedValue = decodeURIComponent(paramValue);

  const matchesTemplate = (candidate: unknown): candidate is SerializableValue => {
    if (!isSerializableValue(candidate)) return false;
    if (template === null) return candidate === null;
    if (template === undefined) return false;
    if (Array.isArray(template)) return Array.isArray(candidate);
    if (isObjectLike(template)) return isObjectLike(candidate);
    return typeof candidate === typeof template;
  };

  try {
    const parsed = JSON.parse(decodedValue) as unknown;
    if (matchesTemplate(parsed)) {
      return parsed;
    }
  } catch {
    // Fall back to primitive coercion
  }

  if (template === undefined) return undefined;
  if (template === null) return null;

  if (typeof template === "number") {
    const parsedNumber = Number(decodedValue);
    return Number.isFinite(parsedNumber) ? parsedNumber : undefined;
  }

  if (typeof template === "boolean") {
    return decodedValue === "true";
  }

  if (typeof template === "string") {
    return decodedValue;
  }

  return undefined;
};

/**
 * Custom hook to sync form state with URL query parameters
 * 
 * @param initialState - Initial state object
 * @param prefix - URL parameter prefix to avoid collisions (e.g., 'mc' for material calculator)
 * @returns { state, updateState, isInitialized, getShareableUrl }
 * 
 * @example
 * const { state, updateState, getShareableUrl } = useQueryState(
 *   { diameter: '', length: '' },
 *   'calc'
 * );
 */
export function useQueryState<T extends SerializableState>(
  initialState: T,
  prefix: string = ""
) {
  const [state, setState] = useState<T>(initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Update state and sync to URL
   */
  const updateState = useCallback((updates: Partial<T>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  /**
   * Get state from URL query parameters
   */
  const getStateFromUrl = useCallback((): Partial<T> => {
    if (typeof window === "undefined") return {};

    const params = new URLSearchParams(window.location.search);
    const urlState: Partial<T> = {};

    for (const [key, value] of Object.entries(initialState)) {
      const paramKey = prefix ? `${prefix}_${key}` : key;
      const paramValue = params.get(paramKey);

      if (paramValue !== null) {
        const parsedValue = coerceParamValue(paramValue, value as SerializableValue);
        if (parsedValue !== undefined) {
          urlState[key as keyof T] = parsedValue as T[keyof T];
        }
      }
    }

    return urlState;
  }, [initialState, prefix]);

  /**
   * Update URL query parameters from state
   */
  const updateUrl = useCallback(
    (currentState: T) => {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);

      // Update or remove parameters based on state
      for (const [key, value] of Object.entries(currentState)) {
        const paramKey = prefix ? `${prefix}_${key}` : key;

        // Only add non-empty values to URL
        if (value !== "" && value !== null && value !== undefined) {
          params.set(paramKey, String(value));
        } else {
          params.delete(paramKey);
        }
      }

      // Update URL without page reload
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, "", newUrl);
    },
    [prefix]
  );

  /**
   * Get a shareable URL with current state
   */
  const getShareableUrl = useCallback(
    (currentState: T): string => {
      if (typeof window === "undefined") return "";

      const params = new URLSearchParams();

      // Add all non-empty state values
      for (const [key, value] of Object.entries(currentState)) {
        if (value !== "" && value !== null && value !== undefined) {
          const paramKey = prefix ? `${prefix}_${key}` : key;
          params.set(paramKey, String(value));
        }
      }

      const queryString = params.toString();
      return queryString
        ? `${window.location.origin}${window.location.pathname}?${queryString}`
        : `${window.location.origin}${window.location.pathname}`;
    },
    [prefix]
  );

  /**
   * Initialize state from URL on mount
   */
  useEffect(() => {
    if (!isInitialized) {
      const urlState = getStateFromUrl();
      if (Object.keys(urlState).length > 0) {
        setState((prev) => ({ ...prev, ...urlState }));
      }
      setIsInitialized(true);
    }
  }, [isInitialized, getStateFromUrl]);

  /**
   * Sync state changes to URL (after initialization)
   */
  useEffect(() => {
    if (isInitialized) {
      updateUrl(state);
    }
  }, [state, isInitialized, updateUrl]);

  return {
    state,
    updateState,
    isInitialized,
    getStateFromUrl,
    getShareableUrl,
    setIsInitialized,
  };
}

/**
 * Simpler version that combines useQueryState with localStorage
 * This is compatible with the existing useNamespacedStorage pattern
 * 
 * @example
 * const { state, updateState, isHydrated, getShareableUrl } = useQueryStateWithStorage(
 *   'myCalc_prefs',
 *   { diameter: '', length: '' },
 *   'calc'
 * );
 */
export function useQueryStateWithStorage<T extends SerializableState>(
  storageKey: string,
  initialState: T,
  urlPrefix: string = ""
) {
  const [state, setState] = useState<T>(initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isUrlInitialized, setIsUrlInitialized] = useState(false);

  const queryState = useQueryState(initialState, urlPrefix);

  /**
   * Update both state and localStorage
   */
  const updateState = useCallback(
    (updates: Partial<T>) => {
      setState((prev) => {
        const newState = { ...prev, ...updates };
        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, JSON.stringify(newState));
        }
        return newState;
      });
      queryState.updateState(updates);
    },
    [storageKey, queryState]
  );

  /**
   * Initialize from localStorage and URL
   */
  useEffect(() => {
    if (typeof window !== "undefined" && !isHydrated) {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsedState = JSON.parse(stored);
          setState(parsedState);
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
      setIsHydrated(true);
    }
  }, [storageKey, isHydrated]);

  /**
   * Load URL params after hydration
   */
  useEffect(() => {
    if (isHydrated && !isUrlInitialized) {
      const urlState = queryState.getStateFromUrl();
      if (Object.keys(urlState).length > 0) {
        setState((prev) => ({ ...prev, ...urlState }));
      }
      setIsUrlInitialized(true);
    }
  }, [isHydrated, isUrlInitialized, queryState]);

  return {
    state,
    updateState,
    isHydrated,
    isUrlInitialized,
    getShareableUrl: () => queryState.getShareableUrl(state),
  };
}

