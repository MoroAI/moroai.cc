// src/components/tools/VramCalculator.tsx
import { useMemo, useState } from 'react';
import { predictVram, seqCurve, recommendGpu, MODELS, type VramInput } from '../../utils/vram';
import { Cpu, Gauge, Copy, Check, Sparkles, AlertTriangle } from 'lucide-react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}

const Slider = ({ label, value, min, max, step = 1, unit = '', onChange }: SliderProps) => (
  <label className="block">
    <div className="flex justify-between text-xs mb-1.5 font-medium">
      <span className="text-gray-400">{label}</span>
      <span className="font-mono text-moro-400 font-semibold">
        {value}
        {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
    />
  </label>
);

export default function VramCalculator() {
  const [inp, setInp] = useState<VramInput>({
    model: '1.5b',
    quant: 'nf4',
    seq: 1024,
    batch: 1,
    loraR: 16,
    modules: 4,
    ckpt: true,
    paged: true,
  });
  const [copied, setCopied] = useState(false);

  const set = (p: Partial<VramInput>) => setInp((s) => ({ ...s, ...p }));

  const b = useMemo(() => predictVram(inp), [inp]);
  const curve = useMemo(() => seqCurve(inp), [inp]);
  const gpu = recommendGpu(b.total);

  const parts = [
    ['Base weights', b.weights, '#0ea5e9'],
    ['Activations', b.activations, '#a855f7'],
    ['LoRA adapter', b.adapter, '#22c55e'],
    ['Gradients', b.gradients, '#f59e0b'],
    ['Optimizer', b.optimizer, '#ec4899'],
    ['Safety margin', b.margin, '#64748b'],
  ] as const;

  const cli = `moro recipe suggest --model ${inp.model} --seq ${inp.seq} --lora-r ${inp.loraR}`;
  const maxCurve = Math.max(...curve.map((c) => c.gb), 1);

  return (
    <div className="not-prose my-8 rounded-3xl border border-dark-700/80 bg-gradient-to-b from-dark-900/90 to-dark-950/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-moro-500/5">
      <div className="flex items-center justify-between pb-6 border-b border-dark-800 mb-6 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-moro-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Interactive VRAM Predictor</h3>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Exact formula parity with the MoroAI CLI recipe engine. Simulate consumer GPU memory down to the megabyte.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-dark-950 px-3 py-1.5 rounded-xl border border-dark-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Zero OOM Guarantee</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Controls Column */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-xs text-gray-400 font-medium">
              Base Architecture
              <select
                value={inp.model}
                onChange={(e) => set({ model: e.target.value })}
                className="mt-1.5 w-full bg-dark-800 border border-dark-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-moro-500"
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs text-gray-400 font-medium">
              Precision / Quantization
              <select
                value={inp.quant}
                onChange={(e) => set({ quant: e.target.value as any })}
                className="mt-1.5 w-full bg-dark-800 border border-dark-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-moro-500"
              >
                <option value="nf4">NF4 (QLoRA — 4-bit)</option>
                <option value="int8">INT8 (8-bit Quantized)</option>
                <option value="none">FP16 / BF16 (16-bit Full)</option>
              </select>
            </label>
          </div>

          <Slider
            label="Sequence Length (Tokens)"
            value={inp.seq}
            min={512}
            max={4096}
            step={512}
            unit=" tok"
            onChange={(v) => set({ seq: v })}
          />

          <Slider
            label="LoRA Rank (r)"
            value={inp.loraR}
            min={8}
            max={64}
            step={8}
            onChange={(v) => set({ loraR: v })}
          />

          <Slider
            label="Micro-Batch Size per Device"
            value={inp.batch}
            min={1}
            max={8}
            onChange={(v) => set({ batch: v })}
          />

          <div className="space-y-2 pt-1">
            <span className="text-xs text-gray-400 block font-medium">Hardware Features &amp; Projection</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => set({ modules: 4 })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  inp.modules === 4
                    ? 'bg-moro-500/20 border-moro-500 text-moro-300 font-semibold'
                    : 'bg-dark-800 border-dark-700 text-gray-400 hover:text-white'
                }`}
              >
                Attention Only (4 modules)
              </button>

              <button
                type="button"
                onClick={() => set({ modules: 7 })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  inp.modules === 7
                    ? 'bg-moro-500/20 border-moro-500 text-moro-300 font-semibold'
                    : 'bg-dark-800 border-dark-700 text-gray-400 hover:text-white'
                }`}
              >
                + MLP Projections (7 modules)
              </button>

              <button
                type="button"
                onClick={() => set({ ckpt: !inp.ckpt })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  inp.ckpt
                    ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-dark-800 border-dark-700 text-gray-500'
                }`}
              >
                Gradient Checkpointing: {inp.ckpt ? 'ON (-35% Act)' : 'OFF'}
              </button>

              <button
                type="button"
                onClick={() => set({ paged: !inp.paged })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  inp.paged
                    ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-dark-800 border-dark-700 text-gray-500'
                }`}
              >
                Paged AdamW-8bit: {inp.paged ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Prediction Results Column */}
        <div className="rounded-2xl border border-dark-800 bg-dark-950/70 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">
                Predicted Peak VRAM
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1">
                {b.total.toFixed(2)}
                <span className="text-lg text-gray-500 font-normal"> GB</span>
              </p>
            </div>

            <div
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                gpu
                  ? 'bg-emerald-600/15 text-emerald-400 border-emerald-600/40'
                  : 'bg-red-600/15 text-red-400 border-red-600/40'
              }`}
            >
              {gpu ? (
                <>
                  <span>✓</span>
                  <span>Fits on {gpu.name} ({gpu.vram}GB)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Exceeds single consumer GPU (Needs &gt;24GB)</span>
                </>
              )}
            </div>
          </div>

          {/* Stacked Memory Breakdown Bar */}
          <div className="mt-5 h-4 rounded-full overflow-hidden flex bg-dark-900 border border-dark-800 shadow-inner">
            {parts.map(([label, v, c]) => (
              <div
                key={label}
                title={`${label}: ${v.toFixed(2)} GB`}
                style={{ width: `${(v / b.total) * 100}%`, backgroundColor: c }}
                className="transition-all duration-300"
              />
            ))}
          </div>

          {/* Legend Grid */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {parts.map(([label, v, c]) => (
              <div key={label} className="text-[11px] text-gray-400 flex items-center justify-between p-1.5 rounded-lg bg-dark-900/60 border border-dark-800/80">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c }} />
                  <span className="truncate">{label}</span>
                </span>
                <span className="font-mono text-gray-300 font-semibold ml-1 shrink-0">{v.toFixed(2)}G</span>
              </div>
            ))}
          </div>

          {/* Sequence-Length Memory Curve */}
          <div className="mt-6 pt-5 border-t border-dark-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-gray-400 font-medium">Activation Memory Scaling Curve</span>
              <span className="text-[10px] font-mono text-moro-400">Peak: {curve[curve.length - 1].gb.toFixed(2)} GB @ 4k</span>
            </div>

            <svg viewBox="0 0 320 85" className="w-full overflow-visible">
              <defs>
                <linearGradient id="vramGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#vramGrad)"
                points={`15,70 ${curve.map((c, i) => `${15 + i * 72},${70 - (c.gb / maxCurve) * 58}`).join(' ')} ${15 + 4 * 72},70`}
              />
              <polyline
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2.5"
                strokeLinecap="round"
                points={curve.map((c, i) => `${15 + i * 72},${70 - (c.gb / maxCurve) * 58}`).join(' ')}
              />
              {curve.map((c, i) => (
                <g key={c.seq}>
                  <circle
                    cx={15 + i * 72}
                    cy={70 - (c.gb / maxCurve) * 58}
                    r={c.seq === inp.seq ? '5' : '3.5'}
                    fill={c.seq === inp.seq ? '#a855f7' : '#0ea5e9'}
                    stroke="#020617"
                    strokeWidth="1.5"
                  />
                  <text
                    x={15 + i * 72}
                    y={82}
                    textAnchor="middle"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fill={c.seq === inp.seq ? '#38bdf8' : '#64748b'}
                  >
                    {c.seq >= 1024 ? `${c.seq / 1024}k` : `${c.seq}`}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Copyable CLI Suggestion */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(cli);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }
            }}
            className="mt-5 w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-dark-900 border border-dark-800 hover:border-moro-500/60 text-xs font-mono text-gray-300 transition-colors group shadow-sm"
          >
            <span className="flex items-center gap-2 truncate">
              <span className="text-emerald-400 select-none">$</span>
              <span className="truncate group-hover:text-white transition-colors">{cli}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-moro-400 ml-2 shrink-0">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
