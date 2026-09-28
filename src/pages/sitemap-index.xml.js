export async function GET() {
  const routes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/features/', changefreq: 'weekly', priority: 0.9 },
    { url: '/pricing/', changefreq: 'monthly', priority: 0.8 },
    { url: '/about/', changefreq: 'monthly', priority: 0.7 },
    { url: '/community/', changefreq: 'weekly', priority: 0.7 },
    { url: '/changelog/', changefreq: 'weekly', priority: 0.8 },
    { url: '/blog/', changefreq: 'daily', priority: 0.9 },
    { url: '/blog/introducing-moroai/', changefreq: 'monthly', priority: 0.8 },
    { url: '/blog/epistemic-data-curation/', changefreq: 'monthly', priority: 0.8 },
    { url: '/blog/oom-auto-recovery/', changefreq: 'monthly', priority: 0.8 },
    { url: '/blog/dpo-flywheel/', changefreq: 'monthly', priority: 0.8 },
    { url: '/docs/getting-started/introduction/', changefreq: 'weekly', priority: 0.9 },
    { url: '/docs/getting-started/installation/', changefreq: 'weekly', priority: 0.9 },
    { url: '/docs/getting-started/quickstart/', changefreq: 'weekly', priority: 0.9 },
    { url: '/docs/api/cli/', changefreq: 'weekly', priority: 0.8 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      ({ url, changefreq, priority }) => `
  <url>
    <loc>https://moroai.cc${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
