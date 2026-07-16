'use client';

import dynamic from 'next/dynamic';

const CollaboratorsMap = dynamic(() => import('./CollaboratorsMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full animate-pulse bg-gray-100"
      style={{ height: '65vh', minHeight: '480px' }}
    />
  ),
});

const STATS = [
  { value: '14', label: 'Partners' },
  { value: '5',  label: 'Countries' },
  { value: '3',  label: 'Continents' },
];

export default function CollaboratorsMapSection({ logos }: { logos?: Record<string, string> }) {
  return (
    <div>
      {/* Stats bar */}
      <div
        className="flex items-center justify-center gap-0 py-3"
        style={{ backgroundColor: '#002866' }}
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            {i > 0 && (
              <div
                className="mx-6 h-5 w-px"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              />
            )}
            <span className="text-sm font-semibold text-white">
              <span className="text-accent mr-1">{stat.value}</span>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="bg-white py-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide" style={{ color: '#002866' }}>
          AMBSO Global Map of Partner Institutions
        </h2>
      </div>

      {/* Map */}
      <CollaboratorsMap logos={logos} />
    </div>
  );
}
