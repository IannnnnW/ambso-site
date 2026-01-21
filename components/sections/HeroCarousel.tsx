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

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
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

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
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
      <div className="relative h-[600px] lg:h-[700px] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mt-20">
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
    <div className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gray-900 mt-20">
      {/* Slides */}
      {slides.map((slide, index) => {
        const category = slide.category ? categoryConfig[slide.category] : null;
        const CategoryIcon = category?.icon;

        return (
          <div
            key={slide._id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {slide.image?.asset && (
                <Image
                  src={urlFor(slide.image).width(1920).height(1080).url()}
                  alt={slide.image.alt || slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-accent text-lg font-medium mb-3">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Title */}
                  <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  {slide.description && (
                    <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {slide.ctaLink && (
                      <Link
                        href={slide.ctaLink}
                        className="inline-flex items-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition-all hover:scale-105"
                      >
                        {slide.ctaText || 'Learn More'}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    )}
                    {slide.secondaryCtaLink && (
                      <Link
                        href={slide.secondaryCtaLink}
                        className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
                      >
                        {slide.secondaryCtaText || 'Contact Us'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 backdrop-blur-sm p-3 lg:p-4 text-white hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 backdrop-blur-sm p-3 lg:p-4 text-white hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
                index === currentSlide
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute top-8 right-8 z-20 rounded-full bg-black/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white">
          {currentSlide + 1} / {slides.length}
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 1 && isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
          <div
            className="h-full bg-primary transition-all ease-linear"
            style={{
              width: '100%',
              animation: `progress ${autoplaySpeed}ms linear infinite`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
