import React, { useState } from 'react';
import { Link2, Twitter, Linkedin, MessageCircle, Mail, Check } from 'lucide-react';

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      console.error('Failed to copy link', e);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (e) {
        // Cancelled
      }
    } else {
      copy();
    }
  };

  const btn =
    'p-2.5 rounded-xl bg-dark-800 border border-dark-700 text-gray-400 hover:text-white hover:border-moro-500/60 hover:-translate-y-0.5 transition-all shadow-sm';

  return (
    <div className="flex items-center gap-2">
      <button onClick={copy} className={btn} title="Copy link" aria-label="Copy link">
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
      </button>
      <button onClick={handleShare} className={btn} title="Native share" aria-label="Share">
        <MessageCircle className="w-4 h-4" />
      </button>
      <a
        className={btn}
        title="Post on X"
        aria-label="Post on X"
        href={`https://twitter.com/intent/tweet?text=${t}&url=${u}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        className={btn}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a className={btn} title="Email" aria-label="Email" href={`mailto:?subject=${t}&body=${u}`}>
        <Mail className="w-4 h-4" />
      </a>
    </div>
  );
}
