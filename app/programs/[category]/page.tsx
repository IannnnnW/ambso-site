import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PortableText } from '@portabletext/react';
import { getProgramCategory, getProgramCategories, getAllResearch } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Research } from '@/lib/sanity.types';

interface PageProps {
  params: Promise<{ category: string }>;
}

// ── helpers ──────────────────────────────────────────────────────────────────

const RESEARCH_TYPE_IMAGE: Record<string, string> = {
  'clinical-trials':  '/images/labwork.jpg',
  'epidemiological':  '/images/community.jpg',
  'behavioral':       '/images/community.jpg',
  'implementation':   '/images/staff.jpg',
};

const RESEARCH_TYPE_LABEL: Record<string, string> = {
  'clinical-trials':  'Clinical Trial',
  'epidemiological':  'Epidemiological Study',
  'behavioral':       'Behavioral Research',
  'implementation':   'Implementation Research',
  'other':            'Research Study',
};

const STATUS_STYLES: Record<string, string> = {
  active:     'bg-accent/20 text-accent border border-accent/30',
  recruiting: 'bg-green-500/20 text-green-300 border border-green-400/30',
  completed:  'bg-white/15 text-white/70 border border-white/20',
  planning:   'bg-amber-400/20 text-amber-300 border border-amber-400/30',
  suspended:  'bg-red-500/20 text-red-300 border border-red-400/30',
};

function researchImage(r: Research): string {
  if (r.featuredImage?.asset?._ref) {
    try { return urlFor(r.featuredImage).width(900).height(600).url(); } catch { /* fall through */ }
  }
  return RESEARCH_TYPE_IMAGE[r.researchType] ?? '/images/labwork.jpg';
}

// ── research card (matches homepage Programs card style) ─────────────────────

function ResearchCard({ project, categorySlug, className = '' }: {
  project: Research;
  categorySlug: string;
  className?: string;
}) {
  const image = researchImage(project);
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES.active;

  return (
    <Link
      href={`/programs/${categorySlug}/${project.slug.current}`}
      className={`group relative overflow-hidden rounded-xl block ${className}`}
    >
      <img
        src={image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      {/* resting overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,40,102,0.60)' }} />
      {/* hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a40]/92 via-[#002866]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* type pill — top-left */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white/90 bg-white/10 border border-white/20 backdrop-blur-sm">
          {RESEARCH_TYPE_LABEL[project.researchType] ?? 'Research'}
        </span>
      </div>

      {/* status pill — top-right */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize backdrop-blur-sm ${statusStyle}`}>
          {project.status}
        </span>
      </div>

      {/* content — bottom-right */}
      <div className="absolute inset-0 flex flex-col justify-end items-end px-6 py-6 lg:px-8 lg:py-7 text-right">
        {project.summary && (
          <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-3 max-w-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 line-clamp-3">
            {project.summary}
          </p>
        )}
        <div className="flex items-center gap-3">
          <h3 className="text-white font-bold text-xl lg:text-2xl group-hover:text-2xl lg:group-hover:text-3xl leading-tight transition-all duration-300">
            {project.title}
          </h3>
          <span className="flex-shrink-0 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight size={15} className="text-accent program-arrow-bounce" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── program card (for non-research categories) ────────────────────────────────

const colorClasses = [
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600',
  'bg-red-100 text-red-600',
];

interface RelatedProgram {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  featuredImages?: Array<{ asset?: { _ref: string }; alt?: string; isPrimary?: boolean }>;
  status?: string;
  objectives?: string[];
}

// ── static params + metadata ─────────────────────────────────────────────────

export async function generateStaticParams() {
  const categories = await getProgramCategories();
  return (categories ?? []).map((c: { slug: { current: string } }) => ({
    category: c.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = await getProgramCategory(categorySlug);
  if (!category) return { title: 'Program Not Found | AMBSO' };
  return {
    title: `${category.title} | AMBSO Programs`,
    description: category.shortDescription ?? `Learn about ${category.title} programs at AMBSO`,
  };
}

// ── page ─────────────────────────────────────────────────────────────────────

export default async function ProgramCategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;

  const [category, researchProjects] = await Promise.all([
    getProgramCategory(categorySlug),
    categorySlug === 'research' ? getAllResearch().catch(() => []) : Promise.resolve([]),
  ]);

  if (!category) notFound();

  const programs: RelatedProgram[] = category.relatedPrograms ?? [];
  const research: Research[] = researchProjects ?? [];

  // For research category: use research projects as the items
  // For other categories: use relatedPrograms
  const isResearch = categorySlug === 'research';

  // Layout helpers for research cards (matches homepage Programs grid)
  const [r1, r2, ...rRest] = research;
  const researchRowCols =
    rRest.length === 1 ? 'md:grid-cols-1' :
    rRest.length === 2 ? 'md:grid-cols-2' :
    rRest.length === 3 ? 'md:grid-cols-3' :
                         'md:grid-cols-4';

  return (
    <div className="pt-20 lg:pt-28">

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20 relative overflow-hidden">
        {/* subtle arc decoration */}
        <svg className="absolute right-0 inset-y-0 h-full opacity-[0.07] pointer-events-none" viewBox="0 0 360 360" fill="none" preserveAspectRatio="xMaxYMid slice">
          {[300, 240, 180, 120, 60].map((r, i) => (
            <circle key={i} cx="360" cy="180" r={r} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
        <Container className="relative z-10">
          <Link
            href="/programs"
            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            All Programs
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="block w-8 h-px bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Program Area</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{category.title}</h1>
            {category.shortDescription && (
              <p className="text-xl text-white/80 leading-relaxed">{category.shortDescription}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Main body content from Sanity */}
      {category.mainBody && category.mainBody.length > 0 && (
        <section className="py-14 bg-white border-b border-gray-100">
          <Container>
            <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary">
              <PortableText value={category.mainBody} />
            </div>
          </Container>
        </section>
      )}

      {/* ── Research Projects (research category only) ── */}
      {isResearch && (
        <section className="py-16 bg-[#f8f9fb] relative overflow-hidden">
          {/* dot texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
            <defs>
              <pattern id="rp-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#002866" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rp-dots)" />
          </svg>

          <Container className="relative z-10">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="block w-8 h-px bg-accent" />
                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Active &amp; Recent</span>
                <span className="block w-8 h-px bg-accent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#002866] leading-tight">
                Research Projects
              </h2>
            </div>

            {research.length > 0 ? (
              <>
                {/* Row 1 — 3/5 + 2/5 */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  {r1 && (
                    <ResearchCard
                      project={r1}
                      categorySlug={categorySlug}
                      className="md:col-span-3 h-80 lg:h-96"
                    />
                  )}
                  {r2 && (
                    <ResearchCard
                      project={r2}
                      categorySlug={categorySlug}
                      className="md:col-span-2 h-80 lg:h-96"
                    />
                  )}
                </div>
                {/* Row 2 — equal columns */}
                {rRest.length > 0 && (
                  <div className={`grid grid-cols-1 ${researchRowCols} gap-4`}>
                    {rRest.map((project) => (
                      <ResearchCard
                        key={project._id}
                        project={project}
                        categorySlug={categorySlug}
                        className="h-64 lg:h-72"
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 py-12 text-center">Research projects coming soon.</p>
            )}
          </Container>
        </section>
      )}

      {/* ── Sub-programs (non-research categories) ── */}
      {!isResearch && (
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
                      <Link key={program._id} href={`/programs/${categorySlug}/${program.slug.current}`} className="group">
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
                            <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{program.shortDescription}</p>
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
      )}

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
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white relative overflow-hidden">
        <svg className="absolute right-0 inset-y-0 h-full opacity-[0.07] pointer-events-none" viewBox="0 0 300 300" fill="none" preserveAspectRatio="xMaxYMid slice">
          {[240, 180, 120, 60].map((r, i) => (
            <circle key={i} cx="300" cy="150" r={r} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {category.ctaTitle ?? (isResearch ? 'Participate in Our Research' : 'Get Involved')}
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {category.ctaDescription ?? (isResearch
                ? 'Interested in joining a study or partnering with our research team? Reach out to learn about current opportunities.'
                : 'Interested in our programs? Contact us to learn more or explore partnership opportunities.')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="secondary" size="lg">
                Contact Us
              </Button>
              {isResearch && (
                <Button href="/opportunities/careers" variant="outline" size="lg"
                  className="bg-white/10 backdrop-blur-sm !border-white !text-white hover:!bg-white hover:!text-primary">
                  Research Opportunities
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
