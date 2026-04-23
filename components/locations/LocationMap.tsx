'use client';

// Safe to import directly — this component is loaded with ssr: false
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import type { MapLocation } from './types';
import { UGANDA_CENTER, UGANDA_ZOOM } from './types';

// Fix webpack-broken default icon URLs (not needed for divIcon, but avoids console errors)
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Pin HTML generator ───────────────────────────────────────────────────────

function makePinHTML(type: 'headquarters' | 'office', isActive: boolean): string {
  const isHQ = type === 'headquarters';
  const fill = isActive ? '#38bdf8' : isHQ ? '#002866' : '#003d99';
  const inner = isActive ? '#002866' : '#ffffff';
  const size = isHQ ? 40 : 30;
  const svgHeight = isHQ ? 53 : 40;
  const scale = isActive ? 1.25 : 1;

  const pulseRing = isHQ && !isActive
    ? `<div style="position:absolute;top:50%;left:50%;width:52px;height:52px;border-radius:50%;background:rgba(56,189,248,0.28);animation:pinPulse 2s ease-out infinite;pointer-events:none;transform:translate(-50%,-50%);"></div>`
    : '';

  const innerShape = isHQ
    ? `<polygon points="12,6 13.3,9.5 17.5,9.5 14.2,11.8 15.5,16 12,13.7 8.5,16 9.8,11.8 6.5,9.5 10.7,9.5" fill="${inner}"/>`
    : `<circle cx="12" cy="11" r="3.5" fill="${inner}"/>`;

  return `<div style="position:relative;display:flex;align-items:center;justify-content:center;">
    ${pulseRing}
    <svg viewBox="0 0 24 32" width="${size}" height="${svgHeight}" style="transform:scale(${scale});transform-origin:bottom center;transition:transform 0.25s ease;filter:drop-shadow(0 3px 6px rgba(0,40,102,0.35));">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20 12 20S24 20.5 24 12C24 5.373 18.627 0 12 0z" fill="${fill}"/>
      ${innerShape}
    </svg>
  </div>`;
}

function makeIcon(loc: MapLocation, selectedId: string | null) {
  const isActive = loc.id === selectedId;
  const isHQ = loc.type === 'headquarters';
  return L.divIcon({
    html: makePinHTML(loc.type, isActive),
    className: '',
    iconSize: [isHQ ? 40 : 30, isHQ ? 53 : 40],
    iconAnchor: [isHQ ? 20 : 15, isHQ ? 53 : 40],
    popupAnchor: [0, -(isHQ ? 53 : 40)],
  });
}

// ─── Map controller (flyTo on selection / reset) ──────────────────────────────

interface MapControllerProps {
  selectedId: string | null;
  locations: MapLocation[];
  resetTrigger: number;
}

function MapController({ selectedId, locations, resetTrigger }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const loc = locations.find((l) => l.id === selectedId);
    if (loc) map.flyTo([loc.lat, loc.lng], 10, { animate: true, duration: 1.2 });
  }, [selectedId, locations, map]);

  useEffect(() => {
    if (resetTrigger > 0) map.flyTo(UGANDA_CENTER, UGANDA_ZOOM, { animate: true, duration: 1.2 });
  }, [resetTrigger, map]);

  return null;
}

// ─── Click-outside-marker deselect ───────────────────────────────────────────

function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({ click: onMapClick });
  return null;
}

// ─── LocationMap ──────────────────────────────────────────────────────────────

interface Props {
  locations: MapLocation[];
  selectedId: string | null;
  resetTrigger: number;
  onSelect: (id: string) => void;
  onDeselect: () => void;
}

export default function LocationMap({
  locations,
  selectedId,
  resetTrigger,
  onSelect,
  onDeselect,
}: Props) {
  return (
    <MapContainer
      center={UGANDA_CENTER}
      zoom={UGANDA_ZOOM}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      <MapController selectedId={selectedId} locations={locations} resetTrigger={resetTrigger} />
      <MapClickHandler onMapClick={onDeselect} />

      {locations.map((loc) => (
        <Marker
          key={`${loc.id}-${selectedId}`}
          position={[loc.lat, loc.lng]}
          icon={makeIcon(loc, selectedId)}
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              onSelect(loc.id);
            },
          }}
        />
      ))}
    </MapContainer>
  );
}
