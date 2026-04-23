'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import { useRouter } from 'next/navigation';

// Fix webpack-broken default icons
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const AMBSO_HQ: [number, number] = [0.3629, 32.5347];

interface Collaborator {
  id: string;
  name: string;
  type: string;
  country: string;
  lat: number;
  lng: number;
  slug: string;
}

const COLLABORATORS: Collaborator[] = [
  { id: 'rakai', name: 'Rakai Health Sciences Program', type: 'NGO / Non-Profit', country: 'Uganda', lat: 0.3476, lng: 31.5085, slug: 'rakai-health-sciences-program' },
  { id: 'moh', name: 'Ministry of Health', type: 'Government Agency', country: 'Uganda', lat: 0.3323, lng: 32.5825, slug: 'ministry-of-health' },
  { id: 'usc', name: 'University of Southern California', type: 'Research Organization', country: 'USA', lat: 34.0224, lng: -118.2851, slug: 'university-of-southern-california' },
  { id: 'karolinska', name: 'Karolinska Institutet', type: 'Research Organization', country: 'Sweden', lat: 59.3498, lng: 18.0239, slug: 'karolinska-institutet' },
  { id: 'boston', name: 'Boston College', type: 'Research Organization', country: 'USA', lat: 42.3355, lng: -71.1685, slug: 'boston-college' },
  { id: 'nyu', name: 'New York University', type: 'Research Organization', country: 'USA', lat: 40.7295, lng: -73.9965, slug: 'new-york-university' },
  { id: 'urocare', name: 'Uro Care Hospital', type: 'Private Sector', country: 'Uganda', lat: 0.3476, lng: 32.5825, slug: 'uro-care-hospital' },
  { id: 'etsu', name: 'East Tennessee State University', type: 'Research Organization', country: 'USA', lat: 36.3020, lng: -82.3577, slug: 'east-tennesse-state-university' },
  { id: 'sdsu', name: 'San Diego State University', type: 'Academic Institution', country: 'USA', lat: 32.7757, lng: -117.0719, slug: 'san-diego-state-university' },
  { id: 'sicra', name: 'Strengthening Institutional Capacity for Research Administration', type: 'NGO / Non-Profit', country: 'Uganda', lat: 0.3600, lng: 32.5800, slug: 'strengthening-institutional-capacity-for-research-administration' },
  { id: 'makerere', name: 'Makerere University School of Public Health', type: 'Academic Institution', country: 'Uganda', lat: 0.3347, lng: 32.5681, slug: 'makerere-university-school-of-public-health' },
  { id: 'idi', name: 'Infectious Diseases Institute', type: 'NGO / Non-Profit', country: 'Uganda', lat: 0.3390, lng: 32.5760, slug: 'infectious-diseases-institute' },
  { id: 'sacro', name: 'Sacro Cuore', type: 'NGO / Non-Profit', country: 'Italy', lat: 45.4654, lng: 11.5654, slug: 'sacro-coure' },
  { id: 'ucla', name: 'University of California Los Angeles', type: 'Research Organization', country: 'USA', lat: 34.0689, lng: -118.4452, slug: 'university-of-california-los-angeles' },
];

const COUNTRY_FLAGS: Record<string, string> = {
  Uganda: '🇺🇬',
  USA: '🇺🇸',
  Sweden: '🇸🇪',
  Italy: '🇮🇹',
};

// ─── Pin generators ───────────────────────────────────────────────────────────

function makeHQPin(reducedMotion: boolean): L.DivIcon {
  const pulse = reducedMotion
    ? ''
    : `<div style="position:absolute;top:50%;left:50%;width:72px;height:72px;border-radius:50%;background:rgba(56,189,248,0.28);animation:pinPulse 2s ease-out infinite;pointer-events:none;transform:translate(-50%,-50%);"></div>`;
  return L.divIcon({
    html: `<div style="position:relative;display:flex;align-items:center;justify-content:center;">
      ${pulse}
      <svg viewBox="0 0 52 52" width="52" height="52" style="filter:drop-shadow(0 4px 10px rgba(0,40,102,0.5));position:relative;">
        <circle cx="26" cy="26" r="26" fill="#002866"/>
        <text x="26" y="33" text-anchor="middle" font-size="20" font-weight="bold" fill="white" font-family="system-ui,sans-serif">A</text>
      </svg>
    </div>`,
    className: '',
    iconSize: [52, 52],
    iconAnchor: [26, 26],
  });
}

function makeCollabPin(isUganda: boolean, isHovered: boolean, reducedMotion: boolean): L.DivIcon {
  const fill = isHovered ? '#38bdf8' : isUganda ? '#003d99' : '#002866';
  const scale = isHovered && !reducedMotion ? 1.4 : 1;
  const shadow = isHovered ? 'drop-shadow(0 4px 8px rgba(0,40,102,0.5))' : 'drop-shadow(0 2px 4px rgba(0,40,102,0.3))';
  return L.divIcon({
    html: `<div style="transform:scale(${scale});transform-origin:center;transition:transform 0.2s ease;">
      <svg viewBox="0 0 28 28" width="28" height="28" style="filter:${shadow};">
        <circle cx="14" cy="14" r="14" fill="${fill}" stroke="white" stroke-width="2"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>
    </div>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

// ─── Legend ───────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div
      className="absolute bottom-4 left-4 z-[400] rounded-xl bg-white p-3 shadow-md"
      style={{ pointerEvents: 'none' }}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Legend</p>
      <div className="flex flex-col gap-2">
        {/* AMBSO HQ */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 18 18" width="18" height="18">
            <circle cx="9" cy="9" r="9" fill="#002866"/>
            <text x="9" y="13" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white" fontFamily="sans-serif">A</text>
          </svg>
          <span className="text-xs text-gray-600">AMBSO Headquarters</span>
        </div>
        {/* International */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 14 14" width="14" height="14">
            <circle cx="7" cy="7" r="7" fill="#002866" stroke="white" strokeWidth="1.5"/>
            <circle cx="7" cy="7" r="2.5" fill="white"/>
          </svg>
          <span className="text-xs text-gray-600">International Partner</span>
        </div>
        {/* Uganda */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 14 14" width="14" height="14">
            <circle cx="7" cy="7" r="7" fill="#003d99" stroke="white" strokeWidth="1.5"/>
            <circle cx="7" cy="7" r="2.5" fill="white"/>
          </svg>
          <span className="text-xs text-gray-600">Uganda Partner</span>
        </div>
        {/* Collaboration link */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 28 4" width="28" height="4">
            <line x1="0" y1="2" x2="28" y2="2" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3"/>
          </svg>
          <span className="text-xs text-gray-600">Collaboration link</span>
        </div>
      </div>
    </div>
  );
}

// ─── CollaboratorsMap ─────────────────────────────────────────────────────────

export default function CollaboratorsMap() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const hqPin = makeHQPin(reducedMotion);

  return (
    <div className="relative z-0" style={{ height: '60vh', minHeight: '420px' }}>
      <MapContainer
        center={[20, 10]}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        scrollWheelZoom={false}
        worldCopyJump={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Connection polylines — drawn before markers so pins sit on top */}
        {COLLABORATORS.map((c) => {
          const isHovered = hoveredId === c.id;
          return (
            <Polyline
              key={`line-${c.id}`}
              positions={[AMBSO_HQ, [c.lat, c.lng]]}
              pathOptions={{
                color: '#38bdf8',
                opacity: isHovered ? 0.8 : 0.25,
                weight: isHovered ? 2 : 1,
                dashArray: '6 6',
                className: isHovered && !reducedMotion ? 'active-line' : '',
              }}
            />
          );
        })}

        {/* Collaborator markers */}
        {COLLABORATORS.map((c) => {
          const isUganda = c.country === 'Uganda';
          const isHovered = hoveredId === c.id;
          return (
            <Marker
              key={c.id}
              position={[c.lat, c.lng]}
              icon={makeCollabPin(isUganda, isHovered, reducedMotion)}
              eventHandlers={{
                mouseover: () => setHoveredId(c.id),
                mouseout: () => setHoveredId(null),
                click: () => router.push(`/collaborations/${c.slug}`),
              }}
            >
              <Tooltip direction="top" offset={[0, -18]} opacity={1}>
                <div style={{ minWidth: '190px', padding: '2px 0' }}>
                  <p style={{ color: '#002866', fontWeight: 600, fontSize: '13px', lineHeight: '1.3', marginBottom: '5px' }}>
                    {c.name}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(56,189,248,0.18)',
                    color: '#002866',
                    fontSize: '11px',
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    marginBottom: '5px',
                  }}>
                    {c.type}
                  </span>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    {COUNTRY_FLAGS[c.country] ?? '🌍'} {c.country}
                  </p>
                  <p style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 500 }}>
                    View profile →
                  </p>
                </div>
              </Tooltip>
            </Marker>
          );
        })}

        {/* AMBSO HQ — rendered last so it sits on top of all lines and pins */}
        <Marker
          position={AMBSO_HQ}
          icon={hqPin}
          zIndexOffset={1000}
        >
          <Tooltip direction="top" offset={[0, -30]} opacity={1} permanent={false}>
            <div style={{ minWidth: '160px', padding: '2px 0' }}>
              <p style={{ color: '#002866', fontWeight: 700, fontSize: '13px', marginBottom: '3px' }}>
                AMBSO Headquarters
              </p>
              <p style={{ fontSize: '11px', color: '#6b7280' }}>🇺🇬 Nansana, Uganda</p>
            </div>
          </Tooltip>
        </Marker>
      </MapContainer>

      {/* Legend — outside MapContainer so it doesn't interfere with Leaflet internals */}
      <Legend />
    </div>
  );
}
