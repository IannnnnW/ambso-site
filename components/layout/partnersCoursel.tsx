'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Partner } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';
import Image from 'next/image';

interface PartnersCarouselProps {
  partners: Partner[];
}

export default function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }, 20);
    };

    startScroll();

    const handleMouseEnter = () => clearInterval(scrollInterval);
    const handleMouseLeave = () => startScroll();

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="overflow-hidden py-8">
      <div
        ref={scrollRef}
        className="flex gap-16 overflow-x-hidden items-center"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner._id}-${index}`}
            className="flex-shrink-0 w-56 flex items-center justify-center transition-all duration-300"
          >
            {partner.logo?.asset ? (
              <Link href={`/collaborations/${partner.slug.current}`} className="block relative w-full h-32">
                <Image
                  src={urlFor(partner.logo).width(300).url()}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 224px"
                />
              </Link>
            ) : (
              <Link
                href={`/collaborations/${partner.slug.current}`}
                className="flex items-center justify-center h-32 text-gray-600 font-semibold text-center px-4 hover:text-primary transition-colors"
              >
                {partner.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}