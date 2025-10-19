"use client";

import { useCallback, useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * Hook for encoding/decoding calculator state to/from URL query parameters
 * Enables shareable links for calculators
 */
export function useUrlParams<T extends Record<string, any>>(
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
      if (key.startsWith(`${namespace}_`)) {
        const stateKey = key.replace(`${namespace}_`, '') as keyof T;
        try {
          // Try to parse as JSON first (for complex values)
          state[stateKey] = JSON.parse(decodeURIComponent(value)) as T[keyof T];
        } catch {
          // If not JSON, use as string
          state[stateKey] = decodeURIComponent(value) as T[keyof T];
        }
      }
    }
    
    return state;
  }, [searchParams, namespace, isClient]);

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
        const paramValue = typeof value === 'object' 
          ? encodeURIComponent(JSON.stringify(value))
          : encodeURIComponent(String(value));
        params.set(paramKey, paramValue);
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
        const paramValue = typeof value === 'object' 
          ? encodeURIComponent(JSON.stringify(value))
          : encodeURIComponent(String(value));
        params.set(paramKey, paramValue);
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

