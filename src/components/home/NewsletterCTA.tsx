import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Github, Disc as Discord, Sparkles, Terminal, AlertCircle } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'confirm' | 'dup' | 'rate_limited' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, topic: 'newsletter', website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setStatus('rate_limited');
        return;
      }

      if (!res.ok) {
        setStatus('error');
        return;
      }

      if (data.status === 'already_subscribed') {
        setStatus('dup');
      } else {
        setStatus('confirm');
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setStatus('error');
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-dark-950 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-moro-500/10 via-sky-500/10 to-purple-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-dark-700/80 bg-gradient-to-b from-dark-900/90 to-dark-950/90 p-8 sm:p-14 text-center backdrop-blur-2xl shadow-2xl shadow-moro-500/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-moro-500/10 border border-moro-500/20 text-moro-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join The Sovereign AI Movement</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Ready to Take Control of Your AI?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get the latest releases, whitepapers on information-theoretic data curation,
            and benchmarks for consumer GPU local adaptation directly in your inbox.
          </p>

          {/* Form / Status Messages */}
          {status === 'confirm' ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium animate-fade-in">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Confirmation sent! Check your inbox to confirm your subscription ✓</span>
            </div>
          ) : status === 'dup' ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 font-medium animate-fade-in">
              <Check className="w-5 h-5 text-sky-400 shrink-0" />
              <span>You're already subscribed! Welcome back to the foundry.</span>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-3">
                {/* Honeypot field for bot mitigation */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="relative w-full">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-dark-950 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-moro-500 focus:ring-1 focus:ring-moro-500 text-sm transition-all disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-moro-500 to-sky-600 hover:from-moro-400 hover:to-sky-500 text-white font-semibold text-sm shadow-lg shadow-moro-500/25 transition-all flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  <span>{status === 'loading' ? 'Joining…' : 'Subscribe'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {status === 'rate_limited' && (
                <p className="text-xs text-amber-400 flex items-center justify-center gap-1.5 mt-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Too many subscription attempts from this IP. Please try again in an hour.
                </p>
              )}

              {status === 'error' && (
                <p className="text-xs text-red-400 flex items-center justify-center gap-1.5 mt-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Could not complete request. Please verify your email address and try again.
                </p>
              )}
            </div>
          )}

          {/* Secondary Actions */}
          <div className="pt-8 mt-6 border-t border-dark-800 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <a
              href="https://github.com/moroai/moro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4 text-gray-400" />
              <span>GitHub (v0.1.0 Released)</span>
            </a>
            <span className="text-dark-700">•</span>
            <a
              href="https://discord.gg/moroai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Discord className="w-4 h-4 text-gray-400" />
              <span>Discord Community</span>
            </a>
            <span className="text-dark-700">•</span>
            <a
              href="/docs/getting-started/quickstart/"
              className="flex items-center gap-2 text-moro-400 hover:text-moro-300 font-medium transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span>Read Quickstart Guide</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
