'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Flag,
  Users,
  Globe,
  Award,
  Microscope,
  Heart,
  BookOpen,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { urlFor } from '@/lib/sanity.client';
import type { HistoryMilestone } from '@/lib/sanity.types';

// ─── Icon registry ────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Flag,
  Users,
  Globe,
  Award,
  Microscope,
  Heart,
  BookOpen,
  Star,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  milestones: HistoryMilestone[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HistoryRoadmap({ milestones }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [lineProgress, setLineProgress] = useState(0);
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [reducedMotion, setReducedMotion] = useState(false);

  // ── Detect prefers-reduced-motion ──────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setLineProgress(100);
      setVisibleSet(new Set(milestones.map((_, i) => i)));
      setActiveIndex(milestones.length - 1);
    }
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setLineProgress(100);
        setVisibleSet(new Set(milestones.map((_, i) => i)));
        setActiveIndex(milestones.length - 1);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [milestones]);

  // ── Scroll-based connector-line fill ───────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0% when the container top is at the bottom of the viewport;
      // 100% when the container bottom reaches the top of the viewport.
      const raw = (vh - rect.top) / (rect.height + vh);
      setLineProgress(Math.min(100, Math.max(0, raw * 100)));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [reducedMotion]);

  // ── Per-milestone IntersectionObserver ─────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;

    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSet((prev) => new Set([...prev, i]));
            setActiveIndex(i);
          }
        },
        // Trigger when 30% of the row is visible; shrink bottom root margin
        // so items near the bottom of the viewport become "active" sooner.
        { threshold: 0.3, rootMargin: '0px 0px -5% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [milestones, reducedMotion]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="relative">
      {/* ── Connector line ─────────────────────────────────────────────────── */}
      {/* Desktop: centred; Mobile: aligned with the dot column (left-6 = 24px) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 top-6 w-px bg-gray-200
                   left-6 md:left-1/2"
      >
        <div
          className="absolute inset-x-0 top-0 w-full transition-[height] duration-300 ease-out"
          style={{
            height: `${lineProgress}%`,
            backgroundColor: 'var(--accent, #38bdf8)',
          }}
        />
      </div>

      {/* ── Milestone rows ─────────────────────────────────────────────────── */}
      <div className="space-y-14 md:space-y-20">
        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          const isVisible = visibleSet.has(index);
          const isActive = activeIndex === index;
          const Icon = iconMap[milestone.icon ?? ''] ?? Flag;

          // Card slide-in style (no-op when reducedMotion is true)
          const cardStyle = (side: 'left' | 'right'): React.CSSProperties => {
            if (reducedMotion) return {};
            const dx = side === 'left' ? -40 : 40;
            return {
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translate(0, 0)'
                : `translate(${dx}px, 12px)`,
              transition:
                'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
              transitionDelay: isVisible ? '60ms' : '0ms',
            };
          };

          return (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="flex items-start"
            >
              {/* ── Left content column (desktop, even rows) ─────────────── */}
              <div className="hidden flex-1 pr-8 md:block">
                {isEven && (
                  <div style={cardStyle('left')} className="flex justify-end">
                    <MilestoneCard milestone={milestone} />
                  </div>
                )}
              </div>

              {/* ── Centre dot + year badge ───────────────────────────────── */}
              <div className="z-10 flex w-12 flex-shrink-0 flex-col items-center gap-2">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2
                             transition-all duration-500"
                  style={{
                    borderColor: isActive
                      ? 'var(--accent, #38bdf8)'
                      : 'var(--primary, #002866)',
                    backgroundColor: isActive
                      ? 'var(--accent, #38bdf8)'
                      : '#ffffff',
                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: isActive
                      ? '0 0 0 6px rgba(56, 189, 248, 0.18)'
                      : 'none',
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color: isActive
                        ? '#ffffff'
                        : 'var(--primary, #002866)',
                    }}
                  />
                </div>

                <span
                  className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px]
                             font-bold text-white transition-colors duration-500"
                  style={{
                    backgroundColor: isActive
                      ? 'var(--accent, #38bdf8)'
                      : 'var(--primary, #002866)',
                  }}
                >
                  {milestone.year}
                </span>
              </div>

              {/* ── Right content column ─────────────────────────────────── */}
              <div className="min-w-0 flex-1 pl-4 md:pl-8">
                {/* Mobile: every item appears here */}
                <div className="md:hidden" style={cardStyle('right')}>
                  <MilestoneCard milestone={milestone} />
                </div>
                {/* Desktop: only odd-index items */}
                {!isEven && (
                  <div className="hidden md:block" style={cardStyle('right')}>
                    <MilestoneCard milestone={milestone} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Milestone card ───────────────────────────────────────────────────────────

function MilestoneCard({ milestone }: { milestone: HistoryMilestone }) {
  const imageAsset = milestone.image?.asset as
    | { _id?: string; _ref?: string; url?: string }
    | undefined;

  const imageUrl =
    imageAsset && (imageAsset._id || imageAsset._ref)
      ? urlFor(milestone.image).width(480).height(240).url()
      : null;

  return (
    <div
      className="w-full max-w-sm rounded-xl border border-gray-100 bg-white p-6
                 shadow-sm transition-all duration-300 hover:border-sky-100 hover:shadow-md"
    >
      <h3
        className="mb-2 text-lg font-bold leading-snug"
        style={{ color: 'var(--primary, #002866)' }}
      >
        {milestone.title}
      </h3>

      {milestone.description && (
        <p className="text-sm leading-relaxed text-gray-600">
          {milestone.description}
        </p>
      )}

      {imageUrl && (
        <div className="mt-4 overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={milestone.image?.alt ?? milestone.title}
            className="h-40 w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
