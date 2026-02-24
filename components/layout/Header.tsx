'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone, Mail, Home } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Who We Are',
    href: '/who-we-are/about',
    submenu: [
      { name: 'About Us', href: '/who-we-are/about' },
      { name: 'Our Team', href: '/who-we-are/team' },
      { name: 'Our Location', href: '/who-we-are/location' },
    ],
  },
  {
    name: 'Programs',
    href: '/programs',
    submenu: [
      { name: 'Clinical Programs', href: '/programs/clinical-programs' },
      { name: 'Community Programs', href: '/programs/community-programs' },
      { name: 'Capacity Building', href: '/programs/capacity-building' },
      { name: 'Resource Mobilization', href: '/programs/resource-mobilization' },
    ],
  },
  {
    name: 'Research',
    href: '/research',
    submenu: [
      { name: 'Clinical Trials', href: '/research/clinical-trials' },
      { name: 'EPI & Behavioral Research', href: '/research/behavioral' },
    ],
  },
  { name: 'Collaborations', href: '/collaborations' },
  { name: 'Resources', href: '/resources' },
  { name: 'Newsroom', href: '/newsroom' },
  {
    name: 'Opportunities',
    href: '/opportunities',
    submenu: [
      { name: 'Careers', href: '/opportunities/careers' },
      { name: 'Tenders', href: '/opportunities/tenders' },
    ],
  },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Top Utility Strip ─────────────────────────────────────────── */}
      <div className="hidden lg:block bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-9">
            <span className="text-white/60 text-xs font-light tracking-wide">
              African Medical and Behavioral Sciences Organization
            </span>
            <div className="flex items-center gap-6">
              <a
                href="tel:+256394500421"
                className="flex items-center gap-1.5 text-white/70 hover:text-accent text-xs transition-colors duration-200"
              >
                <Phone size={11} strokeWidth={2} />
                <span>(+256) 394 500 421</span>
              </a>
              <a
                href="mailto:info@ambso.org"
                className="flex items-center gap-1.5 text-white/70 hover:text-accent text-xs transition-colors duration-200"
              >
                <Mail size={11} strokeWidth={2} />
                <span>info@ambso.org</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ───────────────────────────────────────── */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-[0_2px_20px_rgba(0,40,102,0.10)]'
            : 'bg-white/97 backdrop-blur-md'
        }`}
      >
        {/* Thin accent line at the very bottom of the nav bar when scrolled */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-light to-accent opacity-40 pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/ambso-site/images/logo.png"
                alt="AMBSO Logo"
                width={120}
                height={60}
                className="h-11 w-auto"
                priority
              />
            </Link>

            {/* ── Desktop Navigation ──────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) => (
                <div key={item.name} className="relative group nav-link-group">
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1 px-3 py-2 text-[13.5px] font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                  >
                    {item.name === 'Home' ? (
                      <Home size={15} strokeWidth={2} />
                    ) : (
                      item.name
                    )}
                    {item.submenu && (
                      <ChevronDown
                        size={13}
                        strokeWidth={2.5}
                        className="text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-primary"
                      />
                    )}
                    {/* Animated accent underline */}
                    <span className="nav-underline" />
                  </Link>

                  {/* Dropdown */}
                  {item.submenu && (
                    <div className="absolute left-0 top-full pt-1.5 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-out">
                      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,40,102,0.12)] border border-gray-100/80 overflow-hidden">
                        {/* Gradient accent line at top of dropdown */}
                        <div className="h-[3px] bg-gradient-to-r from-primary to-accent" />
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="flex items-center px-4 py-2.5 text-[13px] text-gray-600 hover:text-primary hover:bg-blue-50/60 border-l-[2.5px] border-transparent hover:border-accent transition-all duration-150"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* ── CTA + Mobile Toggle ──────────────────────────────────── */}
            <div className="flex items-center gap-3">
              {/* Donate button — accent color for maximum visibility */}
              <Link
                href="/donate"
                className="hidden lg:inline-flex items-center px-5 py-2 bg-accent text-primary rounded-full text-sm font-semibold hover:bg-accent/85 hover:shadow-md hover:shadow-accent/30 transition-all duration-200 hover:scale-[1.03]"
              >
                Donate
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Navigation ───────────────────────────────────────── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100 ${
            isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 py-4 flex flex-col gap-0.5 overflow-y-auto max-h-[75vh]">
            {navigation.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors">
                  <Link
                    href={item.href}
                    className="flex-1 px-3 py-2.5 text-[14px] font-medium text-gray-700 hover:text-primary"
                    onClick={() => !item.submenu && setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                      }
                      className="px-3 py-2.5 text-gray-400 hover:text-primary transition-colors"
                      aria-label={`Expand ${item.name}`}
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          openSubmenu === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile submenu */}
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    item.submenu && openSubmenu === item.name
                      ? 'max-h-60 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 pb-1 border-l-2 border-accent/40 ml-3 mt-0.5 space-y-0.5">
                    {item.submenu?.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-3 py-2 text-[13px] text-gray-500 hover:text-primary transition-colors rounded-md hover:bg-blue-50/50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile Donate */}
            <Link
              href="/donate"
              className="mt-3 mx-1 px-6 py-2.5 bg-accent text-primary text-center text-[14px] font-semibold rounded-full hover:bg-accent/85 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Donate
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
