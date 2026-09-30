import React, { useState, useEffect } from 'react';
import {
  Github,
  Star,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Copy,
  Check,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const copyInstall = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('pip install moroai');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-950/85 backdrop-blur-xl border-b border-dark-800/80 shadow-lg shadow-black/40 py-2.5 sm:py-3'
            : 'bg-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none" aria-label="MoroAI Home">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-dark-900 to-dark-800 border border-dark-700/80 flex items-center justify-center p-2 group-hover:border-moro-500/50 transition-all duration-300 shadow-md group-hover:shadow-moro-500/20 shrink-0">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="navMoroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M24 72V30L50 56L76 30V72"
                    stroke="url(#navMoroGrad)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-moro-300 transition-colors">
                  Moro<span className="text-moro-400">AI</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-gray-400 -mt-1">
                  Local-First
                </span>
              </div>
            </a>

            {/* Desktop Navigation (large screens >= lg) */}
            <nav className="hidden lg:flex items-center gap-1 bg-dark-900/60 backdrop-blur-md border border-dark-800/80 px-4 py-1.5 rounded-full shadow-inner">
              <a
                href="/features"
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-dark-800/70 transition-all"
              >
                Features
              </a>
              <a
                href="/docs/getting-started/introduction/"
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-dark-800/70 transition-all"
              >
                Docs
              </a>
              <a
                href="/#architecture"
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-dark-800/70 transition-all"
              >
                Architecture
              </a>
              <a
                href="/#comparison"
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-dark-800/70 transition-all"
              >
                Comparison
              </a>
              <a
                href="/pricing"
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-dark-800/70 transition-all"
              >
                Pricing
              </a>
              <a
                href="/blog"
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-dark-800/70 transition-all"
              >
                Blog
              </a>
              <a
                href="/community"
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-dark-800/70 transition-all"
              >
                Community
              </a>
            </nav>

            {/* Right Action Buttons on Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com/moroai/moro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-900/80 hover:bg-dark-800 text-gray-200 hover:text-white text-sm font-medium border border-dark-700/80 hover:border-dark-600 transition-all duration-200 group"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                <span>GitHub</span>
                <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded-md border border-yellow-400/20 ml-0.5">
                  <Star className="w-3 h-3 fill-yellow-400" />
                  <span>v0.1.0</span>
                </span>
              </a>

              <a
                href="/docs/getting-started/quickstart/"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-moro-500 to-sky-600 hover:from-moro-400 hover:to-sky-500 text-white text-sm font-semibold shadow-md shadow-moro-500/20 hover:shadow-moro-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile & Tablet Toggle Controls (< lg) */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="https://github.com/moroai/moro"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-dark-900/80 border border-dark-800 text-gray-300 hover:text-white hover:border-dark-700 transition-all flex items-center gap-1.5 text-xs font-medium"
                aria-label="GitHub repository"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Star</span>
                <span className="text-[10px] text-yellow-400 font-mono">★</span>
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-dark-900/80 border border-dark-800 text-gray-300 hover:text-white hover:bg-dark-800 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-moro-500/50"
                aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-moro-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Modal (< lg) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop overlay with blur */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-dark-950/95 border-l border-dark-800/90 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 backdrop-blur-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-dark-800/80 mb-6">
                <a
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-dark-900 to-dark-800 border border-dark-700/80 flex items-center justify-center p-1.5">
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
                  <span className="font-extrabold text-white text-base">
                    Moro<span className="text-moro-400">AI</span>
                  </span>
                </a>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-dark-900 border border-dark-800 text-gray-400 hover:text-white hover:bg-dark-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Install Banner inside drawer */}
              <div className="mb-6 p-3 rounded-xl bg-dark-900/90 border border-dark-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-gray-300">
                  <span className="text-moro-400 select-none">$</span>
                  <span>pip install moroai</span>
                </div>
                <button
                  onClick={copyInstall}
                  className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
                  title="Copy install command"
                  aria-label="Copy install command"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Categorized Navigation */}
              <div className="space-y-6">
                {/* Platform */}
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold mb-2">
                    Foundry Platform
                  </h4>
                  <div className="space-y-1">
                    <a
                      href="/features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Features & Subsystems</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/#architecture"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>6-Stage Pipeline</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/#comparison"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Comparison Matrix</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Pricing & Licensing</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                  </div>
                </div>

                {/* Documentation & Developers */}
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-moro-400 font-bold mb-2">
                    Documentation & Guides
                  </h4>
                  <div className="space-y-1">
                    <a
                      href="/docs/getting-started/quickstart/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-moro-300 hover:text-white hover:bg-moro-500/10 transition-colors"
                    >
                      <span className="font-semibold">⚡ Quickstart (5 min)</span>
                      <ChevronRight className="w-4 h-4 text-moro-400" />
                    </a>
                    <a
                      href="/docs/getting-started/introduction/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Introduction</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/docs/cookbook/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Cookbook Recipes</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/docs/cli/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>CLI Command Reference</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/docs/api/python/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Python SDK</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                  </div>
                </div>

                {/* Company & Community */}
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold mb-2">
                    Ecosystem
                  </h4>
                  <div className="space-y-1">
                    <a
                      href="/blog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Engineering Blog</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>About & Creator</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/changelog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Changelog (v0.1.0)</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                    <a
                      href="/community"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-900 transition-colors"
                    >
                      <span>Community & Governance</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-dark-800/80 mt-6 space-y-3">
              <a
                href="/docs/getting-started/quickstart/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-moro-500 to-sky-600 hover:from-moro-400 hover:to-sky-500 text-white font-semibold text-center text-sm shadow-lg shadow-moro-500/20 flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/moroai/moro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-dark-900 hover:bg-dark-800 text-gray-200 hover:text-white font-medium text-center text-xs border border-dark-800 flex items-center justify-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <span className="text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded text-[10px] ml-1">
                  v0.1.0
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
