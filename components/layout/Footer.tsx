import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import type { FooterContent } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';

export default function Footer({ data }: { data: FooterContent }) {
  const logoAlt        = data.logoAlt          ?? 'AMBSO Logo';
  const logoSrc        = data.logo?.asset       ? urlFor(data.logo).width(240).url() : '/images/logo.png';
  const bgSrc          = data.backgroundImage?.asset ? urlFor(data.backgroundImage).url() : '/images/footer-bkg.jpg';
  const description    = data.description       ?? 'Transforming Africa through innovative research, training and service provision.';
  const social         = data.socialMedia       ?? {};
  const quickTitle     = data.quickLinksHeading  ?? 'Quick Links';
  const quickLinks     = data.quickLinks         ?? [];
  const programTitle   = data.programLinksHeading ?? 'Our Programs';
  const programLinks   = data.programLinks        ?? [];
  const contactTitle   = data.contactHeading      ?? 'Contact Us';
  const address        = data.contactAddress      ?? 'Kampala, Uganda';
  const phone          = data.contactPhone        ?? '(+256) 394 500 421';
  const phoneTel       = data.contactPhoneTel     ?? phone.replace(/[^+\d]/g, '');
  const email          = data.contactEmail        ?? 'info@ambso.org';
  const copyrightName  = data.copyrightName       ?? 'AMBSO';
  const copyrightSuffix = data.copyrightSuffix    ?? 'All rights reserved.';
  const bottomLinks    = data.bottomLinks         ?? [];

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background texture */}
      <Image
        src={bgSrc}
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
      />
      {/* Primary navy overlay */}
      <div className="absolute inset-0 bg-primary/93" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About */}
          <div>
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={120}
              height={60}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              {description}
            </p>
            <div className="flex space-x-4 mt-6">
              {social.facebook && (
                <a href={social.facebook} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{quickTitle}</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{programTitle}</h3>
            <ul className="space-y-2 text-sm">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{contactTitle}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <a href={`tel:${phoneTel}`} className="text-gray-300 hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-gray-300 hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-light">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>&copy; {new Date().getFullYear()} {copyrightName}. {copyrightSuffix}</p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              {bottomLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
