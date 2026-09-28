# moroai.cc — Official Marketing Website for MoroAI

> The definitive digital storefront and documentation hub for **MoroAI** — the local-first, mathematically rigorous open-source platform for fine-tuning private language models.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Framework](https://img.shields.io/badge/framework-Astro%204-BC52EE.svg)](https://astro.build)
[![Styling](https://img.shields.io/badge/styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com)
[![Deployment](https://img.shields.io/badge/deploy-Cloudflare%20Pages-F38020.svg)](https://pages.cloudflare.com)

---

## 🌟 Vision

**MoroAI** transforms private enterprise and personal data into reliable, deployable local language models on consumer GPUs without cloud dependencies or data leakage.

This repository powers **[moroai.cc](https://moroai.cc)**:
- **Explains** the 6 foundational subsystems (Epistemic Data Compiler with MI Guard, Hardware-Aware Recipe Engine, Self-Healing Training, Multi-Layer Eval, Release Governance SBOM, and DPO Flywheel).
- **Demonstrates** the workflow through an interactive terminal emulator and architectural inspector.
- **Provides** complete quickstart tutorials, CLI manuals, and engineering research papers.
- **Ranks** for sovereign AI, local fine-tuning, and zero-OOM machine learning workflows.

---

## 🛠️ Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **SSG Framework** | [Astro 4](https://astro.build) | Zero-JS by default, ultra-fast TTFB, perfect Core Web Vitals |
| **Component Islands** | [React 18](https://react.dev) | Interactive terminal simulation, stateful tabs, dynamic filters |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com) | Curated dark mode palette (`moro` and `dark` tokens), glassmorphism |
| **Icons** | [Lucide React](https://lucide.dev) | Consistent, modern vector icon set |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth UI micro-interactions |
| **Hosting & CDN** | [Cloudflare Pages](https://pages.cloudflare.com) | Worldwide edge CDN with instant cache invalidation |

---

## 📂 Project Structure

```text
moroai.cc/
├── .github/workflows/deploy.yml   # Cloudflare Pages CI/CD pipeline
├── astro.config.mjs               # Astro integrations & markdown config
├── tailwind.config.mjs            # Brand color tokens & custom keyframes
├── tsconfig.json                  # TypeScript compiler options & aliases
├── wrangler.toml                  # Cloudflare Pages deployment spec
├── public/
│   ├── favicon.svg                # Vector neural logo favicon
│   ├── logo.svg                   # Brand mark + wordmark
│   └── robots.txt                 # Search crawler instructions
├── src/
│   ├── components/
│   │   ├── home/                  # Hero, FeatureGrid, ComparisonTable, ArchitectureDiagram, Testimonials
│   │   └── navigation/            # Header, Footer
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Root HTML with SEO, OpenGraph & analytics
│   │   └── DocsLayout.astro       # Sticky sidebar layout for documentation
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── features.astro         # Technical deep-dive on all 6 subsystems
│   │   ├── pricing.astro          # Free Open Source vs Enterprise Support
│   │   ├── about.astro            # Mission, origin story, and architectural values
│   │   ├── community.astro        # Discord, GitHub, contribution guidelines
│   │   ├── changelog.astro        # Version release history (v0.1.0)
│   │   ├── 404.astro              # Custom error page
│   │   ├── blog/                  # Engineering blog index & dynamic slug articles
│   │   ├── docs/                  # Getting started, installation, quickstart, CLI reference
│   │   ├── rss.xml.js             # RSS feed generator
│   │   └── sitemap-index.xml.js   # Automated XML sitemap
│   ├── styles/
│   │   └── global.css             # Tailwind layers, scrollbars, and glassmorphic cards
│   └── utils/
│       └── cn.ts                  # Classnames merger utility
└── package.json
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm 9+

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev
# -> Local server running at http://localhost:4321

# 3. Build static production bundle
npm run build
# -> Output generated in ./dist

# 4. Preview production build locally
npm run preview
```

---

## 🚢 Cloudflare Pages Deployment

Deployments are automated via `.github/workflows/deploy.yml` on push to the `main` branch.

To deploy manually via the Cloudflare CLI:

```bash
npx wrangler pages deploy dist --project-name moroai-website
```

---

## 📄 License

This website and all associated documentation are licensed under the [Apache 2.0 License](LICENSE).
