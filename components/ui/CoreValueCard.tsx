'use client';

import { useState, useEffect } from 'react';

interface CoreValueCardProps {
  keyword: string;
  title: string;
  description: string;
  index?: number;
  heightClass?: string;
}

const ARC_RADII = [300, 240, 180, 120, 60];

export default function CoreValueCard({ keyword, title, description, index = 0, heightClass = 'h-52' }: CoreValueCardProps) {
  const [active, setActive] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (active) {
      t = setTimeout(() => setFlipped(true), 320);
    } else {
      setFlipped(false);
    }
    return () => clearTimeout(t);
  }, [active]);

  const toggle = () => setActive((v) => !v);

  return (
    <div
      className={`relative w-full ${heightClass} cursor-pointer select-none`}
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.65s cubic-bezier(0.45, 0, 0.15, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >

        {/* ══ FRONT ══ */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-white"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            border: '1px solid rgba(0,40,102,0.09)',
            boxShadow: active ? '0 8px 32px rgba(0,40,102,0.13)' : 'none',
            transition: 'box-shadow 0.35s ease',
          }}
        >
          {/* Cross — lower-left, same geometry as home page, partially overflowing */}
          <svg
            className="absolute pointer-events-none"
            style={{
              bottom: '-28%',
              left: '-28%',
              width: '88%',
              height: '88%',
              opacity: active ? 0.065 : 0.04,
              transform: active ? 'rotate(6deg)' : 'rotate(0deg)',
              transition: 'opacity 0.5s ease, transform 1s ease',
            }}
            viewBox="0 0 440 440"
            fill="none"
            aria-hidden="true"
          >
            <rect x="150" y="0"   width="140" height="440" rx="70" fill="#002866" />
            <rect x="0"   y="150" width="440" height="140" rx="70" fill="#002866" />
          </svg>

          {/* Concentric arcs — also anchored at bottom-left, sweep outward on hover */}
          <svg
            className="absolute bottom-0 left-0 pointer-events-none"
            style={{ width: '90%', height: '90%', overflow: 'visible' }}
            viewBox="0 0 360 360"
            fill="none"
            aria-hidden="true"
          >
            {ARC_RADII.map((r, i) => (
              <circle
                key={i}
                cx="0"
                cy="360"
                r={r}
                stroke="#002866"
                strokeWidth="1.5"
                style={{
                  transformBox: 'view-box',
                  transformOrigin: '0% 100%',
                  transform: active ? 'scale(1.30)' : 'scale(0.60)',
                  opacity: active
                    ? [0.14, 0.11, 0.08, 0.055, 0.03][i]
                    : [0.05, 0.04, 0.03, 0.02, 0.015][i],
                  transition: `transform 0.80s cubic-bezier(0.22, 0.9, 0.3, 1) ${i * 55}ms,
                               opacity  0.65s ease ${i * 55}ms`,
                }}
              />
            ))}
          </svg>

          {/* Keyword — main focus, vertically centred, clear of the lower-left decor */}
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-2">
              <span className="block w-5 h-px bg-accent opacity-70" />
              <span
                className="text-xl font-extrabold uppercase tracking-[0.1em] text-center"
                style={{ color: '#002866' }}
              >
                {keyword}
              </span>
              <span className="block w-5 h-px bg-accent opacity-70" />
            </div>
          </div>

          {/* Bottom hover indicator */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
            style={{
              width: active ? '64px' : '0px',
              background: '#38BDF8',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* ══ BACK ══ */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-white flex flex-col justify-center px-5 py-5"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            border: '1px solid rgba(0,40,102,0.09)',
            boxShadow: '0 8px 32px rgba(0,40,102,0.13)',
          }}
        >
          {/* Faint cross echo — lower-left */}
          <svg
            className="absolute pointer-events-none"
            style={{ bottom: '-20%', left: '-20%', width: '70%', height: '70%', opacity: 0.03 }}
            viewBox="0 0 440 440"
            fill="none"
            aria-hidden="true"
          >
            <rect x="150" y="0"   width="140" height="440" rx="70" fill="#002866" />
            <rect x="0"   y="150" width="440" height="140" rx="70" fill="#002866" />
          </svg>

          {/* Faint arc echo */}
          <svg
            className="absolute bottom-0 left-0 pointer-events-none"
            style={{ width: '70%', height: '70%', overflow: 'visible' }}
            viewBox="0 0 360 360"
            fill="none"
            aria-hidden="true"
          >
            {[300, 200, 120].map((r, i) => (
              <circle key={i} cx="0" cy="360" r={r} stroke="#002866" strokeWidth="1"
                opacity={[0.05, 0.03, 0.02][i]} />
            ))}
          </svg>

          {/* Title */}
          <div className="relative z-10 flex items-center gap-2 mb-2.5">
            <span className="block w-5 h-px flex-shrink-0" style={{ background: '#38BDF8' }} />
            <h3
              className="text-sm font-extrabold uppercase tracking-[0.09em] leading-snug"
              style={{ color: '#002866' }}
            >
              {title}
            </h3>
            <span className="block w-5 h-px flex-shrink-0" style={{ background: '#38BDF8' }} />
          </div>

          <p className="relative z-10 text-sm leading-relaxed text-gray-500">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}
