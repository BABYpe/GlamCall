// Build optimization utilities for production
export const optimizeForProduction = () => {
  // Remove console logs in production
  if (import.meta.env.PROD) {
    console.log = () => {};
    console.warn = () => {};
    console.info = () => {};
  }

  // Optimize images for different screen sizes
  const optimizeImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // Initialize optimizations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeImages);
  } else {
    optimizeImages();
  }
};

// Critical CSS inlining for faster initial paint
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    body { 
      font-family: 'Inter', sans-serif; 
      background: #0f0f0f; 
      color: white; 
      margin: 0; 
    }
    .loading-spinner { 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 100vh; 
    }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

// Resource hints for better performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'preconnect', href: 'https://images.pexels.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'dns-prefetch', href: '//mnejfiyhyusamcxqfyut.supabase.co' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.assign(link, hint);
    document.head.appendChild(link);
  });
};