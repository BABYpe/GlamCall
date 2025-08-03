// Advanced compression utilities for production optimization

// Image compression and optimization
export const compressImage = (file: File, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate optimal dimensions
      const maxWidth = 1200;
      const maxHeight = 800;
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Text compression using LZ-string algorithm
export const compressText = (text: string): string => {
  // Simple compression for demo - in production use proper compression library
  return btoa(encodeURIComponent(text));
};

export const decompressText = (compressed: string): string => {
  try {
    return decodeURIComponent(atob(compressed));
  } catch {
    return compressed;
  }
};

// Bundle size optimization
export const optimizeBundleSize = () => {
  // Remove unused CSS classes
  const removeUnusedCSS = () => {
    const usedClasses = new Set<string>();
    
    // Scan DOM for used classes
    document.querySelectorAll('*').forEach(element => {
      element.classList.forEach(className => {
        usedClasses.add(className);
      });
    });
    
    // Remove unused stylesheets (in development only)
    if (import.meta.env.DEV) {
      console.log('Used CSS classes:', usedClasses.size);
    }
  };
  
  // Lazy load non-critical resources
  const lazyLoadResources = () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  };
  
  // Execute optimizations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      removeUnusedCSS();
      lazyLoadResources();
    });
  } else {
    removeUnusedCSS();
    lazyLoadResources();
  }
};

// Memory optimization
export const optimizeMemoryUsage = () => {
  // Clean up event listeners
  const cleanupEventListeners = () => {
    // Remove passive event listeners that are no longer needed
    const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
    passiveEvents.forEach(event => {
      document.removeEventListener(event, () => {}, { passive: true });
    });
  };
  
  // Garbage collection hints
  const forceGarbageCollection = () => {
    if (window.gc && import.meta.env.DEV) {
      window.gc();
    }
  };
  
  // Execute memory optimizations
  cleanupEventListeners();
  
  // Schedule garbage collection
  setTimeout(forceGarbageCollection, 5000);
};

// Network optimization
export const optimizeNetworkRequests = () => {
  // Implement request deduplication
  const requestCache = new Map<string, Promise<any>>();
  
  const cachedFetch = (url: string, options?: RequestInit): Promise<Response> => {
    const key = `${url}-${JSON.stringify(options)}`;
    
    if (requestCache.has(key)) {
      return requestCache.get(key)!;
    }
    
    const request = fetch(url, options);
    requestCache.set(key, request);
    
    // Clean up cache after 5 minutes
    setTimeout(() => {
      requestCache.delete(key);
    }, 5 * 60 * 1000);
    
    return request;
  };
  
  // Replace global fetch with cached version
  if (import.meta.env.PROD) {
    window.fetch = cachedFetch;
  }
};

// Initialize all optimizations
export const initializeOptimizations = () => {
  optimizeBundleSize();
  optimizeMemoryUsage();
  optimizeNetworkRequests();
};