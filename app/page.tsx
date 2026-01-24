import HeroCarousel from '@/components/sections/HeroCarousel';
import Mission from '@/components/sections/Mission';
import Programs from '@/components/sections/Programs';
import Impact from '@/components/sections/Impact';
import News from '@/components/sections/News';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';
import { getHeroSlides, getHomepageContent } from '@/lib/sanity.queries';
import { deepMergeWithFallback, fallbackHomepageContent } from '@/lib/fallback-data';

export default async function Home() {
  const [slides, sanityContent] = await Promise.all([
    getHeroSlides(),
    getHomepageContent(),
  ]);

  const content = deepMergeWithFallback(sanityContent, fallbackHomepageContent);

  return (
    <main>
      <HeroCarousel slides={slides} autoplaySpeed={5000} />
      <Mission content={content.missionSection} />
      <Programs content={content.programsSection} />
      <Impact content={content.impactSection} />
      <News content={content.newsSection} />
      <Partners content={content.partnersSection} />
      <CTA content={content.ctaSection} />
    </main>
  );
}
