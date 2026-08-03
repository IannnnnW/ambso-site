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

type Region =
  | 'Sweden'
  | 'USA – New York'
  | 'USA – Massachusetts'
  | 'USA – Tennessee'
  | 'USA – California'
  | 'Italy'
  | 'Uganda';

const REGION_COLORS: Record<Region, string> = {
  'Sweden':             '#7C3AED',
  'USA – New York':     '#8B5CF6',
  'USA – Massachusetts':'#B91C1C',
  'USA – Tennessee':    '#1D4ED8',
  'USA – California':   '#DC2626',
  'Italy':              '#92400E',
  'Uganda':             '#D97706',
};

const REGION_ORDER: Region[] = [
  'Sweden',
  'USA – New York',
  'USA – Massachusetts',
  'USA – Tennessee',
  'USA – California',
  'Italy',
  'Uganda',
];

interface Collaborator {
  id: string;
  name: string;
  shortName: string;
  place: string;
  region: Region;
  lat: number;
  lng: number;
  /** Where the label card is anchored on the map (tuned for world view, zoom 2) */
  labelLat: number;
  labelLng: number;
  slug: string;
}

const COLLABORATORS: Collaborator[] = [
  // Europe
  { id: 'karolinska', name: 'Karolinska Institutet', shortName: 'Karolinska Institutet', place: 'Stockholm, Sweden', region: 'Sweden', lat: 59.3498, lng: 18.0239, labelLat: 70, labelLng: 30, slug: 'karolinska-institutet' },
  { id: 'sacro', name: 'Sacro Cuore', shortName: 'Sacro Cuore', place: 'Rome, Italy', region: 'Italy', lat: 45.4654, lng: 11.5654, labelLat: 40, labelLng: -33, slug: 'sacro-coure' },

  // USA — labels stacked over the Pacific, ordered north → south to match pin latitudes
  { id: 'boston', name: 'Boston College', shortName: 'Boston College', place: 'Chestnut Hill, Massachusetts, USA', region: 'USA – Massachusetts', lat: 42.3355, lng: -71.1685, labelLat: 63, labelLng: -155, slug: 'boston-college' },
  { id: 'nyu', name: 'New York University', shortName: 'New York University', place: 'New York, USA', region: 'USA – New York', lat: 40.7295, lng: -73.9965, labelLat: 52, labelLng: -155, slug: 'new-york-university' },
  { id: 'etsu', name: 'East Tennessee State University', shortName: 'East Tennessee State University', place: 'Johnson City, Tennessee, USA', region: 'USA – Tennessee', lat: 36.3020, lng: -82.3577, labelLat: 40, labelLng: -155, slug: 'east-tennesse-state-university' },
  { id: 'ucla', name: 'University of California Los Angeles', shortName: 'University of California, Los Angeles (UCLA)', place: 'Los Angeles, California, USA', region: 'USA – California', lat: 34.0689, lng: -118.4452, labelLat: 27, labelLng: -155, slug: 'university-of-california-los-angeles' },
  { id: 'usc', name: 'University of Southern California', shortName: 'University of Southern California', place: 'Los Angeles, California, USA', region: 'USA – California', lat: 34.0224, lng: -118.2851, labelLat: 13, labelLng: -155, slug: 'university-of-southern-california' },
  { id: 'sdsu', name: 'San Diego State University', shortName: 'San Diego State University', place: 'San Diego, California, USA', region: 'USA – California', lat: 32.7757, lng: -117.0719, labelLat: -2, labelLng: -155, slug: 'san-diego-state-university' },

  // Uganda — labels stacked mid-map with lines converging on Kampala
  { id: 'makerere', name: 'Makerere University School of Public Health', shortName: 'Makerere University School of Public Health', place: 'Kampala, Uganda', region: 'Uganda', lat: 0.3347, lng: 32.5681, labelLat: 25, labelLng: -4, slug: 'makerere-university-school-of-public-health' },
  { id: 'moh', name: 'Ministry of Health', shortName: 'Ministry of Health Uganda', place: 'Kampala, Uganda', region: 'Uganda', lat: 0.3323, lng: 32.5825, labelLat: 9, labelLng: -4, slug: 'ministry-of-health' },
  { id: 'sicra', name: 'Strengthening Institutional Capacity for Research Administration', shortName: 'SICRA Uganda', place: 'Kampala, Uganda', region: 'Uganda', lat: 0.3600, lng: 32.5800, labelLat: -7, labelLng: -4, slug: 'strengthening-institutional-capacity-for-research-administration' },
  { id: 'idi', name: 'Infectious Diseases Institute', shortName: 'Infectious Diseases Institute (IDI)', place: 'Kampala, Uganda', region: 'Uganda', lat: 0.3390, lng: 32.5760, labelLat: -23, labelLng: -4, slug: 'infectious-diseases-institute' },
  { id: 'urocare', name: 'Uro Care Hospital', shortName: 'URO Care Hospital Uganda', place: 'Kampala, Uganda', region: 'Uganda', lat: 0.3476, lng: 32.5825, labelLat: -38, labelLng: -4, slug: 'uro-care-hospital' },
  { id: 'rakai', name: 'Rakai Health Sciences Program', shortName: 'Rakai Health Sciences Program', place: 'Kalisizo, Uganda', region: 'Uganda', lat: 0.3476, lng: 31.5085, labelLat: -50, labelLng: -4, slug: 'rakai-health-sciences-program' },
];

// ─── Pin / label generators ──────────────────────────────────────────────────

function makeHQPin(reducedMotion: boolean): L.DivIcon {
  const pulse = reducedMotion
    ? ''
    : `<div style="position:absolute;top:50%;left:50%;width:72px;height:72px;border-radius:50%;background:rgba(56,189,248,0.28);animation:pinPulse 2s ease-out infinite;pointer-events:none;transform:translate(-50%,-50%);"></div>`;
  return L.divIcon({
    html: `<div style="position:relative;display:flex;align-items:center;justify-content:center;">
      ${pulse}
      <svg viewBox="0 0 52 52" width="44" height="44" style="filter:drop-shadow(0 4px 10px rgba(0,40,102,0.5));position:relative;">
        <circle cx="26" cy="26" r="26" fill="#002866"/>
        <text x="26" y="33" text-anchor="middle" font-size="20" font-weight="bold" fill="white" font-family="Poppins,system-ui,sans-serif">A</text>
      </svg>
    </div>`,
    className: '',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

function makeDotPin(color: string, isHovered: boolean): L.DivIcon {
  const scale = isHovered ? 1.5 : 1;
  return L.divIcon({
    html: `<div style="transform:scale(${scale});transform-origin:center;transition:transform 0.2s ease;">
      <svg viewBox="0 0 16 16" width="16" height="16" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35));">
        <circle cx="8" cy="8" r="7" fill="${color}" stroke="white" stroke-width="2"/>
      </svg>
    </div>`,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function makeLabelCard(c: Collaborator, logoUrl: string | undefined, isHovered: boolean): L.DivIcon {
  const color = REGION_COLORS[c.region];
  const logoHtml = logoUrl
    ? `<img src="${logoUrl}" style="width:24px;height:24px;object-fit:contain;flex-shrink:0;border-radius:3px;background:white;" alt=""/>`
    : `<div style="width:24px;height:24px;border-radius:50%;background:${color}22;color:${color};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">${c.shortName.charAt(0)}</div>`;
  const shadow = isHovered ? '0 5px 16px rgba(0,0,0,0.35)' : '0 2px 8px rgba(0,0,0,0.2)';
  const scale = isHovered ? 1.06 : 1;
  return L.divIcon({
    html: `<div style="display:flex;align-items:center;gap:7px;width:186px;box-sizing:border-box;background:white;border-radius:8px;padding:5px 8px;box-shadow:${shadow};border:1px solid rgba(0,40,102,0.14);border-left:3px solid ${color};cursor:pointer;transform:scale(${scale});transition:transform .15s ease, box-shadow .15s ease;">
      ${logoHtml}
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:700;color:#0f172a;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${c.shortName}</div>
        <div style="font-size:8.5px;color:#64748b;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.place}</div>
      </div>
    </div>`,
    className: '',
    iconSize: [186, 42],
    iconAnchor: [93, 21],
  });
}

// ─── Region legend (below map, like the reference layout) ────────────────────

function RegionLegend() {
  return (
    <div className="border-t border-gray-200 bg-[#f8f9fb] px-4 py-5">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-4">
        {REGION_ORDER.map((region) => {
          const members = COLLABORATORS.filter((c) => c.region === region);
          if (members.length === 0) return null;
          const color = REGION_COLORS[region];
          return (
            <div key={region} className="min-w-[150px]">
              <div className="mb-1.5 flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" width="13" height="13" className="flex-shrink-0">
                  <path d="M12 0C7 0 3.5 3.6 3.5 8.2 3.5 14 12 24 12 24s8.5-10 8.5-15.8C20.5 3.6 17 0 12 0z" fill={color} />
                  <circle cx="12" cy="8.2" r="3" fill="white" />
                </svg>
                <span className="text-xs font-bold" style={{ color }}>{region}</span>
              </div>
              <ul className="space-y-0.5">
                {members.map((c) => (
                  <li key={c.id} className="text-[11px] leading-snug text-gray-600">
                    • {c.shortName}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CollaboratorsMap ─────────────────────────────────────────────────────────

export default function CollaboratorsMap({ logos = {} }: { logos?: Record<string, string> }) {
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
    <div>
      <div className="relative z-0" style={{ height: '65vh', minHeight: '480px' }}>
        <MapContainer
          center={[20, 10]}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          scrollWheelZoom={false}
          worldCopyJump={true}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Colorful physical-terrain basemap (greens/tans + blue ocean) */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: US National Park Service'
            maxZoom={8}
          />

          {/* Leader lines: label card → true location */}
          {COLLABORATORS.map((c) => {
            const isHovered = hoveredId === c.id;
            const color = REGION_COLORS[c.region];
            return (
              <Polyline
                key={`line-${c.id}`}
                positions={[[c.labelLat, c.labelLng], [c.lat, c.lng]]}
                pathOptions={{
                  color,
                  opacity: isHovered ? 0.95 : 0.55,
                  weight: isHovered ? 2.2 : 1.2,
                }}
              />
            );
          })}

          {/* Dot pins at true locations */}
          {COLLABORATORS.map((c) => (
            <Marker
              key={`pin-${c.id}`}
              position={[c.lat, c.lng]}
              icon={makeDotPin(REGION_COLORS[c.region], hoveredId === c.id)}
              eventHandlers={{
                mouseover: () => setHoveredId(c.id),
                mouseout: () => setHoveredId(null),
                click: () => router.push(`/collaborations/${c.slug}`),
              }}
            />
          ))}

          {/* Label cards with logos, geo-anchored around the map */}
          {COLLABORATORS.map((c) => (
            <Marker
              key={`label-${c.id}`}
              position={[c.labelLat, c.labelLng]}
              icon={makeLabelCard(c, logos[c.slug], hoveredId === c.id)}
              zIndexOffset={500}
              eventHandlers={{
                mouseover: () => setHoveredId(c.id),
                mouseout: () => setHoveredId(null),
                click: () => router.push(`/collaborations/${c.slug}`),
              }}
            />
          ))}

          {/* AMBSO HQ — rendered last so it sits on top of all lines and pins */}
          <Marker position={AMBSO_HQ} icon={hqPin} zIndexOffset={1000}>
            <Tooltip direction="top" offset={[0, -26]} opacity={1} permanent={false}>
              <div style={{ minWidth: '160px', padding: '2px 0' }}>
                <p style={{ color: '#002866', fontWeight: 700, fontSize: '13px', marginBottom: '3px' }}>
                  AMBSO Headquarters
                </p>
                <p style={{ fontSize: '11px', color: '#6b7280' }}>🇺🇬 Nansana, Uganda</p>
              </div>
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>

      {/* Legend bar under the map, grouped by region */}
      <RegionLegend />
    </div>
  );
}
