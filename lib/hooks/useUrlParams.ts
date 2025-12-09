"use client";

import { useCallback, useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { SerializableState, SerializableValue } from '../types/state';

const isObjectLike = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isSerializableValue = (value: unknown): value is SerializableValue =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean' ||
  value === null ||
  (Array.isArray(value) && value.every(isSerializableValue)) ||
  (isObjectLike(value) && Object.values(value).every(isSerializableValue));

const coerceValueToTemplate = (
  rawValue: string,
  template: SerializableValue | undefined
): SerializableValue | undefined => {
  const decodedValue = decodeURIComponent(rawValue);

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
    // Fallback to primitive coercion
  }

  if (template === undefined) return undefined;
  if (template === null) return null;

  if (typeof template === 'number') {
    const parsedNumber = Number(decodedValue);
    return Number.isFinite(parsedNumber) ? parsedNumber : undefined;
  }

  if (typeof template === 'boolean') {
    return decodedValue === 'true';
  }

  if (typeof template === 'string') {
    return decodedValue;
  }

  return undefined;
};

/**
 * Hook for encoding/decoding calculator state to/from URL query parameters
 * Enables shareable links for calculators
 */
export function useUrlParams<T extends SerializableState>(
  initialState: T,
  namespace: string = 'calc'
) {
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Only use useSearchParams on the client side
  let searchParams: URLSearchParams | null = null;
  try {
    searchParams = useSearchParams();
  } catch (error) {
    // Handle the case where useSearchParams is called during SSR
    searchParams = null;
  }
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Decode state from URL params on mount
  const getStateFromUrl = useCallback((): Partial<T> => {
    const state: Partial<T> = {};
    
    if (!searchParams || !isClient) {
      return state;
    }
    
    for (const [key, value] of searchParams.entries()) {
      if (!key.startsWith(`${namespace}_`)) continue;

      const stateKey = key.replace(`${namespace}_`, '') as keyof T;
      
      // Only accept keys that exist in initialState to prevent injection
      if (!(stateKey in initialState)) {
        continue;
      }
      
      const parsedValue = coerceValueToTemplate(value, initialState[stateKey]);
      if (parsedValue !== undefined) {
        state[stateKey] = parsedValue as T[keyof T];
      }
    }
    
    return state;
  }, [searchParams, namespace, isClient, initialState]);

  // Encode state to URL params
  const updateUrl = useCallback((state: Partial<T>) => {
    if (!searchParams || !isClient) {
      return;
    }
    
    const params = new URLSearchParams(searchParams);
    
    // Remove all existing params for this namespace
    Array.from(params.keys()).forEach(key => {
      if (key.startsWith(`${namespace}_`)) {
        params.delete(key);
      }
    });
    
    // Add new params
    Object.entries(state).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        const paramKey = `${namespace}_${key}`;
        const encodedValue = typeof value === 'object' 
          ? JSON.stringify(value)
          : String(value);
        params.set(paramKey, encodeURIComponent(encodedValue));
      }
    });
    
    // Update URL without navigation
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [pathname, router, searchParams, namespace, isClient]);

  // Get shareable URL
  const getShareableUrl = useCallback((state: Partial<T>): string => {
    const params = new URLSearchParams();
    
    Object.entries(state).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        const paramKey = `${namespace}_${key}`;
        const encodedValue = typeof value === 'object' 
          ? JSON.stringify(value)
          : String(value);
        params.set(paramKey, encodeURIComponent(encodedValue));
      }
    });
    
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${pathname}`
      : pathname;
    
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  }, [pathname, namespace]);

  return {
    getStateFromUrl,
    updateUrl,
    getShareableUrl,
    isInitialized,
    setIsInitialized
  };
}

