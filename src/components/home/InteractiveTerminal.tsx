// src/components/home/InteractiveTerminal.tsx
import { useEffect, useRef, useState } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const SCRIPT: [string, string[]][] = [
  ['moro init my-model', ['✓ Project initialized at ./my-model']],
  ['moro data build', ['✓ 1,247 samples · 23 edge cases saved by MI Guard · 119 noisy rows pruned']],
  [
    'moro train',
    [
      '⚡ recipe: nf4 · r=16 · lr=2e-4 · est. 6.2GB VRAM',
      '  step 100/100 | loss 1.21 | 12m34s',
      '✓ adapter saved → runs/run_8f3a/',
    ],
  ],
  ['moro eval compare --run-id run_8f3a', ['✓ pass rate 87.5% (+12.3%) · regressions 0 · drift stable']],
  ['moro release deploy --target ollama', ['✓ gguf Q4_K_M written · ollama create my-model:v1.0.0 done']],
];

const HELP: Record<string, string[]> = {
  'moro --version': ['MoroAI version 0.1.0 (local-first adaptation foundry)'],
  'moro doctor': [
    '✓ python 3.11 · ✓ torch 2.3 · ✓ cuda 12.1 · VRAM 12.0GB (RTX 4070)',
    '✓ local ollama runtime active: http://localhost:11434',
  ],
  help: [
    'Available commands in simulated shell:',
    '  • moro --version',
    '  • moro doctor',
    '  • moro recipe suggest',
    '  • moro data build',
    '  • clear',
  ],
  'moro recipe suggest': [
    'model 1.5b · nf4 · seq 1024 · r 16 · α 32 · paged_adamw_8bit · est 4.8GB',
  ],
  'moro data build': [
    '✓ Epistemic scan complete: 1,247 rows compiled · 23 boundary cases saved by MI Guard',
  ],
  clear: [],
};

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<{ p: string; text: string; kind: 'cmd' | 'out' }[]>([]);
  const [typed, setTyped] = useState('');
  const [live, setLive] = useState(false);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autoplay typewriter demo until user intervenes
  useEffect(() => {
    if (live) return;
    let ci = 0;
    let ch = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled || live) return;
      if (ci >= SCRIPT.length) {
        setLines((l) => [
          ...l,
          { p: '', text: '─'.repeat(45), kind: 'out' },
          { p: '', text: '✨ Interactive mode enabled! Type "help" to test commands.', kind: 'out' },
        ]);
        setLive(true);
        return;
      }
      const [cmd, outs] = SCRIPT[ci];
      if (ch < cmd.length) {
        setTyped(cmd.slice(0, ++ch));
        setTimeout(tick, 34);
        return;
      }
      setLines((l) => [
        ...l,
        { p: '$', text: cmd, kind: 'cmd' },
        ...outs.map((t) => ({ p: '', text: t, kind: 'out' as const })),
      ]);
      setTyped('');
      ch = 0;
      ci += 1;
      setTimeout(tick, 420);
    };

    const timer = setTimeout(tick, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [live]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 99999, behavior: 'smooth' });
  }, [lines, typed]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    setLive(true);
    setInput('');

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    const out = HELP[cmd] ?? [
      `moro: command not recognized: "${cmd}". Type "help" for valid simulated commands.`,
    ];
    setLines((l) => [
      ...l,
      { p: '$', text: cmd, kind: 'cmd' },
      ...out.map((t) => ({ p: '', text: t, kind: 'out' as const })),
    ]);
  };

  const handleTerminalClick = () => {
    setLive(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="rounded-2xl overflow-hidden border border-dark-700/80 bg-dark-900/95 shadow-2xl shadow-moro-500/10 backdrop-blur-xl text-left cursor-text group"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-950 border-b border-dark-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 text-xs font-mono text-gray-400 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-moro-400" />
            <span>moro — simulated foundry shell</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500 bg-dark-900 px-2 py-0.5 rounded border border-dark-800 hidden sm:inline">
            {live ? 'Interactive Shell' : 'Autoplay Demo (click to type)'}
          </span>
          <span className={`w-2 h-2 rounded-full ${live ? 'bg-emerald-400' : 'bg-moro-400 animate-pulse'}`} />
        </div>
      </div>

      {/* Terminal Screen */}
      <div
        ref={bodyRef}
        className="bg-dark-950/95 p-4 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed h-80 overflow-y-auto"
      >
        {lines.map((l, i) => (
          <p
            key={i}
            className={`my-1 ${
              l.kind === 'cmd'
                ? 'text-white font-semibold'
                : l.text.startsWith('✓')
                ? 'text-emerald-400'
                : l.text.startsWith('⚡')
                ? 'text-yellow-400'
                : l.text.startsWith('✨')
                ? 'text-moro-300 font-semibold'
                : 'text-gray-400'
            }`}
          >
            {l.p && <span className="text-emerald-400 mr-2 font-bold">{l.p}</span>}
            {l.text}
          </p>
        ))}

        {live ? (
          <form onSubmit={submit} className="flex items-center mt-2">
            <span className="text-emerald-400 mr-2 font-bold select-none">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='type "help" or "moro doctor"'
              className="flex-1 bg-transparent outline-none text-white caret-moro-400 placeholder-gray-600 font-mono text-xs sm:text-[13px]"
            />
          </form>
        ) : (
          <p className="text-white mt-1">
            <span className="text-emerald-400 mr-2 font-bold select-none">$</span>
            {typed}
            <span className="animate-pulse text-moro-400 font-bold">▊</span>
          </p>
        )}
      </div>

      {/* Terminal Footer Bar */}
      <div className="px-4 py-2 bg-dark-950 border-t border-dark-800 text-[11px] text-gray-500 font-mono flex items-center justify-between">
        <span>Click inside to execute custom commands</span>
        <span className="text-moro-400/80">Try: moro doctor</span>
      </div>
    </div>
  );
}
