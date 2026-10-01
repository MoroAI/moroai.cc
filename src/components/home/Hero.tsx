import React, { useState } from 'react';
import {
  ArrowRight,
  Github,
  Star,
  Terminal,
  Zap,
  Shield,
  RefreshCcw,
  Copy,
  Check,
  Cpu,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import InteractiveTerminal from './InteractiveTerminal';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText('pip install moroai');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex flex-col items-center justify-center overflow-hidden bg-dark-950">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(14,165,233,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Glowing floating gradient orbs */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-moro-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div
        className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-float"
        style={{ animationDelay: '-3s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-moro-500/15 via-sky-500/10 to-purple-500/15 border border-moro-500/30 text-moro-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-lg shadow-moro-500/10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-moro-400 animate-pulse" />
          <span className="text-gray-300">Announcing MoroAI v0.1.0</span>
          <span className="text-gray-500">•</span>
          <span className="font-semibold text-moro-400">Open Source Local Model Foundry</span>
          <ArrowRight className="w-3.5 h-3.5 text-moro-400" />
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-5xl mx-auto leading-[1.1]">
          Build Private AI.{' '}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-moro-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            Own Your Models.
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          MoroAI transforms private datasets into dependable, high-yield local language models.
          Equipped with information-theoretic data compilation, VRAM pre-flight prediction,
          and automatic 5-step self-healing OOM recovery.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="/docs/getting-started/quickstart/"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-moro-500 to-sky-600 hover:from-moro-400 hover:to-sky-500 text-white rounded-xl font-semibold text-base shadow-xl shadow-moro-500/25 hover:shadow-moro-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Start Free in 60s</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://github.com/moroai/moro"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-dark-900/90 hover:bg-dark-800 text-white rounded-xl font-semibold text-base border border-dark-700 hover:border-dark-600 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg"
          >
            <Github className="w-5 h-5" />
            <span>GitHub Repository</span>
            <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20 ml-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              <span>Star</span>
            </span>
          </a>
        </div>

        {/* Quick Install Copy Snippet */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-3 bg-dark-900/90 border border-dark-800 px-4 py-2.5 rounded-xl font-mono text-sm text-gray-300 shadow-inner">
            <span className="text-moro-400 select-none">$</span>
            <span>pip install moroai</span>
            <button
              onClick={copyInstall}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-dark-800 transition-colors ml-2"
              title="Copy install command"
              aria-label="Copy install command"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-dark-900/70 border border-dark-800 text-[11px] sm:text-sm text-gray-300">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-moro-400 shrink-0" />
            <span className="truncate">CLI + Web UI</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-dark-900/70 border border-dark-800 text-[11px] sm:text-sm text-gray-300">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 shrink-0" />
            <span className="truncate">OOM Recovery</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-dark-900/70 border border-dark-800 text-[11px] sm:text-sm text-gray-300">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Provenance SBOM</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-dark-900/70 border border-dark-800 text-[11px] sm:text-sm text-gray-300">
            <RefreshCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
            <span className="truncate">DPO Flywheel</span>
          </div>
        </div>

        {/* Interactive Multi-Tab Terminal Demo */}
        <div className="max-w-4xl mx-auto text-left w-full">
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
}
