import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { PortableText } from '@portabletext/react';
import {
  getResearch,
  getAllResearch,
  getProgram,
  getAllProgramSlugs,
} from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Target,
  CheckCircle,
  Building2,
  FlaskConical,
  FileText,
  TrendingUp,
  BookOpen,
  User,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

// ── helpers ──────────────────────────────────────────────────────────────────

const RESEARCH_TYPE_LABEL: Record<string, string> = {
  'clinical-trials':  'Clinical Trial',
  'epidemiological':  'Epidemiological Study',
  'behavioral':       'Behavioral Research',
  'implementation':   'Implementation Research',
  'other':            'Research Study',
};

const STATUS_BADGE: Record<string, string> = {
  active:     'bg-accent/20 text-accent border border-accent/40',
  recruiting: 'bg-green-100 text-green-700 border border-green-200',
  completed:  'bg-gray-100 text-gray-600 border border-gray-200',
  planning:   'bg-amber-100 text-amber-700 border border-amber-200',
  suspended:  'bg-red-100 text-red-600 border border-red-200',
};

function formatDate(dateString?: string): string {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

// ── static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const [researchList, programSlugs] = await Promise.all([
    getAllResearch().catch(() => []),
    getAllProgramSlugs().catch(() => []),
  ]);

  const researchParams = (researchList ?? []).map((r: { slug: { current: string } }) => ({
    category: 'research',
    slug: r.slug.current,
  }));

  const programParams = (programSlugs ?? []).map((p: { slug: string; categorySlug: string }) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));

  return [...researchParams, ...programParams];
}

// ── metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;

  if (category === 'research') {
    const research = await getResearch(slug);
    if (!research) return { title: 'Research Not Found | AMBSO' };
    return {
      title: `${research.title} | AMBSO Research`,
      description: research.summary ?? `Learn about the ${research.title} study at AMBSO`,
    };
  }

  const program = await getProgram(slug);
  if (!program) return { title: 'Program Not Found | AMBSO' };
  return {
    title: `${program.title} | AMBSO Programs`,
    description: program.shortDescription ?? `Learn about ${program.title} at AMBSO`,
  };
}

// ── research project page ─────────────────────────────────────────────────────

async function ResearchProjectPage({ category, slug }: { category: string; slug: string }) {
  const research = await getResearch(slug);
  if (!research) notFound();

  const heroImage = research.featuredImage?.asset
    ? urlFor(research.featuredImage).width(1920).height(600).url()
    : null;

  const statusStyle = STATUS_BADGE[research.status] ?? STATUS_BADGE.active;

  return (
    <div className="pt-20 lg:pt-28">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-light text-white py-16 md:py-24 overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 opacity-20">
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        {/* arc decor */}
        <svg className="absolute right-0 inset-y-0 h-full opacity-[0.07] pointer-events-none" viewBox="0 0 360 360" fill="none" preserveAspectRatio="xMaxYMid slice">
          {[300, 240, 180, 120, 60].map((r, i) => (
            <circle key={i} cx="360" cy="180" r={r} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>

        <Container className="relative z-10">
          <Link
            href={`/programs/${category}`}
            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Research
          </Link>

          {/* badges */}
          <div className="flex flex-wrap gap-3 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle} backdrop-blur-sm`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {research.status.charAt(0).toUpperCase() + research.status.slice(1)}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
              {RESEARCH_TYPE_LABEL[research.researchType] ?? 'Research'}
            </span>
            {research.studyPhase && research.studyPhase !== 'na' && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                {research.studyPhase.replace('phase-', 'Phase ')}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight max-w-4xl">
            {research.title}
          </h1>

          {research.summary && (
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl">{research.summary}</p>
          )}

          {/* meta row */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-white/65 text-sm">
            {research.startDate && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(research.startDate)}{research.endDate ? ` – ${formatDate(research.endDate)}` : ' – Ongoing'}</span>
              </div>
            )}
            {research.principalInvestigator && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>PI: {research.principalInvestigator.name}</span>
              </div>
            )}
            {research.registrationNumber && (
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>{research.registrationNumber}</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Description */}
              {research.description && research.description.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FlaskConical className="text-primary" size={24} />
                    About This Study
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <PortableText value={research.description} />
                  </div>
                </div>
              )}

              {/* Objectives */}
              {research.objectives && research.objectives.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Target className="text-primary" size={24} />
                    Study Objectives
                  </h2>
                  <div className="space-y-3">
                    {research.objectives.map((obj: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                        <p className="text-gray-700">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Methodology */}
              {research.methodology && research.methodology.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <BookOpen className="text-primary" size={24} />
                    Methodology
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <PortableText value={research.methodology} />
                  </div>
                </div>
              )}

              {/* Publications */}
              {research.publications && research.publications.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={24} />
                    Publications
                  </h2>
                  <div className="space-y-4">
                    {research.publications.map((pub: {
                      title: string; authors: string; journal: string;
                      year: number; doi?: string; url?: string;
                    }, i: number) => (
                      <div key={i} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="font-semibold text-gray-900 mb-1">{pub.title}</p>
                        <p className="text-sm text-gray-600 mb-1">{pub.authors}</p>
                        <p className="text-sm text-gray-500">
                          <em>{pub.journal}</em>, {pub.year}
                          {pub.doi && (
                            <> · <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DOI: {pub.doi}</a></>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">

              {/* Enrollment */}
              {(research.targetEnrollment || research.currentEnrollment) && (
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="text-primary" size={20} />
                    Enrollment
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {research.currentEnrollment != null && (
                      <div className="text-center">
                        <div className="text-3xl font-extrabold text-primary">{research.currentEnrollment.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">Enrolled</div>
                      </div>
                    )}
                    {research.targetEnrollment != null && (
                      <div className="text-center">
                        <div className="text-3xl font-extrabold text-gray-700">{research.targetEnrollment.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">Target</div>
                      </div>
                    )}
                  </div>
                  {research.currentEnrollment != null && research.targetEnrollment != null && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.round((research.currentEnrollment / research.targetEnrollment) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.min(100, (research.currentEnrollment / research.targetEnrollment) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Principal Investigator */}
              {research.principalInvestigator && (
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="text-primary" size={20} />
                    Principal Investigator
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex-shrink-0 flex items-center justify-center">
                      {research.principalInvestigator.image?.asset ? (
                        <img
                          src={urlFor(research.principalInvestigator.image).width(48).height(48).url()}
                          alt={research.principalInvestigator.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{research.principalInvestigator.name}</p>
                      <p className="text-sm text-gray-500">{research.principalInvestigator.role}</p>
                    </div>
                  </div>
                  {research.principalInvestigator.email && (
                    <a href={`mailto:${research.principalInvestigator.email}`} className="inline-block mt-3 text-sm text-primary hover:underline">
                      {research.principalInvestigator.email}
                    </a>
                  )}
                </div>
              )}

              {/* Funding */}
              {research.fundingSource && (
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Building2 className="text-primary" size={20} />
                    Funding
                  </h3>
                  <p className="text-gray-700 text-sm">{research.fundingSource}</p>
                </div>
              )}

              {/* Partners */}
              {research.partners && research.partners.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="text-primary" size={20} />
                    Partners
                  </h3>
                  <div className="space-y-3">
                    {research.partners.map((partner: { name: string; logo?: { asset?: { _ref: string } }; website?: string }) => (
                      <div key={partner.name} className="flex items-center gap-3">
                        {partner.logo?.asset ? (
                          <img src={urlFor(partner.logo).height(28).url()} alt={partner.name} className="h-7 w-auto object-contain" />
                        ) : (
                          <div className="w-7 h-7 bg-gray-200 rounded flex items-center justify-center">
                            <Building2 size={14} className="text-gray-400" />
                          </div>
                        )}
                        {partner.website ? (
                          <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
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

              {/* Ethics / Registration */}
              {(research.ethicsApproval || research.registrationNumber) && (
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="text-primary" size={20} />
                    Approvals
                  </h3>
                  {research.ethicsApproval && (
                    <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Ethics:</span> {research.ethicsApproval}</p>
                  )}
                  {research.registrationNumber && (
                    <p className="text-sm text-gray-700"><span className="font-medium">Registration:</span> {research.registrationNumber}</p>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/15">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Interested in Participating?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Contact our research team to learn about eligibility and how to get involved.
                </p>
                <Button href="/contact" className="w-full">
                  Contact Research Team
                </Button>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Keywords */}
      {research.keywords && research.keywords.length > 0 && (
        <section className="py-8 bg-gray-50 border-t border-gray-100">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-500 mr-2">Keywords:</span>
              {research.keywords.map((kw: string) => (
                <span key={kw} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full">
                  {kw}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}

// ── individual program page (non-research categories) ─────────────────────────

async function IndividualProgramPage({ category, slug }: { category: string; slug: string }) {
  const program = await getProgram(slug);
  if (!program) notFound();

  if (program.category?.slug?.current && program.category.slug.current !== category) notFound();

  const primaryImage = program.featuredImages?.find(
    (img: { isPrimary?: boolean }) => img.isPrimary
  ) ?? program.featuredImages?.[0];

  return (
    <div className="pt-20 lg:pt-28">
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-light text-white py-16 md:py-24">
        {primaryImage?.asset && (
          <div className="absolute inset-0 opacity-20">
            <img src={urlFor(primaryImage).width(1920).url()} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <Container className="relative z-10">
          <Link href={`/programs/${category}`} className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft size={16} className="mr-2" />
            Back to {program.category?.title ?? 'Programs'}
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight max-w-4xl">
            {program.title}
          </h1>
          {program.shortDescription && (
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl">{program.shortDescription}</p>
          )}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-white/65 text-sm">
            {program.startDate && (
              <div className="flex items-center gap-2"><Calendar size={16} /><span>Started {formatDate(program.startDate)}</span></div>
            )}
            {program.locations && program.locations.length > 0 && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{program.locations.map((l: { city: string }) => l.city).join(', ')}</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {program.description && program.description.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Program</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <PortableText value={program.description} />
                  </div>
                </div>
              )}
              {program.objectives && program.objectives.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Target className="text-primary" size={24} />Objectives
                  </h2>
                  <div className="space-y-3">
                    {program.objectives.map((obj: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                        <p className="text-gray-700">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/15">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Get Involved</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Interested in this program? Contact us to learn how you can participate or support.
                </p>
                <Button href="/contact" className="w-full">Contact Us</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// ── router ────────────────────────────────────────────────────────────────────

export default async function CategoryItemPage({ params }: PageProps) {
  const { category, slug } = await params;

  if (category === 'research') {
    return <ResearchProjectPage category={category} slug={slug} />;
  }

  return <IndividualProgramPage category={category} slug={slug} />;
}
