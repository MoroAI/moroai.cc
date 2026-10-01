import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as 'dark' | 'light') || 'dark';
    setTheme(current);
  }, []);

  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    if (next === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    try {
      localStorage.setItem('moro-theme', next);
    } catch (e) {
      console.warn('Could not persist theme choice to localStorage', e);
    }
  };

  return (
    <button
      onClick={flip}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 rounded-xl bg-dark-900/80 hover:bg-dark-800 border border-dark-700/80 hover:border-dark-600 text-gray-400 hover:text-white transition-all duration-200 flex items-center justify-center shadow-sm"
    >
      {theme === 'light' ? (
        <Sun className="w-4 h-4 text-amber-500 hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-sky-300 hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
