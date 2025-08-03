// Analytics and tracking utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics 4 integration
export const initializeGA4 = (measurementId: string) => {
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  });
};

// Track page views
export const trackPageView = (pageName: string, additionalData?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      ...additionalData
    });
  }
};

// Track user interactions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: eventName,
      ...parameters
    });
  }
};

// Track conversions
export const trackConversion = (action: string, value?: number, currency = 'USD') => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
      value: value,
      currency: currency,
      transaction_id: `txn_${Date.now()}`
    });
  }
};

// Track model interactions
export const trackModelInteraction = (modelId: string, action: string, additionalData?: Record<string, any>) => {
  trackEvent('model_interaction', {
    model_id: modelId,
    action: action,
    ...additionalData
  });
};

// Track user registration
export const trackUserRegistration = (method: string, userType: string) => {
  trackEvent('sign_up', {
    method: method,
    user_type: userType
  });
};

// Track purchases
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items
    });
  }
};

// Track video call events
export const trackVideoCall = (action: 'start' | 'end', modelId: string, duration?: number, cost?: number) => {
  trackEvent('video_call', {
    action: action,
    model_id: modelId,
    duration: duration,
    cost: cost
  });
};

// Enhanced ecommerce tracking
export const trackEcommerce = (action: string, data: any) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      currency: 'USD',
      ...data
    });
  }
};

// User engagement tracking
export const trackEngagement = (action: string, category: string, label?: string, value?: number) => {
  trackEvent(action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value)
    });
  }
};

// Error tracking
export const trackError = (error: string, fatal = false) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'exception', {
      description: error,
      fatal: fatal
    });
  }
};