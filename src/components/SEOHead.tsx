import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { generateEnhancedMetaTags, generateSocialMetaTags, generateHreflangTags } from '../utils/seoEnhanced';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  noIndex = false
}) => {
  const { t, i18n } = useTranslation();
  
  const defaultTitle = t('app.name');
  const defaultDescription = t('app.description');
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  
  const defaultKeywords = 'video chat, models, webcam, live chat, adult entertainment, cam girls, video call, online dating';
  const metaKeywords = keywords || defaultKeywords;

  // Enhanced meta tags
  const enhancedMeta = generateEnhancedMetaTags('landing');
  const socialMeta = generateSocialMetaTags('landing', {
    title: fullTitle,
    description: metaDescription,
    url,
    locale: i18n.language
  });
  const hreflangTags = generateHreflangTags('/', ['en', 'ar', 'es', 'fr', 'de']);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": defaultTitle,
        "description": metaDescription,
        "url": url,
        "applicationCategory": "Entertainment",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "category": "Video Chat Services"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "15420",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": [
          "HD Video Calls",
          "Verified Models",
          "Secure Payments",
          "Multi-language Support",
          "24/7 Customer Support"
        ]
      },
      {
        "@type": "Organization",
        "name": "GlamCall",
        "url": "https://glamcall.com",
        "logo": "https://glamcall.com/logo.png",
        "sameAs": [
          "https://twitter.com/glamcall",
          "https://facebook.com/glamcall",
          "https://instagram.com/glamcall"
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="GlamCall" />
      <meta name="language" content={i18n.language} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Enhanced Open Graph */}
      {Object.entries(socialMeta).map(([key, value]) => {
        if (key.startsWith('og:')) {
          return <meta key={key} property={key} content={value as string} />;
        }
        if (key.startsWith('twitter:')) {
          return <meta key={key} name={key} content={value as string} />;
        }
        return null;
      })}
      
      {/* Hreflang tags */}
      {hreflangTags.map((tag, index) => (
        <link key={index} {...tag} />
      ))}
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//images.pexels.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Robots meta for specific cases */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};