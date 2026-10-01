// src/components/tools/MiGuardSimulator.tsx
import { useMemo, useState } from 'react';
import { ShieldCheck, Scissors, Sparkles, Filter, RefreshCw, AlertCircle } from 'lucide-react';

const DEFAULT_GLOSSARY = [
  'bioequivalence',
  'contraindication',
  'pharmacokinetics',
  'stability',
  'ctd',
  'nafdac',
  'cpp',
];

const DEFAULT_ROWS = [
  'The bioequivalence study demonstrated Cmax ratios within the 80-125% confidence interval.',
  'Click here now!!! Amazing deals wait for you here click click click!!!',
  'Please refer to section 4.2 of the standard operating procedure for guidelines.',
  'Senegal ARP Article 12 requires a CPP under the WHO certification scheme for imported products.',
  'asdfgh jkl qwerty uiop zxcvbnm 404 error null undefined',
];

async function gzipRatio(text: string): Promise<number> {
  const bytes = new TextEncoder().encode(text);
  if (bytes.length < 16) return 1;
  try {
    if (typeof (globalThis as any).CompressionStream !== 'undefined') {
      const cs = new (globalThis as any).CompressionStream('gzip');
      const out = await new Response(new Blob([bytes]).stream().pipeThrough(cs)).arrayBuffer();
      return Math.min(1, out.byteLength / bytes.length);
    }
  } catch (e) {}
  // Fallback unique token density proxy
  const uniq = new Set(text.split('')).size / text.length;
  return Math.min(1, Math.max(0.1, 1 - uniq * 0.4));
}

type Verdict = {
  kind: 'KEPT' | 'PRUNED' | 'SAVED';
  label: string;
  reason: string;
  entropy: number;
  ppmi: number;
};

export default function MiGuardSimulator() {
  const [glossary, setGlossary] = useState(DEFAULT_GLOSSARY.join(', '));
  const [rows, setRows] = useState(DEFAULT_ROWS.join('\n'));
  const [results, setResults] = useState<Verdict[] | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const terms = glossary
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      const lines = rows
        .split('\n')
        .map((r) => r.trim())
        .filter(Boolean);
      const out: Verdict[] = [];

      for (const line of lines) {
        const entropy = await gzipRatio(line); // perplexity proxy
        const words = line.toLowerCase().split(/\W+/).filter(Boolean);
        const hits = words.filter((w) => terms.some((t) => w.includes(t))).length;
        const ppmi = (hits / Math.max(words.length, 1)) * 10; // domain MI proxy

        const highEntropy = entropy > 0.42;
        const lowEntropy = entropy < 0.18;

        if (highEntropy && ppmi >= 0.5) {
          out.push({
            kind: 'SAVED',
            label: 'RARE EDGE CASE',
            entropy,
            ppmi,
            reason: `High perplexity (${entropy.toFixed(2)}) BUT domain PPMI ${ppmi.toFixed(2)} ≥ 0.5 → MI Guard override: PROTECTED`,
          });
        } else if (highEntropy) {
          out.push({
            kind: 'PRUNED',
            label: 'NOISY OUTLIER',
            entropy,
            ppmi,
            reason: `High perplexity (${entropy.toFixed(2)}), zero domain signal → pruned`,
          });
        } else if (lowEntropy && ppmi < 0.5) {
          out.push({
            kind: 'PRUNED',
            label: 'BOILERPLATE',
            entropy,
            ppmi,
            reason: `Low information density (${entropy.toFixed(2)}) → pruned`,
          });
        } else {
          out.push({
            kind: 'KEPT',
            label: 'HIGH QUALITY',
            entropy,
            ppmi,
            reason: `Balanced density (${entropy.toFixed(2)}) with clean structure → kept`,
          });
        }
      }
      setResults(out);
    } finally {
      setLoading(false);
    }
  };

  const naivePruned = useMemo(
    () => (results ?? []).filter((r) => r.entropy > 0.42 || r.entropy < 0.18).length,
    [results]
  );
  const saved = (results ?? []).filter((r) => r.kind === 'SAVED').length;

  const badge = {
    SAVED: 'bg-emerald-600/15 text-emerald-400 border-emerald-600/40',
    KEPT: 'bg-sky-600/15 text-sky-400 border-sky-600/40',
    PRUNED: 'bg-red-600/15 text-red-400 border-red-600/40',
  };

  return (
    <div className="not-prose my-8 rounded-3xl border border-dark-700/80 bg-gradient-to-b from-dark-900/90 to-dark-950/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-moro-500/5 space-y-6">
      <div className="flex items-center justify-between pb-5 border-b border-dark-800 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Interactive MI Guard Simulator</h3>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            See how Epistemic Mutual Information guarding preserves rare, mission-critical domain facts while eliminating noise and spam.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-dark-950 px-3 py-1.5 rounded-xl border border-dark-800">
          <span className="w-2 h-2 rounded-full bg-moro-400"></span>
          <span>Zero Lost Knowledge</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-xs text-gray-400 font-medium">
          Domain Glossary Keywords (comma-separated)
          <input
            value={glossary}
            onChange={(e) => setGlossary(e.target.value)}
            placeholder="terms..."
            className="mt-1.5 w-full bg-dark-800 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-moro-500"
          />
        </label>

        <label className="block text-xs text-gray-400 font-medium">
          Dataset Rows (one sentence or document per line)
          <textarea
            rows={5}
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="mt-1.5 w-full bg-dark-800 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 font-mono leading-relaxed focus:outline-none focus:border-moro-500"
          />
        </label>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={run}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-moro-500 to-sky-600 hover:from-moro-400 hover:to-sky-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-moro-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>▶ Run MI Guard Simulation</span>}
          </button>

          <span className="text-[11px] text-gray-500 font-mono">
            Evaluating Shannon Entropy H(X) + Conditional Domain PPMI
          </span>
        </div>
      </div>

      {results && (
        <div className="pt-6 border-t border-dark-800 space-y-5 animate-fade-in">
          {/* Comparison summary cards */}
          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4 flex items-start gap-3">
              <Scissors className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-red-300 block mb-0.5">Naive Perplexity Filter</span>
                <p className="text-gray-300 leading-relaxed text-xs">
                  Prunes <b className="text-red-400">{naivePruned} rows</b> based solely on perplexity — discarding critical rare compliance facts as outliers.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-300 block mb-0.5">MoroAI MI Guard Engine</span>
                <p className="text-gray-300 leading-relaxed text-xs">
                  Rescues <b className="text-emerald-400">{saved} high-value edge case{saved === 1 ? '' : 's'}</b> using mutual information override while still pruning pure junk.
                </p>
              </div>
            </div>
          </div>

          {/* Row-by-row breakdown */}
          <ul className="space-y-3">
            {results.map((r, i) => {
              const originalLine = rows.split('\n').filter(Boolean)[i] || '';
              return (
                <li
                  key={i}
                  className="rounded-2xl border border-dark-800 bg-dark-950/80 p-4 transition-colors hover:border-dark-700"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badge[r.kind]}`}>
                      {r.label}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500">
                      Entropy: {r.entropy.toFixed(2)} · Domain PPMI: {r.ppmi.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-200 font-mono line-clamp-2 bg-dark-900/60 p-2.5 rounded-xl border border-dark-800/80">
                    {originalLine}
                  </p>

                  <div className="mt-2 text-xs text-gray-400 flex items-center gap-1.5 font-sans">
                    <Sparkles className="w-3.5 h-3.5 text-moro-400 shrink-0" />
                    <span>{r.reason}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
