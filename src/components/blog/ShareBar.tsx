import React, { useState } from 'react';
import { Share2, Check, Copy, Twitter, Linkedin, MessageCircle, ExternalLink } from 'lucide-react';

interface ShareBarProps {
  title: string;
  url: string;
  category?: string;
}

export default function ShareBar({ title, url, category = 'Research' }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? (url.startsWith('http') ? url : window.location.href) : url;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error('Failed to copy link', e);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${title} — MoroAI Local-First Model Adaptation`,
          url: fullUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const tweetText = encodeURIComponent(`"${title}" by @aljagne on @moroai\n\nLocal-First LLM adaptation on consumer hardware:`);
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodedUrl}&hashtags=LocalAI,OpenSource,LLM`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const redditShareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
  const hnShareUrl = `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`;

  return (
    <div className="my-8 p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-dark-800 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <Share2 className="w-4 h-4 text-moro-400" />
        <span>Share this article</span>
      </div>

      <div className="flex items-center flex-wrap justify-center sm:justify-start gap-2">
        {/* Twitter / X */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-gray-200 hover:text-white border border-dark-700/80 hover:border-moro-500/40 text-xs font-medium transition-all hover:scale-105"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">Post on X</span>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-gray-200 hover:text-white border border-dark-700/80 hover:border-moro-500/40 text-xs font-medium transition-all hover:scale-105"
        >
          <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>

        {/* Reddit */}
        <a
          href={redditShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Reddit"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-gray-200 hover:text-white border border-dark-700/80 hover:border-moro-500/40 text-xs font-medium transition-all hover:scale-105"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#FF4500] text-white flex items-center justify-center text-[10px] font-bold">r/</span>
          <span className="hidden sm:inline">Reddit</span>
        </a>

        {/* Hacker News */}
        <a
          href={hnShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Submit to Hacker News"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-gray-200 hover:text-white border border-dark-700/80 hover:border-moro-500/40 text-xs font-medium transition-all hover:scale-105"
        >
          <span className="w-3.5 h-3.5 rounded bg-[#FF6600] text-white flex items-center justify-center text-[10px] font-bold font-mono">Y</span>
          <span className="hidden sm:inline">Hacker News</span>
        </a>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          aria-label="Copy article link"
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-moro-500/15 hover:bg-moro-500/25 text-moro-300 hover:text-white border-moro-500/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
