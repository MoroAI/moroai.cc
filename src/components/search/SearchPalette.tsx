import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, FileText, BookOpen, ChefHat, X, Sparkles } from 'lucide-react';

type Hit = { url: string; excerpt: string; meta: Record<string, string> };

let pfPromise: Promise<any> | null = null;
const loadPagefind = () =>
  (pfPromise ??= (new Function('return import("/pagefind/pagefind.js")')() as Promise<any>));

const SECTION_ICON: Record<string, any> = {
  blog: FileText,
  docs: BookOpen,
  cookbook: ChefHat,
};

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<Hit[]>([]);
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global ⌘K / Ctrl+K / "/" shortcut & custom open event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener('keydown', onKey);
    window.addEventListener('open-search-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-search-palette', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  // Debounced search with Pagefind
  useEffect(() => {
    const t = setTimeout(async () => {
      if (!q.trim()) {
        setHits([]);
        return;
      }
      setLoading(true);
      try {
        const pf = await loadPagefind();
        if (pf.init) {
          await pf.init();
        }
        const res = await pf.search(q, filter ? { filters: { section: filter } } : {});
        const data = await Promise.all(res.results.slice(0, 9).map((r: any) => r.data()));
        setHits(data);
        setActive(0);
      } catch (err) {
        console.warn('Pagefind search note: Search index unavailable in dev until built.', err);
        setHits([]);
      } finally {
        setLoading(false);
      }
    }, 130);
    return () => clearTimeout(t);
  }, [q, filter]);

  const go = useCallback((url: string) => {
    window.location.href = url;
    setOpen(false);
    setQ('');
  }, []);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, hits.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === 'Enter' && hits[active]) {
      e.preventDefault();
      go(hits[active].url);
    }
  };

  return (
    <>
      {/* Trigger button in header */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 h-9 px-3 rounded-xl bg-dark-900/80 hover:bg-dark-800/90 border border-dark-700/80 hover:border-moro-500/50 text-xs text-gray-400 hover:text-gray-200 transition-all duration-200 shadow-sm shrink-0 whitespace-nowrap group focus:outline-none focus:ring-2 focus:ring-moro-500/40"
        aria-label="Search documentation"
        title="Search documentation (⌘K)"
      >
        <Search className="w-3.5 h-3.5 text-moro-400 group-hover:text-moro-300 transition-colors shrink-0" />
        <span className="hidden xl:inline font-normal text-gray-400 group-hover:text-gray-300">Search docs…</span>
        <span className="inline xl:hidden font-normal text-gray-400 group-hover:text-gray-300">Search…</span>
        <kbd className="flex items-center justify-center h-5 px-1.5 rounded-md bg-dark-800 text-[10px] font-mono text-gray-400 border border-dark-700/90 group-hover:border-dark-600 transition-colors shrink-0 select-none shadow-xs">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[12vh] bg-black/75 backdrop-blur-md px-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-dark-700 bg-dark-900 shadow-2xl shadow-moro-500/10 overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-dark-800">
              <Search className="w-5 h-5 text-moro-400 shrink-0" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search docs, CLI flags, cookbooks, architecture…"
                className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-500 text-sm sm:text-base"
                autoFocus
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-dark-800 transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section filters */}
            <div className="flex gap-2 px-5 py-2.5 border-b border-dark-800 bg-dark-950/40 overflow-x-auto no-scrollbar">
              {[null, 'docs', 'blog', 'cookbook'].map((s) => (
                <button
                  key={s ?? 'all'}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    filter === s
                      ? 'bg-moro-500 text-white shadow-sm shadow-moro-500/20'
                      : 'bg-dark-800/80 text-gray-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
                </button>
              ))}
            </div>

            {/* Results list */}
            <div className="max-h-[46vh] overflow-y-auto">
              {loading && (
                <div className="flex items-center gap-2 px-5 py-6 text-sm text-gray-500 font-mono">
                  <div className="w-3.5 h-3.5 border-2 border-moro-400 border-t-transparent rounded-full animate-spin" />
                  <span>Searching Pagefind index…</span>
                </div>
              )}

              {!loading && q && hits.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-gray-400">
                    No results found for “<span className="text-gray-200">{q}</span>”
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Try searching for <code className="text-moro-400">ppmi</code>, <code className="text-moro-400">oom</code>, <code className="text-moro-400">lora</code>, or <code className="text-moro-400">ollama</code>
                  </p>
                </div>
              )}

              {!loading && !q && (
                <div className="px-5 py-6 text-xs text-gray-500 space-y-2">
                  <p className="font-mono text-gray-400 uppercase tracking-wider text-[10px]">
                    Quick suggestions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Quickstart', 'Data Compiler', 'Recipe Engine', 'OOM Auto-Recovery', 'Ollama Deploy', 'DPO Flywheel'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQ(term)}
                        className="px-2.5 py-1 rounded-lg bg-dark-800 text-gray-400 hover:text-white text-xs transition-colors border border-dark-700/80"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hits.map((hit, i) => {
                const Icon = SECTION_ICON[hit.meta?.section] ?? FileText;
                const isSelected = i === active;
                return (
                  <button
                    key={hit.url}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(hit.url)}
                    className={`w-full text-left px-5 py-3.5 flex gap-3 items-start border-b border-dark-800/60 transition-colors ${
                      isSelected ? 'bg-moro-500/10 border-moro-500/20' : 'hover:bg-dark-800/40'
                    }`}
                  >
                    <Icon className="w-4 h-4 mt-1 text-moro-400 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white truncate">
                          {hit.meta?.title ?? hit.url}
                        </p>
                        {hit.meta?.section && (
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-dark-800 text-gray-400 shrink-0">
                            {hit.meta.section}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed [&_mark]:bg-moro-500/30 [&_mark]:text-moro-200 [&_mark]:rounded [&_mark]:px-0.5 font-sans"
                        dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Navigation Bar */}
            <div className="px-5 py-2.5 bg-dark-950/60 border-t border-dark-800/80 text-[11px] text-gray-500 flex items-center justify-between font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ open</span>
                <span>esc close</span>
              </div>
              <span className="text-moro-400/80">Pagefind · zero SaaS · local index</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
