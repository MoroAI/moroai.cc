import React, { useState } from 'react';
import {
  Database,
  Cpu,
  Zap,
  Shield,
  Rocket,
  RefreshCcw,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Activity
} from 'lucide-react';

const stages = [
  {
    id: 'data',
    number: '01',
    title: 'Epistemic Compiler',
    subtitle: 'Data Quality & MI Guard',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/40',
    glowColor: 'shadow-blue-500/20',
    summary:
      'Compiles raw logs, code, or knowledge bases into high-density training pairs. Protects rare domain edge cases with Mutual Information Guard.',
    inputs: 'Raw JSONL, Markdown, CSV, DB exports',
    outputs: 'curated_train.jsonl with quality telemetry',
    code: 'moro data build --source ./raw_data.jsonl --mi-guard-threshold 0.85',
    metrics: ['+28% Info Entropy', '0 Rare Facts Lost', '3.4x Token Density'],
  },
  {
    id: 'recipe',
    number: '02',
    title: 'Hardware Predictor',
    subtitle: 'VRAM Pre-Flight Simulation',
    icon: Cpu,
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/40',
    glowColor: 'shadow-emerald-500/20',
    summary:
      'Performs pre-flight mathematical simulation of activation tensors and gradient memory. Generates guaranteed zero-OOM hyperparameter recipes.',
    inputs: 'Base model ID + detected GPU VRAM',
    outputs: 'Optimized moro.yaml with safe batching',
    code: 'moro recipe generate --model Qwen/Qwen2.5-1.5B --hardware detect',
    metrics: ['Zero Out-of-Memory', 'Optimal Rank (r=16)', '100% VRAM Safety Margin'],
  },
  {
    id: 'engine',
    number: '03',
    title: 'Self-Healing Engine',
    subtitle: 'Autonomous OOM Recovery',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/40',
    glowColor: 'shadow-purple-500/20',
    summary:
      'Executes distributed or single-device QLoRA/LoRA training. Listens for memory spikes and loss anomalies with 5-stage automated recovery.',
    inputs: 'moro.yaml recipe + compiled dataset',
    outputs: 'Trained adapter checkpoints + telemetry log',
    code: 'moro train --config moro.yaml --auto-heal',
    metrics: ['5-Step OOM Recovery', 'Auto-Rollback on Loss Explosion', 'Sub-30m Runs'],
  },
  {
    id: 'eval',
    number: '04',
    title: 'Multi-Layer Eval',
    subtitle: 'Deterministic & Adversarial',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    borderColor: 'border-red-500/40',
    glowColor: 'shadow-red-500/20',
    summary:
      'Executes deterministic strict rules, LLM-as-a-judge accuracy, Wasserstein distribution drift detection, and adversarial perturbation stress.',
    inputs: 'Adapter checkpoint + eval suite benchmarks',
    outputs: 'Gate pass/fail decision + audit report',
    code: 'moro eval run --checkpoint ./checkpoints/run_01 --suite full',
    metrics: ['100% Deterministic Pass', 'Drift Bound < 0.05', 'Perturbation Invariance'],
  },
  {
    id: 'release',
    number: '05',
    title: 'Release & Deploy',
    subtitle: 'GGUF & Ollama Serving',
    icon: Rocket,
    color: 'from-indigo-500 to-violet-500',
    borderColor: 'border-indigo-500/40',
    glowColor: 'shadow-indigo-500/20',
    summary:
      'Merges weights, applies GGUF quantization (Q4_K_M/Q8_0), signs cryptographic provenance hashes, and deploys directly into local Ollama/vLLM.',
    inputs: 'Approved checkpoint + target runtime',
    outputs: 'Local Ollama model + SBOM manifest',
    code: 'moro release deploy --target ollama --quantize q4_k_m',
    metrics: ['Instant Ollama Serving', 'Cryptographic SBOM', 'Q4 Quantization (<1GB)'],
  },
  {
    id: 'flywheel',
    number: '06',
    title: 'DPO Flywheel',
    subtitle: 'Continuous Local Alignment',
    icon: RefreshCcw,
    color: 'from-amber-500 to-yellow-500',
    borderColor: 'border-amber-500/40',
    glowColor: 'shadow-amber-500/20',
    summary:
      'Ingests real user interactions and manual revisions into chosen/rejected preference pairs for periodic automated DPO alignment loops.',
    inputs: 'Production feedback & manual edits',
    outputs: 'Preference dataset for next adaptation cycle',
    code: 'moro flywheel process --feedback-log ./feedback.jsonl',
    metrics: ['Local Alignment', 'Closed-Loop Improvement', 'Zero Cloud Leakage'],
  },
];

export default function ArchitectureDiagram() {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <section className="py-24 sm:py-32 bg-dark-900/60 border-y border-dark-800/80 relative" id="architecture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-moro-400 uppercase bg-moro-500/10 border border-moro-500/20 px-3 py-1 rounded-full mb-4 inline-block">
            End-to-End Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            The MoroAI Architecture
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Click on any phase below to inspect the mathematical guarantees, CLI commands,
            and contracts linking raw enterprise data to self-improving local models.
          </p>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = activeStage.id === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage)}
                className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between active:scale-[0.98] ${
                  isSelected
                    ? `bg-dark-800/90 ${stage.borderColor} shadow-lg ${stage.glowColor} scale-[1.02]`
                    : 'bg-dark-950/60 border-dark-800 hover:border-dark-700 hover:bg-dark-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-gray-500">
                      {stage.number}
                    </span>
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center text-white`}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-white leading-tight mb-0.5 sm:mb-1">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-400 line-clamp-1 mt-1 sm:mt-2">
                  {stage.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Inspector Panel */}
        <div className="rounded-2xl border border-dark-700/80 bg-dark-950/90 p-5 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left overview */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-4">
                <span className="font-mono text-xs sm:text-sm font-bold text-moro-400 bg-moro-500/10 px-2 sm:px-2.5 py-1 rounded border border-moro-500/20">
                  STAGE {activeStage.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {activeStage.title}
                </h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {activeStage.summary}
              </p>

              {/* Input / Output Badges */}
              <div className="space-y-2.5 sm:space-y-3 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="text-gray-500 font-mono font-semibold uppercase w-20 shrink-0">
                    Input:
                  </span>
                  <span className="text-gray-300 font-mono bg-dark-900 px-2.5 py-1 rounded border border-dark-800 break-words">
                    {activeStage.inputs}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="text-gray-500 font-mono font-semibold uppercase w-20 shrink-0">
                    Output:
                  </span>
                  <span className="text-sky-300 font-mono bg-dark-900 px-2.5 py-1 rounded border border-dark-800 break-words">
                    {activeStage.outputs}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeStage.metrics.map((m) => (
                  <div
                    key={m}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right command execution card */}
            <div className="lg:col-span-5 bg-dark-900/90 rounded-xl border border-dark-800 p-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-dark-800 text-xs text-gray-400 font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-moro-400" />
                  <span>Execution Interface</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Ready
                </span>
              </div>

              <div className="font-mono text-xs text-gray-300 bg-dark-950 p-3.5 rounded-lg border border-dark-800/80 mb-4 overflow-x-auto">
                <span className="text-emerald-400 select-none mr-2">$</span>
                <span className="text-sky-300">{activeStage.code}</span>
              </div>

              <div className="text-xs text-gray-400 leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <Activity className="w-3.5 h-3.5 text-moro-400" />
                  <span>Subsystem Contracts</span>
                </div>
                <p>
                  Zero external telemetry is sent. The entire process runs under local Python process management with deterministic seeding and file locking.
                </p>
              </div>

              <a
                href="/docs/getting-started/quickstart/"
                className="mt-5 w-full py-2.5 px-4 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
              >
                <span>Read Full Documentation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
