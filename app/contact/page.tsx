'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { fallbackContactPageContent, deepMergeWithFallback } from '@/lib/fallback-data';
import { contactPageContentQuery, locationsQuery } from '@/lib/sanity.queries';
import { client } from '@/lib/sanity.client';
import type { ContactPageContent, Location } from '@/lib/sanity.types';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type OfficeCard = Pick<
  Location,
  '_id' | 'name' | 'isPrimary' | 'order' | 'address' | 'city' | 'district' | 'country' | 'postalCode' | 'contactPhone' | 'contactEmail' | 'officeHours'
>;

// Shown until Sanity responds, or if it returns no locations / fails.
const FALLBACK_OFFICES: OfficeCard[] = [
  {
    _id: 'fallback-head-office',
    name: 'Head Office',
    isPrimary: true,
    order: 0,
    address: "Plot 7441 Nakuule Zone (Behind Seven Sisters' Building), Nansana Hoima Road",
    postalCode: 'P.O Box 37565',
    city: 'Wakiso',
    district: '',
    country: 'Uganda',
  },
  {
    _id: 'fallback-hoima',
    name: 'Hoima Field Office',
    isPrimary: false,
    order: 0,
    address: 'Ishaka Kijjungu, Along Hospital Way, Behind Hoima Regional Referral Hospital Mental Unit',
    postalCode: 'P.O Box 306',
    city: 'Hoima',
    district: '',
    country: 'Uganda',
  },
  {
    _id: 'fallback-masaka',
    name: 'Masaka Field Office',
    isPrimary: false,
    order: 0,
    address: 'Kalisizo Town, Old Bukoba Road, Near Kalisizo Sub-County Headquarters',
    postalCode: 'P.O Box 220155',
    city: 'Masaka',
    district: '',
    country: 'Uganda',
  },
];

// Primary office first, then by display order, then alphabetically.
function sortOffices(offices: OfficeCard[]) {
  return [...offices].sort(
    (a, b) =>
      Number(b.isPrimary ?? false) - Number(a.isPrimary ?? false) ||
      (a.order ?? 999) - (b.order ?? 999) ||
      a.name.localeCompare(b.name),
  );
}

// Editors may enter several numbers in one field, e.g. "(+256) 200 911 459, (+256) 782241305".
function splitPhones(phone?: string) {
  return (phone ?? '').split(/[,;\/]/).map((p) => p.trim()).filter(Boolean);
}

function formatLocality(office: OfficeCard) {
  // Trim: CMS values sometimes carry trailing spaces (e.g. "Hoima ").
  const district = office.district?.trim();
  return [office.postalCode, office.city, district && `${district} District`, office.country]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(', ');
}

export default function ContactPage() {
  const [content, setContent] = useState<ContactPageContent>(fallbackContactPageContent);
  const [offices, setOffices] = useState<OfficeCard[]>(FALLBACK_OFFICES);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    client.fetch<ContactPageContent>(contactPageContentQuery).then((data) => {
      if (data) setContent(deepMergeWithFallback(data, fallbackContactPageContent));
    }).catch(() => {/* keep fallback */});

    client.fetch<Location[]>(locationsQuery).then((data) => {
      if (data && data.length > 0) setOffices(sortOffices(data));
    }).catch(() => {/* keep fallback */});
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setResultMessage('Your message has been sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setResultMessage(data.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setResultMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="pt-20 lg:pt-28">
      <section className="relative text-white py-20 min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.hero?.title}
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed whitespace-pre-wrap">
              {content.hero?.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {content.formSection?.title}
              </h2>

              <form onSubmit={onSubmit} className="space-y-6">
                <input type="checkbox" name="botcheck" className="hidden" />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {status === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {resultMessage}
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {resultMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  <Send size={20} className="mr-2" />
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {content.contactInfo?.title}
              </h2>
              <div className="space-y-4">

                {/* Offices (from Sanity "Location/Office" documents) */}
                {offices.map((office) => {
                  const locality = formatLocality(office);
                  return (
                    <div key={office._id} className="bg-primary/5 p-5 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MapPin className="text-primary" size={18} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{office.name}</h3>
                          {office.address && (
                            <p className="text-gray-700 text-sm">{office.address}</p>
                          )}
                          {locality && <p className="text-gray-600 text-sm">{locality}</p>}
                          {splitPhones(office.contactPhone).map((phone) => (
                            <p key={phone} className="text-gray-600 text-sm">
                              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="hover:underline">
                                {phone}
                              </a>
                            </p>
                          ))}
                          {office.contactEmail && (
                            <p className="text-sm">
                              <a href={`mailto:${office.contactEmail}`} className="text-primary hover:underline">
                                {office.contactEmail}
                              </a>
                            </p>
                          )}
                          {office.officeHours && (
                            <p className="text-gray-600 text-sm whitespace-pre-wrap">{office.officeHours}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Phone */}
                <div className="bg-primary/5 p-5 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-700 text-sm">(+256) 394500 421</p>
                      <p className="text-gray-700 text-sm">(+256) 782241305</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-primary/5 p-5 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:info@ambso.org" className="text-primary hover:underline text-sm">
                        info@ambso.org
                      </a>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-primary/5 p-5 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary" size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                      <p className="text-gray-700 text-sm">{content.contactInfo?.weekdayHours}</p>
                      <p className="text-gray-700 text-sm">{content.contactInfo?.weekendHours}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
