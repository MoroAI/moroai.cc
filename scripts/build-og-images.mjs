// scripts/build-og-images.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createElement as h } from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const SITE = 'https://moroai.cc';
const W = 1200, H = 630;

// ---------------------------------------------------------------- fonts
const font = (file, name, weight) => ({
  name,
  weight,
  style: 'normal',
  data: readFileSync(`./fonts/${file}`),
});

const FONTS = [
  font('Inter-Regular.ttf', 'Inter', 400),
  font('Inter-Bold.ttf', 'Inter', 700),
  font('Inter-ExtraBold.ttf', 'Inter', 800),
  font('JetBrainsMono-Regular.ttf', 'JetBrains Mono', 400),
  font('JetBrainsMono-Bold.ttf', 'JetBrains Mono', 700),
];

// ---------------------------------------------------------------- theme
const SECTIONS = {
  home: { badge: 'LOCAL-FIRST AI', accent: '#0ea5e9', term: '$ moro init my-model && moro train' },
  blog: { badge: 'ENGINEERING BLOG', accent: '#22d3ee', term: '$ moro analytics trend' },
  docs: { badge: 'DOCUMENTATION', accent: '#22c55e', term: '$ moro data build --report' },
  cookbook: { badge: 'COOKBOOK', accent: '#f59e0b', term: '$ moro release deploy --target ollama' },
  changelog: { badge: 'RELEASE NOTES', accent: '#a855f7', term: '$ pip install -U moroai' },
  about: { badge: 'OUR MISSION', accent: '#ec4899', term: null },
  features: { badge: 'CORE ARCHITECTURE', accent: '#06b6d4', term: '$ moro doctor --vram-check' },
  pricing: { badge: 'SOVEREIGN FOUNDRY', accent: '#10b981', term: '$ moro license verify' },
  community: { badge: 'OPEN ECOSYSTEM', accent: '#8b5cf6', term: '$ moro community join' },
  cli: { badge: 'CLI REFERENCE', accent: '#3b82f6', term: '$ moro --help' },
};

// deterministic per-page variation
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const vary = (slug) => {
  const x = hash(slug);
  return {
    glowX1: 8 + (x % 22), // % positions
    glowY1: 4 + ((x >> 3) % 18),
    glowX2: 68 + ((x >> 5) % 24),
    glowY2: 62 + ((x >> 7) % 26),
    angle: 115 + (x % 50),
  };
};

const clamp = (text, maxChars) =>
  text.length <= maxChars ? text : text.slice(0, maxChars - 1).trimEnd() + '…';

// ---------------------------------------------------------------- card component
function card({ section, title, description, path, metaLine, stars }) {
  const t = SECTIONS[section] ?? SECTIONS.home;
  const v = vary(path);

  const frame = {
    width: W,
    height: H,
    display: 'flex',
    padding: 3,
    background: `linear-gradient(${v.angle}deg, #0ea5e9 0%, #a855f7 55%, #0ea5e9 110%)`,
  };

  const inner = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#020617',
    borderRadius: 22,
    padding: '44px 52px',
    position: 'relative',
    overflow: 'hidden',
  };

  const glow = (x, y, color, size) => ({
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    width: size,
    height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle at center, ${color}33 0%, ${color}00 70%)`,
  });

  return h(
    'div',
    { style: frame },
    h(
      'div',
      { style: inner },
      // ambient glows
      h('div', { style: glow(v.glowX1, v.glowY1, t.accent, 620) }),
      h('div', { style: glow(v.glowX2, v.glowY2, '#a855f7', 560) }),

      // header row
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 14 } },
          h(
            'div',
            {
              style: {
                width: 46,
                height: 46,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
              },
            },
            h('span', { style: { color: '#fff', fontSize: 26, fontWeight: 800, fontFamily: 'Inter' } }, 'M')
          ),
          h('span', { style: { color: '#f8fafc', fontSize: 30, fontWeight: 800, fontFamily: 'Inter' } }, 'MoroAI')
        ),
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          stars != null &&
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 999,
                  background: '#0f172a',
                  border: '1px solid #1e293b',
                },
              },
              h('span', { style: { color: '#facc15', fontSize: 20 } }, '★'),
              h('span', { style: { color: '#cbd5e1', fontSize: 20, fontFamily: 'JetBrains Mono' } }, stars)
            ),
          h(
            'div',
            {
              style: {
                padding: '8px 18px',
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 700,
                fontFamily: 'Inter',
                letterSpacing: 2,
                color: t.accent,
                background: `${t.accent}1a`,
                border: `1px solid ${t.accent}55`,
              },
            },
            t.badge
          )
        )
      ),

      // title + description
      h(
        'div',
        { style: { marginTop: 46, display: 'flex', flexDirection: 'column' } },
        h(
          'span',
          {
            style: {
              color: '#ffffff',
              fontSize: title.length > 55 ? 48 : 58,
              lineHeight: 1.16,
              fontWeight: 800,
              fontFamily: 'Inter',
              letterSpacing: -1,
            },
          },
          clamp(title, 90)
        ),
        h('div', {
          style: {
            marginTop: 18,
            width: 168,
            height: 6,
            borderRadius: 3,
            background: `linear-gradient(90deg, ${t.accent} 0%, #a855f7 100%)`,
          },
        }),
        description &&
          h(
            'span',
            {
              style: {
                marginTop: 20,
                color: '#94a3b8',
                fontSize: description.length > 100 ? 23 : 26,
                lineHeight: 1.38,
                fontFamily: 'Inter',
              },
            },
            clamp(description, 135)
          )
      ),

      // terminal motif
      t.term &&
        h(
          'div',
          {
            style: {
              marginTop: 'auto',
              marginBottom: 16,
              padding: '12px 20px',
              borderRadius: 12,
              background: '#0b1120',
              border: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
            },
          },
          h('span', { style: { color: '#4ade80', fontSize: 20, fontFamily: 'JetBrains Mono' } }, t.term)
        ),

      // footer bar
      h(
        'div',
        {
          style: {
            marginTop: t.term ? 0 : 'auto',
            paddingTop: 18,
            borderTop: '1px solid #1e293b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        },
        h('span', { style: { color: '#64748b', fontSize: 20, fontFamily: 'JetBrains Mono' } }, `moroai.cc${path}`),
        h('span', { style: { color: '#64748b', fontSize: 20, fontFamily: 'Inter' } }, metaLine ?? 'Apache-2.0 · Local-first')
      )
    )
  );
}

// ---------------------------------------------------------------- render
async function render(node, outPath, width = W, height = H) {
  const svg = await satori(node, { width, height, fonts: FONTS });
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: false, defaultFontFamily: 'Inter' },
  }).render().asPng();

  const fullPath = join('public', 'og', outPath);
  const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
  if (dir && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(fullPath, png);
  return png.length;
}

// ---------------------------------------------------------------- main
async function main() {
  console.log('⚡ Generating cinematic OpenGraph share cards with Satori & Resvg...');
  let stars = '4.2k';
  try {
    const r = await fetch('https://api.github.com/repos/moroai/moro', {
      headers: { 'User-Agent': 'moroai-og' },
    });
    if (r.ok) {
      const n = (await r.json()).stargazers_count ?? 0;
      stars = n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
    }
  } catch {}

  const pages = [
    // Core Marketing Pages
    {
      section: 'home',
      path: '/',
      title: 'Build Private AI. Own Your Models.',
      description: 'The local-first model adaptation foundry. Data → train → eval → deploy → learn, entirely on your hardware.',
      metaLine: 'Apache-2.0 · Zero cloud',
      aliases: ['og-main.png', 'home.png'],
    },
    {
      section: 'about',
      path: '/about/',
      title: 'Democratizing Private Intelligence',
      description: 'The people, principles, and governance behind the local-first AI foundry. Created by aljagne in 2026.',
      metaLine: 'Founded 2026 · Creator @aljagne',
      aliases: ['about.png'],
    },
    {
      section: 'features',
      path: '/features/',
      title: 'The Six Foundational Pillars of Local Adaptation',
      description: 'Epistemic Data Compiler with MI Guard, Hardware-Aware Recipes, 5-Level OOM Recovery, Multi-Layer Eval, SBOM, & DPO Flywheel.',
      metaLine: 'Architecture Deep Dive',
      aliases: ['features.png', 'og-features.png'],
    },
    {
      section: 'pricing',
      path: '/pricing/',
      title: 'Open Source Freedom & Enterprise Support',
      description: '100% free Apache 2.0 open-source platform. Optional enterprise SLA, compliance auditing, and custom driver engineering.',
      metaLine: 'Apache-2.0 Open Source',
      aliases: ['pricing.png'],
    },
    {
      section: 'community',
      path: '/community/',
      title: 'Join the Sovereign AI Movement',
      description: 'Connect with ML engineers, researchers, and developers in Discord and GitHub building private local AI infrastructure.',
      metaLine: 'Discord & GitHub Community',
      aliases: ['community.png'],
    },
    {
      section: 'changelog',
      path: '/changelog/',
      title: 'Changelog & Release Notes',
      description: 'Complete release history for MoroAI. Epistemic Data Compiler, hardware recipes, self-healing QLoRA, and Mission Control.',
      metaLine: 'v0.1.0 Latest Release',
      aliases: ['changelog.png'],
    },
    {
      section: 'docs',
      path: '/docs/',
      title: 'MoroAI Documentation & Developer Hub',
      description: 'Quickstart in 5 minutes, architecture deep-dives, full 12-page CLI reference, and real-world production cookbooks.',
      metaLine: 'Docs & Guides',
      aliases: ['docs.png', 'og-docs.png'],
    },
    {
      section: 'blog',
      path: '/blog/',
      title: 'The MoroAI Engineering Blog',
      description: 'Deep-dives on epistemic data curation, self-healing training, statistical drift detection, and continuous learning.',
      metaLine: 'Engineering Notes',
      aliases: ['blog.png'],
    },

    // Blog Articles
    {
      section: 'blog',
      path: '/blog/introducing-moroai/',
      title: 'Introducing MoroAI: The Local-First Model Adaptation Foundry',
      description: 'Why we built a sovereign, self-healing platform to adapt open language models on consumer hardware without cloud APIs.',
      metaLine: 'Sep 28, 2026 · 6 min read',
      aliases: ['blog__introducing-moroai.png', 'og-introducing-moroai.png'],
    },
    {
      section: 'blog',
      path: '/blog/epistemic-data-curation/',
      title: 'Why Standard LLM Deduplication Erases Rare Knowledge: Meet MI Guard',
      description: 'How standard cosine deduplication prunes critical domain facts, and how Shannon mutual information bounds protect edge cases.',
      metaLine: 'Sep 24, 2026 · 9 min read',
      aliases: ['blog__epistemic-data-curation.png', 'og-epistemic-data-curation.png'],
    },
    {
      section: 'blog',
      path: '/blog/oom-auto-recovery/',
      title: 'Never Lose a Training Run: The 5-Step Autonomous OOM Recovery Engine',
      description: 'Intercepting CUDA allocator spikes, dynamic sequence token clamping, and micro-batch halving without aborting jobs.',
      metaLine: 'Sep 20, 2026 · 8 min read',
      aliases: ['blog__oom-auto-recovery.png', 'og-oom-auto-recovery.png'],
    },
    {
      section: 'blog',
      path: '/blog/dpo-flywheel/',
      title: 'Closing the Local Loop: Mining User Interactions for Continuous DPO Alignment',
      description: 'Turn real-world corrections and thumbs-down feedback into high-yield chosen/rejected preference pairs without external cloud endpoints.',
      metaLine: 'Sep 15, 2026 · 7 min read',
      aliases: ['blog__dpo-flywheel.png', 'og-dpo-flywheel.png'],
    },

    // Getting Started
    {
      section: 'docs',
      path: '/docs/getting-started/quickstart/',
      title: '5-Minute Quickstart: Your First Fine-Tuned Model',
      description: 'Scaffold, compile, calculate hardware recipes, fine-tune locally, and deploy directly to Ollama with a few commands.',
      metaLine: '5 min read · Getting Started',
      aliases: ['docs__getting-started__quickstart.png'],
    },
    {
      section: 'docs',
      path: '/docs/getting-started/installation/',
      title: 'Installation & Hardware Environment Setup',
      description: 'Install MoroAI on NVIDIA Linux, Windows WSL2, and Apple Silicon M1-M4 with verified PyTorch and CUDA stacks.',
      metaLine: 'Python 3.10+ · Setup Guide',
      aliases: ['docs__getting-started__installation.png'],
    },
    {
      section: 'docs',
      path: '/docs/getting-started/introduction/',
      title: 'What is MoroAI? Core Concepts & Workflow',
      description: 'An architectural introduction to local-first model adaptation, data compilation, and consumer GPU fine-tuning.',
      metaLine: 'Documentation Overview',
      aliases: ['docs__getting-started__introduction.png'],
    },
    {
      section: 'docs',
      path: '/docs/getting-started/first-model/',
      title: 'End-to-End Walkthrough: Fine-Tuning Qwen 2.5',
      description: 'A complete step-by-step tutorial taking raw support chats to a fully evaluated, Ollama-served 7B model.',
      metaLine: 'Tutorial · 10 min read',
      aliases: ['docs__getting-started__first-model.png'],
    },

    // Concepts & Architecture
    {
      section: 'docs',
      path: '/docs/concepts/data-compiler/',
      title: 'Epistemic Data Compiler & MI Guard Deep Dive',
      description: 'Mathematical PII scrubbing, Shannon token entropy filtering, synthetic decontamination, and deterministic hashing.',
      metaLine: 'Concepts · Subsystem 01',
      aliases: ['docs__concepts__data-compiler.png'],
    },
    {
      section: 'docs',
      path: '/docs/concepts/recipe-engine/',
      title: 'Hardware VRAM Recipe Predictor Mathematics',
      description: 'Analytical memory formulas calculating weights, optimizer states, KV cache, and activations before allocating 1 byte.',
      metaLine: 'Concepts · Subsystem 02',
      aliases: ['docs__concepts__recipe-engine.png'],
    },
    {
      section: 'docs',
      path: '/docs/concepts/training-engine/',
      title: '5-Level Autonomous OOM Self-Healing Architecture',
      description: 'Dynamic sequence truncation, layer checkpointing, micro-batch halving, LoRA rank reduction, and NF4 fallback.',
      metaLine: 'Concepts · Subsystem 03',
      aliases: ['docs__concepts__training-engine.png'],
    },
    {
      section: 'docs',
      path: '/docs/concepts/eval-harness/',
      title: 'Multi-Layered Evaluation & Regression Assertions',
      description: 'Perplexity benchmarking, JSON schema compliance assertions, and domain terminology preservation scoring.',
      metaLine: 'Concepts · Subsystem 04',
      aliases: ['docs__concepts__eval-harness.png'],
    },
    {
      section: 'docs',
      path: '/docs/concepts/dashboard/',
      title: 'Mission Control UI & Real-Time Telemetry',
      description: 'Live GPU VRAM radial meters, step-by-step loss convergence curves, throughput gauges, and dataset distribution inspection.',
      metaLine: 'Concepts · Web Dashboard',
      aliases: ['docs__concepts__dashboard.png'],
    },
    {
      section: 'docs',
      path: '/docs/concepts/flywheel/',
      title: 'DPO Feedback Flywheel & Continuous Alignment',
      description: 'Capturing user thumbs up/down and manual edits locally to auto-compile preference pairs for offline optimization.',
      metaLine: 'Concepts · Subsystem 06',
      aliases: ['docs__concepts__flywheel.png'],
    },
    {
      section: 'docs',
      path: '/docs/concepts/governance/',
      title: 'Release Governance & Cryptographic Model SBOM',
      description: 'SHA-256 provenance manifests tying dataset snapshots, hyperparameter configurations, and model weights.',
      metaLine: 'Concepts · Subsystem 05',
      aliases: ['docs__concepts__governance.png'],
    },
    {
      section: 'docs',
      path: '/docs/concepts/lineage-graphs/',
      title: 'Model Lineage Graphs & Provenance Tracking',
      description: 'Auditing complete model ancestry: from raw source files to compiled datasets, checkpoint runs, and exported GGUFs.',
      metaLine: 'Concepts · Lineage & Audit',
      aliases: ['docs__concepts__lineage-graphs.png'],
    },

    // Cookbooks
    {
      section: 'cookbook',
      path: '/docs/cookbook/',
      title: 'Production Cookbooks & Implementation Guides',
      description: 'Battle-tested blueprints for customer support bots, structured JSON extractors, code assistants, and legal document analyzers.',
      metaLine: 'Cookbook Overview · Runnable Recipes',
      aliases: ['docs__cookbook.png', 'docs__cookbook__index.png'],
    },
    {
      section: 'cookbook',
      path: '/docs/cookbook/support-bot/',
      title: 'Build a Support Bot That Never Leaves Your Infrastructure',
      description: 'Train a local model on your support docs in 5 minutes, deploy to Ollama, and keep every byte on-prem.',
      metaLine: 'Cookbook · 8 min read',
      aliases: ['docs__cookbook__support-bot.png'],
    },
    {
      section: 'cookbook',
      path: '/docs/cookbook/json-extractor/',
      title: 'Deterministic JSON Extraction With Strict Schema Validation',
      description: 'Fine-tune 1B-3B models to reliably extract structured entities with 100% valid JSON and zero schema hallucinations.',
      metaLine: 'Cookbook · 7 min read',
      aliases: ['docs__cookbook__json-extractor.png'],
    },
    {
      section: 'cookbook',
      path: '/docs/cookbook/code-assistant/',
      title: 'Private Code Assistant Tuned on Internal Repositories',
      description: 'Adapt open coding models on internal framework APIs, private SDKs, and proprietary coding conventions without data leaks.',
      metaLine: 'Cookbook · 9 min read',
      aliases: ['docs__cookbook__code-assistant.png'],
    },
    {
      section: 'cookbook',
      path: '/docs/cookbook/medical-qa/',
      title: 'Clinical Q&A System with HIPAA-Grade Sovereignty',
      description: 'Fine-tune clinical assistants on medical notes and literature with strict air-gapped isolation and zero network calls.',
      metaLine: 'Cookbook · 10 min read',
      aliases: ['docs__cookbook__medical-qa.png'],
    },
    {
      section: 'cookbook',
      path: '/docs/cookbook/legal-analyzer/',
      title: 'Legal Contract Analyzer with Clause Extraction',
      description: 'Train language models on contracts and legal briefs while preserving 100% confidentiality and client privilege.',
      metaLine: 'Cookbook · 8 min read',
      aliases: ['docs__cookbook__legal-analyzer.png'],
    },
    {
      section: 'cookbook',
      path: '/docs/cookbook/document-summarizer/',
      title: 'Domain-Specialized Document Summarizer',
      description: 'Build fast, high-density summarization models that respect corporate guidelines and eliminate generic fluff.',
      metaLine: 'Cookbook · 6 min read',
      aliases: ['docs__cookbook__document-summarizer.png'],
    },

    // CLI Reference
    {
      section: 'cli',
      path: '/docs/cli/',
      title: 'MoroAI CLI Command Reference',
      description: 'Unified command suite for initializing workspaces, compiling data, diagnosing hardware, and launching runs.',
      metaLine: '12 CLI Commands · Complete Reference',
      aliases: ['docs__cli.png', 'docs__cli__index.png'],
    },
    {
      section: 'cli',
      path: '/docs/cli/init/',
      title: 'moro init: Scaffold Adaptation Projects',
      description: 'Initialize declarative workspaces with moro.yaml, folder hierarchies, and dataset templates in seconds.',
      metaLine: 'CLI Reference',
      aliases: ['docs__cli__init.png'],
    },
    {
      section: 'cli',
      path: '/docs/cli/data/',
      title: 'moro data: Compile, Scrub PII, & Audit Quality',
      description: 'Run the Epistemic Data Compiler: PII scrubbing, token entropy filtering, deduplication, and quality reports.',
      metaLine: 'CLI Reference',
      aliases: ['docs__cli__data.png'],
    },
    {
      section: 'cli',
      path: '/docs/cli/recipe/',
      title: 'moro recipe: Mathematical VRAM Heuristic Engine',
      description: 'Derive the optimal LoRA rank, micro-batch size, and sequence length for your exact GPU hardware.',
      metaLine: 'CLI Reference',
      aliases: ['docs__cli__recipe.png'],
    },
    {
      section: 'cli',
      path: '/docs/cli/train/',
      title: 'moro train: Autonomous Fine-Tuning Execution',
      description: 'Execute local LoRA/QLoRA adapter fine-tuning with 5-level autonomous self-healing OOM recovery.',
      metaLine: 'CLI Reference',
      aliases: ['docs__cli__train.png'],
    },
    {
      section: 'cli',
      path: '/docs/cli/eval/',
      title: 'moro eval: Multi-Layer Model Verification',
      description: 'Run benchmark suites, perplexity verification, instruction adherence, and schema assertions.',
      metaLine: 'CLI Reference',
      aliases: ['docs__cli__eval.png'],
    },
    {
      section: 'cli',
      path: '/docs/cli/dashboard/',
      title: 'moro ui: Launch Mission Control Dashboard',
      description: 'Spin up real-time web telemetry server on port 4141 with live loss graphs and GPU meters.',
      metaLine: 'CLI Reference',
      aliases: ['docs__cli__dashboard.png'],
    },
    {
      section: 'cli',
      path: '/docs/cli/flywheel/',
      title: 'moro flywheel: Sync Production Feedback to DPO',
      description: 'Collect thumbs-up/down ratings and user edits to generate preference triplets for offline optimization.',
      metaLine: 'CLI Reference',
      aliases: ['docs__cli__flywheel.png'],
    },
  ];

  let bytes = 0;
  let count = 0;

  for (const p of pages) {
    const defaultSlug = p.path === '/' ? 'home' : p.path.replace(/^\/|\/$/g, '').replace(/\//g, '__');
    const allFilenames = Array.from(new Set([`${defaultSlug}.png`, ...(p.aliases ?? [])]));

    const cardNode = card({ ...p, stars });
    const renderedPng = await satori(cardNode, { width: W, height: H, fonts: FONTS });
    const png = new Resvg(renderedPng, {
      fitTo: { mode: 'width', value: W },
      font: { loadSystemFonts: false, defaultFontFamily: 'Inter' },
    }).render().asPng();

    for (const filename of allFilenames) {
      const fullPath = join('public', 'og', filename);
      const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
      if (dir && !existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(fullPath, png);
      bytes += png.length;
      count++;
    }
    console.log(`✓ Card rendered for: ${p.path} -> ${allFilenames[0]}`);
  }

  // GitHub repository social preview (1280×640)
  console.log('Rendering GitHub social preview (1280x640)...');
  const ghCard = card({
    section: 'home',
    title: 'MoroAI: The Sovereign AI Adaptation Engine',
    description: 'Epistemic data curation · self-healing QLoRA training · drift-aware evals · DPO flywheel · one-click Ollama deploy.',
    path: '/',
    metaLine: 'github.com/moroai/moro',
    stars,
  });
  const ghSvg = await satori(ghCard, { width: 1280, height: 640, fonts: FONTS });
  const ghPng = new Resvg(ghSvg, {
    fitTo: { mode: 'width', value: 1280 },
    font: { loadSystemFonts: false, defaultFontFamily: 'Inter' },
  }).render().asPng();
  writeFileSync(join('public', 'og', 'github-social-preview.png'), ghPng);
  bytes += ghPng.length;
  count++;
  console.log('✓ Generated: public/og/github-social-preview.png (1280x640)');

  // LinkedIn personal banner (1584×396)
  console.log('Rendering LinkedIn personal banner (1584x396)...');
  const liBanner = h(
    'div',
    {
      style: {
        width: 1584,
        height: 396,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 80px',
        background: 'linear-gradient(120deg, #020617 0%, #082f49 55%, #020617 100%)',
        position: 'relative',
        overflow: 'hidden',
      },
    },
    // Background glow
    h('div', {
      style: {
        position: 'absolute',
        left: '20%',
        top: '-50%',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)',
      },
    }),
    h('div', {
      style: {
        position: 'absolute',
        right: '10%',
        bottom: '-50%',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)',
      },
    }),
    // Brand
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 24 } },
      h(
        'div',
        {
          style: {
            width: 72,
            height: 72,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
          },
        },
        h('span', { style: { color: '#fff', fontSize: 44, fontWeight: 800, fontFamily: 'Inter' } }, 'M')
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center' } },
          h('span', { style: { color: '#e2e8f0', fontSize: 52, fontWeight: 800, fontFamily: 'Inter' } }, 'Moro'),
          h('span', { style: { color: '#0ea5e9', fontSize: 52, fontWeight: 800, fontFamily: 'Inter' } }, 'AI')
        ),
        h(
          'span',
          { style: { color: '#94a3b8', fontSize: 20, fontWeight: 500, fontFamily: 'Inter', marginTop: 4 } },
          'The Sovereign AI Adaptation Foundry • Local-First'
        )
      )
    ),
    // Right specs
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } },
      h(
        'span',
        { style: { color: '#38bdf8', fontSize: 22, fontFamily: 'JetBrains Mono', fontWeight: 700 } },
        'Zero Cloud APIs • Zero OOM'
      ),
      h(
        'span',
        { style: { color: '#64748b', fontSize: 18, fontFamily: 'JetBrains Mono', marginTop: 6 } },
        'moroai.cc • Apache-2.0'
      )
    )
  );

  const liSvg = await satori(liBanner, { width: 1584, height: 396, fonts: FONTS });
  const liPng = new Resvg(liSvg, {
    fitTo: { mode: 'width', value: 1584 },
    font: { loadSystemFonts: false, defaultFontFamily: 'Inter' },
  }).render().asPng();
  writeFileSync(join('public', 'og', 'linkedin-banner.png'), liPng);
  bytes += liPng.length;
  count++;
  console.log('✓ Generated: public/og/linkedin-banner.png (1584x396)');

  console.log(`\n🎉 Generated ${count} dynamic OG assets (${(bytes / 1024 / 1024).toFixed(2)} MB total) in public/og/!`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
