// Production monitoring and analytics
export const initializeMonitoring = () => {
  // Initialize Google Analytics 4
  if (import.meta.env.PROD && import.meta.env.VITE_GA_MEASUREMENT_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    
    gtag('js', new Date());
    gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href
    });

    // Track page views
    window.gtag = gtag;
  }

  // Error tracking
  window.addEventListener('error', (event) => {
    const errorMessage = event.error?.message || event.message || 'Unknown error';
    const errorStack = event.error?.stack || 'No stack trace available';
    
    console.error('Global error:', {
      message: errorMessage,
      stack: errorStack,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
    
    if (import.meta.env.PROD) {
      // Send to monitoring service
      trackError(errorMessage, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: errorStack
      });
    }
  });

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString?.() || String(event.reason) || 'Unknown rejection reason';
    console.error('Unhandled promise rejection:', reason);
    
    if (import.meta.env.PROD) {
      trackError('Unhandled Promise Rejection', {
        reason: reason,
        stack: event.reason?.stack
      });
    }
  });

  // Performance monitoring
  if ('PerformanceObserver' in window) {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          trackPerformance('LCP', entry.startTime);
        } else if (entry.entryType === 'first-input') {
          trackPerformance('FID', entry.processingStart - entry.startTime);
        } else if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          trackPerformance('CLS', entry.value);
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }
};

export const trackError = (message: string, details?: any) => {
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', 'exception', {
      description: message,
      fatal: false,
      ...details
    });
  }
};

export const trackPerformance = (metric: string, value: number) => {
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value)
    });
  }
};

export const trackUserAction = (action: string, category: string, label?: string) => {
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};

// Declare global gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}