import HeroCarousel from '@/components/sections/HeroCarousel';
import Mission from '@/components/sections/Mission';
import Programs from '@/components/sections/Programs';
import Impact from '@/components/sections/Impact';
import News from '@/components/sections/News';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';
import { getHeroSlides } from '@/lib/sanity.queries';

export default async function Home() {
  const slides = await getHeroSlides();

  return (
    <main>
      <HeroCarousel slides={slides} autoplaySpeed={5000} />
      <Mission />
      <Programs />
      <Impact />
      <News />
      <Partners />
      <CTA />
    </main>
  );
}
