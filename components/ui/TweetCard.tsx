'use client';

/**
 * TweetCard — renders a single oEmbed tweet blockquote and, on first mount,
 * injects Twitter's widget.js exactly once per page so it can upgrade all
 * `<blockquote class="twitter-tweet">` elements into proper tweet cards.
 *
 * Usage (in a server component):
 *   <TweetCard html={oEmbedHtml} tweetId="1234567890" authorName="AMBSO" />
 */

import { useEffect, useRef } from 'react';
import { Twitter } from 'lucide-react';

interface TweetCardProps {
  /** The raw <blockquote> HTML string from the Twitter oEmbed API */
  html: string;
  tweetId: string;
  authorName?: string;
}

const WIDGET_SCRIPT_ID = 'twitter-widgets-js';

/** Loads widget.js once per page visit, resolves when ready */
function loadWidgetJs(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') { resolve(); return; }

    // Already loaded
    if ((window as unknown as { twttr?: { widgets: unknown } }).twttr?.widgets) {
      resolve();
      return;
    }

    // Script tag already in DOM — wait for it
    const existing = document.getElementById(WIDGET_SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }

    // Inject it
    const script = document.createElement('script');
    script.id = WIDGET_SCRIPT_ID;
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    script.addEventListener('load', () => resolve());
    document.body.appendChild(script);
  });
}

export default function TweetCard({ html, tweetId, authorName }: TweetCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadWidgetJs().then(() => {
      // widget.js scans the DOM for .twitter-tweet blockquotes on its own,
      // but calling widgets.load() on our container ensures it picks up
      // blockquotes that were rendered after the initial page load.
      const twttr = (window as unknown as { twttr?: { widgets: { load: (el: HTMLElement) => void } } }).twttr;
      if (twttr?.widgets && wrapperRef.current) {
        twttr.widgets.load(wrapperRef.current);
      }
    });
  }, [tweetId]);

  return (
    <div
      ref={wrapperRef}
      className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden p-1"
    >
      {/* Tweet header accent */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-1">
        <Twitter size={15} className="text-[#1DA1F2]" />
        {authorName && (
          <span className="text-xs font-medium text-gray-500 truncate">
            {authorName}
          </span>
        )}
      </div>

      {/* oEmbed HTML — widget.js upgrades this blockquote into a full tweet card */}
      <div
        className="[&_.twitter-tweet]:mx-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Fallback link shown only while widget.js is loading or if it fails */}
      <noscript>
        <a
          href={`https://twitter.com/i/web/status/${tweetId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-3 text-sm text-blue-600 hover:underline"
        >
          View this tweet on X →
        </a>
      </noscript>
    </div>
  );
}
