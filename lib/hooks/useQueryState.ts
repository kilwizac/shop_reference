"use client";

import { useCallback, useEffect, useState } from "react";

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
export function useQueryState<T extends Record<string, any>>(
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
        // Try to preserve type
        if (typeof value === "number") {
          urlState[key as keyof T] = Number(paramValue) as any;
        } else if (typeof value === "boolean") {
          urlState[key as keyof T] = (paramValue === "true") as any;
        } else {
          urlState[key as keyof T] = paramValue as any;
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
export function useQueryStateWithStorage<T extends Record<string, any>>(
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

