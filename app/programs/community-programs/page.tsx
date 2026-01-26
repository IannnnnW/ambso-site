import Link from 'next/link';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getProgramCategory, getProgramsByCategorySlug } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import {
  Users,
  GraduationCap,
  Heart,
  AlertTriangle,
  Activity,
  ArrowRight,
  FileText,
  LucideIcon,
} from 'lucide-react';

const CATEGORY_SLUG = 'community-programs';

// Icon mapping for fallback data
const iconMap: Record<string, LucideIcon> = {
  Users,
  GraduationCap,
  Heart,
  AlertTriangle,
  Activity,
  FileText,
};

// Fallback programs if Sanity is unavailable
const fallbackPrograms = [
  {
    title: 'Community Advisory Board (CAB)',
    shortDescription: 'Facilitating community input and partnership in our research and programs. The CAB ensures that community voices are heard and integrated into our decision-making processes.',
    icon: 'Users',
    color: 'bg-blue-100 text-blue-600',
    details: [
      'Community representation in research',
      'Feedback mechanism for programs',
      'Community-led initiatives support',
      'Partnership development',
    ],
  },
  {
    title: 'Health Education',
    shortDescription: 'Providing comprehensive health education initiatives to empower communities with knowledge about disease prevention, healthy living, and healthcare access.',
    icon: 'GraduationCap',
    color: 'bg-green-100 text-green-600',
    details: [
      'Health literacy programs',
      'Disease prevention education',
      'Nutrition and wellness workshops',
      'Youth health education',
    ],
  },
  {
    title: 'Community Engagement Interventions',
    shortDescription: 'Implementing targeted community-focused activities that address specific health challenges and promote community well-being.',
    icon: 'Activity',
    color: 'bg-purple-100 text-purple-600',
    details: [
      'Outreach campaigns',
      'Community health screening',
      'Health promotion events',
      'Mobile clinic services',
    ],
  },
  {
    title: 'Gender Based Violence (GBV)',
    shortDescription: 'Comprehensive programs addressing and responding to gender-based violence through prevention, support services, and advocacy.',
    icon: 'AlertTriangle',
    color: 'bg-red-100 text-red-600',
    details: [
      'GBV prevention programs',
      'Survivor support services',
      'Community awareness campaigns',
      'Referral networks',
    ],
  },
  {
    title: 'Illicit Drug Rehabilitation',
    shortDescription: 'Prevention, response, and rehabilitation services for individuals affected by substance use and illicit drug abuse.',
    icon: 'Heart',
    color: 'bg-orange-100 text-orange-600',
    details: [
      'Substance abuse prevention',
      'Rehabilitation services',
      'Counseling and support groups',
      'Community reintegration programs',
    ],
  },
];

// Color classes for dynamic programs
const colorClasses = [
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-red-100 text-red-600',
  'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600',
];

export const metadata = {
  title: 'Community Programs | AMBSO Programs',
  description: 'Empowering communities through health education, violence prevention, and comprehensive support services that address social health determinants.',
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

export default async function CommunityProgramPage() {
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
              {category?.title || 'Community Programs'}
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              {category?.shortDescription ||
                'Empowering communities through health education, violence prevention, and comprehensive support services that address social health determinants.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building Stronger Communities
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our community programs are designed to address social health determinants including violence
              prevention, substance abuse, health literacy, and community empowerment through structured
              advisory mechanisms. We work hand-in-hand with community members to create sustainable health solutions.
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Community Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-gray-600">Communities Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-gray-600">People Reached</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Health Education Sessions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-600">Community Leaders Trained</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Community Involvement */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              Get Involved
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
              We believe in the power of community participation. Whether you're a community member,
              organization, or supporter, there are many ways to engage with our programs.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Volunteer</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join our community programs as a volunteer
                </p>
                <Button href="/contact" variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Partner With Us</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Collaborate on community health initiatives
                </p>
                <Button href="/collaborations" variant="outline" size="sm">
                  Partner
                </Button>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Support</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Support our community programs through donations
                </p>
                <Button href="/donate" variant="outline" size="sm">
                  Donate
                </Button>
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
              Join Our Community Programs
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Together, we can build healthier, more resilient communities across Africa.
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
