import Container from '@/components/ui/Container';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const locations = [
  {
    name: 'Headquarters - Masaka',
    address: 'Masaka, Uganda',
    phone: '(+256) 394 500 421',
    email: 'info@ambso.org',
    isPrimary: true,
  },
  {
    name: 'Nansana Office',
    address: 'Nansana, Wakiso District, Uganda',
    phone: '(+256) 394 500 421',
    email: 'info@ambso.org',
    isPrimary: false,
  },
  {
    name: 'Hoima Office',
    address: 'Hoima, Uganda',
    phone: '(+256) 394 500 421',
    email: 'info@ambso.org',
    isPrimary: false,
  },
];

export default function LocationPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Locations</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              AMBSO operates across multiple strategic locations in Uganda, enabling us to deliver
              impactful health research and services to communities throughout the region.
            </p>
          </div>
        </Container>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {locations.map((location) => (
              <div
                key={location.name}
                className={`${
                  location.isPrimary
                    ? 'bg-gradient-to-br from-primary to-primary-light text-white'
                    : 'bg-white border-2 border-gray-200'
                } p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative`}
              >
                {location.isPrimary && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-accent text-gray-900 text-xs font-bold rounded-full">
                      Headquarters
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 ${location.isPrimary ? 'bg-white/20' : 'bg-primary/10'} rounded-full flex items-center justify-center mb-6`}>
                  <MapPin className={location.isPrimary ? 'text-white' : 'text-primary'} size={32} />
                </div>

                <h3 className={`text-2xl font-bold mb-6 ${location.isPrimary ? 'text-white' : 'text-gray-900'}`}>
                  {location.name}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className={`${location.isPrimary ? 'text-white/80' : 'text-gray-500'} mr-3 mt-1 flex-shrink-0`} size={20} />
                    <p className={location.isPrimary ? 'text-white/90' : 'text-gray-700'}>
                      {location.address}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <Phone className={`${location.isPrimary ? 'text-white/80' : 'text-gray-500'} mr-3 flex-shrink-0`} size={20} />
                    <a
                      href={`tel:${location.phone}`}
                      className={`${location.isPrimary ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}
                    >
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Mail className={`${location.isPrimary ? 'text-white/80' : 'text-gray-500'} mr-3 flex-shrink-0`} size={20} />
                    <a
                      href={`mailto:${location.email}`}
                      className={`${location.isPrimary ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}
                    >
                      {location.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Working Hours */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="text-primary" size={32} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Working Hours</h2>

              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <h3 className="font-semibold text-primary text-lg mb-3">Weekdays</h3>
                  <p className="text-gray-700 text-lg">Monday - Friday</p>
                  <p className="text-gray-900 font-semibold text-xl mt-2">8:00 AM - 5:00 PM</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary text-lg mb-3">Weekends</h3>
                  <p className="text-gray-700 text-lg">Saturday - Sunday</p>
                  <p className="text-gray-900 font-semibold text-xl mt-2">Closed</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  For urgent inquiries outside working hours, please send an email to{' '}
                  <a href="mailto:info@ambso.org" className="text-primary hover:underline font-semibold">
                    info@ambso.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Find Us in Uganda
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our offices are strategically located across Uganda to serve communities in Masaka,
            Wakiso, and Hoima districts.
          </p>
          <div className="bg-gray-200 rounded-xl overflow-hidden" style={{ height: '450px' }}>
            {/* Placeholder for Google Maps - Replace with actual map implementation */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="text-center">
                <MapPin className="text-primary mx-auto mb-4" size={64} />
                <p className="text-gray-600 text-lg">Map integration placeholder</p>
                <p className="text-gray-500 text-sm mt-2">
                  Google Maps or other mapping service can be integrated here
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Us Today</h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              We welcome visitors, partners, and community members to our offices.
              Contact us to schedule a visit or meeting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@ambso.org"
                className="px-8 py-3 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Email Us
              </a>
              <a
                href="tel:+256394500421"
                className="px-8 py-3 bg-accent text-gray-900 rounded-full font-semibold hover:bg-accent/90 transition-colors"
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
