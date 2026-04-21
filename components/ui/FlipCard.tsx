'use client';

import { useState } from 'react';

interface FlipCardProps {
  /** Single word shown on the resting face */
  keyword: string;
  /** Full title shown on the revealed face */
  title: string;
  /** Body text shown on the revealed face */
  description: string;
  /** Colour theme – matches the site primary/accent palette */
  variant?: 'primary' | 'accent' | 'neutral';
  /** Optional icon element rendered on the revealed face */
  icon?: React.ReactNode;
  /** Height class – override when the card sits in a fixed-height context */
  heightClass?: string;
}

const variantStyles = {
  primary: {
    front: 'bg-primary',
    back: 'bg-white border-2 border-primary/20',
    keyword: 'text-white',
    title: 'text-primary',
    description: 'text-gray-600',
    dot: 'bg-white/50',
  },
  accent: {
    /* uses primary-light so it reads as a sibling of the mission card */
    front: 'bg-primary-light',
    back: 'bg-white border-2 border-accent/40',
    keyword: 'text-white',
    title: 'text-gray-900',
    description: 'text-gray-600',
    dot: 'bg-white/50',
  },
  neutral: {
    front: 'bg-gray-700',
    back: 'bg-white border-2 border-gray-200',
    keyword: 'text-white',
    title: 'text-gray-900',
    description: 'text-gray-600',
    dot: 'bg-white/50',
  },
};

export default function FlipCard({
  keyword,
  title,
  description,
  variant = 'primary',
  icon,
  heightClass = 'h-48',
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const s = variantStyles[variant];

  return (
    <div
      className={`relative w-full ${heightClass} cursor-pointer select-none`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      aria-pressed={flipped}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((v) => !v)}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.55s cubic-bezier(0.45, 0, 0.15, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── Front face ── */}
        <div
          className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-3 shadow-sm ${s.front}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <p className={`text-2xl font-bold tracking-wide ${s.keyword}`}>{keyword}</p>
          {/* subtle "hover/tap" hint */}
          <span className={`flex gap-1 mt-1`}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`inline-block w-1.5 h-1.5 rounded-full ${s.dot}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        </div>

        {/* ── Back face ── */}
        <div
          className={`absolute inset-0 rounded-xl flex flex-col justify-center px-6 py-5 shadow-sm ${s.back}`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {icon && <div className="mb-3">{icon}</div>}
          <h3 className={`text-base font-bold mb-2 leading-snug ${s.title}`}>{title}</h3>
          <p className={`text-sm leading-relaxed ${s.description}`}>{description}</p>
        </div>
      </div>
    </div>
  );
}
