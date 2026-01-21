import Container from '../ui/Container';
import { getFeaturedPartners } from '@/lib/sanity.queries';
import { Partner } from '@/lib/sanity.types';
import PartnersCarousel from '@/components/layout/partnersCoursel';

export default async function Partners() {
  const partners: Partner[] = await getFeaturedPartners();

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Collaborating with leading organizations to advance health research and service delivery
          </p>
        </div>

          <PartnersCarousel partners={partners}/>
      </Container>
    </section>
  );
}
