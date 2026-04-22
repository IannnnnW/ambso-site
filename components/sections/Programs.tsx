import Link from 'next/link';
import Container from '../ui/Container';
import { Microscope, Users, GraduationCap, HandHeart, LucideIcon, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface ProgramsProps {
  content?: {
    title?: string;
    subtitle?: string;
    programs?: Array<{
      title: string;
      description: string;
      icon: string;
      href: string;
      colorClass: string;
      image?: string;
    }>;
  };
}

const iconMap: Record<string, LucideIcon> = {
  Microscope,
  Users,
  GraduationCap,
  HandHeart,
};

const imageMap: Record<string, string> = {
  Microscope:    '/images/labwork.jpg',
  Users:         '/images/community.jpg',
  GraduationCap: '/images/capacity-building.png',
  HandHeart:     '/images/resource-mobilization.jpeg',
};

const defaultPrograms: Array<{ title: string; description: string; icon: string; href: string; colorClass: string; image?: string }> = [
  {
    title: 'Clinical Programs',
    description: 'Providing quality healthcare services through clinical trials and medical interventions.',
    icon: 'Microscope',
    href: '/programs/clinical',
    colorClass: '',
  },
  {
    title: 'Community Programs',
    description: 'Empowering communities with health education and preventive care initiatives.',
    icon: 'Users',
    href: '/programs/community',
    colorClass: '',
  },
  {
    title: 'Capacity Building',
    description: 'Training and developing healthcare professionals for sustainable, lasting impact.',
    icon: 'GraduationCap',
    href: '/programs/capacity-building',
    colorClass: '',
  },
  {
    title: 'Resource Mobilization',
    description: 'Securing sustainable funding for health research and program implementation.',
    icon: 'HandHeart',
    href: '/programs/resource-mobilization',
    colorClass: '',
  },
];

const defaultContent = {
  title: 'Our Programs',
  subtitle: 'We deliver comprehensive health solutions through four strategic pillars',
  programs: defaultPrograms,
};

// ── Individual card ──────────────────────────────────────────────────────────
function ProgramCard({
  title,
  description,
  image,
  href,
  className = '',
}: {
  title: string;
  description: string;
  image: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-xl block ${className}`}
    >
      {/* Background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />

      {/* Resting overlay — solid primary tint */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,40,102,0.62)' }}
      />

      {/* Hover overlay — gradient lets more image breathe at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a40]/90 via-[#002866]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content — pinned bottom-right */}
      <div className="absolute inset-0 flex flex-col justify-end items-end px-6 py-6 lg:px-8 lg:py-7 text-right">
        {/* Description slides up on hover */}
        <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-3 max-w-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          {description}
        </p>

        <div className="flex items-center gap-3">
          <h3 className="text-white font-bold text-xl lg:text-2xl group-hover:text-2xl lg:group-hover:text-3xl leading-tight transition-all duration-300">
            {title}
          </h3>

          {/* Arrow badge — fades in, then bounces */}
          <span className="flex-shrink-0 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight size={15} className="text-accent program-arrow-bounce" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function Programs({ content }: ProgramsProps) {
  const title    = content?.title    ?? defaultContent.title;
  const subtitle = content?.subtitle ?? defaultContent.subtitle;
  const programs = content?.programs ?? defaultContent.programs;

  const programsWithImages = programs.map((p) => ({
    ...p,
    resolvedImage: p.image || imageMap[p.icon] || '/images/labwork.jpg',
  }));

  // Row 1: first two cards at 60 / 40 split
  // Row 2: remaining cards in equal columns
  const [p1, p2, ...rest] = programsWithImages;

  const secondRowCols =
    rest.length === 1 ? 'md:grid-cols-1' :
    rest.length === 2 ? 'md:grid-cols-2' :
                        'md:grid-cols-3';

  return (
    <section className="relative py-24 bg-[#f8f9fb] overflow-hidden">
      {/* Dot texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="prog-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#002866" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#prog-dots)" />
      </svg>

      {/* Faint cross — bottom-right */}
      <svg
        className="absolute -bottom-20 -right-20 opacity-[0.04] pointer-events-none select-none"
        width="440" height="440" viewBox="0 0 440 440" fill="none"
        aria-hidden="true"
      >
        <rect x="150" y="0"   width="140" height="440" rx="70" fill="#002866" />
        <rect x="0"   y="150" width="440" height="140" rx="70" fill="#002866" />
      </svg>

      <Container>
        {/* Section header */}
        <div className="relative text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="block w-8 h-px bg-[#38BDF8]" />
            <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">
              What We Do
            </span>
            <span className="block w-8 h-px bg-[#38BDF8]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002866] mb-5 leading-tight">
            {title}
          </h2>
          <p className="text-[#1f2937]/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Row 1 — featured pair: wide + narrow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {p1 && (
            <ProgramCard
              title={p1.title}
              description={p1.description}
              image={p1.resolvedImage}
              href={p1.href}
              className="md:col-span-3 h-80 lg:h-96"
            />
          )}
          {p2 && (
            <ProgramCard
              title={p2.title}
              description={p2.description}
              image={p2.resolvedImage}
              href={p2.href}
              className="md:col-span-2 h-80 lg:h-96"
            />
          )}
        </div>

        {/* Row 2 — equal columns for remaining programs */}
        {rest.length > 0 && (
          <div className={`grid grid-cols-1 ${secondRowCols} gap-4`}>
            {rest.map((p) => (
              <ProgramCard
                key={p.title}
                title={p.title}
                description={p.description}
                image={p.resolvedImage}
                href={p.href}
                className="h-64 lg:h-72"
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="relative text-center mt-12">
          <Button
            href="/programs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:shadow-lg !bg-[#38BDF8] !text-[#002866] !border-0"
            style={{ boxShadow: '0 4px 24px rgba(56,189,248,0.25)' }}
          >
            View All Programs
            <ArrowRight size={15} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
