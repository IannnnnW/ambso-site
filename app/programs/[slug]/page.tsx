import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PortableText } from '@portabletext/react';
import { getProgramCategory, getProgramCategories } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const colorClasses = [
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600',
  'bg-red-100 text-red-600',
];

export async function generateStaticParams() {
  const categories = await getProgramCategories();
  return (categories ?? []).map((c: { slug: { current: string } }) => ({
    slug: c.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getProgramCategory(slug);
  if (!category) return { title: 'Program Not Found | AMBSO' };
  return {
    title: `${category.title} | AMBSO Programs`,
    description: category.shortDescription ?? `Learn about ${category.title} programs at AMBSO`,
  };
}

interface RelatedProgram {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  featuredImages?: Array<{ asset?: { _ref: string }; alt?: string; isPrimary?: boolean }>;
  status?: string;
  objectives?: string[];
}

export default async function ProgramCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getProgramCategory(slug);

  if (!category) notFound();

  const programs: RelatedProgram[] = category.relatedPrograms ?? [];

  return (
    <div className="pt-20 lg:pt-28">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <Link
            href="/programs"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            All Programs
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{category.title}</h1>
            {category.shortDescription && (
              <p className="text-xl text-gray-100 leading-relaxed">{category.shortDescription}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Main body content */}
      {category.mainBody && category.mainBody.length > 0 && (
        <section className="py-16 bg-white border-b border-gray-100">
          <Container>
            <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary">
              <PortableText value={category.mainBody} />
            </div>
          </Container>
        </section>
      )}

      {/* Programs grid */}
      <section className="py-16 bg-white">
        <Container>
          {programs.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-10">
                Programs Under {category.title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program, index) => {
                  const primaryImage =
                    program.featuredImages?.find((img) => img.isPrimary) ??
                    program.featuredImages?.[0];
                  const colorClass = colorClasses[index % colorClasses.length];

                  return (
                    <Link
                      key={program._id}
                      href={`/programs/${slug}/${program.slug.current}`}
                      className="group"
                    >
                      <Card hover className="p-6 h-full flex flex-col">
                        {primaryImage?.asset ? (
                          <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                            <img
                              src={urlFor(primaryImage).width(400).height(200).url()}
                              alt={primaryImage.alt ?? program.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mb-4`}>
                            <FileText size={28} />
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                          {program.title}
                        </h3>
                        {program.shortDescription && (
                          <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                            {program.shortDescription}
                          </p>
                        )}
                        {program.objectives && program.objectives.length > 0 && (
                          <div className="space-y-1 mb-4">
                            {program.objectives.slice(0, 3).map((obj, i) => (
                              <div key={i} className="flex items-start text-sm text-gray-600">
                                <span className="text-primary mr-2">✓</span>
                                <span className="line-clamp-1">{obj}</span>
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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Programs coming soon.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Objectives */}
      {category.objectives && category.objectives.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Objectives</h2>
              <div className="space-y-4">
                {category.objectives.map((obj: string, i: number) => (
                  <div key={i} className="flex items-start">
                    <span className="text-primary font-bold mr-3 mt-0.5">✓</span>
                    <p className="text-gray-700">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {category.ctaTitle ?? 'Get Involved'}
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              {category.ctaDescription ??
                'Interested in our programs? Contact us to learn more or explore partnership opportunities.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="secondary" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
