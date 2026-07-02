import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PartnersCarousel from '@/components/layout/partnersCoursel';
import { ArrowRight } from 'lucide-react';
import { ProgramCategory, Partner } from '@/lib/sanity.types';
import { getProgramCategories, getFeaturedPartners, getProgramsPageContent } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';

// ── image / slug helpers ─────────────────────────────────────────────────────

const SLUG_IMAGE: Record<string, string> = {
  'research':              '/images/labwork.jpg',
  'clinical-programs':     '/images/labwork.jpg',
  'capacity-building':     '/images/capacity-building.png',
  'community-programs':    '/images/community.jpg',
  'community-engagement':  '/images/community.jpg',
  'resource-mobilization': '/images/resource-mobilization.jpeg',
  'service-delivery':      '/images/staff.jpg',
};

function resolveImage(cat: ProgramCategory): string {
  if (cat.featuredImage?.asset?._ref) {
    try { return urlFor(cat.featuredImage).width(900).height(600).url(); } catch { /* fall through */ }
  }
  return SLUG_IMAGE[cat.slug.current] ?? '/images/staff-extended.jpg';
}

// ── shared background decoration ────────────────────────────────────────────

function Decor({ id }: { id: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <defs>
          <pattern id={`dots-${id}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#002866" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
      </svg>
      <svg className="absolute -top-16 -right-16 opacity-[0.04]" width="380" height="380" viewBox="0 0 440 440" fill="none">
        <rect x="150" y="0"   width="140" height="440" rx="70" fill="#002866" />
        <rect x="0"   y="150" width="440" height="140" rx="70" fill="#002866" />
      </svg>
      <svg className="absolute bottom-0 left-0 opacity-[0.05]" width="320" height="320" viewBox="0 0 360 360" fill="none">
        {[300, 240, 180, 120, 60].map((r, i) => (
          <circle key={i} cx="0" cy="360" r={r} stroke="#002866" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-60" />
    </div>
  );
}

// ── section header ───────────────────────────────────────────────────────────

function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
}: {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  const isCenter = align === 'center';
  return (
    <div className={`mb-12 lg:mb-16 ${isCenter ? 'text-center' : ''}`}>
      {label && (
        <div className={`inline-flex items-center gap-2 mb-4 ${isCenter ? '' : ''}`}>
          <span className="block w-8 h-px bg-[#38BDF8]" />
          <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
          <span className="block w-8 h-px bg-[#38BDF8]" />
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#002866] mb-5 leading-tight">{title}</h2>
      {subtitle && (
        <p className={`text-[#1f2937]/60 text-lg leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── program card (matches homepage Programs.tsx card design) ─────────────────

function ProgramCard({
  category,
  className = '',
}: {
  category: ProgramCategory;
  className?: string;
}) {
  const image = resolveImage(category);
  return (
    <Link
      href={`/programs/${category.slug.current}`}
      className={`group relative overflow-hidden rounded-xl block ${className}`}
    >
      <img
        src={image}
        alt={category.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      {/* resting overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,40,102,0.58)' }} />
      {/* hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a40]/92 via-[#002866]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* content — bottom-right */}
      <div className="absolute inset-0 flex flex-col justify-end items-end px-6 py-6 lg:px-8 lg:py-7 text-right">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-bold text-xl lg:text-2xl group-hover:text-2xl lg:group-hover:text-3xl leading-tight transition-all duration-300">
            {category.title}
          </h3>
          <span className="flex-shrink-0 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight size={15} className="text-accent program-arrow-bounce" />
          </span>
        </div>
        {category.shortDescription && (
          <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-3 max-w-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
            {category.shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
}

// ── fallback content ─────────────────────────────────────────────────────────

const FALLBACK_STATS = [
  { value: '57,000+', label: 'Male Circumcisions' },
  { value: '35+',     label: 'Peer Reviewed Publications' },
  { value: '15+',     label: 'Partner Organizations' },
  { value: '10 Yrs',  label: 'Of Sustained Impact' },
];

const FALLBACK_APPROACH = [
  {
    title: 'Community-Centred Design',
    description: 'Every program is developed in close dialogue with the communities we serve, ensuring relevance and uptake.',
  },
  {
    title: 'Multi-Disciplinary Teams',
    description: 'Clinicians, epidemiologists, and community health workers collaborate under one roof.',
  },
  {
    title: 'Continuous Quality Improvement',
    description: 'Regular evaluation cycles feed findings back into program design for measurable, sustained improvement.',
  },
  {
    title: 'Sustainable Partnerships',
    description: 'Long-term alliances with government, academia, and international funders ensure lasting programmatic impact.',
  },
];

const FALLBACK_IMPACT_STATS = [
  { value: '57,000+', label: 'Male Circumcisions', sub: 'Voluntary Medical procedures performed' },
  { value: '35+',     label: 'Publications',       sub: 'Peer-reviewed research papers' },
  { value: '15+',     label: 'Partners',           sub: 'Local & international collaborators' },
  { value: '4',       label: 'Program Areas',      sub: 'Spanning research to community care' },
];

// ── page ─────────────────────────────────────────────────────────────────────

export default async function ProgramsPage() {
  const [categories, partners, cmsContent]: [ProgramCategory[], Partner[], Record<string, unknown> | null] = await Promise.all([
    getProgramCategories(),
    getFeaturedPartners(),
    getProgramsPageContent(),
  ]);

  const stats = (cmsContent?.statsBar as typeof FALLBACK_STATS | undefined) ?? FALLBACK_STATS;
  const approachItems = (cmsContent?.approachSection as { items?: typeof FALLBACK_APPROACH } | undefined)?.items ?? FALLBACK_APPROACH;
  const approachTitle = (cmsContent?.approachSection as { title?: string } | undefined)?.title ?? 'Grounded in Research,\nDriven by Community';
  const approachDesc = (cmsContent?.approachSection as { description?: string } | undefined)?.description ?? 'AMBSO integrates scientific rigour with compassionate service delivery. Every initiative we design is shaped by peer-reviewed evidence, community insight, and measurable health outcomes.';
  const impactTitle = (cmsContent?.impactSection as { title?: string } | undefined)?.title ?? 'Ten Years of\nTransforming Health';
  const impactDesc = (cmsContent?.impactSection as { description?: string } | undefined)?.description ?? 'From voluntary medical male circumcision to multi-site clinical research, AMBSO has consistently translated scientific evidence into measurable community benefit across Uganda.';
  const impactStats = (cmsContent?.impactSection as { stats?: typeof FALLBACK_IMPACT_STATS } | undefined)?.stats ?? FALLBACK_IMPACT_STATS;

  const cats = categories ?? [];
  const [c1, c2, ...rest] = cats;

  const secondRowCols =
    rest.length === 1 ? 'md:grid-cols-1' :
    rest.length === 2 ? 'md:grid-cols-2' :
    rest.length === 3 ? 'md:grid-cols-3' :
                        'md:grid-cols-4';

  return (
    <div className="pt-20 lg:pt-28">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: '72vh' }}>
        <Image
          src="/images/labwork.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center hero-image-animate"
        />
        {/* dual-gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/45 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002866]/75 via-[#002866]/25 to-transparent" />

        {/* navbar clearance */}
        <div className="absolute top-0 left-0 right-0 h-[72px] lg:h-[112px]" />

        <Container className="relative z-10 pb-20 lg:pb-28">
          <div className="max-w-3xl">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="block w-8 h-px bg-[#38BDF8]" />
              <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">
                What We Do
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
              Our Programs
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-xl mb-10">
              Advancing health through rigorous research, evidence-based clinical services, and community-driven programs across Uganda and beyond.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#programs" variant="secondary" size="lg">
                Explore Programs
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm !border-white/70 !text-white hover:!bg-white hover:!text-primary"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden">
        {/* faint right-side arcs */}
        <svg className="absolute right-0 inset-y-0 h-full opacity-[0.07] pointer-events-none" viewBox="0 0 200 200" fill="none" preserveAspectRatio="xMaxYMid slice">
          {[160, 120, 80, 40].map((r, i) => (
            <circle key={i} cx="200" cy="100" r={r} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
        <Container className="relative z-10 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/[0.12]">
            {stats.map(({ value, label }) => (
              <div key={label} className="px-6 py-3 text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-accent leading-none mb-2">
                  {value}
                </div>
                <div className="text-sm text-white/65 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. PROGRAM AREAS ─────────────────────────────────────────────── */}
      <section id="programs" className="relative py-20 bg-[#f8f9fb] overflow-hidden">
        <Decor id="areas" />
        <Container className="relative z-10">
          <SectionHeader
            label="Program Areas"
            title="Where We Work"
            subtitle="Our interdisciplinary approach spans clinical research, community health, and capacity development — creating measurable impact at every level."
          />

          {cats.length > 0 ? (
            <>
              {/* Row 1 — 3 / 2 featured split */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                {c1 && <ProgramCard category={c1} className="md:col-span-3 h-80 lg:h-96" />}
                {c2 && <ProgramCard category={c2} className="md:col-span-2 h-80 lg:h-96" />}
              </div>

              {/* Row 2 — remaining categories */}
              {rest.length > 0 && (
                <div className={`grid grid-cols-1 ${secondRowCols} gap-4`}>
                  {rest.map((cat) => (
                    <ProgramCard key={cat._id} category={cat} className="h-64 lg:h-72" />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-center py-12 text-gray-400">
              Programs are being updated. Please check back soon.
            </p>
          )}
        </Container>
      </section>

      {/* ── 4. OUR APPROACH ──────────────────────────────────────────────── */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* subtle top & bottom rules */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#002866]/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#002866]/10 to-transparent" />

        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] order-2 lg:order-1">
              <Image
                src="/images/staff-extended.jpg"
                alt="AMBSO staff and community members"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              {/* caption pill */}
              <div className="absolute bottom-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary font-bold text-xs uppercase tracking-widest rounded-full shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Evidence-Based Practice
                </span>
              </div>
              {/* accent corner line */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-accent" />
              <div className="absolute top-0 left-0 w-1 h-16 bg-accent" />
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="block w-8 h-px bg-[#38BDF8]" />
                <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">
                  Our Approach
                </span>
                <span className="block w-8 h-px bg-[#38BDF8]" />
              </div>

              <h2 className="text-4xl font-extrabold text-[#002866] mb-6 leading-tight">
                {approachTitle.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>

              <p className="text-[#1f2937]/65 leading-relaxed mb-10">
                {approachDesc}
              </p>

              <div className="space-y-6">
                {approachItems.map(({ title, description }, i) => (
                  <div key={title} className="group flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-[#38BDF8] text-xs font-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(56,189,248,0.3)]"
                      style={{ background: 'linear-gradient(135deg, #002866 0%, #003d99 100%)' }}
                    >
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002866] mb-1">{title}</h4>
                      <p className="text-[#1f2937]/60 text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── 5. IMPACT CALLOUT ────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden text-white">
        <Image
          src="/images/molecular-bkg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary/88" />

        {/* decorative arcs */}
        <svg className="absolute left-0 inset-y-0 h-full opacity-[0.08] pointer-events-none" viewBox="0 0 360 360" fill="none" preserveAspectRatio="xMinYMid slice">
          {[300, 240, 180, 120, 60].map((r, i) => (
            <circle key={i} cx="0" cy="180" r={r} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="block w-8 h-px bg-[#38BDF8]" />
                <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">
                  Real Impact
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                {impactTitle.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {impactDesc}
              </p>
              <Button href="/who-we-are/about" variant="secondary" size="lg">
                Learn Our Story
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {impactStats.map(({ value, label, sub }) => (
                <div
                  key={label}
                  className="bg-white/[0.07] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.12] transition-colors duration-300"
                >
                  <div className="text-3xl font-extrabold text-accent mb-1">{value}</div>
                  <div className="text-white font-semibold text-sm mb-1">{label}</div>
                  <div className="text-white/50 text-xs leading-snug">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. PARTNERS ──────────────────────────────────────────────────── */}
      {partners && partners.length > 0 && (
        <section className="relative py-16 bg-[#f8f9fb] overflow-hidden">
          <Decor id="partners" />
          <Container className="relative z-10">
            <SectionHeader
              label="Collaboration"
              title="Our Partners"
              subtitle="Working alongside leading organisations to advance health research and extend the reach of quality services"
            />
            <PartnersCarousel partners={partners} />
          </Container>
        </section>
      )}

      {/* ── 7. CTA ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary-light text-white overflow-hidden">
        {/* right-side arcs */}
        <svg className="absolute right-0 inset-y-0 h-full opacity-[0.08] pointer-events-none" viewBox="0 0 360 360" fill="none" preserveAspectRatio="xMaxYMid slice">
          {[300, 240, 180, 120, 60].map((r, i) => (
            <circle key={i} cx="360" cy="180" r={r} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
        {/* dot texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Transforming Lives
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              Whether as a partner, researcher, or volunteer — your involvement helps extend the reach of quality health services across Uganda and Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/opportunities/careers" variant="secondary" size="lg">
                Explore Opportunities
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm !border-white !text-white hover:!bg-white hover:!text-primary"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
