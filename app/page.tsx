import Hero from '@/components/sections/Hero';
import Mission from '@/components/sections/Mission';
import Programs from '@/components/sections/Programs';
import Impact from '@/components/sections/Impact';
import News from '@/components/sections/News';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Mission />
      <Programs />
      <Impact />
      <News />
      <Partners />
      <CTA />
    </main>
  );
}
