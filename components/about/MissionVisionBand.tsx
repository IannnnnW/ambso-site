'use client';

import { useEffect, useRef, useState } from 'react';
import { Target, Eye } from 'lucide-react';
import Container from '@/components/ui/Container';

interface Props {
  missionTitle?: string;
  missionDescription?: string;
  visionTitle?: string;
  visionDescription?: string;
}

export default function MissionVisionBand({
  missionTitle = 'Our Mission',
  missionDescription = 'Transforming Africa through innovative research, training and service provision',
  visionTitle = 'Our Vision',
  visionDescription = 'Complete Physical, Social and Mental well-being in Africa',
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    if (mq.matches) setVisible(true);
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setVisible(true);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  const fadeUp = (delay: number): React.CSSProperties =>
    reducedMotion
      ? {}
      : {
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#002866' }}
    >
      {/* ── Dot-grid texture overlay ──────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="mv-dots"
              x="0"
              y="0"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="#4a90d9" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mv-dots)" opacity="0.12" />
        </svg>
      </div>

      {/* ── Soft radial glow — upper right ───────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <Container className="relative z-10 py-20 pb-28">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-0">

          {/* Mission */}
          <div style={fadeUp(0)} className="md:pr-14">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(56,189,248,0.12)' }}
              >
                <Target size={24} style={{ color: '#38bdf8' }} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: '#38bdf8' }}
              >
                {missionTitle}
              </span>
            </div>

            <p
              className="text-xl font-light leading-[1.8] text-white/90 lg:text-2xl"
            >
              {missionDescription}
            </p>
          </div>

          {/* Vertical divider — desktop only */}
          <div
            aria-hidden="true"
            className="mx-8 hidden self-stretch md:block"
            style={{
              width: '1px',
              backgroundColor: 'rgba(56,189,248,0.22)',
            }}
          />

          {/* Vision */}
          <div style={fadeUp(140)} className="md:pl-14">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(56,189,248,0.12)' }}
              >
                <Eye size={24} style={{ color: '#38bdf8' }} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: '#38bdf8' }}
              >
                {visionTitle}
              </span>
            </div>

            <p
              className="text-xl font-light leading-[1.8] text-white/90 lg:text-2xl"
            >
              {visionDescription}
            </p>
          </div>
        </div>
      </Container>

      {/* ── Diagonal bottom edge transitioning into #f8fafc ──────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{ height: '64px' }}
      >
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <polygon points="0,64 1440,0 1440,64" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}
