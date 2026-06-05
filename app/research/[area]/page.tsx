import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getResearchByType } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { Research } from '@/lib/sanity.types';

interface PageProps {
  params: Promise<{ area: string }>;
}

// ── area metadata (static — researchType values are schema enum, not documents) ─

const AREA_META = {
  'clinical-trials': {
    title: 'Clinical Trials',
    description:
      'AMBSO conducts rigorous phase I–IV clinical trials across HIV, non-communicable diseases, and other critical health areas, contributing to new treatments and interventions for Africa\'s most pressing health challenges.',
    image: '/images/labwork.jpg',
  },
  'epidemiological': {
    title: 'Epidemiological Studies',
    description:
      'Our epidemiological research investigates disease patterns, risk factors, and health determinants across Uganda and beyond — generating the evidence base that informs effective public health policy and programming.',
    image: '/images/community.jpg',
  },
  'social-behavioral': {
    title: 'Social & Behavioral Studies',
    description:
      'Understanding the social and behavioral determinants of health is central to AMBSO\'s community-centred approach. These studies inform program design, community engagement strategies, and intervention development.',
    image: '/images/staff-extended.jpg',
  },
  'behavioral': {
    title: 'Behavioral Research',
    description:
      'Understanding the behavioral determinants of health is central to AMBSO\'s community-centred approach. These studies inform program design, community engagement strategies, and intervention development.',
    image: '/images/staff-extended.jpg',
  },
} as const;

type AreaSlug = keyof typeof AREA_META;

// ── helpers ───────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  ongoing:    'bg-accent/20 text-accent border border-accent/30',
  upcoming:   'bg-amber-400/20 text-amber-300 border border-amber-400/30',
  completed:  'bg-white/15 text-white/70 border border-white/20',
  recruiting: 'bg-green-500/20 text-green-300 border border-green-400/30',
  suspended:  'bg-red-500/20 text-red-300 border border-red-400/30',
  // legacy values
  active:     'bg-accent/20 text-accent border border-accent/30',
  planning:   'bg-amber-400/20 text-amber-300 border border-amber-400/30',
};

const STATUS_LABEL: Record<string, string> = {
  ongoing: 'Ongoing', upcoming: 'Upcoming', completed: 'Completed',
  recruiting: 'Recruiting', suspended: 'Suspended', active: 'Ongoing', planning: 'Upcoming',
};

const PHASE_LABEL: Record<string, string> = {
  'phase-1': 'Phase I', 'phase-2': 'Phase II', 'phase-3': 'Phase III', 'phase-4': 'Phase IV',
};

function cardImage(project: Research, area: string): string {
  if (project.featuredImage?.asset?._ref) {
    try { return urlFor(project.featuredImage).width(900).height(600).url(); } catch { /* fall through */ }
  }
  return AREA_META[area as AreaSlug]?.image ?? '/images/labwork.jpg';
}

// ── card (same visual design as programs/[category]/page.tsx ResearchCard) ────

function ResearchCard({
  project,
  area,
  className = '',
}: {
  project: Research;
  area: string;
  className?: string;
}) {
  const image       = cardImage(project, area);
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES.ongoing;
  const statusLabel = STATUS_LABEL[project.status]  ?? project.status;
  const phaseLabel  = project.studyPhase && project.studyPhase !== 'na'
    ? PHASE_LABEL[project.studyPhase]
    : null;

  return (
    <Link
      href={`/research/${area}/${project.slug.current}`}
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

      {/* phase pill — top-left (clinical trials only) */}
      {phaseLabel && (
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white/90 bg-white/10 border border-white/20 backdrop-blur-sm">
            {phaseLabel}
          </span>
        </div>
      )}

      {/* status pill — top-right */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      {/* content — bottom-right */}
      <div className="absolute inset-0 flex flex-col justify-end items-end px-6 py-6 lg:px-8 lg:py-7 text-right">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-bold text-xl lg:text-2xl group-hover:text-2xl lg:group-hover:text-3xl leading-tight transition-all duration-300">
            {project.title}
          </h3>
          <span className="flex-shrink-0 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight size={15} className="text-accent program-arrow-bounce" />
          </span>
        </div>
        {project.summary && (
          <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-3 max-w-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 line-clamp-3">
            {project.summary}
          </p>
        )}
      </div>
    </Link>
  );
}

// ── static params + metadata ──────────────────────────────────────────────────

export async function generateStaticParams() {
  return (Object.keys(AREA_META) as AreaSlug[]).map((area) => ({ area }));
}

export async function generateMetadata({ params }: PageProps) {
  const { area } = await params;
  const meta = AREA_META[area as AreaSlug];
  if (!meta) return { title: 'Research Area | AMBSO' };
  return {
    title: `${meta.title} | AMBSO Research`,
    description: meta.description,
  };
}

// ── page ──────────────────────────────────────────────────────────────────────

export default async function ResearchAreaPage({ params }: PageProps) {
  const { area } = await params;
  const meta = AREA_META[area as AreaSlug];
  if (!meta) notFound();

  const projects: Research[] = (await getResearchByType(area).catch(() => [])) ?? [];

  const [p1, p2, ...rest] = projects;
  const restCols =
    rest.length === 1 ? 'md:grid-cols-1' :
    rest.length === 2 ? 'md:grid-cols-2' :
    rest.length === 3 ? 'md:grid-cols-3' :
                        'md:grid-cols-4';

  return (
    <div className="pt-20 lg:pt-28">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative text-white py-20 min-h-[420px] flex items-center overflow-hidden">
        <img
          src={meta.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/78 to-primary/55" />

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

        {/* Dot-grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="area-hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#area-hero-dots)" />
        </svg>

        <Container className="relative z-10">
          <Link
            href="/research"
            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Research
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="block w-8 h-px bg-[#38BDF8]" />
              <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">
                Research Area
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {meta.title}
            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
              {meta.description}
            </p>

            {projects.length > 0 && (
              <div className="mt-8 flex items-center gap-3 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>
                  {projects.length} project{projects.length !== 1 ? 's' : ''}
                  {' '}·{' '}
                  {projects.filter(p => p.status === 'ongoing' || p.status === 'active').length} ongoing
                </span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Research Projects ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f9fb] relative overflow-hidden">

        {/* Dot-grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="area-body-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#002866" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#area-body-dots)" />
        </svg>

        {/* Faint cross — bottom-right */}
        <svg
          className="absolute -bottom-20 -right-20 opacity-[0.04] pointer-events-none select-none"
          width="440" height="440" viewBox="0 0 440 440" fill="none" aria-hidden="true"
        >
          <rect x="150" y="0"   width="140" height="440" rx="70" fill="#002866" />
          <rect x="0"   y="150" width="440" height="140" rx="70" fill="#002866" />
        </svg>

        <Container className="relative z-10">

          {/* Section heading */}
          <AnimateOnScroll animation="fade-up" threshold={0.1}>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="block w-8 h-px bg-[#38BDF8]" />
                <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">
                  {meta.title}
                </span>
                <span className="block w-8 h-px bg-[#38BDF8]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#002866] leading-tight">
                Research Projects
              </h2>
              {projects.length > 0 && (
                <p className="text-[#1f2937]/60 text-lg mt-4 max-w-2xl">
                  Explore our {meta.title.toLowerCase()} portfolio — spanning active investigations,
                  upcoming studies, and completed research.
                </p>
              )}
            </div>
          </AnimateOnScroll>

          {projects.length > 0 ? (
            <>
              {/* Row 1 — 3/5 + 2/5 featured split */}
              <AnimateOnScroll animation="fade-up" delay={100} threshold={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  {p1 && (
                    <ResearchCard
                      project={p1}
                      area={area}
                      className="md:col-span-3 h-80 lg:h-96"
                    />
                  )}
                  {p2 && (
                    <ResearchCard
                      project={p2}
                      area={area}
                      className="md:col-span-2 h-80 lg:h-96"
                    />
                  )}
                </div>
              </AnimateOnScroll>

              {/* Row 2+ — equal columns */}
              {rest.length > 0 && (
                <AnimateOnScroll animation="fade-up" delay={200} threshold={0.1}>
                  <div className={`grid grid-cols-1 ${restCols} gap-4`}>
                    {rest.map((project) => (
                      <ResearchCard
                        key={project._id}
                        project={project}
                        area={area}
                        className="h-64 lg:h-72"
                      />
                    ))}
                  </div>
                </AnimateOnScroll>
              )}
            </>
          ) : (
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="text-center py-20">
                <p className="text-[#1f2937]/40 text-lg">
                  Research projects in this area are coming soon.
                </p>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 mt-6 text-[#38BDF8] text-sm font-semibold hover:underline"
                >
                  <ArrowLeft size={14} /> Browse all research areas
                </Link>
              </div>
            </AnimateOnScroll>
          )}
        </Container>
      </section>

    </div>
  );
}
