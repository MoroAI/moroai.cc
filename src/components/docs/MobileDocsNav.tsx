import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, ChevronDown, X, Search, Check, ArrowRight } from 'lucide-react';

interface DocItem {
  label: string;
  href: string;
}

interface DocSection {
  category: string;
  items: DocItem[];
}

interface Props {
  docNav: DocSection[];
  currentSlug: string;
}

export default function MobileDocsNav({ docNav, currentSlug }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Find the active item and its category
  const activeInfo = useMemo(() => {
    for (const sec of docNav) {
      for (const item of sec.items) {
        if (item.href === currentSlug) {
          return { category: sec.category, label: item.label };
        }
      }
    }
    return { category: 'Documentation', label: 'Docs Index' };
  }, [docNav, currentSlug]);

  // Filter sections by search query
  const filteredNav = useMemo(() => {
    if (!search.trim()) return docNav;
    const q = search.toLowerCase();
    return docNav
      .map((sec) => ({
        ...sec,
        items: sec.items.filter(
          (item) => item.label.toLowerCase().includes(q) || sec.category.toLowerCase().includes(q)
        ),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [docNav, search]);

  // Lock body scroll when mobile docs drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden mb-6">
      {/* Sticky Quick-Bar on Mobile & Tablet */}
      <div className="sticky top-16 z-30 bg-dark-950/90 backdrop-blur-xl border border-dark-800 rounded-2xl p-3 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-moro-500/10 border border-moro-500/20 flex items-center justify-center text-moro-400 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-moro-400 font-semibold truncate">
              {activeInfo.category}
            </div>
            <div className="text-xs sm:text-sm font-bold text-white truncate">
              {activeInfo.label}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-dark-900 hover:bg-dark-800 text-gray-200 hover:text-white border border-dark-700/80 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
          aria-expanded={isOpen}
          aria-label="Open Documentation Navigation"
        >
          <span>All Pages</span>
          <ChevronDown className="w-3.5 h-3.5 text-moro-400" />
        </button>
      </div>

      {/* Slide-Up Full Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative max-h-[82vh] w-full bg-dark-950 border-t border-dark-700/80 rounded-t-3xl shadow-2xl p-5 sm:p-6 flex flex-col z-10 animate-slide-up">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-dark-700 rounded-full mx-auto mb-4 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-dark-800 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-moro-400" />
                <span className="font-bold text-white text-sm">Documentation Tree</span>
                <span className="text-[10px] font-mono text-gray-500 bg-dark-900 px-2 py-0.5 rounded border border-dark-800">
                  45 topics
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-dark-900 border border-dark-800 text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative mb-4 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search topics (e.g. quickstart, vram, ollama, dpo)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-dark-900 border border-dark-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-moro-500/60"
              />
            </div>

            {/* Scrollable Doc Categories */}
            <div className="overflow-y-auto space-y-5 pr-1 text-xs">
              {filteredNav.map((sec) => (
                <div key={sec.category}>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {sec.category}
                  </h4>
                  <ul className="space-y-1">
                    {sec.items.map((item) => {
                      const isActive = currentSlug === item.href;
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                              isActive
                                ? 'bg-moro-500/20 text-moro-300 font-bold border border-moro-500/30'
                                : 'text-gray-300 hover:text-white hover:bg-dark-900'
                            }`}
                          >
                            <span>{item.label}</span>
                            {isActive ? (
                              <Check className="w-3.5 h-3.5 text-moro-400" />
                            ) : (
                              <ArrowRight className="w-3 h-3 text-gray-600 opacity-60" />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              {filteredNav.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No documentation topics match &ldquo;{search}&rdquo;
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
