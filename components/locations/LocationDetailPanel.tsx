'use client';

import { MapPin, Phone, Mail, Building2, Star, X } from 'lucide-react';
import type { MapLocation } from './types';

interface Props {
  location: MapLocation | null;
  onClose: () => void;
}

export default function LocationDetailPanel({ location, onClose }: Props) {
  if (!location) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-8 text-center">
        <MapPin size={48} style={{ color: 'rgba(0,40,102,0.18)' }} />
        <p className="text-sm leading-relaxed text-gray-400">
          Select a pin on the map to see location details
        </p>
      </div>
    );
  }

  const isHQ = location.type === 'headquarters';

  return (
    <div key={location.id} className="slide-in-up flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      {/* Header */}
      <div
        className="relative flex flex-col gap-2 p-6"
        style={{ background: 'linear-gradient(135deg, #002866 0%, #003d99 100%)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close panel"
        >
          <X size={14} />
        </button>

        {/* Type badge */}
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
            style={{
              backgroundColor: isHQ ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.12)',
              color: isHQ ? '#38bdf8' : 'rgba(255,255,255,0.75)',
            }}
          >
            {isHQ && <Star size={10} fill="currentColor" />}
            {isHQ ? 'Headquarters' : 'Field Office'}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-white">{location.name}</h3>

        {/* City / District */}
        <p className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <MapPin size={13} />
          {location.city}, {location.district} District
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: '#f0f4ff' }}
          >
            <Building2 size={16} style={{ color: '#002866' }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Address</p>
            <p className="mt-0.5 text-sm text-gray-700">{location.address}</p>
            <p className="text-sm text-gray-700">{location.city}, Uganda</p>
          </div>
        </div>

        {/* Phone */}
        {location.phone && (
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: '#f0f4ff' }}
            >
              <Phone size={16} style={{ color: '#002866' }} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Phone</p>
              <a
                href={`tel:${location.phone.replace(/\s/g, '')}`}
                className="mt-0.5 text-sm text-gray-700 transition-colors hover:text-blue-600"
              >
                {location.phone}
              </a>
            </div>
          </div>
        )}

        {/* Email */}
        {location.email && (
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: '#f0f4ff' }}
            >
              <Mail size={16} style={{ color: '#002866' }} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Email</p>
              <a
                href={`mailto:${location.email}`}
                className="mt-0.5 text-sm text-gray-700 transition-colors hover:text-blue-600"
              >
                {location.email}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-100 p-4">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#002866' }}
        >
          <MapPin size={14} />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
