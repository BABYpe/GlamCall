import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOLandingPageProps {
  children: React.ReactNode;
}

export const SEOLandingPage: React.FC<SEOLandingPageProps> = ({ children }) => {
  const { i18n } = useTranslation();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://glamcall.com/#website",
        "url": "https://glamcall.com/",
        "name": "GlamCall",
        "description": "Premium video chat platform connecting users with verified models worldwide",
        "publisher": {
          "@id": "https://glamcall.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://glamcall.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": i18n.language
      },
      {
        "@type": "Organization",
        "@id": "https://glamcall.com/#organization",
        "name": "GlamCall",
        "url": "https://glamcall.com/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": i18n.language,
          "@id": "https://glamcall.com/#/schema/logo/image/",
          "url": "https://glamcall.com/logo.png",
          "contentUrl": "https://glamcall.com/logo.png",
          "width": 512,
          "height": 512,
          "caption": "GlamCall"
        },
        "image": {
          "@id": "https://glamcall.com/#/schema/logo/image/"
        },
        "sameAs": [
          "https://twitter.com/glamcall",
          "https://facebook.com/glamcall",
          "https://instagram.com/glamcall"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+1-555-GLAMCALL",
            "contactType": "customer service",
            "availableLanguage": ["English", "Arabic", "Spanish", "French", "German"],
            "areaServed": "Worldwide"
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "GlamCall",
        "url": "https://glamcall.com/",
        "description": "Premium video chat platform with verified models",
        "applicationCategory": "Entertainment",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "category": "Video Chat Services",
          "priceRange": "$2.50-$10.00 per minute"
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
        "@type": "Service",
        "name": "Video Chat Services",
        "provider": {
          "@id": "https://glamcall.com/#organization"
        },
        "serviceType": "Adult Entertainment",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Video Chat Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Starter Package"
              },
              "price": "9.99",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Popular Package"
              },
              "price": "19.99",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "VIP Package"
              },
              "price": "59.99",
              "priceCurrency": "USD"
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I create an account?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Click the 'Get Started' button, fill in your details, and verify your email address to create your free account."
            }
          },
          {
            "@type": "Question",
            "name": "Is the platform safe and secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we use end-to-end encryption, verify all models, and maintain strict safety guidelines to ensure a secure experience."
            }
          },
          {
            "@type": "Question",
            "name": "How much does it cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pricing varies by model, typically ranging from $2.50 to $10.00 per minute. You can purchase coin packages starting from $9.99."
            }
          }
        ]
      }
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://glamcall.com/"
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Enhanced Meta Tags */}
        <title>GlamCall - Premium Video Chat Platform | Connect with Verified Models Worldwide</title>
        <meta name="description" content="Experience premium video chat with beautiful verified models from around the world. HD quality, secure payments, 24/7 support. Join 50,000+ satisfied users today!" />
        <meta name="keywords" content="video chat, webcam models, adult entertainment, live cam, video call, online dating, premium chat, verified models, HD video, secure platform" />
        
        {/* Open Graph Enhanced */}
        <meta property="og:title" content="GlamCall - Premium Video Chat Platform" />
        <meta property="og:description" content="Connect with beautiful verified models worldwide through HD video calls. Safe, secure, and professional adult entertainment platform." />
        <meta property="og:image" content="https://glamcall.com/og-image-landing.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://glamcall.com/" />
        <meta property="og:site_name" content="GlamCall" />
        
        {/* Twitter Card Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@glamcall" />
        <meta name="twitter:creator" content="@glamcall" />
        <meta name="twitter:title" content="GlamCall - Premium Video Chat Platform" />
        <meta name="twitter:description" content="Connect with beautiful verified models worldwide through HD video calls." />
        <meta name="twitter:image" content="https://glamcall.com/twitter-card.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="39.78373;-100.445882" />
        <meta name="ICBM" content="39.78373, -100.445882" />
        
        {/* App Links */}
        <meta property="al:web:url" content="https://glamcall.com/" />
        
        {/* Verification Tags */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        
        {/* Language and Region */}
        <meta name="language" content={i18n.language} />
        <meta name="content-language" content={i18n.language} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
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
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://glamcall.com/" />
        
        {/* Alternate Language URLs */}
        <link rel="alternate" hrefLang="en" href="https://glamcall.com/" />
        <link rel="alternate" hrefLang="ar" href="https://glamcall.com/ar/" />
        <link rel="alternate" hrefLang="es" href="https://glamcall.com/es/" />
        <link rel="alternate" hrefLang="fr" href="https://glamcall.com/fr/" />
        <link rel="alternate" hrefLang="de" href="https://glamcall.com/de/" />
        <link rel="alternate" hrefLang="x-default" href="https://glamcall.com/" />
        
        {/* Mobile App Links */}
        <link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.glamcall.com/" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="GlamCall Blog" href="https://glamcall.com/blog/rss.xml" />
        
        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme and App Configuration */}
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Performance Hints */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/noto-sans-arabic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Helmet>
      {children}
    </>
  );
};