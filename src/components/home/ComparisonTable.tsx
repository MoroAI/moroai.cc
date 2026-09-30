import React from 'react';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';

const rows = [
  {
    feature: 'Data Quality & Curation',
    moro: 'Epistemic + MI Guard',
    moroHighlight: true,
    axolotl: 'Basic filtering',
    unsloth: 'None',
    llamafactory: 'Basic regex',
    detail: 'Preserves rare edge cases with information-theoretic mutual information guard.',
  },
  {
    feature: 'Edge-Case Preservation',
    moro: 'Guaranteed (MI Guard)',
    moroHighlight: true,
    axolotl: 'No',
    unsloth: 'No',
    llamafactory: 'No',
    detail: 'Prevents rare but vital domain rules from being pruned during deduplication.',
  },
  {
    feature: 'VRAM Pre-Flight Simulation',
    moro: 'Exact Tensor Simulation',
    moroHighlight: true,
    axolotl: 'Manual Guesswork',
    unsloth: 'VRAM Rule of Thumb',
    llamafactory: 'None',
    detail: 'Calculates memory requirements before launching to guarantee zero OOM aborts.',
  },
  {
    feature: 'Autonomous OOM Auto-Recovery',
    moro: '5-Step Autonomous Healing',
    moroHighlight: true,
    axolotl: 'Crashes on OOM',
    unsloth: 'Crashes on OOM',
    llamafactory: 'Crashes on OOM',
    detail: 'Dynamically resizes micro-batches, flushes cache, and resumes without losing progress.',
  },
  {
    feature: 'Loss-Spike Anomaly Rollback',
    moro: 'Automated Checkpoint Revert',
    moroHighlight: true,
    axolotl: 'Manual',
    unsloth: 'Manual',
    llamafactory: 'Manual',
    detail: 'Monitors loss telemetry in real-time; rolls back automatically if divergence occurs.',
  },
  {
    feature: 'Multi-Layer Evaluation',
    moro: 'Rules + Drift + LLM Judge',
    moroHighlight: true,
    axolotl: 'Loss metric only',
    unsloth: 'Loss metric only',
    llamafactory: 'Basic BLEU/ROUGE',
    detail: 'Includes Wasserstein drift detection and deterministic assertions.',
  },
  {
    feature: 'Adversarial Stress Testing',
    moro: 'Built-in Perturbation Engine',
    moroHighlight: true,
    axolotl: 'No',
    unsloth: 'No',
    llamafactory: 'No',
    detail: 'Injects syntactic typos and character swaps to test model stability.',
  },
  {
    feature: 'Cryptographic Provenance (SBOM)',
    moro: 'SHA-256 Manifest + Gate Audit',
    moroHighlight: true,
    axolotl: 'No',
    unsloth: 'No',
    llamafactory: 'No',
    detail: 'Enterprise audit trail linking exact dataset hashes, recipes, and weights.',
  },
  {
    feature: 'Interactive Mission Control UI',
    moro: 'Real-time Web Dashboard',
    moroHighlight: true,
    axolotl: 'CLI only',
    unsloth: 'CLI / Notebook',
    llamafactory: 'Gradio demo',
    detail: 'Modern browser UI for dataset uploads, training control, and comparison.',
  },
  {
    feature: 'One-Click Local Deployment',
    moro: 'Direct Ollama / GGUF Export',
    moroHighlight: true,
    axolotl: 'Manual conversion script',
    unsloth: 'Manual llama.cpp steps',
    llamafactory: 'Manual export commands',
    detail: 'Quantizes to GGUF and registers into local Ollama in one command.',
  },
  {
    feature: 'Continuous DPO Flywheel',
    moro: 'Closed-Loop Feedback Mining',
    moroHighlight: true,
    axolotl: 'Separate DPO script',
    unsloth: 'Manual dataset preparation',
    llamafactory: 'Manual pairs',
    detail: 'Automatically generates preference pairs from production interaction logs.',
  },
  {
    feature: 'Plugin Architecture',
    moro: 'Python setuptools entry_points',
    moroHighlight: true,
    axolotl: 'Hardcoded scripts',
    unsloth: 'Proprietary core',
    llamafactory: 'Forks required',
    detail: 'Extend data loaders, custom evaluators, and deployment targets cleanly.',
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-24 sm:py-32 bg-dark-950 relative" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-moro-400 uppercase bg-moro-500/10 border border-moro-500/20 px-3 py-1 rounded-full mb-4 inline-block">
            Competitive Matrix
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Why Teams Choose MoroAI
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Other tools are mere training wrappers. MoroAI is a complete, self-healing,
            auditable adaptation foundry engineered for dependable local production.
          </p>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="sm:hidden flex items-center justify-between text-[11px] text-gray-400 font-mono mb-3 px-1">
          <span className="flex items-center gap-1.5 text-moro-400">
            <span>← Swipe horizontally to compare →</span>
          </span>
          <span className="bg-dark-900 border border-dark-800 px-2 py-0.5 rounded text-[10px] text-gray-300">
            MoroAI vs 3 Tools
          </span>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-dark-800 bg-dark-900/60 shadow-2xl backdrop-blur-xl -mx-4 sm:mx-0 scroll-smooth">
          <table className="w-full text-left border-separate border-spacing-0 min-w-[700px] sm:min-w-[760px]">
            <thead>
              <tr className="bg-dark-900/95 text-xs sm:text-sm">
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-semibold text-gray-300 w-2/5 sm:w-1/3 sticky left-0 z-20 bg-dark-950 sm:bg-dark-900/95 border-b border-r border-dark-800 backdrop-blur-md">
                  Capability
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 font-extrabold text-moro-400 bg-moro-500/10 border-b border-x border-moro-500/30 text-center w-1/4">
                  <div className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-moro-400" />
                    <span>MoroAI</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-normal text-moro-300/80 font-mono mt-0.5">
                    Full Platform
                  </div>
                </th>
                <th className="py-4 sm:py-5 px-3 sm:px-4 font-semibold text-gray-400 text-center border-b border-dark-800">
                  Axolotl
                </th>
                <th className="py-4 sm:py-5 px-3 sm:px-4 font-semibold text-gray-400 text-center border-b border-dark-800">
                  Unsloth
                </th>
                <th className="py-4 sm:py-5 px-3 sm:px-4 font-semibold text-gray-400 text-center border-b border-dark-800">
                  LLaMA-Factory
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800/80 text-xs sm:text-sm">
              {rows.map((row) => (
                <tr key={row.feature} className="hover:bg-dark-800/40 transition-colors">
                  {/* Sticky Feature & detail column */}
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 sticky left-0 z-10 bg-dark-950/95 sm:bg-dark-900/95 border-r border-b border-dark-800/80 backdrop-blur-md">
                    <div className="font-semibold text-white mb-0.5 text-xs sm:text-sm">{row.feature}</div>
                    <div className="text-[11px] text-gray-400 hidden sm:block">{row.detail}</div>
                  </td>

                  {/* MoroAI Column */}
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 bg-moro-500/5 border-x border-b border-moro-500/20 text-center">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 font-bold text-moro-300 text-xs sm:text-sm">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                      <span>{row.moro}</span>
                    </span>
                  </td>

                  {/* Axolotl */}
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-center text-gray-400 border-b border-dark-800/80">
                    {row.axolotl === 'No' ? (
                      <span className="inline-flex items-center gap-1 text-red-400/80">
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>No</span>
                      </span>
                    ) : (
                      <span>{row.axolotl}</span>
                    )}
                  </td>

                  {/* Unsloth */}
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-center text-gray-400 border-b border-dark-800/80">
                    {row.unsloth === 'No' || row.unsloth === 'None' ? (
                      <span className="inline-flex items-center gap-1 text-red-400/80">
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{row.unsloth}</span>
                      </span>
                    ) : (
                      <span>{row.unsloth}</span>
                    )}
                  </td>

                  {/* LLaMA-Factory */}
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-center text-gray-400 border-b border-dark-800/80">
                    {row.llamafactory === 'No' ? (
                      <span className="inline-flex items-center gap-1 text-red-400/80">
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>No</span>
                      </span>
                    ) : (
                      <span>{row.llamafactory}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
