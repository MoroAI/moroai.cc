import React from 'react';
import { Star, ShieldCheck, Quote, Github } from 'lucide-react';

const testimonials = [
  {
    quote:
      'We spent 3 months dealing with random CUDA OOM crashes using custom scripts. MoroAI predicted our VRAM down to 100MB and the 5-step auto-recovery saved 6 long runs without any human intervention.',
    author: 'Dr. Elena Rostova',
    role: 'Principal ML Engineer',
    org: 'FinTech Sovereign Labs',
    rating: 5,
  },
  {
    quote:
      'MI Guard in the Epistemic Data Compiler is revolutionary. When we pruned our 40,000 internal legal support cases with other tools, rare compliance edge cases vanished. MoroAI mathematically kept them safe.',
    author: 'Marcus Vance',
    role: 'VP of AI Architecture',
    org: 'Lexis Sovereign AI',
    rating: 5,
  },
  {
    quote:
      'Running local adaptation on an RTX 4090 and deploying straight to Ollama in one CLI command transformed our internal prototyping cycle from weeks to under two hours.',
    author: 'Siddharth Patel',
    role: 'Staff Platform Engineer',
    org: 'Autonomous Health',
    rating: 5,
  },
];

const stats = [
  { value: '100%', label: 'Local Execution', detail: 'Zero bytes leave your host' },
  { value: '0', label: 'Unrecovered OOMs', detail: 'Guaranteed 5-step mitigation' },
  { value: '414', label: 'Integration Tests', detail: 'End-to-end verified suite' },
  { value: '< 30m', label: 'Consumer GPU Train', detail: '1.5B models on 8GB VRAM' },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-dark-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Metric stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-dark-950/70 border border-dark-800 text-center shadow-lg"
            >
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-moro-400 to-sky-300 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500 font-mono">{stat.detail}</div>
            </div>
          ))}
        </div>

        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-moro-400 uppercase bg-moro-500/10 border border-moro-500/20 px-3 py-1 rounded-full mb-4 inline-block">
            Proven in Production
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Trusted by Builders of Sovereign AI
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Engineered for practitioners who require absolute data privacy and mathematical reliability.
          </p>
        </div>

        {/* Testimonials cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-7 rounded-2xl bg-dark-950/80 border border-dark-800 flex flex-col justify-between hover:border-moro-500/30 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center gap-1 text-yellow-400 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-dark-700 mb-3" />
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-dark-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{t.author}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                  <div className="text-[11px] font-mono text-moro-400 mt-0.5">{t.org}</div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
