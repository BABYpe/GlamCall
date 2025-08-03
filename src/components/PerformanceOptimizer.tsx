import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

// Lazy load components for better performance
export const LazyLandingPage = lazy(() => import('./LandingPage').then(module => ({ default: module.LandingPage })));
export const LazyHomePage = lazy(() => import('./EnhancedHomePage').then(module => ({ default: module.EnhancedHomePage })));
export const LazyModelProfile = lazy(() => import('./ModelProfile').then(module => ({ default: module.ModelProfile })));
export const LazyVideoCall = lazy(() => import('./EnhancedVideoCall').then(module => ({ default: module.EnhancedVideoCall })));

// Image optimization component
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // Generate responsive image URLs
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes('pexels.com')) {
      return `
        ${baseSrc}?auto=compress&cs=tinysrgb&w=400 400w,
        ${baseSrc}?auto=compress&cs=tinysrgb&w=800 800w,
        ${baseSrc}?auto=compress&cs=tinysrgb&w=1200 1200w
      `;
    }
    return undefined;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse" />
      )}
      <img
        src={src}
        srcSet={generateSrcSet(src)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />
    </div>
  );
};

// Performance monitoring component
export const PerformanceMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }

    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      console.log(`Page load time: ${loadTime}ms`);
    });
  }, []);

  return <>{children}</>;
};

// Suspense wrapper with custom loading
export const SuspenseWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => {
  return (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      {children}
    </Suspense>
  );
};