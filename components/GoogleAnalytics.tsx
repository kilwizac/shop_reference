'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/analytics';

/**
 * Google Analytics component that tracks page views on route changes
 * This component should be included in the root layout to track all navigation
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) return;

    // Construct the full URL with search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Track the page view
    pageview(url);
  }, [pathname, searchParams, gaId]);

  return null;
}
