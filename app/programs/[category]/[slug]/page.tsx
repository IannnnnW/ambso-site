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
            {research.status && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle} backdrop-blur-sm`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {research.status.charAt(0).toUpperCase() + research.status.slice(1)}
              </span>
            )}
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
                    About This Research Area
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

  const heroImageUrl = primaryImage?.asset
    ? urlFor(primaryImage).width(1920).height(700).url()
    : null;

  const hasTeam      = program.teamMembers && program.teamMembers.length > 0;
  const hasPartners  = program.partners    && program.partners.length > 0;
  const hasLocations = program.locations   && program.locations.length > 0;
  const hasOutcomes  = program.outcomes    && program.outcomes.length > 0;
  const hasGallery   = program.gallery     && program.gallery.length > 0;
  const hasSidebar   = hasTeam || hasPartners || hasLocations;

  const statusStyle  = STATUS_BADGE[program.status] ?? '';

  return (
    <div className="pt-20 lg:pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-light text-white py-16 md:py-24 overflow-hidden">
        {heroImageUrl && (
          <>
            <div className="absolute inset-0">
              <img src={heroImageUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/82 to-primary/55" />
          </>
        )}

        {/* Concentric arcs — right */}
        <svg
          className="absolute right-0 inset-y-0 h-full opacity-[0.07] pointer-events-none"
          viewBox="0 0 360 360" fill="none" preserveAspectRatio="xMaxYMid slice"
          aria-hidden="true"
        >
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
            Back to {program.category?.title ?? 'Programs'}
          </Link>

          {program.status && (
            <div className="mb-5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${statusStyle}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
              </span>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight max-w-4xl">
            {program.title}
          </h1>

          {program.shortDescription && (
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl">{program.shortDescription}</p>
          )}

          <div className="flex flex-wrap items-center gap-6 mt-8 text-white/65 text-sm">
            {program.startDate && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {formatDate(program.startDate)}
                  {program.endDate ? ` – ${formatDate(program.endDate)}` : ' – Ongoing'}
                </span>
              </div>
            )}
            {program.targetPopulation && (
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{program.targetPopulation}</span>
              </div>
            )}
            {hasLocations && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>
                  {program.locations
                    .map((l: { name: string; city?: string }) => l.city ?? l.name)
                    .join(', ')}
                </span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <section className="relative py-16 bg-white overflow-hidden">
        {/* Dot-grid decoration */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="iprog-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#002866" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#iprog-dots)" />
        </svg>

        <Container className="relative z-10">
          <div className={`grid gap-12 ${hasSidebar ? 'lg:grid-cols-3' : ''}`}>

            {/* Main content */}
            <div className={`space-y-14 ${hasSidebar ? 'lg:col-span-2' : ''}`}>

              {/* Description */}
              {program.description && program.description.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="block w-6 h-px bg-[#38BDF8]" />
                    <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Overview</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#002866] mb-6">
                    About This Program
                  </h2>
                  <div className="prose prose-lg max-w-none text-[#1f2937]/75 prose-headings:text-[#002866] prose-a:text-[#38BDF8]">
                    <PortableText value={program.description} />
                  </div>
                </div>
              )}

              {/* Objectives */}
              {program.objectives && program.objectives.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="block w-6 h-px bg-[#38BDF8]" />
                    <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Goals</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                    <Target className="text-[#38BDF8] flex-shrink-0" size={26} />
                    Objectives
                  </h2>
                  <div className="space-y-3">
                    {program.objectives.map((obj: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-[#f8f9fb] rounded-xl border border-[#002866]/[0.06]"
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#002866] flex items-center justify-center text-white text-xs font-extrabold">
                          {i + 1}
                        </span>
                        <p className="text-[#1f2937]/75 leading-relaxed pt-0.5">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcomes */}
              {hasOutcomes && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="block w-6 h-px bg-[#38BDF8]" />
                    <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Impact</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                    <CheckCircle className="text-[#38BDF8] flex-shrink-0" size={26} />
                    Expected Outcomes
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {program.outcomes.map((outcome: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-[#002866]/[0.03] rounded-xl border border-[#002866]/[0.08]"
                      >
                        <CheckCircle className="text-[#38BDF8] flex-shrink-0 mt-0.5" size={18} />
                        <p className="text-[#1f2937]/75 text-sm leading-relaxed">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {hasGallery && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="block w-6 h-px bg-[#38BDF8]" />
                    <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Gallery</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#002866] mb-6">Program Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {program.gallery.map((img: { asset?: { _ref: string }; caption?: string }, i: number) =>
                      img.asset ? (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                          <img
                            src={urlFor(img).width(400).height(400).url()}
                            alt={img.caption ?? `Gallery image ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {img.caption && (
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-white text-xs">{img.caption}</p>
                            </div>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* Standalone CTA when no sidebar */}
              {!hasSidebar && (
                <div
                  className="p-8 rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg, #002866 0%, #003d99 100%)' }}
                >
                  <h3 className="text-xl font-extrabold mb-3">Get Involved</h3>
                  <p className="text-white/70 mb-5 leading-relaxed">
                    Interested in this program? Contact us to learn how you can participate or support.
                  </p>
                  <Button href="/contact" className="!bg-[#38BDF8] !text-[#002866] !border-0 font-bold">
                    Contact Us
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            {hasSidebar && (
              <div className="space-y-6">

                {/* Team */}
                {hasTeam && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <Users className="text-[#38BDF8]" size={18} />
                      Team
                    </h3>
                    <div className="space-y-3">
                      {program.teamMembers.map((member: {
                        _id: string; name: string; role?: string;
                        image?: { asset?: { _ref: string } };
                      }) => (
                        <div key={member._id} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#002866]/10 flex-shrink-0 flex items-center justify-center">
                            {member.image?.asset ? (
                              <img
                                src={urlFor(member.image).width(40).height(40).url()}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User size={16} className="text-[#002866]" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1f2937]">{member.name}</p>
                            {member.role && <p className="text-xs text-[#1f2937]/55">{member.role}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Partners */}
                {hasPartners && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <Building2 className="text-[#38BDF8]" size={18} />
                      Partners
                    </h3>
                    <div className="space-y-3">
                      {program.partners.map((partner: {
                        _id: string; name: string;
                        logo?: { asset?: { _ref: string } }; website?: string;
                      }) => (
                        <div key={partner._id} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-[#002866]/10 flex items-center justify-center flex-shrink-0">
                            {partner.logo?.asset ? (
                              <img
                                src={urlFor(partner.logo).height(28).url()}
                                alt={partner.name}
                                className="h-5 w-auto object-contain"
                              />
                            ) : (
                              <Building2 size={14} className="text-[#002866]/40" />
                            )}
                          </div>
                          {partner.website ? (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-[#1f2937] hover:text-[#002866] transition-colors"
                            >
                              {partner.name}
                            </a>
                          ) : (
                            <span className="text-sm font-medium text-[#1f2937]">{partner.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Locations */}
                {hasLocations && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <MapPin className="text-[#38BDF8]" size={18} />
                      Locations
                    </h3>
                    <div className="space-y-2">
                      {program.locations.map((loc: { name: string; city?: string; district?: string }, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-1.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-[#1f2937]">{loc.name ?? loc.city}</p>
                            {loc.district && (
                              <p className="text-xs text-[#1f2937]/55">{loc.district} District</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div
                  className="p-6 rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg, #002866 0%, #003d99 100%)' }}
                >
                  <h3 className="text-base font-extrabold mb-2">Get Involved</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Interested in this program? Contact us to learn how you can participate or support.
                  </p>
                  <Button href="/contact" className="w-full !bg-[#38BDF8] !text-[#002866] !border-0 font-bold text-sm">
                    Contact Us
                  </Button>
                </div>
              </div>
            )}
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
