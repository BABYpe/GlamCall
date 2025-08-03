// Web Vitals monitoring for production optimization

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  LCP: { good: 2500, poor: 4000 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
};

// Get rating based on thresholds
const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

// Send metric to analytics
const sendToAnalytics = (metric: WebVitalMetric) => {
  // Send to Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      custom_map: {
        metric_rating: metric.rating
      }
    });
  }
  
  // Send to custom analytics endpoint
  if (import.meta.env.PROD) {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric)
    }).catch(() => {
      // Ignore analytics errors
    });
  }
  
  // Log in development
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric);
  }
};

// Initialize Web Vitals monitoring
export const initializeWebVitals = () => {
  // Dynamic import to avoid blocking
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    const handleMetric = (metric: any) => {
      const webVitalMetric: WebVitalMetric = {
        name: metric.name,
        value: metric.value,
        rating: getRating(metric.name, metric.value),
        delta: metric.delta,
        id: metric.id
      };
      
      sendToAnalytics(webVitalMetric);
    };

    // Monitor all Core Web Vitals
    getCLS(handleMetric);
    getFID(handleMetric);
    getFCP(handleMetric);
    getLCP(handleMetric);
    getTTFB(handleMetric);
  }).catch(error => {
    console.warn('Failed to load web-vitals:', error);
  });
};

// Performance observer for additional metrics
export const initializePerformanceObserver = () => {
  if ('PerformanceObserver' in window) {
    // Monitor long tasks
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            sendToAnalytics({
              name: 'Long Task',
              value: entry.duration,
              rating: entry.duration > 100 ? 'poor' : 'needs-improvement',
              delta: 0,
              id: `long-task-${Date.now()}`
            });
          }
        });
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Long task observer not supported:', error);
    }

    // Monitor layout shifts
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        if (clsValue > 0) {
          sendToAnalytics({
            name: 'CLS',
            value: clsValue,
            rating: getRating('CLS', clsValue),
            delta: clsValue,
            id: `cls-${Date.now()}`
          });
        }
      });
      
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Layout shift observer not supported:', error);
    }
  }
};

// Resource timing monitoring
export const monitorResourceTiming = () => {
  window.addEventListener('load', () => {
    // Monitor resource loading performance
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    resources.forEach(resource => {
      const loadTime = resource.responseEnd - resource.requestStart;
      
      if (loadTime > 1000) { // Resources taking more than 1 second
        sendToAnalytics({
          name: 'Slow Resource',
          value: loadTime,
          rating: loadTime > 3000 ? 'poor' : 'needs-improvement',
          delta: 0,
          id: `slow-resource-${Date.now()}`
        });
      }
    });
  });
};

// Initialize all monitoring
export const initializeAllMonitoring = () => {
  initializeWebVitals();
  initializePerformanceObserver();
  monitorResourceTiming();
};