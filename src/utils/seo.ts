// SEO utility functions
export const generateMetaTags = (page: string, model?: any, language = 'en') => {
  const baseTitle = 'GlamCall - Premium Video Chat Platform';
  const baseDescription = 'Connect with beautiful models worldwide through HD video calls. Safe, secure, and professional adult entertainment platform.';
  
  const translations = {
    en: {
      title: baseTitle,
      description: baseDescription,
      keywords: 'video chat, webcam models, adult entertainment, live cam, video call, online dating'
    },
    ar: {
      title: 'GlamCall - منصة المحادثات المرئية الاحترافية',
      description: 'تواصل مع أجمل العارضات من جميع أنحاء العالم عبر مكالمات فيديو عالية الجودة. منصة آمنة ومهنية للترفيه للبالغين.',
      keywords: 'محادثات مرئية, عارضات, ترفيه للبالغين, كاميرا مباشرة, مكالمة فيديو, مواعدة عبر الإنترنت'
    },
    es: {
      title: 'GlamCall - Plataforma Premium de Video Chat',
      description: 'Conecta con hermosas modelos de todo el mundo a través de videollamadas HD. Plataforma segura y profesional de entretenimiento para adultos.',
      keywords: 'video chat, modelos webcam, entretenimiento adultos, cam en vivo, videollamada, citas online'
    },
    fr: {
      title: 'GlamCall - Plateforme Premium de Chat Vidéo',
      description: 'Connectez-vous avec de belles modèles du monde entier via des appels vidéo HD. Plateforme sécurisée et professionnelle de divertissement pour adultes.',
      keywords: 'chat vidéo, modèles webcam, divertissement adulte, cam en direct, appel vidéo, rencontres en ligne'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  switch (page) {
    case 'home':
      return {
        title: t.title,
        description: t.description,
        keywords: t.keywords
      };
    
    case 'models':
      return {
        title: `Models - ${t.title}`,
        description: 'Browse thousands of verified models from around the world. Find your perfect match for video chat.',
        keywords: `${t.keywords}, browse models, verified models, global models`
      };
    
    case 'model-profile':
      if (model) {
        return {
          title: `${model.name} - ${model.country} Model | ${t.title}`,
          description: `Video chat with ${model.name}, a ${model.age} year old model from ${model.country}. ${model.description}`,
          keywords: `${model.name}, ${model.country}, ${model.tags.join(', ')}, ${t.keywords}`
        };
      }
      break;
    
    case 'register':
      return {
        title: `Join Now - ${t.title}`,
        description: 'Create your free account and start connecting with beautiful models worldwide. Quick and easy registration.',
        keywords: `${t.keywords}, register, sign up, create account, join`
      };
    
    case 'login':
      return {
        title: `Login - ${t.title}`,
        description: 'Login to your GlamCall account and continue your video chat experience.',
        keywords: `${t.keywords}, login, sign in, account access`
      };
  }

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords
  };
};

// Generate structured data for different page types
export const generateStructuredData = (type: string, data: any) => {
  const baseUrl = 'https://glamcall.com';
  
  switch (type) {
    case 'website':
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "GlamCall",
        "url": baseUrl,
        "description": "Premium video chat platform connecting users with models worldwide",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
    
    case 'organization':
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "GlamCall",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "description": "Leading platform for premium video chat entertainment",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-GLAMCALL",
          "contactType": "customer service",
          "availableLanguage": ["English", "Spanish", "French", "German", "Arabic"]
        },
        "sameAs": [
          "https://twitter.com/glamcall",
          "https://facebook.com/glamcall",
          "https://instagram.com/glamcall"
        ]
      };
    
    case 'breadcrumb':
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data.map((item: any, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
    
    case 'faq':
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
  }
};

// SEO optimization for images
export const optimizeImageSEO = (src: string, alt: string, title?: string) => {
  return {
    src,
    alt,
    title: title || alt,
    loading: 'lazy' as const,
    decoding: 'async' as const
  };
};

// Generate canonical URLs
export const generateCanonicalUrl = (path: string, language = 'en') => {
  const baseUrl = 'https://glamcall.com';
  const langPrefix = language === 'en' ? '' : `/${language}`;
  return `${baseUrl}${langPrefix}${path}`;
};

// Generate hreflang tags
export const generateHreflangTags = (path: string, languages: string[]) => {
  const baseUrl = 'https://glamcall.com';
  return languages.map(lang => ({
    rel: 'alternate',
    hreflang: lang,
    href: lang === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${lang}${path}`
  }));
};