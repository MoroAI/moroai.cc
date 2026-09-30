// scripts/fetch-fonts.mjs
// Downloads TTF fonts required by the OG renderer. Run once: `node scripts/fetch-fonts.mjs`
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap';

mkdirSync('./fonts', { recursive: true });

console.log('Fetching font metadata from Google Fonts...');
// A non-browser User-Agent makes Google Fonts serve raw TTF URLs
const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': 'curl/8.0' } })).text();

const blocks = css.split('@font-face').slice(1);
const wanted = [
  { family: 'Inter', weight: 400, file: 'Inter-Regular.ttf' },
  { family: 'Inter', weight: 700, file: 'Inter-Bold.ttf' },
  { family: 'Inter', weight: 800, file: 'Inter-ExtraBold.ttf' },
  { family: 'JetBrains Mono', weight: 400, file: 'JetBrainsMono-Regular.ttf' },
  { family: 'JetBrains Mono', weight: 700, file: 'JetBrainsMono-Bold.ttf' },
];

for (const w of wanted) {
  if (existsSync(`./fonts/${w.file}`)) {
    console.log(`✓ fonts/${w.file} already exists`);
    continue;
  }

  const block = blocks.find((b) => {
    const fam = /font-family:\s*'([^']+)'/.exec(b)?.[1];
    const weight = /font-weight:\s*(\d+)/.exec(b)?.[1];
    const fmt = /url\((https:[^)]+\.ttf)\)/.exec(b);
    return fam === w.family && Number(weight) === w.weight && fmt;
  });

  const url = /url\((https:[^)]+\.ttf)\)/.exec(block)?.[1];
  if (!url) throw new Error(`Could not locate TTF for ${w.family} ${w.weight}`);

  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(`./fonts/${w.file}`, buf);
  console.log(`✓ fonts/${w.file} (${(buf.length / 1024).toFixed(0)} KB)`);
}

console.log('✨ All fonts downloaded successfully.');
