import Link from 'next/link';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getProgramCategory, getProgramsByCategorySlug } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import {
  Scissors,
  TestTube,
  HeartPulse,
  Users,
  ArrowRight,
  FileText,
  LucideIcon,
} from 'lucide-react';

const CATEGORY_SLUG = 'clinical';

// Icon mapping for fallback data
const iconMap: Record<string, LucideIcon> = {
  Scissors,
  TestTube,
  HeartPulse,
  Users,
  FileText,
};

// Fallback services if Sanity is unavailable
const fallbackServices = [
  {
    title: 'HIV Counseling & Testing',
    description: 'Professional HIV counseling and testing services with confidential results and linkage to care.',
    icon: 'TestTube',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'STD Screening',
    description: 'Comprehensive screening for sexually transmitted diseases with treatment and counseling.',
    icon: 'HeartPulse',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Reproductive Health Services',
    description: 'Information and referral for reproductive health services and family planning.',
    icon: 'Users',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Medical Circumcision',
    description: 'Safe, professional medical circumcision procedures performed by trained healthcare providers.',
    icon: 'Scissors',
    color: 'bg-red-100 text-red-600',
  },
  {
    title: 'Post-Operative Follow-up',
    description: 'Comprehensive follow-up monitoring to ensure safe wound healing and address any concerns.',
    icon: 'HeartPulse',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    title: 'Community Coordination',
    description: 'Partnership with local governments and organizations for program coordination and demand generation.',
    icon: 'Users',
    color: 'bg-yellow-100 text-yellow-600',
  },
];

// Color classes for dynamic programs
const colorClasses = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-green-100 text-green-600',
  'bg-red-100 text-red-600',
  'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600',
];

export const metadata = {
  title: 'Clinical Programs | AMBSO Programs',
  description: 'Providing evidence-based HIV prevention services through Voluntary Medical Male Circumcision and comprehensive clinical care.',
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

export default async function ClinicalProgramsPage() {
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
              {category?.title || 'Clinical Programs'}
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              {category?.shortDescription ||
                'Providing evidence-based HIV prevention services through Voluntary Medical Male Circumcision and comprehensive clinical care.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Voluntary Medical Male Circumcision (VMMC)
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed mb-8">
              AMBSO implements VMMC services in partnership with Uro Care Hospital under service contracts
              with the Infectious Diseases Institute (IDI), aligned with UNAIDS and Uganda Ministry of Health
              HIV prevention priorities.
            </p>
            <div className="bg-primary/5 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Target Population & Service Delivery</h3>
              <p className="text-gray-700 leading-relaxed">
                VMMC services are provided to males aged 15 years and above in Wakiso and neighboring districts,
                utilizing both facility-based and community outreach approaches to maximize accessibility and impact.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Programs from Sanity or Fallback Services */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {hasPrograms ? 'Our Clinical Programs' : 'Comprehensive Service Package'}
          </h2>

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fallbackServices.map((service) => {
                const Icon = iconMap[service.icon] || FileText;
                return (
                  <Card key={service.title} hover className="p-6">
                    <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Clinical Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
              <p className="text-gray-600">VMMC Procedures</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20,000+</div>
              <p className="text-gray-600">HIV Tests Conducted</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <p className="text-gray-600">Districts Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Partnerships */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              Strategic Partnerships
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
              AMBSO has established collaborative partnerships to support program coordination and
              maximize the impact of our clinical services.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-gray-900 mb-2">Uro Care Hospital</h3>
                <p className="text-sm text-gray-600">Clinical Service Partner</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-gray-900 mb-2">Infectious Diseases Institute</h3>
                <p className="text-sm text-gray-600">Program Coordination</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-gray-900 mb-2">Ministry of Health Uganda</h3>
                <p className="text-sm text-gray-600">Policy Alignment</p>
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
              Access Our Clinical Services
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Our clinical programs are designed to be accessible, professional, and client-centered.
              Contact us to learn more about our services.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
