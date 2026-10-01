import React, { useCallback } from 'react';

export default function ThemeToggle() {
  const flip = useCallback(() => {
    const el = document.documentElement;
    const next = el.dataset.theme === 'dark' ? 'light' : 'dark';
    el.dataset.theme = next;
    el.classList.toggle('dark', next === 'dark');
    el.style.colorScheme = next;
    try {
      localStorage.setItem('moro-theme', next);
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('moro:theme', { detail: next }));
  }, []);

  return (
    <button
      type="button"
      onClick={flip}
      aria-label="Toggle light / dark theme"
      title="Toggle theme"
      className="moro-theme-toggle h-9 w-9 rounded-xl border border-line bg-surface-2 text-muted hover:text-ink hover:border-moro-500/60 transition-colors flex items-center justify-center shrink-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-moro-500/40"
    >
      <svg
        id="moro-icon-sun"
        className="moro-icon-sun w-4 h-4 text-amber-500"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg
        id="moro-icon-moon"
        className="moro-icon-moon w-4 h-4 text-sky-300"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  );
}
