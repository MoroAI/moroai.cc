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
    // Getting Started
    { url: '/docs/getting-started/introduction/', changefreq: 'weekly', priority: 0.9 },
    { url: '/docs/getting-started/installation/', changefreq: 'weekly', priority: 0.9 },
    { url: '/docs/getting-started/quickstart/', changefreq: 'weekly', priority: 0.9 },
    { url: '/docs/getting-started/first-model/', changefreq: 'weekly', priority: 0.9 },
    // Concepts
    { url: '/docs/concepts/overview/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/data-compiler/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/ppci-filtering/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/lineage-graphs/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/recipe-engine/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/training-engine/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/eval-harness/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/drift-detection/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/flywheel/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/governance/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/concepts/dashboard/', changefreq: 'weekly', priority: 0.8 },
    // Cookbook
    { url: '/docs/cookbook/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cookbook/support-bot/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cookbook/json-extractor/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cookbook/code-assistant/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cookbook/document-summarizer/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cookbook/medical-qa/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cookbook/legal-analyzer/', changefreq: 'weekly', priority: 0.8 },
    // CLI Reference
    { url: '/docs/cli/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/init/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/data/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/recipe/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/train/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/eval/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/release/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/flywheel/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/services/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/analytics/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/dashboard/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/cli/plugins/', changefreq: 'weekly', priority: 0.8 },
    // API Reference
    { url: '/docs/api/cli/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/api/python/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/api/rest/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/api/websocket/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/api/plugin-api/', changefreq: 'weekly', priority: 0.8 },
    // Deployment
    { url: '/docs/deployment/ollama/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/deployment/docker/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/deployment/kubernetes/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/deployment/production/', changefreq: 'weekly', priority: 0.8 },
    // Guides
    { url: '/docs/guides/troubleshooting/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/guides/performance/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/guides/privacy/', changefreq: 'weekly', priority: 0.8 },
    { url: '/docs/guides/contributing/', changefreq: 'weekly', priority: 0.8 },
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
