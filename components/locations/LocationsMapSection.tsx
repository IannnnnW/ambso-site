'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import LocationDetailPanel from './LocationDetailPanel';
import type { MapLocation } from './types';

const LocationMap = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-none bg-gray-100" />
  ),
});

interface Props {
  locations: MapLocation[];
}

export default function LocationsMapSection({ locations }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  const selectedLocation = locations.find((l) => l.id === selectedId) ?? null;

  const handleSelect = useCallback((id: string) => setSelectedId(id), []);
  const handleDeselect = useCallback(() => {
    setSelectedId(null);
    setResetTrigger((n) => n + 1);
  }, []);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-5"
      style={{ minHeight: '75vh' }}
    >
      {/* Map column — 3/5 on desktop */}
      <div
        className="relative h-[50vh] border-b border-gray-200 lg:col-span-3 lg:h-full lg:border-b-0 lg:border-r"
        style={{ zIndex: 0 }}
      >
        <LocationMap
          locations={locations}
          selectedId={selectedId}
          resetTrigger={resetTrigger}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
        />
        {/* Hint overlay */}
        <div
          className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-3 py-1 text-xs text-white/80"
          style={{ backgroundColor: 'rgba(0,40,102,0.55)', backdropFilter: 'blur(4px)' }}
        >
          Click a pin to explore
        </div>
      </div>

      {/* Detail panel — 2/5 on desktop */}
      <div className="h-[50vh] overflow-y-auto lg:col-span-2 lg:h-full">
        <LocationDetailPanel location={selectedLocation} onClose={handleDeselect} />
      </div>
    </div>
  );
}
