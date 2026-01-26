import Link from 'next/link';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getProgramCategory, getProgramsByCategorySlug } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import {
  HandCoins,
  Building2,
  Globe,
  FileCheck,
  Briefcase,
  ArrowRight,
  FileText,
  LucideIcon,
} from 'lucide-react';

const CATEGORY_SLUG = 'resource-mobilization';

// Icon mapping for fallback data
const iconMap: Record<string, LucideIcon> = {
  HandCoins,
  Building2,
  Globe,
  FileCheck,
  Briefcase,
  FileText,
};

// Fallback programs if Sanity is unavailable
const fallbackPrograms = [
  {
    title: 'Grant Writing & Proposal Development',
    shortDescription: 'Developing compelling grant proposals and funding applications to secure resources for health programs and research initiatives.',
    icon: 'FileCheck',
    color: 'bg-blue-100 text-blue-600',
    details: [
      'Grant proposal writing',
      'Funding landscape analysis',
      'Budget development',
      'Compliance documentation',
    ],
  },
  {
    title: 'Partnership Development',
    shortDescription: 'Building strategic partnerships with donors, foundations, and organizations to support sustainable program funding.',
    icon: 'Building2',
    color: 'bg-green-100 text-green-600',
    details: [
      'Donor relationship management',
      'Corporate partnerships',
      'Foundation engagement',
      'Government collaboration',
    ],
  },
  {
    title: 'Fundraising Initiatives',
    shortDescription: 'Implementing diverse fundraising strategies to support health research and community programs across Africa.',
    icon: 'HandCoins',
    color: 'bg-purple-100 text-purple-600',
    details: [
      'Crowdfunding campaigns',
      'Donor cultivation events',
      'Individual giving programs',
      'Corporate sponsorships',
    ],
  },
  {
    title: 'International Funding',
    shortDescription: 'Accessing international funding mechanisms and global health financing opportunities for sustainable program implementation.',
    icon: 'Globe',
    color: 'bg-orange-100 text-orange-600',
    details: [
      'Global fund applications',
      'Bilateral funding access',
      'International foundation grants',
      'Cross-border partnerships',
    ],
  },
];

// Color classes for dynamic programs
const colorClasses = [
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600',
  'bg-red-100 text-red-600',
];

export const metadata = {
  title: 'Resource Mobilization | AMBSO Programs',
  description: 'Securing sustainable funding for health research and program implementation through strategic partnerships and innovative fundraising.',
};

interface Program {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  featuredImages?: Array<{ asset?: { _ref: string }; alt?: string; isPrimary?: boolean }>;
  status?: string;
  objectives?: string[];
}

export default async function ResourceMobilizationPage() {
  const [category, programs] = await Promise.all([
    getProgramCategory(CATEGORY_SLUG),
    getProgramsByCategorySlug(CATEGORY_SLUG),
  ]);

  const hasPrograms = programs && programs.length > 0;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category?.title || 'Resource Mobilization'}
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              {category?.shortDescription ||
                'Securing sustainable funding for health research and program implementation through strategic partnerships and innovative fundraising.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sustaining Impact Through Strategic Funding
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our resource mobilization efforts focus on building diverse funding streams to ensure
              the sustainability of health programs and research initiatives. We work with local and
              international partners to secure the resources needed to transform healthcare across Africa.
            </p>
          </div>

          {/* Programs Grid */}
          {hasPrograms ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(programs as Program[]).map((program, index) => {
                const primaryImage = program.featuredImages?.find(
                  (img) => img.isPrimary
                ) || program.featuredImages?.[0];
                const colorClass = colorClasses[index % colorClasses.length];

                return (
                  <Link
                    key={program._id}
                    href={`/programs/${CATEGORY_SLUG}/${program.slug.current}`}
                    className="group"
                  >
                    <Card hover className="p-6 h-full flex flex-col">
                      {primaryImage?.asset ? (
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                          <img
                            src={urlFor(primaryImage).width(400).height(200).url()}
                            alt={primaryImage.alt || program.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mb-4`}>
                          <FileText size={32} />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                        {program.shortDescription}
                      </p>
                      {program.objectives && program.objectives.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {program.objectives.slice(0, 3).map((objective, objIndex) => (
                            <div key={objIndex} className="flex items-start text-sm text-gray-600">
                              <span className="text-primary mr-2">✓</span>
                              <span className="line-clamp-1">{objective}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center text-primary font-medium mt-auto">
                        Learn More
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            // Fallback UI when no Sanity programs
            <div className="grid md:grid-cols-2 gap-8">
              {fallbackPrograms.map((program) => {
                const Icon = iconMap[program.icon] || FileText;
                return (
                  <Card key={program.title} hover className="p-6">
                    <div className={`w-16 h-16 ${program.color} rounded-full flex items-center justify-center mb-4`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{program.shortDescription}</p>
                    <ul className="space-y-2">
                      {program.details.map((detail, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <span className="text-primary mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Funding Impact */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Funding Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$2M+</div>
              <p className="text-gray-600">Funds Mobilized</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-gray-600">Funding Partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">40+</div>
              <p className="text-gray-600">Grants Secured</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-gray-600">Countries Supported</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Partner Types */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Our Funding Partners
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary/5 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Institutional Partners</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    International health organizations
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Academic and research institutions
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Government health ministries
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Multilateral development agencies
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Private Sector Partners</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-accent-dark mr-2">•</span>
                    Private foundations
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-dark mr-2">•</span>
                    Corporate social responsibility programs
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-dark mr-2">•</span>
                    Individual philanthropists
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-dark mr-2">•</span>
                    Impact investors
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Partner With Us
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Join us in transforming healthcare across Africa. Your partnership can help fund
              life-changing health programs and research initiatives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/donate" variant="secondary" size="lg">
                Make a Donation
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
              >
                Become a Partner
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
