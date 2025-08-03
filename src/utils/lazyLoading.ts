// Advanced lazy loading utilities for better performance

import { lazy, ComponentType } from 'react';

// Dynamic import with retry mechanism
const dynamicImport = <T = any>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  retries: number = 3
): Promise<{ default: ComponentType<T> }> => {
  return new Promise((resolve, reject) => {
    importFunc()
      .then(resolve)
      .catch((error) => {
        console.error('Dynamic import failed:', error);
        if (retries > 0) {
          // Retry after a delay
          setTimeout(() => {
            dynamicImport(importFunc, retries - 1).then(resolve).catch(reject);
          }, 1000);
        } else {
          reject(error);
        }
      });
  });
};

// Preload component for better UX
export const preloadComponent = (importFunc: () => Promise<any>) => {
  const componentImport = importFunc();
  return componentImport;
};

// Lazy load with preloading
export const lazyWithPreload = <T = any>(
  importFunc: () => Promise<{ default: ComponentType<T> }>
) => {
  const LazyComponent = lazy(() => dynamicImport(importFunc));
  
  // Add preload method
  (LazyComponent as any).preload = () => preloadComponent(importFunc);
  
  return LazyComponent;
};

// Critical components (loaded immediately)
export const CriticalComponents = {
  LandingPage: lazyWithPreload(() => import('../components/LandingPage').then(module => ({ default: module.LandingPage }))),
  EnhancedLoginPage: lazyWithPreload(() => import('../components/EnhancedLoginPage').then(module => ({ default: module.EnhancedLoginPage }))),
  EnhancedHomePage: lazyWithPreload(() => import('../components/EnhancedHomePage').then(module => ({ default: module.EnhancedHomePage })))
};

// Non-critical components (loaded on demand)
export const LazyComponents = {
  ModelProfile: lazyWithPreload(() => import('../components/ModelProfile').then(module => ({ default: module.ModelProfile }))),
  EnhancedVideoCall: lazyWithPreload(() => import('../components/EnhancedVideoCall').then(module => ({ default: module.EnhancedVideoCall }))),
  EnhancedCoinStore: lazyWithPreload(() => import('../components/EnhancedCoinStore').then(module => ({ default: module.EnhancedCoinStore }))),
  Dashboard: lazyWithPreload(() => import('../components/Dashboard').then(module => ({ default: module.Dashboard }))),
  ModelApplication: lazyWithPreload(() => import('../components/ModelApplication').then(module => ({ default: module.ModelApplication }))),
  ModelDashboard: lazyWithPreload(() => import('../components/ModelDashboard').then(module => ({ default: module.ModelDashboard }))),
  ProfileSettings: lazyWithPreload(() => import('../components/ProfileSettings').then(module => ({ default: module.ProfileSettings }))),
  AdminDashboard: lazyWithPreload(() => import('../components/AdminDashboard').then(module => ({ default: module.AdminDashboard }))),
  SecurityCenter: lazyWithPreload(() => import('../components/SecurityCenter').then(module => ({ default: module.SecurityCenter }))),
  PaymentSystem: lazyWithPreload(() => import('../components/PaymentSystem').then(module => ({ default: module.PaymentSystem }))),
  SupportCenter: lazyWithPreload(() => import('../components/SupportCenter').then(module => ({ default: module.SupportCenter }))),
  VerificationSystem: lazyWithPreload(() => import('../components/VerificationSystem').then(module => ({ default: module.VerificationSystem }))),
  WelcomeSystem: lazyWithPreload(() => import('../components/WelcomeSystem').then(module => ({ default: module.WelcomeSystem }))),
  UserOnboarding: lazyWithPreload(() => import('../components/UserOnboarding').then(module => ({ default: module.UserOnboarding })))
};

// Preload critical routes based on user behavior
export const preloadCriticalRoutes = () => {
  // Preload login page after 2 seconds on landing
  setTimeout(() => {
    CriticalComponents.EnhancedLoginPage.preload();
  }, 2000);
  
  // Preload home page after login page is loaded
  setTimeout(() => {
    CriticalComponents.EnhancedHomePage.preload();
  }, 4000);
};

// Intersection Observer for lazy loading
export const createLazyObserver = (callback: () => void, threshold = 0.1) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    },
    { threshold, rootMargin: '50px' }
  );
};

// Resource hints for better loading
export const addResourceHints = () => {
  const head = document.head;
  
  // Preconnect to external domains
  const preconnectDomains = [
    'https://images.pexels.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    if (domain.includes('gstatic')) {
      link.crossOrigin = 'anonymous';
    }
    head.appendChild(link);
  });
  
  // DNS prefetch for faster lookups
  const dnsPrefetchDomains = [
    '//www.google-analytics.com',
    '//www.googletagmanager.com'
  ];
  
  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    head.appendChild(link);
  });
};