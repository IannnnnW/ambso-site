import Container from '../ui/Container';
import Button from '../ui/Button';
import { Microscope, Users, GraduationCap, HandHeart, LucideIcon, ArrowRight } from 'lucide-react';

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
    }>;
  };
}

const iconMap: Record<string, LucideIcon> = {
  Microscope,
  Users,
  GraduationCap,
  HandHeart,
};

// Single accent — every card uses the brand sky blue at varying opacities
const accent = { border: '#38BDF8', text: '#38BDF8', bg: 'rgba(56,189,248,0.10)' };

const defaultPrograms = [
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

// ── Inline SVG background: dot-grid world-map silhouette + decorative rings ──
function BackgroundDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">

      {/* Large faint cross / plus — medical motif, top-right */}
      <svg
        className="absolute -top-16 -right-16 opacity-[0.04]"
        width="520" height="520" viewBox="0 0 520 520" fill="none"
      >
        <rect x="180" y="0"   width="160" height="520" rx="80" fill="white" />
        <rect x="0"   y="180" width="520" height="160" rx="80" fill="white" />
      </svg>

      {/* Smaller cross — bottom-left */}
      <svg
        className="absolute -bottom-10 -left-10 opacity-[0.05]"
        width="280" height="280" viewBox="0 0 280 280" fill="none"
      >
        <rect x="95"  y="0"   width="90" height="280" rx="45" fill="white" />
        <rect x="0"   y="95"  width="280" height="90" rx="45" fill="white" />
      </svg>

      {/* Concentric arc rings — centre-right */}
      <svg
        className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.06]"
        width="400" height="600" viewBox="0 0 400 600" fill="none"
      >
        {[340, 280, 220, 160, 100].map((r, i) => (
          <circle key={i} cx="400" cy="300" r={r} stroke="white" strokeWidth="1.5" />
        ))}
      </svg>

      {/* Dot grid — subtle texture across the whole panel */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Diagonal gradient wash — creates depth from bottom-left */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />

      {/* Subtle top highlight line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export default function Programs({ content }: ProgramsProps) {
  const title    = content?.title    ?? defaultContent.title;
  const subtitle = content?.subtitle ?? defaultContent.subtitle;
  const programs = content?.programs ?? defaultContent.programs;

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #001a40 0%, #002866 55%, #003d99 100%)' }}
    >
      <BackgroundDecor />

      <Container>
        {/* ── Section header ── */}
        <div className="relative text-center mb-16">
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="block w-8 h-px bg-[#38BDF8]" />
            <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-[0.2em]">
              What We Do
            </span>
            <span className="block w-8 h-px bg-[#38BDF8]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            {title}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ── Program cards ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, idx) => {
            const Icon = iconMap[program.icon] || Microscope;

            return (
              <div
                key={program.title}
                className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                {/* Accent top border */}
                <div
                  className="h-[3px] w-full transition-all duration-300 group-hover:h-[4px]"
                  style={{ background: accent.border }}
                />

                <div className="flex flex-col flex-1 p-7">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: accent.bg, border: `1px solid ${accent.border}30` }}
                  >
                    <Icon size={26} style={{ color: accent.text }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed flex-1 mb-7">
                    {program.description}
                  </p>

                  {/* CTA link */}
                  <Button
                    href={program.href}
                    variant="outline"
                    size="sm"
                    className="self-start !border-[#38BDF8] !text-[#38BDF8] hover:!bg-[#38BDF8]/10 inline-flex items-center gap-1.5"
                  >
                    Learn More
                    <ArrowRight size={14} />
                  </Button>
                </div>

                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${accent.bg} 0%, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="relative text-center mt-14">
          <a
            href="/programs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
            style={{
              background: '#38BDF8',
              color: '#002866',
              boxShadow: '0 4px 24px rgba(56,189,248,0.25)',
            }}
          >
            View All Programs
            <ArrowRight size={15} />
          </a>
        </div>
      </Container>
    </section>
  );
}