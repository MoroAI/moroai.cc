import React, { useState, useEffect } from 'react';
import { Github, Star, Menu, X, ArrowRight, Sparkles, Terminal } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/85 backdrop-blur-md border-b border-dark-800/80 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-dark-900 to-dark-800 border border-dark-700/80 flex items-center justify-center p-2 group-hover:border-moro-500/50 transition-all duration-300 shadow-md group-hover:shadow-moro-500/20">
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
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-moro-300 transition-colors">
                Moro<span className="text-moro-400">AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 -mt-1">
                Local-First
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-dark-900/60 backdrop-blur-md border border-dark-800/80 px-4 py-1.5 rounded-full shadow-inner">
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

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/moroai/moro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-900/80 hover:bg-dark-800 text-gray-200 hover:text-white text-sm font-medium border border-dark-700/80 hover:border-dark-600 transition-all duration-200 group"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <span>GitHub</span>
              <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded-md border border-yellow-400/20 ml-1">
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

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://github.com/moroai/moro"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-dark-900 border border-dark-800 text-gray-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-900 border border-dark-800 text-gray-300 hover:text-white hover:bg-dark-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-dark-800 bg-dark-950/95 backdrop-blur-xl px-4 pt-3 pb-6 mt-3 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-2">
            <a
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-900 font-medium"
            >
              Features
            </a>
            <a
              href="/docs/getting-started/introduction/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-900 font-medium"
            >
              Documentation
            </a>
            <a
              href="/#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-900 font-medium"
            >
              Architecture
            </a>
            <a
              href="/#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-900 font-medium"
            >
              Comparison
            </a>
            <a
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-900 font-medium"
            >
              Pricing
            </a>
            <a
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-900 font-medium"
            >
              Blog
            </a>
            <a
              href="/community"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-900 font-medium"
            >
              Community
            </a>
            <div className="pt-3 border-t border-dark-800 flex flex-col gap-2">
              <a
                href="/docs/getting-started/quickstart/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-xl bg-moro-500 hover:bg-moro-400 text-white font-semibold transition-colors"
              >
                Quick Start Guide
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
