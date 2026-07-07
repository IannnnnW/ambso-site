import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { PortableText } from '@portabletext/react';
import {
  getAllResearch,
  getResearchArea,
  getResearchProjectsByArea,
  getProgram,
  getAllProgramSlugs,
} from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { ResearchProject } from '@/lib/sanity.types';
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Target,
  CheckCircle,
  Building2,
  FlaskConical,
  User,
} from 'lucide-react';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

// ── helpers ──────────────────────────────────────────────────────────────────

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
    const area = await getResearchArea(slug);
    if (!area) return { title: 'Research Area Not Found | AMBSO' };
    return {
      title: `${area.title} | AMBSO Research`,
      description: area.summary ?? `Explore ${area.title} research at AMBSO`,
    };
  }

  const program = await getProgram(slug);
  if (!program) return { title: 'Program Not Found | AMBSO' };
  return {
    title: `${program.title} | AMBSO Programs`,
    description: program.shortDescription ?? `Learn about ${program.title} at AMBSO`,
  };
}

// ── research area detail page ─────────────────────────────────────────────────

async function ResearchAreaDetailPage({ slug }: { slug: string }) {
  const [area, projects] = await Promise.all([
    getResearchArea(slug),
    // projects fetched after we have the area _id
    getResearchArea(slug).then(a => a ? getResearchProjectsByArea(a._id) : []),
  ]);

  if (!area) notFound();

  const heroImage = area.featuredImage?.asset
    ? urlFor(area.featuredImage).width(1920).height(600).url()
    : '/images/labwork.jpg';

  const safeProjects: ResearchProject[] = projects ?? [];

  return (
    <div className="pt-20 lg:pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative text-white py-20 min-h-[380px] flex items-center overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/78 to-primary/55" />

        {/* Arc decor */}
        <svg
          className="absolute right-0 inset-y-0 h-full opacity-[0.07] pointer-events-none"
          viewBox="0 0 360 360" fill="none" preserveAspectRatio="xMaxYMid slice"
          aria-hidden="true"
        >
          {[300, 240, 180, 120, 60].map((r, i) => (
            <circle key={i} cx="360" cy="180" r={r} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>

        {/* Dot-grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="rad-hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rad-hero-dots)" />
        </svg>

        <Container className="relative z-10">
          <Link
            href="/programs/research"
            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Research
          </Link>

          <div className="inline-flex items-center gap-2 mb-4">
            <span className="block w-8 h-px bg-[#38BDF8]" />
            <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">Research Area</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
            {area.title}
          </h1>

          {area.summary && (
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">{area.summary}</p>
          )}

          {safeProjects.length > 0 && (
            <div className="mt-8 flex items-center gap-3 text-white/60 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>
                {safeProjects.length} project{safeProjects.length !== 1 ? 's' : ''}
                {' · '}
                {safeProjects.filter(p => p.status === 'ongoing').length} ongoing
              </span>
            </div>
          )}
        </Container>
      </section>

      {/* ── Description ───────────────────────────────────────────────────── */}
      {area.description && area.description.length > 0 && (
        <section className="py-16 bg-white">
          <Container>
            <AnimateOnScroll animation="fade-up" threshold={0.1}>
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="block w-6 h-px bg-[#38BDF8]" />
                  <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.15em]">Overview</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#002866] mb-6 flex items-center gap-3">
                  <FlaskConical className="text-[#38BDF8] flex-shrink-0" size={26} />
                  About This Research Area
                </h2>
                <div className="prose prose-lg max-w-none text-[#1f2937]/75 prose-headings:text-[#002866] prose-a:text-[#38BDF8]">
                  <PortableText value={area.description} />
                </div>
              </div>
            </AnimateOnScroll>
          </Container>
        </section>
      )}

      {/* ── Project Status Cards ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f9fb] relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="rad-body-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#002866" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rad-body-dots)" />
        </svg>

        <Container className="relative z-10">
          <AnimateOnScroll animation="fade-up" threshold={0.1}>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="block w-8 h-px bg-[#38BDF8]" />
                <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">{area.title}</span>
                <span className="block w-8 h-px bg-[#38BDF8]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#002866] leading-tight">
                Research Projects
              </h2>
              <p className="text-[#1f2937]/60 text-lg mt-4 max-w-2xl">
                Select a category below to browse projects within this research area.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={100} threshold={0.1}>
            {(() => {
              const statuses = [
                {
                  key: 'ongoing',
                  label: 'Ongoing Projects',
                  description: 'Currently active research and clinical trials in progress.',
                  count: safeProjects.filter(p => p.status === 'ongoing').length,
                  icon: <BiotechOutlinedIcon style={{ fontSize: 44, color: '#38BDF8' }} />,
                  iconBg: '#E0F7FF',
                  accentColor: '#38BDF8',
                },
                {
                  key: 'upcoming',
                  label: 'Upcoming Projects',
                  description: 'Research studies and trials that are scheduled to begin.',
                  count: safeProjects.filter(p => p.status === 'upcoming').length,
                  icon: <EventNoteOutlinedIcon style={{ fontSize: 44, color: '#F59E0B' }} />,
                  iconBg: '#FEF3C7',
                  accentColor: '#F59E0B',
                },
                {
                  key: 'completed',
                  label: 'Completed Projects',
                  description: 'Research that has been concluded with published outcomes.',
                  count: safeProjects.filter(p => p.status === 'completed').length,
                  icon: <TaskAltOutlinedIcon style={{ fontSize: 44, color: '#10B981' }} />,
                  iconBg: '#D1FAE5',
                  accentColor: '#10B981',
                },
              ];

              return (
                <div className="grid sm:grid-cols-3 gap-6">
                  {statuses.map(({ key, label, description, count, icon, iconBg, accentColor }) => (
                    <Link
                      key={key}
                      href={`/programs/research/${area.slug.current}/${key}`}
                      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#002866]/10 transition-all duration-300 p-8 flex flex-col items-center text-center hover:-translate-y-1"
                    >
                      {/* Icon circle */}
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: iconBg }}
                      >
                        {icon}
                      </div>

                      {/* Count */}
                      <div className="text-5xl font-extrabold text-[#002866] mb-1 tabular-nums">{count}</div>
                      <div className="text-xs text-[#1f2937]/40 font-medium uppercase tracking-widest mb-6">
                        Project{count !== 1 ? 's' : ''}
                      </div>

                      {/* Label */}
                      <h3 className="text-xl font-bold text-[#1f2937] mb-3">{label}</h3>

                      {/* Description */}
                      <p className="text-[#1f2937]/55 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

                      {/* CTA pill */}
                      <div
                        className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3"
                        style={{ color: accentColor, backgroundColor: iconBg }}
                      >
                        View Projects
                        <ArrowLeft size={14} className="rotate-180" />
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })()}
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Keywords */}
      {area.keywords && area.keywords.length > 0 && (
        <section className="py-8 bg-white border-t border-gray-100">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-500 mr-2">Keywords:</span>
              {area.keywords.map((kw: string) => (
                <span key={kw} className="px-3 py-1 bg-[#f8f9fb] border border-gray-200 text-gray-600 text-xs rounded-full">
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

  const hasTeam      = program.teamMembers        && program.teamMembers.length > 0;
  const hasPartners  = program.partners            && program.partners.length > 0;
  const hasLocations = program.locations           && program.locations.length > 0;
  const hasOutcomes  = program.outcomes            && program.outcomes.length > 0;
  const hasGallery   = program.gallery             && program.gallery.length > 0;
  const hasPI        = !!program.principalInvestigator;
  const hasCoIs      = program.coInvestigators     && program.coInvestigators.length > 0;
  const hasFunding   = !!program.fundingSource;
  const hasSidebar   = hasTeam || hasPartners || hasLocations || hasPI || hasCoIs || hasFunding;

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
                    .map((l: string) => l)
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

                {/* Principal Investigator */}
                {hasPI && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <User className="text-[#38BDF8]" size={18} />
                      Principal Investigator
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#002866]/10 flex-shrink-0 flex items-center justify-center">
                        {(() => {
                          const pi = program.principalInvestigator!;
                          const photo = pi._type === 'collaborator' ? pi.picture : pi.image;
                          return photo?.asset?.url ? (
                            <img src={photo.asset.url} alt={photo.alt ?? pi.name} className="w-full h-full object-cover" />
                          ) : (
                            <User size={20} className="text-[#002866]" />
                          );
                        })()}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1f2937]">{program.principalInvestigator!.name}</p>
                        <p className="text-xs text-[#1f2937]/55">
                          {program.principalInvestigator!.role ?? program.principalInvestigator!.position}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Co-Investigators */}
                {hasCoIs && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-4 flex items-center gap-2">
                      <Users className="text-[#38BDF8]" size={18} />
                      Co-Investigators
                    </h3>
                    <div className="space-y-3">
                      {program.coInvestigators!.map((ci: {
                        _id?: string; _type: string; name: string;
                        role?: string; position?: string;
                        image?: { asset?: { url: string }; alt?: string };
                        picture?: { asset?: { url: string }; alt?: string };
                      }, i: number) => {
                        const photo = ci._type === 'collaborator' ? ci.picture : ci.image;
                        return (
                          <div key={ci._id ?? i} className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#002866]/10 flex-shrink-0 flex items-center justify-center">
                              {photo?.asset?.url ? (
                                <img src={photo.asset.url} alt={photo.alt ?? ci.name} className="w-full h-full object-cover" />
                              ) : (
                                <User size={16} className="text-[#002866]" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1f2937]">{ci.name}</p>
                              {(ci.role ?? ci.position) && (
                                <p className="text-xs text-[#1f2937]/55">{ci.role ?? ci.position}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Funding */}
                {hasFunding && (
                  <div className="bg-[#f8f9fb] p-6 rounded-2xl border border-[#002866]/[0.08]">
                    <h3 className="text-base font-extrabold text-[#002866] mb-3 flex items-center gap-2">
                      <Building2 className="text-[#38BDF8]" size={18} />
                      Funding
                    </h3>
                    <p className="text-[#1f2937]/75 text-sm">{program.fundingSource}</p>
                  </div>
                )}

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
                      {program.locations.map((loc: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-1.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-[#1f2937]">{loc}</p>
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
    return <ResearchAreaDetailPage slug={slug} />;
  }

  return <IndividualProgramPage category={category} slug={slug} />;
}
