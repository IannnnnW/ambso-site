import Container from '../ui/Container';
import { Target, Eye, Award } from 'lucide-react';

interface MissionProps {
  content?: {
    mission?: { title: string; description: string };
    vision?: { title: string; description: string };
    values?: { title: string; description: string };
  };
}

const defaultContent = {
  mission: {
    title: 'Our Mission',
    description: 'Transforming Africa through innovative research, training and service provision',
  },
  vision: {
    title: 'Our Vision',
    description: 'Complete Physical, Social and Mental well-being in Africa',
  },
  values: {
    title: 'Our Values',
    description: 'Integrity, Respect for diversity, Innovativeness, and Efficiency',
  },
};

const items = [
  { key: 'mission' as const, Icon: Target,  number: '01' },
  { key: 'vision'  as const, Icon: Eye,     number: '02' },
  { key: 'values'  as const, Icon: Award,   number: '03' },
];

function BackgroundDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">

      {/* Dot grid — same pattern as Programs but on white so navy dots */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mvv-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#002866" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mvv-dots)" />
      </svg>

      {/* Large faint cross — top-left, navy */}
      <svg
        className="absolute -top-20 -left-20 opacity-[0.04]"
        width="440" height="440" viewBox="0 0 440 440" fill="none"
      >
        <rect x="150" y="0"   width="140" height="440" rx="70" fill="#002866" />
        <rect x="0"   y="150" width="440" height="140" rx="70" fill="#002866" />
      </svg>

      {/* Concentric arcs — bottom-left */}
      <svg
        className="absolute bottom-0 left-0 opacity-[0.05]"
        width="360" height="360" viewBox="0 0 360 360" fill="none"
      >
        {[300, 240, 180, 120, 60].map((r, i) => (
          <circle key={i} cx="0" cy="360" r={r} stroke="#002866" strokeWidth="1.5" />
        ))}
      </svg>

      {/* Accent sky line — top edge */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-60" />

      {/* Diagonal tint — bottom-right warmth */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#38BDF8]/[0.03] via-transparent to-[#002866]/[0.04]" />
    </div>
  );
}

export default function Mission({ content }: MissionProps) {
  const data = {
    mission: content?.mission ?? defaultContent.mission,
    vision:  content?.vision  ?? defaultContent.vision,
    values:  content?.values  ?? defaultContent.values,
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <BackgroundDecor />

      <Container>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-[#002866]/10">
          {items.map(({ key, Icon, number }, idx) => (
            <div
              key={key}
              className="group relative flex flex-col items-center text-center px-10 py-10 md:py-6 transition-all duration-300"
            >
              {/* Faint large number watermark */}
              <span
                className="absolute top-4 right-6 text-[5.5rem] font-black leading-none select-none pointer-events-none transition-opacity duration-300 opacity-[0.04] group-hover:opacity-[0.07]"
                style={{ color: '#002866' }}
              >
                {number}
              </span>

              {/* Icon container */}
              <div
                className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(56,189,248,0.25)]"
                style={{
                  background: 'linear-gradient(135deg, #002866 0%, #003d99 100%)',
                }}
              >
                <Icon size={28} color="#38BDF8" strokeWidth={1.75} />

                {/* Accent ring on hover */}
                <span
                  className="absolute inset-0 rounded-2xl border-2 border-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"
                />
              </div>

              {/* Accent line above title */}
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-6 h-px bg-[#38BDF8]" />
                <h3 className="text-lg font-extrabold uppercase tracking-[0.1em] text-[#002866]">
                  {data[key].title}
                </h3>
                <span className="block w-6 h-px bg-[#38BDF8]" />
              </div>

              {/* Description */}
              <p className="text-[#1f2937]/65 text-sm leading-relaxed max-w-[240px]">
                {data[key].description}
              </p>

              {/* Bottom hover indicator */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-16 transition-all duration-300 rounded-full"
                style={{ background: '#38BDF8' }}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}