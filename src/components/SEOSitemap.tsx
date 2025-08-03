import React from 'react';

// Generate sitemap.xml content
export const generateSitemap = (baseUrl: string, models: any[], languages: string[]) => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    // Main pages
    { loc: baseUrl, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/models`, priority: '0.9', changefreq: 'hourly' },
    { loc: `${baseUrl}/register`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${baseUrl}/login`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/coins`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/support`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${baseUrl}/privacy`, priority: '0.5', changefreq: 'yearly' },
    { loc: `${baseUrl}/terms`, priority: '0.5', changefreq: 'yearly' },
    
    // Model profiles
    ...models.map(model => ({
      loc: `${baseUrl}/model/${model.id}`,
      priority: '0.8',
      changefreq: 'daily',
      lastmod: currentDate
    })),
    
    // Category pages
    { loc: `${baseUrl}/models/online`, priority: '0.9', changefreq: 'hourly' },
    { loc: `${baseUrl}/models/new`, priority: '0.8', changefreq: 'daily' },
    { loc: `${baseUrl}/models/top-rated`, priority: '0.8', changefreq: 'daily' },
    
    // Country pages
    ...Array.from(new Set(models.map(m => m.country))).map(country => ({
      loc: `${baseUrl}/models/country/${encodeURIComponent(country)}`,
      priority: '0.7',
      changefreq: 'daily'
    })),
    
    // Language pages
    ...Array.from(new Set(models.flatMap(m => m.language.split(', ')))).map(lang => ({
      loc: `${baseUrl}/models/language/${encodeURIComponent(lang)}`,
      priority: '0.7',
      changefreq: 'daily'
    }))
  ];

  // Add multilingual versions
  const multilingualUrls = [];
  for (const url of urls) {
    for (const lang of languages) {
      if (lang !== 'en') {
        multilingualUrls.push({
          ...url,
          loc: url.loc.replace(baseUrl, `${baseUrl}/${lang}`)
        });
      }
    }
  }

  const allUrls = [...urls, ...multilingualUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod || currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${languages.map(lang => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url.loc.replace(/\/(ar|es|fr|de|ru|pt|it|ja|ko|zh|hi|tr|nl|sv)\//, `/${lang}/`)}" />`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Generate robots.txt content
export const generateRobotsTxt = (baseUrl: string) => {
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /user/
Disallow: /model-dashboard/

# Allow important pages
Allow: /models/
Allow: /register
Allow: /login

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
};

// SEO Schema markup for models
export const generateModelSchema = (model: any, baseUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": model.name,
    "image": model.avatar,
    "description": model.description,
    "nationality": model.country,
    "knowsLanguage": model.language.split(', '),
    "url": `${baseUrl}/model/${model.id}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": model.rating,
      "reviewCount": model.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": model.pricePerMinute,
      "priceCurrency": "USD",
      "availability": model.isOnline ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };
};

// SEO component for model pages
export const ModelSEO: React.FC<{ model: any; baseUrl: string }> = ({ model, baseUrl }) => {
  const schema = generateModelSchema(model, baseUrl);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};