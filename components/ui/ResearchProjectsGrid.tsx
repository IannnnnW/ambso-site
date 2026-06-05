'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity.client';
import { ResearchProject } from '@/lib/sanity.types';

const STATUS_STYLES: Record<string, string> = {
  ongoing:   'bg-accent/20 text-accent border border-accent/30',
  upcoming:  'bg-amber-400/20 text-amber-300 border border-amber-400/30',
  completed: 'bg-white/15 text-white/70 border border-white/20',
  suspended: 'bg-red-500/20 text-red-300 border border-red-400/30',
};

function ProjectCard({
  project,
  areaSlug,
  fallbackImage,
  className = '',
}: {
  project: ResearchProject;
  areaSlug: string;
  fallbackImage: string;
  className?: string;
}) {
  let image = fallbackImage;
  if (project.featuredImage?.asset?._ref) {
    try { image = urlFor(project.featuredImage).width(900).height(600).url(); } catch { /* fall through */ }
  }
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES.ongoing;

  return (
    <Link
      href={`/programs/research/${areaSlug}/${project.slug.current}`}
      className={`group relative overflow-hidden rounded-xl block ${className}`}
    >
      <img
        src={image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(0,40,102,0.60)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a40]/92 via-[#002866]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize backdrop-blur-sm ${statusStyle}`}>
          {project.status}
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end items-end px-6 py-6 text-right">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-bold text-xl group-hover:text-2xl leading-tight transition-all duration-300">
            {project.title}
          </h3>
          <span className="flex-shrink-0 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight size={15} className="text-accent program-arrow-bounce" />
          </span>
        </div>
        {project.summary && (
          <p className="text-white/80 text-sm leading-relaxed mb-3 max-w-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 line-clamp-3">
            {project.summary}
          </p>
        )}
      </div>
    </Link>
  );
}

type Tab = 'all' | 'ongoing' | 'upcoming' | 'completed';

export default function ResearchProjectsGrid({
  projects,
  areaSlug,
  fallbackImage,
}: {
  projects: ResearchProject[];
  areaSlug: string;
  fallbackImage: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const counts: Record<Tab, number> = {
    all:       projects.length,
    ongoing:   projects.filter(p => p.status === 'ongoing').length,
    upcoming:  projects.filter(p => p.status === 'upcoming').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  const filtered = activeTab === 'all'
    ? projects
    : projects.filter(p => p.status === activeTab);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all',       label: 'All' },
    { key: 'ongoing',   label: 'Ongoing' },
    { key: 'upcoming',  label: 'Upcoming' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        {tabs.map(({ key, label }) => {
          const count = counts[key];
          if (count === 0 && key !== 'all') return null;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-primary border border-gray-200'
              }`}
            >
              {label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(project => (
            <ProjectCard
              key={project._id}
              project={project}
              areaSlug={areaSlug}
              fallbackImage={fallbackImage}
              className="h-64 lg:h-72"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[#1f2937]/40 text-lg">No {activeTab} projects in this area yet.</p>
        </div>
      )}
    </div>
  );
}
