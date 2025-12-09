export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
}

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackCalculatorUsage = (calculatorName: string, action: string) => {
  event({
    action: action,
    category: 'Calculator',
    label: calculatorName,
  });
};

export const trackSearch = (query: string, results: number) => {
  event({
    action: 'search',
    category: 'Search',
    label: query,
    value: results,
  });
};

export const trackWebVitals = (metric: WebVitalsMetric) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
};

type GtagEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  page_path?: string;
  non_interaction?: boolean;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetIdOrEventName: string,
      params?: GtagEventParams
    ) => void;
  }
}
