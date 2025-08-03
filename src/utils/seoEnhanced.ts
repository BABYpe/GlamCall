// Enhanced SEO utilities for landing page
export const generateEnhancedMetaTags = (page: string, data?: any) => {
  const baseUrl = 'https://glamcall.com';
  
  const pages = {
    landing: {
      title: 'GlamCall - Premium Video Chat Platform | Connect with Verified Models Worldwide',
      description: 'Experience premium video chat with beautiful verified models from around the world. HD quality, secure payments, 24/7 support. Join 50,000+ satisfied users today!',
      keywords: 'video chat, webcam models, adult entertainment, live cam, video call, online dating, premium chat, verified models, HD video, secure platform',
      image: `${baseUrl}/og-image-landing.jpg`,
      type: 'website'
    },
    models: {
      title: 'Browse Verified Models | GlamCall Premium Video Chat',
      description: 'Discover thousands of verified models from around the world. Filter by country, language, and interests. Start your premium video chat experience today.',
      keywords: 'browse models, verified models, webcam girls, video chat models, online models, live cam models',
      image: `${baseUrl}/og-image-models.jpg`,
      type: 'website'
    },
    pricing: {
      title: 'Pricing Plans | GlamCall Video Chat Packages',
      description: 'Transparent pricing for premium video chat. Choose from flexible coin packages starting at $9.99. No hidden fees, instant delivery.',
      keywords: 'video chat pricing, coin packages, premium chat costs, webcam pricing, adult entertainment pricing',
      image: `${baseUrl}/og-image-pricing.jpg`,
      type: 'website'
    }
  };

  return pages[page as keyof typeof pages] || pages.landing;
};

// Generate rich snippets for different content types
export const generateRichSnippets = (type: string, data: any) => {
  switch (type) {
    case 'organization':
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "GlamCall",
        "url": "https://glamcall.com",
        "logo": "https://glamcall.com/logo.png",
        "description": "Leading platform for premium video chat entertainment",
        "foundingDate": "2024",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-GLAMCALL",
          "contactType": "customer service",
          "availableLanguage": ["English", "Arabic", "Spanish", "French", "German"],
          "areaServed": "Worldwide"
        },
        "sameAs": [
          "https://twitter.com/glamcall",
          "https://facebook.com/glamcall",
          "https://instagram.com/glamcall",
          "https://linkedin.com/company/glamcall"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "15420",
          "bestRating": "5",
          "worstRating": "1"
        }
      };

    case 'service':
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Premium Video Chat Services",
        "provider": {
          "@type": "Organization",
          "name": "GlamCall"
        },
        "serviceType": "Video Chat Entertainment",
        "description": "Premium video chat services with verified models worldwide",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Video Chat Packages",
          "itemListElement": data?.packages?.map((pkg: any, index: number) => ({
            "@type": "Offer",
            "position": index + 1,
            "itemOffered": {
              "@type": "Service",
              "name": pkg.name
            },
            "price": pkg.price,
            "priceCurrency": "USD",
            "description": `${pkg.coins} coins package`
          })) || []
        }
      };

    case 'faq':
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data?.faqs?.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        })) || []
      };

    case 'review':
      return {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Service",
          "name": "GlamCall Video Chat"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": data.rating,
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": data.author
        },
        "reviewBody": data.comment,
        "datePublished": data.date
      };

    default:
      return null;
  }
};

// SEO-optimized URL generation
export const generateSEOUrl = (type: string, slug: string, language = 'en') => {
  const baseUrl = 'https://glamcall.com';
  const langPrefix = language === 'en' ? '' : `/${language}`;
  
  const urlPatterns = {
    model: `/model/${slug}`,
    category: `/models/${slug}`,
    country: `/models/country/${slug}`,
    language: `/models/language/${slug}`,
    page: `/${slug}`
  };

  return `${baseUrl}${langPrefix}${urlPatterns[type as keyof typeof urlPatterns] || `/${slug}`}`;
};

// Generate sitemap entries for landing page
export const generateLandingSitemap = (languages: string[]) => {
  const baseUrl = 'https://glamcall.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/models', priority: '0.9', changefreq: 'hourly' },
    { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { path: '/terms', priority: '0.5', changefreq: 'yearly' }
  ];

  const urls = [];
  
  for (const page of pages) {
    for (const lang of languages) {
      const langPrefix = lang === 'en' ? '' : `/${lang}`;
      urls.push({
        loc: `${baseUrl}${langPrefix}${page.path}`,
        lastmod: currentDate,
        changefreq: page.changefreq,
        priority: page.priority,
        alternates: languages.map(altLang => ({
          hreflang: altLang,
          href: `${baseUrl}${altLang === 'en' ? '' : `/${altLang}`}${page.path}`
        }))
      });
    }
  }

  return urls;
};

// Meta tags for social media optimization
export const generateSocialMetaTags = (page: string, data?: any) => {
  const baseUrl = 'https://glamcall.com';
  
  return {
    // Facebook Open Graph
    'og:title': data?.title || 'GlamCall - Premium Video Chat Platform',
    'og:description': data?.description || 'Connect with beautiful verified models worldwide',
    'og:image': data?.image || `${baseUrl}/og-image.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:url': data?.url || baseUrl,
    'og:type': 'website',
    'og:site_name': 'GlamCall',
    'og:locale': data?.locale || 'en_US',
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:site': '@glamcall',
    'twitter:creator': '@glamcall',
    'twitter:title': data?.title || 'GlamCall - Premium Video Chat Platform',
    'twitter:description': data?.description || 'Connect with beautiful verified models worldwide',
    'twitter:image': data?.image || `${baseUrl}/twitter-card.jpg`,
    
    // LinkedIn
    'linkedin:owner': 'glamcall-official',
    
    // Pinterest
    'pinterest:rich_pin': 'true'
  };
};

// Generate hreflang tags for international SEO
export const generateHreflangTags = (currentPath: string, languages: string[]) => {
  const baseUrl = 'https://glamcall.com';
  
  return languages.map(lang => ({
    rel: 'alternate',
    hreflang: lang,
    href: lang === 'en' 
      ? `${baseUrl}${currentPath}` 
      : `${baseUrl}/${lang}${currentPath}`
  }));
};

// Performance optimization meta tags
export const generatePerformanceMetaTags = () => {
  return {
    // Resource hints
    'dns-prefetch': [
      '//images.pexels.com',
      '//fonts.googleapis.com',
      '//www.google-analytics.com'
    ],
    'preconnect': [
      'https://images.pexels.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ],
    'preload': [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      { href: '/fonts/noto-sans-arabic.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
    ]
  };
};