'use client';

import { useState, useMemo } from 'react';
import { FileText, Presentation, Search, LayoutGrid, List } from 'lucide-react';
import Container from '@/components/ui/Container';
import ResourceCard from './ResourceCard';

interface Resource {
  _id: string;
  title: string;
  slug: { current: string };
  Conference?: string;
  resourceType: string;
  file?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  externalLink?: string;
  publishedDate?: string;
  authors?: string[];
  featured?: boolean;
}

interface ResourcesGridProps {
  resources: Resource[];
}

const tabs = [
  { id: 'publication', label: 'Publications', icon: FileText },
  { id: 'abstract', label: 'Abstracts', icon: Presentation },
];

export default function ResourcesGrid({ resources }: ResourcesGridProps) {
  const [activeTab, setActiveTab] = useState('publication');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Filter resources by type and search query
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesType = resource.resourceType === activeTab;
      const matchesSearch =
        searchQuery === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.authors?.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        resource.Conference?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [resources, activeTab, searchQuery]);

  // Group resources by year for display
  const resourcesByYear = useMemo(() => {
    const grouped: Record<string, Resource[]> = {};
    filteredResources.forEach((resource) => {
      const year = resource.publishedDate
        ? new Date(resource.publishedDate).getFullYear().toString()
        : 'Unknown';
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(resource);
    });
    // Sort years in descending order
    return Object.entries(grouped).sort(([a], [b]) => {
      if (a === 'Unknown') return 1;
      if (b === 'Unknown') return -1;
      return parseInt(b) - parseInt(a);
    });
  }, [filteredResources]);

  // Count resources by type
  const counts = useMemo(() => {
    return {
      publication: resources.filter((r) => r.resourceType === 'publication').length,
      abstract: resources.filter((r) => r.resourceType === 'abstract').length,
    };
  }, [resources]);

  return (
    <>
      {/* Tabs and Controls */}
      <section className="py-8 bg-gray-50 border-b sticky top-20 z-10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const count = counts[tab.id as keyof typeof counts];

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                      ${
                        isActive
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span
                      className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
                      `}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search and View Toggle */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-64"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Resources List */}
      <section className="py-12 bg-white">
        <Container>
          {filteredResources.length > 0 ? (
            <div className="space-y-12">
              {resourcesByYear.map(([year, yearResources]) => (
                <div key={year}>
                  {/* Year Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{year}</h3>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-500 font-medium">
                      {yearResources.length} {yearResources.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {/* Resources */}
                  {viewMode === 'list' ? (
                    <div className="space-y-4">
                      {yearResources.map((resource) => (
                        <ResourceCard key={resource._id} resource={resource} variant="row" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {yearResources.map((resource) => (
                        <ResourceCard key={resource._id} resource={resource} variant="card" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {activeTab === 'publication' ? (
                  <FileText className="w-10 h-10 text-gray-400" />
                ) : (
                  <Presentation className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? 'No matching resources found' : 'No resources yet'}
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : `There are no ${activeTab === 'publication' ? 'publications' : 'abstracts'} available at this time.`}
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
