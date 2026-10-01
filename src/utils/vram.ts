// src/utils/vram.ts
// Isomorphic VRAM calculator math — identical heuristics to MoroAI CLI recipe rules

export const BASE_NF4_GB: Record<string, number> = {
  '0.5b': 0.75,
  '1b': 1.1,
  '1.5b': 1.7,
  '3b': 2.9,
  '7b': 5.7,
  '8b': 6.3,
  '13b': 9.8,
};

export const ACT_COEFF: Record<string, number> = {
  '0.5b': 0.15,
  '1b': 0.25,
  '1.5b': 0.35,
  '3b': 0.65,
  '7b': 1.25,
  '8b': 1.4,
  '13b': 2.1,
};

export const ADAPTER_GB: Record<string, number> = {
  '0.5b': 0.05,
  '1b': 0.08,
  '1.5b': 0.12,
  '3b': 0.2,
  '7b': 0.35,
  '8b': 0.4,
  '13b': 0.6,
};

export const MODELS = [
  { id: '1.5b', label: 'Qwen2.5-1.5B-Instruct' },
  { id: '3b', label: 'Qwen2.5-3B-Instruct' },
  { id: '7b', label: 'Qwen2.5-7B-Instruct' },
  { id: '8b', label: 'Llama-3.1-8B-Instruct' },
  { id: '13b', label: 'Qwen2.5-14B-Instruct' },
] as const;

export const GPUS = [
  { name: 'GTX 1650', vram: 4 },
  { name: 'RTX 3060', vram: 12 },
  { name: 'RTX 4060', vram: 8 },
  { name: 'RTX 3080', vram: 10 },
  { name: 'RTX 4070 Ti', vram: 12 },
  { name: 'RTX 4090', vram: 24 },
  { name: 'A5000', vram: 24 },
  { name: 'A6000', vram: 48 },
];

export interface VramInput {
  model: string;
  quant: 'nf4' | 'int8' | 'none';
  seq: number;
  batch: number;
  loraR: number;
  modules: number;
  ckpt: boolean;
  paged: boolean;
}

export interface VramBreakdown {
  weights: number;
  activations: number;
  adapter: number;
  gradients: number;
  optimizer: number;
  margin: number;
  total: number;
}

export function predictVram(i: VramInput): VramBreakdown {
  const baseGb = BASE_NF4_GB[i.model] ?? 1.7;
  const actCoeff = ACT_COEFF[i.model] ?? 0.35;
  const adapterBase = ADAPTER_GB[i.model] ?? 0.12;

  const weights = baseGb * (i.quant === 'int8' ? 1.9 : i.quant === 'none' ? 3.6 : 1);
  const activations = actCoeff * (i.seq / 1024) * i.batch * (i.ckpt ? 0.65 : 1);
  const adapter = adapterBase * (i.modules / 4) * (i.loraR / 16);
  const gradients = adapter * 0.5;
  const optimizer = i.quant === 'none' ? 0.45 : i.paged ? 0.25 : 0.4 + adapter * 2;
  const margin = 0.5;
  const total = weights + activations + adapter + gradients + optimizer + margin;

  return { weights, activations, adapter, gradients, optimizer, margin, total };
}

export const seqCurve = (i: VramInput) =>
  [512, 1024, 2048, 3072, 4096].map((s) => ({
    seq: s,
    gb: predictVram({ ...i, seq: s }).total,
  }));

export const recommendGpu = (total: number) =>
  GPUS.filter((g) => g.vram >= total).sort((a, b) => a.vram - b.vram)[0] ?? null;
