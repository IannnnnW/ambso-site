'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/Container';

interface ImpactStat {
  value: number;
  label: string;
  suffix?: string;
  link?: string;
}

interface ImpactProps {
  content?: {
    title?: string;
    subtitle?: string;
    stats?: ImpactStat[];
  };
}

const defaultContent = {
  title: 'Our Impact',
  subtitle: 'Making a measurable difference in communities across Africa',
  stats: [
    { value: 57000, label: 'Male Circumcisions', suffix: '+', link: '/programs' },
    { value: 35, label: 'Peer Reviewed Publications', suffix: '+', link: '/resources' },
    { value: 15, label: 'Partner Organizations', suffix: '+', link: '/collaborations' },
    { value: 15, label: 'Years of Impact', suffix: '', link: '/who-we-are/about' },
  ] as ImpactStat[],
};

function Counter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const increment = value / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Impact({ content }: ImpactProps) {
  const title = content?.title ?? defaultContent.title;
  const subtitle = content?.subtitle ?? defaultContent.subtitle;
  const stats = content?.stats ?? defaultContent.stats;

  return (
    <section className="relative py-20 overflow-hidden text-white">
      {/* Molecular background image */}
      <Image
        src="/images/molecular-bkg.jpg"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
      />
      {/* Primary navy overlay — lets the molecular texture breathe while keeping text legible */}
      <div className="absolute inset-0 bg-primary/85" />
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const inner = (
              <>
                <div className="font-heading text-4xl md:text-5xl font-bold mb-2">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-lg text-gray-200 group-hover:text-white transition-colors">{stat.label}</div>
              </>
            );
            return stat.link ? (
              <Link
                key={stat.label}
                href={stat.link}
                className="group text-center rounded-2xl px-2 py-4 -my-4 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                {inner}
              </Link>
            ) : (
              <div key={stat.label} className="text-center">
                {inner}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
