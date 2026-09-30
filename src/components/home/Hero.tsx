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

function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<'build' | 'recipe' | 'train' | 'eval' | 'deploy'>('train');

  const tabs = [
    { id: 'build' as const, label: '1. Data Build', icon: Database },
    { id: 'recipe' as const, label: '2. Recipe Auto', icon: Cpu },
    { id: 'train' as const, label: '3. Train & Heal', icon: Zap },
    { id: 'eval' as const, label: '4. Robust Eval', icon: Shield },
    { id: 'deploy' as const, label: '5. Ollama Deploy', icon: Layers },
  ];

  return (
    <div className="rounded-2xl overflow-hidden border border-dark-700/80 bg-dark-900/95 shadow-2xl shadow-moro-500/10 backdrop-blur-xl">
      {/* Terminal Top Bar */}
      <div className="bg-dark-950 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-dark-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] sm:text-xs text-gray-400 font-mono">
            moro terminal session
          </span>
        </div>

        {/* Step tabs: Touch scrollable on mobile and tablet */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 scroll-smooth">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-moro-500/20 text-moro-300 border border-moro-500/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-dark-800'
                }`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal Content Screen */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-gray-200 min-h-[280px] overflow-x-auto">
        {activeTab === 'build' && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white">moro data build --source ./raw_customer_ops.jsonl</span>
            </div>
            <div className="text-gray-400 mt-2">
              [INFO] Initialized Epistemic Data Compiler (Shannon entropy + semantic dedup)
            </div>
            <div className="text-gray-300">
              [SCAN] Processed 10,480 raw customer operations
            </div>
            <div className="text-sky-400">
              [MI-GUARD] Protected 312 critical boundary cases from semantic pruning
            </div>
            <div className="text-gray-400">
              [DEDUP] Eliminated 2,890 redundant near-duplicate clusters (threshold 0.88)
            </div>
            <div className="text-emerald-400 font-semibold pt-2">
              ✓ Output compiled: ./datasets/curated_train.jsonl (7,590 high-density samples)
            </div>
            <div className="text-gray-500 text-xs">
              Quality Score: 0.942 | Information Gain: +28.4% vs raw baseline
            </div>
          </div>
        )}

        {activeTab === 'recipe' && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white">moro recipe generate --model Qwen/Qwen2.5-1.5B --hardware detect</span>
            </div>
            <div className="text-gray-400 mt-2">
              [HARDWARE] Detected NVIDIA RTX 4070 (12,288 MB VRAM, Compute 8.9)
            </div>
            <div className="text-sky-400">
              [AUDIT] Simulating activation tensors + optimizer memory for seq_len=2048...
            </div>
            <div className="text-yellow-400">
              [ESTIMATE] Predicted Peak VRAM: 7.85 GB (Safe margin: 4.43 GB available)
            </div>
            <div className="text-gray-300 pt-1">
              Selected Recipe: <span className="text-moro-300 font-bold">qwen2.5-1.5b-qlora-r16</span>
            </div>
            <div className="text-gray-400 pl-4 border-l border-dark-700 my-2 space-y-1">
              <div>• lora_r: 16 | lora_alpha: 32 | target_modules: [q, k, v, o, gate, up, down]</div>
              <div>• batch_size: 2 | gradient_accumulation: 8 | lr: 2e-4 (cosine)</div>
              <div>• quantization: 4bit (nf4) | gradient_checkpointing: true</div>
            </div>
            <div className="text-emerald-400 font-semibold">
              ✓ Recipe validated and written to moro.yaml (Zero OOM predicted)
            </div>
          </div>
        )}

        {activeTab === 'train' && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white">moro train --config moro.yaml</span>
            </div>
            <div className="text-gray-400 mt-2">
              [INIT] Moro Engine v0.1.0 starting training loop with Auto-Recovery daemon...
            </div>
            <div className="text-gray-300">
              Epoch 1/3 | Step 100/1200 | Loss: 1.842 | Perplexity: 6.31 | VRAM: 7.4GB
            </div>
            <div className="text-yellow-400 bg-yellow-950/30 p-2 rounded border border-yellow-800/40 my-2">
              [OOM-GUARD TRIGGERED] Spurious CUDA spike detected at step 340 (seq_len burst)
              <br />
              <span className="text-yellow-200">
                ⚡ Executing Step 2 Recovery: Emptied CUDA cache + reduced micro-batch to 1 + increased accum to 16
              </span>
            </div>
            <div className="text-sky-400">
              [RESUME] Training resumed seamlessly from step 339 checkpoint without crash!
            </div>
            <div className="text-gray-300">
              Epoch 3/3 | Step 1200/1200 | Loss: 0.741 | Convergence verified
            </div>
            <div className="text-emerald-400 font-semibold pt-1">
              ✓ Training completed successfully in 28m 14s. Final adapter: ./checkpoints/run_01/
            </div>
          </div>
        )}

        {activeTab === 'eval' && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white">moro eval run --checkpoint ./checkpoints/run_01 --suite full</span>
            </div>
            <div className="text-gray-400 mt-2">
              [SUITE] Executing Deterministic Rules + LLM Judge + Adversarial Perturbations...
            </div>
            <div className="text-gray-300">
              1. Deterministic Strict Rules (40 tests): <span className="text-emerald-400 font-bold">100.0% Pass</span>
            </div>
            <div className="text-gray-300">
              2. Semantic Accuracy against Gold Standard: <span className="text-emerald-400 font-bold">94.8% Pass</span> (+18.2% vs base)
            </div>
            <div className="text-gray-300">
              3. Drift Detection (Wasserstein metric): <span className="text-emerald-400 font-bold">0.021</span> (Within safe bound &lt; 0.05)
            </div>
            <div className="text-gray-300">
              4. Adversarial Typo & Perturbation Stress: <span className="text-emerald-400 font-bold">92.4% Pass</span>
            </div>
            <div className="text-emerald-400 font-semibold pt-2">
              ✓ Gate PASSED: Model qualifies for automated release candidate status.
            </div>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white">moro release deploy --target ollama --quantize q4_k_m</span>
            </div>
            <div className="text-gray-400 mt-2">
              [EXPORT] Merging LoRA adapter weights with base Qwen2.5-1.5B...
            </div>
            <div className="text-gray-300">
              [GGUF] Quantizing model weights to Q4_K_M format (Size: 980 MB)
            </div>
            <div className="text-sky-400">
              [PROVENANCE] Generating cryptographic SHA-256 signature and BOM manifest...
            </div>
            <div className="text-gray-300">
              [OLLAMA] Injecting Modelfile into local Ollama runtime as <span className="text-moro-300">moro-custom:v1</span>
            </div>
            <div className="text-emerald-400 font-semibold pt-2">
              ✓ Deployed! Test immediately with:
            </div>
            <div className="bg-dark-950 p-2.5 rounded border border-dark-800 text-sky-300 font-bold">
              ollama run moro-custom:v1 "Summarize our quarterly compliance audit log"
            </div>
          </div>
        )}

        {/* Prompt cursor blink */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-dark-800 text-gray-500">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="animate-pulse text-moro-400">█</span>
        </div>
      </div>
    </div>
  );
}
