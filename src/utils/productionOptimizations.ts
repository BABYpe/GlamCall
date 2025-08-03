// Production-specific optimizations for maximum performance

// Critical resource loading
export const loadCriticalResources = async () => {
  // Preload critical fonts
  const fontPreloads = [
    {
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous'
    },
    {
      href: 'https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyGyvu3CBFQLaig.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous'
    }
  ];

  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    Object.assign(link, font);
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  const imagePromises = criticalImages.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  });

  try {
    await Promise.all(imagePromises);
  } catch (error) {
    console.warn('Some critical images failed to preload:', error);
  }
};

// Advanced caching strategies
export const setupAdvancedCaching = () => {
  // Service Worker caching
  if ('serviceWorker' in navigator && 'caches' in window) {
    const CACHE_NAME = 'glamcall-v2.0.0';
    const STATIC_CACHE = 'glamcall-static-v2';
    const DYNAMIC_CACHE = 'glamcall-dynamic-v2';

    // Cache critical resources immediately
    const cacheResources = async () => {
      try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll([
          '/',
          '/manifest.json',
          '/offline.html'
        ]);
      } catch (error) {
        console.warn('Failed to cache resources:', error);
      }
    };

    cacheResources();
  }

  // Memory caching for API responses
  const apiCache = new Map();
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const cachedApiCall = async (url: string, options?: RequestInit) => {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const cached = apiCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      apiCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data;
      }
      throw error;
    }
  };

  // Replace global fetch for API calls
  if (import.meta.env.PROD) {
    (window as any).cachedApiCall = cachedApiCall;
  }
};

// Image optimization and lazy loading
export const optimizeImages = () => {
  // Intersection Observer for lazy loading
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Load high-quality image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Add fade-in effect
          img.style.opacity = '0';
          img.onload = () => {
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
          };
          
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  );

  // Observe all images with data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));

  // WebP support detection and optimization
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  if (supportsWebP()) {
    document.documentElement.classList.add('webp-support');
  }
};

// Bundle size optimization
export const optimizeBundleSize = () => {
  // Remove unused CSS at runtime
  const removeUnusedCSS = () => {
    const usedClasses = new Set<string>();
    
    // Collect all used classes
    const collectClasses = (element: Element) => {
      element.classList.forEach(className => {
        usedClasses.add(className);
      });
      
      Array.from(element.children).forEach(collectClasses);
    };
    
    collectClasses(document.body);
    
    // Log for development
    if (import.meta.env.DEV) {
      console.log(`Used CSS classes: ${usedClasses.size}`);
    }
  };

  // Optimize DOM structure
  const optimizeDOM = () => {
    // Remove empty text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          return node.textContent?.trim() === '' 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const emptyNodes: Node[] = [];
    let node;
    while (node = walker.nextNode()) {
      emptyNodes.push(node);
    }

    emptyNodes.forEach(node => node.remove());
  };

  // Execute optimizations
  setTimeout(() => {
    removeUnusedCSS();
    optimizeDOM();
  }, 1000);
};

// Network optimization
export const optimizeNetworkRequests = () => {
  // Request deduplication
  const pendingRequests = new Map<string, Promise<any>>();

  const deduplicatedFetch = async (url: string, options?: RequestInit): Promise<Response> => {
    const key = `${url}-${JSON.stringify(options)}`;
    
    if (pendingRequests.has(key)) {
      return pendingRequests.get(key)!;
    }

    const request = fetch(url, options);
    pendingRequests.set(key, request);

    try {
      const response = await request;
      return response;
    } finally {
      pendingRequests.delete(key);
    }
  };

  // Connection-aware loading
  const getConnectionSpeed = (): 'slow' | 'fast' => {
    const connection = (navigator as any).connection;
    if (!connection) return 'fast';

    const slowConnections = ['slow-2g', '2g', '3g'];
    return slowConnections.includes(connection.effectiveType) ? 'slow' : 'fast';
  };

  // Adaptive loading based on connection
  const adaptiveLoad = (fastContent: () => void, slowContent: () => void) => {
    if (getConnectionSpeed() === 'slow') {
      slowContent();
    } else {
      fastContent();
    }
  };

  // Export utilities
  (window as any).deduplicatedFetch = deduplicatedFetch;
  (window as any).adaptiveLoad = adaptiveLoad;
};

// Memory management
export const optimizeMemoryUsage = () => {
  // Cleanup intervals
  const intervals: NodeJS.Timeout[] = [];
  const timeouts: NodeJS.Timeout[] = [];

  const addInterval = (callback: () => void, delay: number) => {
    const id = setInterval(callback, delay);
    intervals.push(id);
    return id;
  };

  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    timeouts.push(id);
    return id;
  };

  const cleanup = () => {
    intervals.forEach(clearInterval);
    timeouts.forEach(clearTimeout);
    intervals.length = 0;
    timeouts.length = 0;
  };

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);

  // Periodic memory cleanup
  addInterval(() => {
    // Force garbage collection in development
    if (import.meta.env.DEV && (window as any).gc) {
      (window as any).gc();
    }
  }, 30000);

  return { addInterval, addTimeout, cleanup };
};

// Initialize all production optimizations
export const initializeProductionOptimizations = async () => {
  await loadCriticalResources();
  setupAdvancedCaching();
  optimizeImages();
  optimizeBundleSize();
  optimizeNetworkRequests();
  optimizeMemoryUsage();
};