import React from 'react';
import {
  Database,
  Cpu,
  Zap,
  Shield,
  RefreshCcw,
  Rocket,
  FileCheck,
  LayoutDashboard,
  LineChart,
  Boxes,
  Flame,
  Lock,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Epistemic Data Compiler',
    description:
      'Information-theoretic curation with MI Guard. Rare boundary facts and domain specifics are mathematically preserved rather than pruned as outliers.',
    color: 'from-blue-500 to-cyan-500',
    link: '/features/#data-compiler',
    tag: 'Core Innovation',
  },
  {
    icon: Cpu,
    title: 'Hardware-Aware Recipes',
    description:
      'Pre-flight VRAM audit predicts memory requirements down to the megabyte. Automatically configures LoRA rank, quantization, and batching for your exact GPU.',
    color: 'from-emerald-500 to-teal-500',
    link: '/features/#recipe-engine',
    tag: 'Zero Crash',
  },
  {
    icon: Zap,
    title: 'Self-Healing Training',
    description:
      '5-step automatic OOM recovery engine. When memory spikes or loss explodes, MoroAI empties cache, resizes gradients, and rolls back checkpoints automatically.',
    color: 'from-purple-500 to-pink-500',
    link: '/features/#training-engine',
    tag: 'Autonomous',
  },
  {
    icon: Shield,
    title: 'Multi-Layered Evaluation',
    description:
      'Deterministic validation rules, semantic accuracy judges, Wasserstein drift detection, and adversarial perturbation stress tests prove model stability.',
    color: 'from-red-500 to-orange-500',
    link: '/features/#eval-harness',
    tag: 'Safety & Quality',
  },
  {
    icon: RefreshCcw,
    title: 'DPO Feedback Flywheel',
    description:
      'Turn production queries and corrections into preference pairs. Close the learning loop locally so your model continuously improves with zero cloud exposure.',
    color: 'from-amber-500 to-yellow-500',
    link: '/features/#flywheel',
    tag: 'Continuous',
  },
  {
    icon: Rocket,
    title: 'One-Click Deployment',
    description:
      'Directly export to GGUF format with customized quantization (Q4_K_M, Q8_0) and register into local Ollama, vLLM, or Docker in a single CLI command.',
    color: 'from-indigo-500 to-violet-500',
    link: '/features/#deployment',
    tag: 'Instant Serving',
  },
  {
    icon: FileCheck,
    title: 'Cryptographic Provenance',
    description:
      'Full Software Bill of Materials (SBOM) with cryptographic hashes linking the compiled dataset, hyperparameter recipe, and training weights for audit compliance.',
    color: 'from-teal-500 to-emerald-500',
    link: '/features/#governance',
    tag: 'Audit Ready',
  },
  {
    icon: LayoutDashboard,
    title: 'Mission Control Dashboard',
    description:
      'Modern, reactive web control center. Drag-and-drop training datasets, watch real-time GPU metrics and loss curves, and trigger evaluations visually.',
    color: 'from-pink-500 to-rose-500',
    link: '/features/#dashboard',
    tag: 'Interactive UI',
  },
  {
    icon: LineChart,
    title: 'Experiment Analytics',
    description:
      'Cross-run comparative analytics and hyperparameter Pareto frontier visualization. Discover which data slices yielded the highest benchmark jump.',
    color: 'from-cyan-500 to-blue-500',
    link: '/features/#analytics',
    tag: 'Insights',
  },
  {
    icon: Boxes,
    title: 'Modular Plugin System',
    description:
      'Clean Python entry-points for custom tokenizers, data loaders, loss criteria, and enterprise deployment backends. Extend without modifying core code.',
    color: 'from-lime-500 to-green-500',
    link: '/features/#plugins',
    tag: 'Extensible',
  },
  {
    icon: Flame,
    title: 'Optimized for Consumer GPUs',
    description:
      'Built specifically to run 1.5B to 14B parameter models on single consumer graphics cards (RTX 3060, 4070, Apple Silicon M-series, or AMD ROCm).',
    color: 'from-orange-500 to-amber-500',
    link: '/features/#hardware',
    tag: 'Consumer Hardware',
  },
  {
    icon: Lock,
    title: '100% Private & Sovereign',
    description:
      'True local-first execution. Training data, model weights, and telemetry never leave your workstation or private VPC. No external API dependencies.',
    color: 'from-slate-400 to-gray-400',
    link: '/features/#privacy',
    tag: 'Absolute Privacy',
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-24 sm:py-32 bg-dark-950 relative overflow-hidden" id="features">
      {/* Background ambient radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-radial-gradient from-moro-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-moro-400 uppercase bg-moro-500/10 border border-moro-500/20 px-3 py-1 rounded-full mb-4 inline-block">
            Subsystems & Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            The Complete Lifecycle for{' '}
            <span className="bg-gradient-to-r from-moro-400 to-purple-400 bg-clip-text text-transparent">
              Private AI Models
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Other tools only provide a training script. MoroAI is a complete, reliable, production-grade
            local adaptation pipeline from raw enterprise documents to audited deployment.
          </p>
        </div>

        {/* 12-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <a
                key={feature.title}
                href={feature.link}
                className="group relative p-6 sm:p-7 rounded-2xl bg-dark-900/60 border border-dark-800 hover:border-moro-500/40 hover:bg-dark-900/90 transition-all duration-300 hover:shadow-xl hover:shadow-moro-500/10 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-moro-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-moro-300 bg-moro-500/10 border border-moro-500/20 px-2.5 py-1 rounded-full">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-moro-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-moro-400 group-hover:text-moro-300 transition-colors">
                  <span>Explore deep dive</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
