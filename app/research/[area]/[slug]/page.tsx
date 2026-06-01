import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { PortableText } from '@portabletext/react';
import { getResearch, getAllResearchSlugs } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import {
  ArrowLeft,
  Calendar,
  Users,
  Target,
  CheckCircle,
  Building2,
  FlaskConical,
  FileText,
  TrendingUp,
  BookOpen,
  User,
  ChevronRight,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ area: string; slug: string }>;
}

// ── area display metadata ─────────────────────────────────────────────────────

const AREA_TITLE: Record<string, string> = {
  'clinical-trials':  'Clinical Trials',
  'epidemiological':  'Epidemiological Studies',
  'social-behavioral': 'Social & Behavioral Studies',
  'behavioral':       'Behavioral Research',
  'implementation':   'Implementation Research',
  'other':            'Research',
};

// ── status display helpers ────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, string> = {
  ongoing:    'bg-accent/20 text-accent border border-accent/40',
  upcoming:   'bg-amber-100 text-amber-700 border border-amber-200',
  completed:  'bg-gray-100 text-gray-600 border border-gray-200',
  recruiting: 'bg-green-100 text-green-700 border border-green-200',
  suspended:  'bg-red-100 text-red-600 border border-red-200',
  // legacy
  active:     'bg-accent/20 text-accent border border-accent/40',
  planning:   'bg-amber-100 text-amber-700 border border-amber-200',
};

const STATUS_LABEL: Record<string, string> = {
  ongoing: 'Ongoing', upcoming: 'Upcoming', completed: 'Completed',
  recruiting: 'Recruiting', suspended: 'Suspended', active: 'Ongoing', planning: 'Upcoming',
};

const PHASE_LABEL: Record<string, string> = {
  'phase-1': 'Phase I', 'phase-2': 'Phase II', 'phase-3': 'Phase III', 'phase-4': 'Phase IV',
};

const RESEARCH_TYPE_BADGE: Record<string, string> = {
  'clinical-trials':   'Clinical Trial',
  'epidemiological':   'Epidemiological Study',
  'social-behavioral': 'Social & Behavioral Study',
  'behavioral':        'Behavioral Research',
  'implementation':    'Implementation Research',
  'other':             'Research',
};

function formatDate(d?: string) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

// ── static params + metadata ──────────────────────────────────────────────────

export async function generateStaticParams() {
  const all = await getAllResearchSlugs().catch(() => []);
  return (all ?? []).map((r: { area: string; slug: string }) => ({
    area: r.area,
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const research = await getResearch(slug);
  if (!research) return { title: 'Research Project | AMBSO' };
  return {
    title: `${research.title} | AMBSO Research`,
    description: research.summary ?? `Learn about the ${research.title} study at AMBSO`,
  };
}

// ── page ──────────────────────────────────────────────────────────────────────

export default async function ResearchProjectPage({ params }: PageProps) {
  const { area, slug } = await params;
  const research = await getResearch(slug);
  if (!research) notFound();

  // Guard: if the project's researchType doesn't match the area in the URL, redirect to correct URL.
  // For backward compatibility, treat 'behavioral' and 'social-behavioral' as the same area group.
  const sameArea =
    research.researchType === area ||
    (area === 'social-behavioral' && research.researchType === 'behavioral') ||
    (area === 'behavioral' && research.researchType === 'social-behavioral');
  if (!sameArea) notFound();

  const heroImageUrl = research.featuredImage?.asset
    ? urlFor(research.featuredImage).width(1920).height(700).url()
    : null;

  const statusBadge = STATUS_BADGE[research.status] ?? STATUS_BADGE.ongoing;
  const statusLabel = STATUS_LABEL[research.status] ?? research.status;
  const phaseLabel  = research.studyPhase && research.studyPhase !== 'na'
    ? PHASE_LABEL[research.studyPhase]
    : null;
  const areaTitle   = AREA_TITLE[area] ?? area;

  return (
    <div className="pt-20 lg:pt-28">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <AnimateOnScroll animation="fade-down" duration={600} threshold={0}>
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary-light text-white py-16 md:py-24 overflow-hidden">
          {heroImageUrl && (
            <>
              <div className="absolute inset-0">
                <img src={heroImageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/82 to-primary/55" />
            </>
          )}

          {/* Arc decoration */}
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
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-6 flex-wrap">
              <Link href="/research" className="hover:text-white transition-colors">Research</Link>
              <ChevronRight size={12} />
              <Link href={`/research/${area}`} className="hover:text-white transition-colors">
                {areaTitle}
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/90 truncate max-w-[200px]">{research.title}</span>
            </nav>

            {/* Back link */}
            <Link
              href={`/research/${area}`}
              className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to {areaTitle}
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${statusBadge}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                {RESEARCH_TYPE_BADGE[research.researchType] ?? 'Research'}
              </span>
              {phaseLabel && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                  {phaseLabel}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight max-w-4xl">
              {research.title}
            </h1>

            {research.summary && (
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">{research.summary}</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-white/65 text-sm">
              {research.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    {formatDate(research.startDate)}
                    {research.endDate ? ` – ${formatDate(research.endDate)}` : ' – Ongoing'}
                  </span>
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
      </AnimateOnScroll>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Dot-grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="proj-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#002866" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#proj-dots)" />
        </svg>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Main column ───────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-14">

              {/* Description */}
              {research.description && research.description.length > 0 && (
                <AnimateOnScroll animation="fade-up" threshold={0.1}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-6 h-px bg-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Overview</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                      <FlaskConical className="text-[#38BDF8] flex-shrink-0" size={26} />
                      About This Study
                    </h2>
                    <div className="prose prose-lg max-w-none text-[#1f2937]/75 prose-headings:text-[#002866] prose-a:text-[#38BDF8]">
                      <PortableText value={research.description} />
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {/* Objectives */}
              {research.objectives && research.objectives.length > 0 && (
                <AnimateOnScroll animation="fade-up" threshold={0.1}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-6 h-px bg-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Goals</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                      <Target className="text-[#38BDF8] flex-shrink-0" size={26} />
                      Study Objectives
                    </h2>
                    <div className="space-y-3">
                      {research.objectives.map((obj: string, i: number) => (
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
                </AnimateOnScroll>
              )}

              {/* Methodology */}
              {research.methodology && research.methodology.length > 0 && (
                <AnimateOnScroll animation="fade-up" threshold={0.1}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-6 h-px bg-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Methods</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                      <BookOpen className="text-[#38BDF8] flex-shrink-0" size={26} />
                      Methodology
                    </h2>
                    <div className="prose prose-lg max-w-none text-[#1f2937]/75 prose-headings:text-[#002866] prose-a:text-[#38BDF8]">
                      <PortableText value={research.methodology} />
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {/* Publications */}
              {research.publications && research.publications.length > 0 && (
                <AnimateOnScroll animation="fade-up" threshold={0.1}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="block w-6 h-px bg-[#38BDF8]" />
                      <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Outputs</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                      <FileText className="text-[#38BDF8] flex-shrink-0" size={26} />
                      Publications
                    </h2>
                    <div className="space-y-4">
                      {research.publications.map((pub: { title: string; authors: string; journal: string; year: number; doi?: string; url?: string }, i: number) => (
                        <div key={i} className="p-5 bg-[#f8f9fb] rounded-xl border border-[#002866]/[0.08]">
                          <p className="font-semibold text-[#002866] mb-1">{pub.title}</p>
                          <p className="text-sm text-[#1f2937]/65 mb-1">{pub.authors}</p>
                          <p className="text-sm text-[#1f2937]/50">
                            <em>{pub.journal}</em>, {pub.year}
                            {pub.doi && (
                              <>
                                {' · '}
                                <a
                                  href={`https://doi.org/${pub.doi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#38BDF8] hover:underline"
                                >
                                  DOI: {pub.doi}
                                </a>
                              </>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}
            </div>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <AnimateOnScroll animation="fade-left" delay={150} threshold={0.05}>
              <div className="space-y-6">

                {/* Enrollment progress */}
                {(research.targetEnrollment || research.currentEnrollment) && (
                  <div className="bg-[#002866]/[0.04] p-6 rounded-2xl border border-[#002866]/10">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <TrendingUp className="text-[#38BDF8]" size={18} />
                      Enrollment
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {research.currentEnrollment != null && (
                        <div className="text-center">
                          <div className="text-3xl font-extrabold text-[#002866]">
                            {research.currentEnrollment.toLocaleString()}
                          </div>
                          <div className="text-xs text-[#1f2937]/55 mt-1">Enrolled</div>
                        </div>
                      )}
                      {research.targetEnrollment != null && (
                        <div className="text-center">
                          <div className="text-3xl font-extrabold text-[#1f2937]/60">
                            {research.targetEnrollment.toLocaleString()}
                          </div>
                          <div className="text-xs text-[#1f2937]/55 mt-1">Target</div>
                        </div>
                      )}
                    </div>
                    {research.currentEnrollment != null && research.targetEnrollment != null && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-[#1f2937]/55 mb-1.5">
                          <span>Progress</span>
                          <span>{Math.round((research.currentEnrollment / research.targetEnrollment) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-[#002866]/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#002866] rounded-full"
                            style={{
                              width: `${Math.min(100, (research.currentEnrollment / research.targetEnrollment) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Principal Investigator */}
                {research.principalInvestigator && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <User className="text-[#38BDF8]" size={18} />
                      Principal Investigator
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#002866]/10 flex-shrink-0 flex items-center justify-center">
                        {research.principalInvestigator.image?.asset ? (
                          <img
                            src={urlFor(research.principalInvestigator.image).width(48).height(48).url()}
                            alt={research.principalInvestigator.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={20} className="text-[#002866]" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1f2937]">{research.principalInvestigator.name}</p>
                        {research.principalInvestigator.role && (
                          <p className="text-xs text-[#1f2937]/55">{research.principalInvestigator.role}</p>
                        )}
                      </div>
                    </div>
                    {(research.principalInvestigator as { email?: string }).email && (
                      <a
                        href={`mailto:${(research.principalInvestigator as { email?: string }).email}`}
                        className="inline-block mt-3 text-sm text-[#38BDF8] hover:underline"
                      >
                        {(research.principalInvestigator as { email?: string }).email}
                      </a>
                    )}
                  </div>
                )}

                {/* Funding */}
                {research.fundingSource && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-3 flex items-center gap-2">
                      <Building2 className="text-[#38BDF8]" size={18} />
                      Funding
                    </h3>
                    <p className="text-[#1f2937]/75 text-sm">{research.fundingSource}</p>
                  </div>
                )}

                {/* Partners */}
                {research.partners && research.partners.length > 0 && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <Users className="text-[#38BDF8]" size={18} />
                      Partners
                    </h3>
                    <div className="space-y-3">
                      {research.partners.map((partner: { name: string; logo?: { asset?: { _ref: string } }; website?: string }) => (
                        <div key={partner.name} className="flex items-center gap-3">
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

                {/* Ethics / Registration */}
                {(research.ethicsApproval || research.registrationNumber) && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-3 flex items-center gap-2">
                      <CheckCircle className="text-[#38BDF8]" size={18} />
                      Approvals
                    </h3>
                    {research.ethicsApproval && (
                      <p className="text-sm text-[#1f2937]/75 mb-2">
                        <span className="font-medium">Ethics:</span> {research.ethicsApproval}
                      </p>
                    )}
                    {research.registrationNumber && (
                      <p className="text-sm text-[#1f2937]/75">
                        <span className="font-medium">Registration:</span> {research.registrationNumber}
                      </p>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div
                  className="p-6 rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg, #002866 0%, #003d99 100%)' }}
                >
                  <h3 className="text-base font-extrabold mb-2">Interested in Participating?</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Contact our research team to learn about eligibility and how to get involved.
                  </p>
                  <Button
                    href="/contact"
                    className="w-full !bg-[#38BDF8] !text-[#002866] !border-0 font-bold text-sm"
                  >
                    Contact Research Team
                  </Button>
                </div>

              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Keywords ───────────────────────────────────────────────────────── */}
      {research.keywords && research.keywords.length > 0 && (
        <AnimateOnScroll animation="fade-up" threshold={0.1}>
          <section className="py-8 bg-[#f8f9fb] border-t border-[#002866]/[0.08]">
            <Container>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-[#1f2937]/50 mr-2">Keywords:</span>
                {research.keywords.map((kw: string) => (
                  <span
                    key={kw}
                    className="px-3 py-1 bg-white border border-[#002866]/10 text-[#1f2937]/65 text-xs rounded-full"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </Container>
          </section>
        </AnimateOnScroll>
      )}

    </div>
  );
}
