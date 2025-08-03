// Performance optimization utilities
export const preloadRoute = (routeName: string) => {
  const routes = {
    models: () => import('../components/EnhancedHomePage'),
    profile: () => import('../components/ModelProfile'),
    call: () => import('../components/EnhancedVideoCall'),
    coins: () => import('../components/EnhancedCoinStore'),
    dashboard: () => import('../components/Dashboard')
  };

  const route = routes[routeName as keyof typeof routes];
  if (route) {
    route().catch(console.error);
  }
};

// Image preloading
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Critical resource preloading
export const preloadCriticalResources = () => {
  // Preload critical images
  const criticalImages = [
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  criticalImages.forEach(src => {
    preloadImage(src).catch(console.error);
  });
};

// Lazy loading intersection observer
export const createLazyLoader = (callback: () => void, threshold = 0.1) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    },
    { threshold }
  );

  return observer;
};

// Bundle size optimization
export const loadChunkOnDemand = async (chunkName: string) => {
  try {
    switch (chunkName) {
      case 'admin':
        return await import('../components/AdminDashboard');
      case 'model-application':
        return await import('../components/ModelApplication');
      case 'verification':
        return await import('../components/VerificationSystem');
      default:
        throw new Error(`Unknown chunk: ${chunkName}`);
    }
  } catch (error) {
    console.error(`Failed to load chunk ${chunkName}:`, error);
    throw error;
  }
};