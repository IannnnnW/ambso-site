import HeroCarousel from '@/components/sections/HeroCarousel';
import Mission from '@/components/sections/Mission';
import Programs from '@/components/sections/Programs';
import Impact from '@/components/sections/Impact';
import News from '@/components/sections/News';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';
import { getHeroSlides, getHomepageContent, getProgramCategories } from '@/lib/sanity.queries';
import { deepMergeWithFallback, fallbackHomepageContent } from '@/lib/fallback-data';
import { urlFor } from '@/lib/sanity.client';
import type { ProgramCategory } from '@/lib/sanity.types';

const SLUG_IMAGE: Record<string, string> = {
  'research':              '/images/labwork.jpg',
  'clinical-programs':     '/images/labwork.jpg',
  'clinical':              '/images/labwork.jpg',
  'capacity-building':     '/images/capacity-building.png',
  'community-programs':    '/images/community.jpg',
  'community':             '/images/community.jpg',
  'community-engagement':  '/images/community.jpg',
  'resource-mobilization': '/images/resource-mobilization.jpeg',
  'service-delivery':      '/images/staff.jpg',
};

function resolveCategoryImage(cat: ProgramCategory): string {
  if (cat.featuredImage?.asset?._ref) {
    try { return urlFor(cat.featuredImage).width(900).height(600).url(); } catch { /* fall through */ }
  }
  return SLUG_IMAGE[cat.slug?.current ?? ''] ?? '/images/staff-extended.jpg';
}

export default async function Home() {
  const [slides, sanityContent, programCategories] = await Promise.all([
    getHeroSlides(),
    getHomepageContent(),
    getProgramCategories() as Promise<ProgramCategory[]>,
  ]);

  const content = deepMergeWithFallback(sanityContent, fallbackHomepageContent);

  // Build slug → image map from actual Sanity program categories (same logic as /programs page)
  const catImageMap: Record<string, string> = {};
  for (const cat of (programCategories ?? [])) {
    const slug = cat.slug?.current;
    if (slug) catImageMap[slug] = resolveCategoryImage(cat);
  }

  // Align home page program images with the actual program category images
  type HomeProgram = { title: string; description: string; icon: string; href: string; colorClass: string; image?: string };
  const programsSection = {
    ...content.programsSection,
    programs: (content.programsSection?.programs ?? []).map((p: HomeProgram) => {
      if (p.image) return p;
      const slug = (p.href ?? '').split('/').pop() ?? '';
      const catImg = catImageMap[slug];
      return catImg ? { ...p, image: catImg } : p;
    }),
  };

  return (
    <main>
      <HeroCarousel slides={slides} autoplaySpeed={5000} />
      <Mission content={content.missionSection} />
      <Programs content={programsSection} />
      <Impact content={content.impactSection} />
      <News content={content.newsSection} />
      <Partners content={content.partnersSection} />
      <CTA content={content.ctaSection} />
    </main>
  );
}
