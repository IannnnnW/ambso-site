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

// Maps each program icon to its representative photo
const imageMap: Record<string, string> = {
  Microscope:   '/ambso-site/images/labwork.jpg',
  Users:        '/ambso-site/images/community.jpg',
  GraduationCap: '/ambso-site/images/capacity-building.png',
  HandHeart:    '/ambso-site/images/resource-mobilization.jpeg',
};

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

export default function Programs({ content }: ProgramsProps) {
  const title    = content?.title    ?? defaultContent.title;
  const subtitle = content?.subtitle ?? defaultContent.subtitle;
  const programs = content?.programs ?? defaultContent.programs;

  return (
    <section className="relative py-24 bg-[#f8f9fb] overflow-hidden">
      {/* Subtle dot texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="prog-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#002866" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#prog-dots)" />
      </svg>

      {/* Faint cross — bottom-right, mirrors Mission section */}
      <svg
        className="absolute -bottom-20 -right-20 opacity-[0.04] pointer-events-none select-none"
        width="440" height="440" viewBox="0 0 440 440" fill="none"
        aria-hidden="true"
      >
        <rect x="150" y="0"   width="140" height="440" rx="70" fill="#002866" />
        <rect x="0"   y="150" width="440" height="140" rx="70" fill="#002866" />
      </svg>

      <Container>
        {/* ── Section header ── */}
        <div className="relative text-center mb-16">
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

        {/* ── Program cards ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => {
            const Icon  = iconMap[program.icon] || Microscope;
            const image = imageMap[program.icon];

            return (
              <div
                key={program.title}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* ── Photo ── */}
                <div className="relative h-52 overflow-hidden">
                  {image && (
                    <img
                      src={image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                  {/* Soft gradient at photo bottom to blend into card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Icon badge — floats over photo bottom-left */}
                  <div className="absolute bottom-3 left-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm shadow-md">
                    <Icon size={18} className="text-[#002866]" />
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-base font-bold text-[#002866] mb-2 leading-snug">
                    {program.title}
                  </h3>
                  <p className="text-[#4b5563] text-sm leading-relaxed flex-1 mb-6">
                    {program.description}
                  </p>
                  <Button
                    href={program.href}
                    variant="outline"
                    size="sm"
                    className="self-start !border-[#38BDF8] !text-[#38BDF8] hover:!bg-[#38BDF8]/10 inline-flex items-center gap-1.5"
                  >
                    Learn More
                    <ArrowRight size={13} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="relative text-center mt-14">
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