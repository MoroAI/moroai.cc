// scripts/build-llms-full.mjs
// Aggregates MoroAI documentation into a single public/llms-full.txt stream for LLMs and AI coding agents.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function stripAstroLayout(content) {
  // Strip frontmatter
  let text = content.replace(/^---[\s\S]*?---\n*/, '');
  // Strip Astro layout wrapper tags and imports
  text = text.replace(/<DocsLayout[^>]*>/g, '');
  text = text.replace(/<\/DocsLayout>/g, '');
  text = text.replace(/<BaseLayout[^>]*>/g, '');
  text = text.replace(/<\/BaseLayout>/g, '');
  text = text.replace(/<SampleData[^>]*\/>/g, '');
  text = text.replace(/<MobileDocsNav[^>]*\/>/g, '');
  // Clean empty lines
  return text.trim();
}

const walk = (dir, out = []) => {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) {
      walk(p, out);
    } else if (/\.(astro|md|mdx)$/.test(e)) {
      out.push(p);
    }
  }
  return out;
};

const sections = [
  { title: 'Getting Started', files: walk('src/pages/docs/getting-started') },
  { title: 'Concepts & Architecture', files: walk('src/pages/docs/concepts') },
  { title: 'Cookbooks & Blueprints', files: walk('src/pages/docs/cookbook') },
  { title: 'CLI Reference', files: walk('src/pages/docs/cli') },
  { title: 'API Reference', files: walk('src/pages/docs/api') },
  { title: 'Deployment', files: walk('src/pages/docs/deployment') },
  { title: 'Advanced Guides', files: walk('src/pages/docs/guides') },
];

let out = `# MoroAI — Comprehensive Documentation for LLMs

> MoroAI is a local-first model adaptation foundry for small language models.
> Apache-2.0 licensed, open-source Python CLI + web dashboard.
> Website: https://moroai.cc · GitHub: https://github.com/moroai/moro

`;

for (const { title, files } of sections) {
  out += `\n# SECTION: ${title}\n\n`;
  for (const f of files) {
    const raw = readFileSync(f, 'utf8');
    const slug = f
      .replace(/^src\/pages\//, '/')
      .replace(/index\.astro$/, '')
      .replace(/\.astro$/, '/');
    out += `\n## Document: ${slug}\n\n`;
    out += stripAstroLayout(raw) + '\n\n---\n';
  }
}

writeFileSync('public/llms-full.txt', out);
console.log(`✓ Generated public/llms-full.txt (${(out.length / 1024).toFixed(0)} KB)`);
