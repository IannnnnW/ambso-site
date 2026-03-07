'use client';

import { useEffect, useRef, useState } from 'react';

type Animation = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'zoom-in';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;       // milliseconds
  duration?: number;    // milliseconds
  threshold?: number;   // 0–1, how much of the element must be visible to trigger
  once?: boolean;       // animate only the first time (default: true)
  className?: string;
}

const animationStyles: Record<Animation, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  'fade-up': {
    hidden:  { opacity: 0, transform: 'translateY(32px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-down': {
    hidden:  { opacity: 0, transform: 'translateY(-32px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-left': {
    hidden:  { opacity: 0, transform: 'translateX(32px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'fade-right': {
    hidden:  { opacity: 0, transform: 'translateX(-32px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'fade': {
    hidden:  { opacity: 0, transform: 'none' },
    visible: { opacity: 1, transform: 'none' },
  },
  'zoom-in': {
    hidden:  { opacity: 0, transform: 'scale(0.92)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
};

export default function AnimateOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 550,
  threshold = 0.15,
  once = true,
  className = '',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const { hidden, visible: vis } = animationStyles[animation];

  const style: React.CSSProperties = {
    ...( visible ? vis : hidden ),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: visible ? `${delay}ms` : '0ms',
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}