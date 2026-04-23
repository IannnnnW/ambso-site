import Container from '@/components/ui/Container';
import { Clock } from 'lucide-react';
import LocationsMapSection from '@/components/locations/LocationsMapSection';
import { getLocations } from '@/lib/sanity.queries';
import { FALLBACK_LOCATIONS } from '@/components/locations/types';
import type { MapLocation } from '@/components/locations/types';

export const metadata = {
  title: 'Our Locations | AMBSO',
  description: 'Find AMBSO offices across Uganda — Masaka headquarters, Nansana, and Hoima field offices.',
};

export default async function LocationPage() {
  let mapLocations: MapLocation[] = FALLBACK_LOCATIONS;

  try {
    const sanityLocations = await getLocations();
    if (sanityLocations && sanityLocations.length > 0) {
      const mapped = sanityLocations
        .filter((l: { coordinates?: { lat?: number; lng?: number } }) => l.coordinates?.lat && l.coordinates?.lng)
        .map((l: {
          _id: string;
          name: string;
          locationType: string;
          address: string;
          city: string;
          district: string;
          coordinates: { lat: number; lng: number };
          contactPhone?: string;
          contactEmail?: string;
          isPrimary: boolean;
        }) => ({
          id: l._id,
          name: l.name,
          type: l.locationType === 'office' ? 'office' : 'headquarters' as 'headquarters' | 'office',
          address: l.address,
          city: l.city,
          district: l.district,
          lat: l.coordinates.lat,
          lng: l.coordinates.lng,
          phone: l.contactPhone,
          email: l.contactEmail,
          isPrimary: l.isPrimary,
        }));
      if (mapped.length > 0) mapLocations = mapped;
    }
  } catch {
    // fall through to FALLBACK_LOCATIONS
  }

  return (
    <div className="pt-24 lg:pt-28">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Locations</h1>
            <p className="text-xl leading-relaxed text-gray-100">
              AMBSO operates across multiple strategic locations in Uganda, enabling us to deliver
              impactful health research and services to communities throughout the region.
            </p>
          </div>
        </Container>
      </section>

      {/* Interactive Map Section — full-bleed */}
      <section className="relative z-0 bg-white">
        <div className="py-12">
          <Container>
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl" style={{ color: '#002866' }}>
              Find Us in Uganda
            </h2>
            <p className="mx-auto mb-0 max-w-2xl text-center text-gray-600">
              Our offices are strategically located across Uganda. Click any pin to explore
              a location&apos;s details.
            </p>
          </Container>
        </div>
        <LocationsMapSection locations={mapLocations} />
      </section>

      {/* Working Hours */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-8 shadow-md">
              <div className="mb-8 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="text-primary" size={32} />
                </div>
              </div>

              <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Working Hours</h2>

              <div className="grid gap-8 text-center md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-primary">Weekdays</h3>
                  <p className="text-lg text-gray-700">Monday - Friday</p>
                  <p className="mt-2 text-xl font-semibold text-gray-900">8:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-primary">Weekends</h3>
                  <p className="text-lg text-gray-700">Saturday - Sunday</p>
                  <p className="mt-2 text-xl font-semibold text-gray-900">Closed</p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-center text-gray-600">
                  For urgent inquiries outside working hours, please send an email to{' '}
                  <a href="mailto:info@ambso.org" className="font-semibold text-primary hover:underline">
                    info@ambso.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Visit Us Today</h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-100">
              We welcome visitors, partners, and community members to our offices.
              Contact us to schedule a visit or meeting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@ambso.org"
                className="rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-gray-100"
              >
                Email Us
              </a>
              <a
                href="tel:+256394500421"
                className="rounded-full bg-accent px-8 py-3 font-semibold text-gray-900 transition-colors hover:bg-accent/90"
              >
                Call Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
