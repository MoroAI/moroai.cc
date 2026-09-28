import React from 'react';
import { Github, Twitter, Disc as Discord, Shield, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800/80 relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-moro-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-dark-900 to-dark-800 border border-dark-700/80 flex items-center justify-center p-2 shadow-md">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <path
                    d="M24 72V30L50 56L76 30V72"
                    stroke="#38bdf8"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Moro<span className="text-moro-400">AI</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 -mt-1">
                  Local-First AI Foundry
                </span>
              </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              MoroAI transforms private organizational data into reliable, specialized, deployable local language models.
              Zero cloud lock-in. Complete epistemic control.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/moroai/moro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-900 border border-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-dark-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/moroai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-900 border border-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-dark-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg/moroai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-900 border border-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-dark-700 transition-colors"
                aria-label="Discord"
              >
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Architecture
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/features/#data-compiler" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Data Compiler & MI Guard
                </a>
              </li>
              <li>
                <a href="/features/#recipe-engine" className="text-gray-400 hover:text-moro-300 transition-colors">
                  VRAM Recipe Predictor
                </a>
              </li>
              <li>
                <a href="/features/#training-engine" className="text-gray-400 hover:text-moro-300 transition-colors">
                  OOM Auto-Recovery
                </a>
              </li>
              <li>
                <a href="/features/#eval-harness" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Multi-Layered Eval
                </a>
              </li>
              <li>
                <a href="/features/#flywheel" className="text-gray-400 hover:text-moro-300 transition-colors">
                  DPO Feedback Flywheel
                </a>
              </li>
              <li>
                <a href="/features/#dashboard" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Mission Control UI
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/docs/getting-started/introduction/" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/docs/getting-started/quickstart/" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Quickstart Guide
                </a>
              </li>
              <li>
                <a href="/docs/api/cli/" className="text-gray-400 hover:text-moro-300 transition-colors">
                  CLI Reference
                </a>
              </li>
              <li>
                <a href="/changelog" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Changelog & Releases
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Engineering Blog
                </a>
              </li>
              <li>
                <a href="https://pypi.org/project/moroai/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-moro-300 transition-colors">
                  PyPI Package
                </a>
              </li>
            </ul>
          </div>

          {/* Open Source & Community */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Community
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/community" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Contribute
                </a>
              </li>
              <li>
                <a href="https://github.com/moroai/moro/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Issue Tracker
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-moro-300 transition-colors">
                  About the Project
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Open Source & Enterprise
                </a>
              </li>
              <li>
                <a href="https://github.com/moroai/moro/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-moro-300 transition-colors">
                  Apache 2.0 License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with privacy declaration */}
        <div className="pt-8 border-t border-dark-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Local-First: Your weights, training data, and metrics never leave your infrastructure.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} MoroAI Foundation. Built with pride for the open-source AI community.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
