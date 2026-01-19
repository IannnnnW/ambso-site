import Container from '../ui/Container';

const partners = [
  { name: 'Partner 1', logo: '/images/partners/partner-1.png' },
  { name: 'Partner 2', logo: '/images/partners/partner-2.png' },
  { name: 'Partner 3', logo: '/images/partners/partner-3.png' },
  { name: 'Partner 4', logo: '/images/partners/partner-4.png' },
  { name: 'Partner 5', logo: '/images/partners/partner-5.png' },
  { name: 'Partner 6', logo: '/images/partners/partner-6.png' },
];

export default function Partners() {
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
