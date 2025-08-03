import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'GlamCall - منصة المحادثات المرئية الاحترافية',
  description = 'تواصل مع أجمل العارضات المتحققات من جميع أنحاء العالم عبر مكالمات فيديو عالية الجودة. منصة آمنة ومهنية للترفيه للبالغين.',
  keywords = 'video chat, webcam models, adult entertainment, live cam, video call, online dating, محادثات مرئية, عارضات',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://glamcall.com',
  type = 'website',
  locale = 'ar_SA'
}) => {
  const fullTitle = title.includes('GlamCall') ? title : `${title} | GlamCall`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="GlamCall" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="GlamCall" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Performance Hints */}
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//mnejfiyhyusamcxqfyut.supabase.co" />
    </Helmet>
  );
};