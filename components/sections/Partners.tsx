import Container from '../ui/Container';
import { getFeaturedPartners } from '@/lib/sanity.queries';
// import { urlFor } from '@/lib/sanity.client';
import { Partner } from '@/lib/sanity.types';

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {partners.map((partner) => (
            <a
              key={partner._id}
              href={partner.website || '#'}
              target={partner.website ? '_blank' : '_self'}
              rel={partner.website ? 'noopener noreferrer' : ''}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              {partner.logo ? (
                <img
                  // src={urlFor(partner.logo).width(200).height(100).fit('max').url()}
                  alt={partner.logo.alt || partner.name}
                  className="max-w-full max-h-20 object-contain"
                />
              ) : (
                <div className="text-center text-gray-700 font-medium text-sm">
                  {partner.name}
                </div>
              )}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
