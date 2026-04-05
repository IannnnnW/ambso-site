import Link from 'next/link';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Handshake, Globe, ExternalLink } from 'lucide-react';
import { getPartners } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';

interface Partner {
  _id: string;
  name: string;
  slug: { current: string };
  partnerType?: string;
  logo?: { asset: { _ref: string }; alt?: string };
  website?: string;
  country?: string;
}

function getPartnerTypeLabel(type?: string): string {
  const labels: Record<string, string> = {
    academic: 'Academic Institution',
    research: 'Research Organization',
    government: 'Government Agency',
    ngo: 'NGO / Non-Profit',
    private: 'Private Sector',
    international: 'International Organization',
    community: 'Community Organization',
  };
  return labels[type || ''] || 'Partner';
}

export default async function CollaborationsPage() {
  const partners: Partner[] = await getPartners().catch(() => []);

  const international = partners.filter(
    (p) => p.partnerType === 'academic' || p.partnerType === 'international' || p.partnerType === 'research'
  );
  const regional = partners.filter(
    (p) => p.partnerType === 'government' || p.partnerType === 'ngo' || p.partnerType === 'community' || p.partnerType === 'private'
  );
  const uncategorised = partners.filter(
    (p) => !international.includes(p) && !regional.includes(p)
  );

  // Fallback lists when Sanity has no data yet
  const fallbackInternational = [
    'Karolinska Institutet',
    'University of Southern California (USC)',
    'Boston College',
    'University of California, Los Angeles (UCLA)',
  ];
  const fallbackRegional = [
    'Infectious Diseases Institute (IDI)',
    'Uro Care Hospital',
    'Ministry of Health Uganda',
    'Various East African Research Centers',
  ];

  return (
    <div className="pt-20 lg:pt-28">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Collaborations</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Building strategic partnerships to advance health research and service delivery across Africa.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Partnership Approach
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              AMBSO maintains strategic partnerships with leading international institutions and regional organizations,
              enabling us to deliver world-class research and services that transform lives across the continent.
            </p>
          </div>

          {/* Sanity-driven partner grid */}
          {partners.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Link
                  key={partner._id}
                  href={`/collaborations/${partner.slug.current}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="h-32 bg-gray-50 flex items-center justify-center p-4">
                    {partner.logo?.asset ? (
                      <img
                        src={urlFor(partner.logo).height(80).url()}
                        alt={partner.logo.alt || partner.name}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Globe className="text-primary" size={28} />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                      {partner.name}
                    </h3>
                    {partner.partnerType && (
                      <p className="text-sm text-gray-500 mb-3">{getPartnerTypeLabel(partner.partnerType)}</p>
                    )}
                    {partner.country && (
                      <p className="text-xs text-gray-400 mt-auto">{partner.country}</p>
                    )}
                    <span className="text-primary text-sm font-medium mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ExternalLink size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Fallback static lists */
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Globe className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">International Partners</h3>
                <ul className="space-y-3">
                  {fallbackInternational.map((name) => (
                    <li key={name} className="flex items-start text-gray-700">
                      <span className="text-primary mr-2">•</span>
                      {name}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Globe className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Regional Partners</h3>
                <ul className="space-y-3">
                  {fallbackRegional.map((name) => (
                    <li key={name} className="flex items-start text-gray-700">
                      <span className="text-accent-dark mr-2">•</span>
                      {name}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Handshake className="text-primary" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Partner With Us
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We welcome partnerships with organizations that share our commitment to transforming
              Africa through innovative research, training, and service provision.
            </p>
            <Button href="/contact" size="lg">
              Get in Touch
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
