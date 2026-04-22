'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Microscope, Users, GraduationCap, Heart, Megaphone, Handshake, FlaskConical } from 'lucide-react';
import { urlFor } from '@/lib/sanity.client';

interface HeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: {
    asset: {
      _ref: string;
      _id?: string;
      url?: string;
    };
    alt?: string;
  };
  category?: 'clinical-trials' | 'research' | 'community' | 'clinical' | 'training' | 'announcement' | 'partnership';
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  order?: number;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoplaySpeed?: number;
}

const categoryConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  'clinical-trials': { icon: FlaskConical, label: 'Clinical Trials', color: 'bg-blue-600' },
  research: { icon: Microscope, label: 'Research', color: 'bg-indigo-600' },
  community: { icon: Users, label: 'Community Programs', color: 'bg-green-600' },
  clinical: { icon: Heart, label: 'Clinical Programs', color: 'bg-red-600' },
  training: { icon: GraduationCap, label: 'Capacity Building', color: 'bg-purple-600' },
  announcement: { icon: Megaphone, label: 'Announcements', color: 'bg-amber-600' },
  partnership: { icon: Handshake, label: 'Partnerships', color: 'bg-teal-600' },
};

export default function HeroCarousel({ slides, autoplaySpeed = 5000 }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Incrementing this key forces the active slide's content to remount,
  // which restarts the CSS entry animations for each new slide.
  const [contentKey, setContentKey] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setContentKey((k) => k + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 500);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    if (isTransitioning || slides.length <= 1) return;
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, isTransitioning, goToSlide]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || slides.length <= 1) return;
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, isTransitioning, goToSlide]);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setContentKey((k) => k + 1);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, autoplaySpeed]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Fallback when no slides
  if (!slides || slides.length === 0) {
    return (
      <div className="relative h-[600px] lg:h-[700px] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mt-[68px] lg:mt-[104px]">
        <div className="text-center text-white px-6 max-w-4xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Transforming Africa Through Innovation
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 mb-8">
            Leading the way in research, training and service provision
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/who-we-are/about"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all"
            >
              Learn More
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gray-900 mt-[68px] lg:mt-[104px]">
      {/* ── Slides ──────────────────────────────────────────────────── */}
      {slides.map((slide, index) => {
        const category = slide.category ? categoryConfig[slide.category] : null;
        const CategoryIcon = category?.icon;
        const isActive = index === currentSlide;

        return (
          <div
            key={slide._id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Image with Ken Burns settle effect */}
            <div className="absolute inset-0">
              {slide.image?.asset && (
                <div className={`absolute inset-0 ${isActive ? 'hero-image-animate' : ''}`}>
                  <Image
                    src={urlFor(slide.image).width(1920).height(1080).url()}
                    alt={slide.image.alt || slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
              )}
              {/* Bottom-left gradient — strong at the bottom where text lives, fades up and right */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Slide Content — anchored to bottom-left, stretches right */}
            <div className="relative h-full flex items-end">
              <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full pb-20 lg:pb-24">
                {isActive ? (
                  <div key={`content-${contentKey}`} className="max-w-4xl">

                    {/* Category badge — appears first */}
                    {/* {category && CategoryIcon && (
                      <div
                        className="inline-flex items-center gap-2 mb-4"
                        style={{
                          opacity: 0,
                          animation: 'heroSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s forwards',
                        }}
                      >
                        <span className={`inline-flex items-center gap-1.5 ${category.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm`}>
                          <CategoryIcon className="h-3.5 w-3.5" />
                          {category.label}
                        </span>
                      </div>
                    )} */}

                    {/* Subtitle */}
                    {slide.subtitle && (
                      <p
                        className="text-accent text-base lg:text-lg font-semibold mb-3 tracking-wide uppercase"
                        style={{
                          opacity: 0,
                          animation: 'heroSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s forwards',
                        }}
                      >
                        {slide.subtitle}
                      </p>
                    )}

                    {/* Title */}
                    <h2
                      className="text-4xl lg:text-[3.5rem] font-bold text-white mb-5 leading-[1.15]"
                      style={{
                        opacity: 0,
                        animation: 'heroSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s forwards',
                      }}
                    >
                      {slide.title}
                    </h2>

                    {/* Description */}
                    {slide.description && (
                      <p
                        className="text-base lg:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl font-light"
                        style={{
                          opacity: 0,
                          animation: 'heroSlideUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.28s forwards',
                        }}
                      >
                        {slide.description}
                      </p>
                    )}

                    {/* CTA Buttons */}
                    <div
                      className="flex flex-wrap gap-3"
                      style={{
                        opacity: 0,
                        animation: 'heroSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.42s forwards',
                      }}
                    >
                      {slide.ctaLink && (
                        <Link
                          href={slide.ctaLink}
                          className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-accent/85 hover:shadow-accent/30 hover:shadow-lg transition-all hover:scale-105"
                        >
                          {slide.ctaText || 'Learn More'}
                          <ChevronRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      )}
                      {slide.secondaryCtaLink && (
                        <Link
                          href={slide.secondaryCtaLink}
                          className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/60 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 hover:border-white transition-all"
                        >
                          {slide.secondaryCtaText || 'Contact Us'}
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Non-active slide — static, hidden by parent opacity */
                  <div className="max-w-4xl opacity-0" aria-hidden>
                    {slide.subtitle && <p className="text-accent text-lg font-semibold mb-3">{slide.subtitle}</p>}
                    <h2 className="text-4xl lg:text-[3.5rem] font-bold text-white mb-5 leading-[1.15]">{slide.title}</h2>
                    {slide.description && <p className="text-lg text-gray-200 mb-8">{slide.description}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Navigation Arrows ────────────────────────────────────────── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/15 backdrop-blur-sm p-3 lg:p-3.5 text-white border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/15 backdrop-blur-sm p-3 lg:p-3.5 text-white border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* ── Dot Indicators ───────────────────────────────────────────── */}
      {slides.length > 1 && (
        <div className="absolute bottom-7 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60 ${
                index === currentSlide
                  ? 'w-7 bg-accent'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* ── Slide Counter ─────────────────────────────────────────────── */}
      {slides.length > 1 && (
        <div className="absolute top-6 right-6 z-20 rounded-full bg-black/40 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-white/80 tabular-nums">
          {currentSlide + 1} / {slides.length}
        </div>
      )}

      {/* ── Progress Bar ──────────────────────────────────────────────── */}
      {slides.length > 1 && isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/10">
          <div
            key={contentKey}
            className="h-full bg-accent/80"
            style={{ animation: `progress ${autoplaySpeed}ms linear forwards` }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
