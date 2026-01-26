import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { PortableText } from '@portabletext/react';
import { getProgram, getAllProgramSlugs } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Target,
  CheckCircle,
  Building2,
  TrendingUp,
} from 'lucide-react';

interface ProgramPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const programs = await getAllProgramSlugs();
  return programs.map((program: { slug: string; categorySlug: string }) => ({
    category: program.categorySlug,
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    return {
      title: 'Program Not Found | AMBSO',
    };
  }

  return {
    title: `${program.title} | AMBSO Programs`,
    description: program.shortDescription || `Learn about ${program.title} at AMBSO`,
  };
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    planned: 'bg-blue-100 text-blue-700',
    completed: 'bg-gray-100 text-gray-700',
    'on-hold': 'bg-amber-100 text-amber-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { category, slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    notFound();
  }

  // Verify the category matches
  if (program.category?.slug?.current !== category) {
    notFound();
  }

  // Get the primary featured image
  const primaryImage = program.featuredImages?.find(
    (img: { isPrimary?: boolean }) => img.isPrimary
  ) || program.featuredImages?.[0];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-16 md:py-24">
        {primaryImage?.asset && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={urlFor(primaryImage).width(1920).url()}
              alt={primaryImage.alt || program.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <Container>
          <div className="relative z-10">
            {/* Breadcrumb */}
            <Link
              href={`/programs/${category}`}
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to {program.category?.title || 'Programs'}
            </Link>

            {/* Status Badge */}
            {program.status && (
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${getStatusColor(program.status)}`}>
                {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl">
              {program.title}
            </h1>

            {program.shortDescription && (
              <p className="text-xl text-gray-100 leading-relaxed max-w-3xl">
                {program.shortDescription}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-white/80">
              {program.startDate && (
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>
                    Started {formatDate(program.startDate)}
                    {program.endDate && ` - ${formatDate(program.endDate)}`}
                  </span>
                </div>
              )}
              {program.locations && program.locations.length > 0 && (
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  <span>
                    {program.locations.map((loc: { city: string }) => loc.city).join(', ')}
                  </span>
                </div>
              )}
              {program.targetPopulation && (
                <div className="flex items-center">
                  <Users size={18} className="mr-2" />
                  <span>{program.targetPopulation}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              {program.description && program.description.length > 0 && (
                <div className="prose prose-lg max-w-none mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Program</h2>
                  <div className="text-gray-700">
                    <PortableText value={program.description} />
                  </div>
                </div>
              )}

              {/* Objectives */}
              {program.objectives && program.objectives.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Target className="text-primary mr-3" size={24} />
                    Program Objectives
                  </h2>
                  <div className="space-y-3">
                    {program.objectives.map((objective: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                        <p className="text-gray-700">{objective}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcomes */}
              {program.outcomes && program.outcomes.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <TrendingUp className="text-primary mr-3" size={24} />
                    Program Outcomes
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {program.outcomes.map((outcome: { metric: string; value: string; description?: string }, index: number) => (
                      <div key={index} className="bg-gray-50 p-5 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">{outcome.value}</div>
                        <div className="font-semibold text-gray-900">{outcome.metric}</div>
                        {outcome.description && (
                          <p className="text-sm text-gray-600 mt-1">{outcome.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {program.gallery && program.gallery.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {program.gallery.map((image: { asset?: { _ref: string }; alt?: string }, index: number) => (
                      image.asset && (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={urlFor(image).width(400).height(400).url()}
                            alt={image.alt || `Gallery image ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Team Members */}
              {program.teamMembers && program.teamMembers.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Users className="text-primary mr-2" size={20} />
                    Program Team
                  </h3>
                  <div className="space-y-4">
                    {program.teamMembers.map((member: { _id: string; name: string; role: string; image?: { asset?: { _ref: string } }; slug?: { current: string } }) => (
                      <Link
                        key={member._id}
                        href={member.slug ? `/who-we-are/team/${member.slug.current}` : '#'}
                        className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                          {member.image?.asset ? (
                            <img
                              src={urlFor(member.image).width(40).height(40).url()}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-bold">{member.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Partners */}
              {program.partners && program.partners.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Building2 className="text-primary mr-2" size={20} />
                    Partners
                  </h3>
                  <div className="space-y-4">
                    {program.partners.map((partner: { _id: string; name: string; logo?: { asset?: { _ref: string } }; website?: string }) => (
                      <div key={partner._id} className="flex items-center gap-3">
                        {partner.logo?.asset ? (
                          <img
                            src={urlFor(partner.logo).height(32).url()}
                            alt={partner.name}
                            className="h-8 w-auto object-contain"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <Building2 size={16} className="text-gray-500" />
                          </div>
                        )}
                        {partner.website ? (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                          >
                            {partner.name}
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-gray-700">{partner.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations */}
              {program.locations && program.locations.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="text-primary mr-2" size={20} />
                    Locations
                  </h3>
                  <div className="space-y-2">
                    {program.locations.map((location: { name: string; city: string; district: string }, index: number) => (
                      <div key={index} className="text-sm text-gray-700">
                        <div className="font-medium">{location.name}</div>
                        <div className="text-gray-500">{location.city}, {location.district}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Get Involved</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Interested in this program? Contact us to learn how you can participate or support.
                </p>
                <Button href="/contact" className="w-full">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Back to Category CTA */}
      <section className="py-12 bg-gray-50 border-t">
        <Container>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Explore More Programs</h3>
              <p className="text-gray-600">Discover other programs in {program.category?.title}</p>
            </div>
            <Button href={`/programs/${category}`} variant="outline">
              View All {program.category?.title}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
