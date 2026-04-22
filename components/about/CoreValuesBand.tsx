'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Shield,
  Heart,
  Lightbulb,
  Zap,
  Star,
  Award,
  Users,
  Globe,
  Microscope,
  BookOpen,
  Flag,
  Target,
  RotateCw,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Container from '@/components/ui/Container';

// ─── Icon registry ────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Heart,
  Lightbulb,
  Zap,
  Star,
  Award,
  Users,
  Globe,
  Microscope,
  BookOpen,
  Flag,
  Target,
};

const titleIconFallback: Record<string, LucideIcon> = {
  integrity: Shield,
  respect: Heart,
  innovativeness: Lightbulb,
  innovation: Lightbulb,
  efficiency: Zap,
  excellence: Award,
  diversity: Users,
  transparency: Globe,
};

function resolveIcon(title: string, iconName?: string): LucideIcon {
  if (iconName) {
    const mapped = iconMap[iconName];
    if (mapped) return mapped;
  }
  const firstWord = title.trim().toLowerCase().split(/\s+/)[0];
  return titleIconFallback[firstWord] ?? Star;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Value {
  title: string;
  description: string;
  detailedDescription?: string;
  icon?: string;
}

interface Props {
  sectionTitle?: string;
  values?: Value[];
}

// ─── FlipCard ─────────────────────────────────────────────────────────────────

interface FlipCardProps {
  value: Value;
  index: number;
  visible: boolean;
  reducedMotion: boolean;
  isPointerFine: boolean;
  isMobileFlipped: boolean;
  onTap: () => void;
}

function FlipCard({
  value,
  index,
  visible,
  reducedMotion,
  isPointerFine,
  isMobileFlipped,
  onTap,
}: FlipCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Desktop uses hover; mobile uses tap state from parent
  const isFlipped = isPointerFine ? isHovered : isMobileFlipped;
  const Icon = resolveIcon(value.title, value.icon);
  const backText = value.detailedDescription || value.description;

  // ── Scroll-in animation ──────────────────────────────────────────────────
  // transform: translateY on a parent defaults to transform-style: flat, which
  // would composite children as a 2D bitmap and break the inner preserve-3d.
  // Adding transformStyle: 'preserve-3d' here passes the 3D context through.
  // opacity < 1 temporarily overrides preserve-3d during the fade-in, but
  // users can't interact with invisible cards so the flip still works.
  const scrollStyle: React.CSSProperties = reducedMotion
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
        transformStyle: 'preserve-3d',
      };

  // ── 3D flip inner ────────────────────────────────────────────────────────
  const flipInnerStyle: React.CSSProperties = reducedMotion
    ? { position: 'relative', width: '100%', height: '100%' }
    : {
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: isFlipped || isHovered ? 'transform' : 'auto',
      };

  // ── Shadow — grows slightly mid-flip to simulate lifting ─────────────────
  const outerShadow = isFlipped
    ? '0 16px 40px rgba(0, 40, 102, 0.22)'
    : '0 2px 8px rgba(0, 40, 102, 0.08)';

  // ── Reduced-motion: crossfade opacity instead of rotate ──────────────────
  const frontOpacity: React.CSSProperties = reducedMotion
    ? { opacity: isFlipped ? 0 : 1, transition: 'opacity 0.35s ease' }
    : {};
  const backOpacity: React.CSSProperties = reducedMotion
    ? { opacity: isFlipped ? 1 : 0, transition: 'opacity 0.35s ease' }
    : {};

  return (
    <div
      style={{
        ...scrollStyle,
        perspective: reducedMotion ? undefined : '1000px',
        boxShadow: outerShadow,
        transition: [
          scrollStyle.transition,
          'box-shadow 0.35s ease',
        ]
          .filter(Boolean)
          .join(', '),
        height: '288px',           // fixed height so both faces match
        borderRadius: '0.75rem',  // rounded-xl
        cursor: 'pointer',
      }}
      onMouseEnter={() => isPointerFine && setIsHovered(true)}
      onMouseLeave={() => isPointerFine && setIsHovered(false)}
      onClick={onTap}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`${value.title} — ${isFlipped ? 'showing details, click to flip back' : 'click to reveal details'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTap();
        }
      }}
    >
      <div style={flipInnerStyle}>

        {/* ── FRONT FACE ────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-6 text-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            ...frontOpacity,
          }}
        >
          {/* Icon circle */}
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: '#002866' }}
          >
            <Icon size={24} className="text-white" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold leading-snug" style={{ color: '#002866' }}>
            {value.title}
          </h3>

          {/* Short description — 1-line teaser */}
          <p
            className="w-full overflow-hidden text-sm leading-relaxed"
            style={{
              color: '#1f2937',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {value.description}
          </p>

          {/* Mobile flip hint — hidden on pointer-fine (desktop) devices via CSS */}
          <div
            className="absolute bottom-3 right-3 md:hidden"
            aria-hidden="true"
          >
            <RotateCw size={14} style={{ color: 'rgba(56,189,248,0.45)' }} />
          </div>
        </div>

        {/* ── BACK FACE ─────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-xl p-6 text-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            // Pre-rotated 180° so it's hidden by default and readable when flipped
            transform: reducedMotion ? undefined : 'rotateY(180deg)',
            background: 'radial-gradient(ellipse at 50% 40%, #003d99 0%, #002866 70%)',
            ...backOpacity,
          }}
        >
          {/* Watermark icon — large, faint, bottom-right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 -right-4"
          >
            <Icon size={96} style={{ color: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Title */}
          <h3 className="relative z-10 text-lg font-bold text-white">{value.title}</h3>

          {/* Accent divider */}
          <div
            className="relative z-10 h-0.5 w-10 flex-shrink-0 rounded-full"
            style={{ backgroundColor: '#38bdf8' }}
            aria-hidden="true"
          />

          {/* Full description */}
          <p className="relative z-10 text-sm leading-relaxed text-white/90">
            {backText}
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── CoreValuesBand ───────────────────────────────────────────────────────────

export default function CoreValuesBand({
  sectionTitle = 'Our Core Values',
  values = [],
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // true on mouse-driven devices (hover: hover + pointer: fine)
  const [isPointerFine, setIsPointerFine] = useState(true);
  // Mobile: index of the currently flipped card (null = none)
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);

  // ── Detect preferences & input type ──────────────────────────────────────
  useEffect(() => {
    const rmmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pmq = window.matchMedia('(pointer: fine) and (hover: hover)');

    const applyRM = (v: boolean) => {
      setReducedMotion(v);
      if (v) setVisible(true);
    };
    const applyPointer = (v: boolean) => setIsPointerFine(v);

    applyRM(rmmq.matches);
    applyPointer(pmq.matches);

    const rmHandler = (e: MediaQueryListEvent) => applyRM(e.matches);
    const pmqHandler = (e: MediaQueryListEvent) => applyPointer(e.matches);

    rmmq.addEventListener('change', rmHandler);
    pmq.addEventListener('change', pmqHandler);
    return () => {
      rmmq.removeEventListener('change', rmHandler);
      pmq.removeEventListener('change', pmqHandler);
    };
  }, []);

  // ── Scroll-in observer ────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  // ── Mobile tap handler — one card at a time ───────────────────────────────
  const handleTap = (index: number) => {
    if (isPointerFine) return; // desktop cards flip via hover, not click
    setActiveMobileIndex((prev) => (prev === index ? null : index));
  };

  // ── Heading animation (same observer timing as cards) ────────────────────
  const headingStyle: React.CSSProperties = reducedMotion
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s ease 0ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0ms',
      };

  return (
    <section className="py-20" style={{ backgroundColor: '#f8fafc' }}>
      <Container>
        {/* Section heading */}
        <div style={headingStyle} className="mb-14 text-center">
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: '#002866' }}>
            {sectionTitle}
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
            <span className="block h-1 w-12 rounded-full" style={{ backgroundColor: '#38bdf8' }} />
            <span className="block h-1 w-4 rounded-full" style={{ backgroundColor: 'rgba(56,189,248,0.4)' }} />
          </div>
        </div>

        {/* Card grid */}
        <div
          ref={containerRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value, index) => (
            <FlipCard
              key={index}
              value={value}
              index={index}
              visible={visible}
              reducedMotion={reducedMotion}
              isPointerFine={isPointerFine}
              isMobileFlipped={activeMobileIndex === index}
              onTap={() => handleTap(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
