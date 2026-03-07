'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface NavLink   { name: string; href: string }
interface NavColumn { heading: string; items: NavLink[] }

interface SimpleNavItem { name: string; href: string; icon?: boolean }
interface MegaNavItem   {
  name: string; href: string; mega: true;
  description: string; columns: NavColumn[];
}

type NavItem = SimpleNavItem | MegaNavItem;

// ─── Navigation Structure ──────────────────────────────────────────────────────
const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Who We Are',
    href: '/who-we-are/about',
    mega: true,
    description: "Learn about AMBSO's mission, the people driving our work, and where we operate across Uganda and beyond.",
    columns: [
      {
        heading: 'Organisation',
        items: [
          { name: 'About Us',     href: '/who-we-are/about' },
          { name: 'Our Team',     href: '/who-we-are/team' },
          { name: 'Our Location', href: '/who-we-are/location' },
        ],
      },
    ],
  },
  {
    name: 'Research and Programs',
    href: '/programs',
    mega: true,
    description: 'Our work spans clinical research, community interventions, and capacity building — all aimed at improving health outcomes across Uganda and Africa.',
    columns: [
      {
        heading: 'Research',
        items: [
          { name: 'Clinical Trials',            href: '/research/clinical-trials' },
          { name: 'EPI & Behavioral Research',  href: '/research/behavioral' },
        ],
      },
      {
        heading: 'Programs',
        items: [
          { name: 'Clinical Programs',      href: '/programs/clinical-programs' },
          { name: 'Community Programs',     href: '/programs/community-programs' },
          { name: 'Capacity Building',      href: '/programs/capacity-building' },
          { name: 'Resource Mobilization',  href: '/programs/resource-mobilization' },
        ],
      },
    ],
  },
  { name: 'Collaborations', href: '/collaborations' },
  {
    name: 'News & Resources',
    href: '/newsroom',
    mega: true,
    description: 'Stay informed with the latest news, publications, opportunities and downloadable resources from AMBSO.',
    columns: [
      {
        heading: 'Stay Informed',
        items: [
          { name: 'Newsroom',  href: '/newsroom' },
          { name: 'Resources', href: '/resources' },
          { name: 'Opportunities', href: '/opportunities'}
        ],
      },
    ],
  },
  { name: 'Contact Us', href: '/contact' },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobile, setOpenMobile]             = useState<string | null>(null);
  const [activeDesktop, setActiveDesktop]       = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openPanel  = (name: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveDesktop(name);
  };
  const closePanel = () => {
    leaveTimer.current = setTimeout(() => setActiveDesktop(null), 130);
  };

  const isActive = (item: NavItem) => {
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Top Utility Strip ─────────────────────────────────────── */}
      {/* --primary: #1355AB */}
      <div className="hidden lg:block bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-9">
            <span className="text-white/55 text-xs font-light tracking-wide">
              African Medical and Behavioral Sciences Organization
            </span>
            <div className="flex items-center gap-6">
              <a
                href="tel:+256394500421"
                className="flex items-center gap-1.5 text-white/65 hover:text-accent-light text-xs transition-colors duration-200"
              >
                <Phone size={11} strokeWidth={2} />
                <span>(+256) 200 911 459</span>
              </a>
              <a
                href="mailto:info@ambso.org"
                className="flex items-center gap-1.5 text-white/65 hover:text-accent-light text-xs transition-colors duration-200"
              >
                <Mail size={11} strokeWidth={2} />
                <span>info@ambso.org</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Nav Bar ──────────────────────────────────────────── */}
      <div
        className={`relative transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-[0_2px_20px_rgba(19,85,171,0.12)]'
            : 'bg-white/97 backdrop-blur-md'
        }`}
      >
        {/* Scroll indicator line — primary → primary-light → accent */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-light to-accent opacity-40 pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
          <div className="flex items-center h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 w-44">
              <Image
                src="/ambso-site/images/logo.png"
                alt="AMBSO Logo"
                width={160}
                height={70}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* ── Desktop Nav + CTA ─────── */}
            <div className="hidden lg:flex items-center ml-auto">
              <nav className="flex items-center">
                {navigation.map((item) => {
                  const isMega      = 'mega' in item && item.mega;
                  const isPanelOpen = activeDesktop === item.name;
                  const active      = isActive(item);

                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={isMega ? () => openPanel(item.name) : undefined}
                      onMouseLeave={isMega ? closePanel : undefined}
                    >
                      {/* Top-level link */}
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-1 px-4 py-2 text-[11px] font-semibold tracking-wide uppercase whitespace-nowrap transition-colors duration-200 ${
                          active || isPanelOpen
                            ? 'text-primary'
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        {item.name}
                        {isMega && (
                          <ChevronDown
                            size={12}
                            strokeWidth={2.5}
                            className={`transition-transform duration-200 ${
                              isPanelOpen ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                        {/* Active / hover underline — primary (#1355AB) */}
                        <span
                          className={`absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full transition-transform duration-200 origin-left ${
                            active || isPanelOpen ? 'scale-x-100' : 'scale-x-0'
                          }`}
                        />
                      </Link>

                      {/* Mega Panel */}
                      {isMega && (
                        <div
                          className={`fixed left-0 right-0 transition-all duration-200 ease-out ${
                            isPanelOpen
                              ? 'opacity-100 visible translate-y-0'
                              : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                          }`}
                          style={{ top: 'calc(36px + 68px)' }}
                          onMouseEnter={() => openPanel(item.name)}
                          onMouseLeave={closePanel}
                        >
                          {/* Panel background — primary (#1355AB) */}
                          <div className="bg-primary shadow-[0_16px_48px_rgba(19,85,171,0.30)]">
                            {/* Top accent line — accent-light → white → accent-light */}
                            <div className="h-[3px] bg-gradient-to-r from-accent/60 via-white/20 to-accent/60" />
                            <div className="max-w-7xl mx-auto px-8 py-10 flex gap-0">

                              {/* Left: description blurb */}
                              <div className="w-72 shrink-0 pr-12 border-r border-white/10">
                                <p className="text-white/75 text-sm leading-relaxed">
                                  {item.description}
                                </p>
                                <Link
                                  href={item.href}
                                  className="mt-5 inline-flex items-center gap-1.5 text-accent-light text-sm font-semibold hover:gap-3 transition-all duration-150"
                                >
                                  View all →
                                </Link>
                              </div>

                              {/* Right: columns */}
                              <div className="flex gap-14 pl-12">
                                {item.columns.map((col) => (
                                  <div key={col.heading} className="min-w-[160px]">
                                    <h3 className="text-white/50 text-[10.5px] font-bold uppercase tracking-[0.14em] mb-4">
                                      {col.heading}
                                    </h3>
                                    <ul className="space-y-0.5">
                                      {col.items.map((sub) => (
                                        <li key={sub.name}>
                                          <Link
                                            href={sub.href}
                                            className={`block text-[13.5px] py-1.5 hover:translate-x-1 transition-all duration-150 ${
                                              pathname === sub.href
                                                ? 'text-accent-light font-semibold'
                                                : 'text-white/80 hover:text-white'
                                            }`}
                                          >
                                            {sub.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Separator + Donate CTA — accent (#1D6FD8) fill, white text */}
              <div className="flex items-center gap-2 pl-4 ml-2 border-l border-gray-200">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-5 py-2 bg-accent text-white rounded-full text-sm font-semibold hover:bg-accent-light hover:shadow-md hover:shadow-accent/30 transition-all duration-200 hover:scale-[1.03]"
                >
                  Donate
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden ml-auto p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav ────────────────────────────────────────── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100 ${
            isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 py-4 flex flex-col gap-0.5 overflow-y-auto max-h-[75vh]">
            {navigation.map((item) => {
              const mobileItems: { name: string; href: string }[] =
                'columns' in item
                  ? item.columns.flatMap((c) => c.items)
                  : [];

              const hasSub = mobileItems.length > 0;
              const isOpen = openMobile === item.name;
              const active = isActive(item);

              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors">
                    <Link
                      href={item.href}
                      className={`flex-1 px-3 py-2.5 text-[13px] font-semibold tracking-[0.07em] uppercase transition-colors ${
                        active ? 'text-primary' : 'text-gray-600 hover:text-primary'
                      }`}
                      onClick={() => !hasSub && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {hasSub && (
                      <button
                        onClick={() => setOpenMobile(isOpen ? null : item.name)}
                        className="px-3 py-2.5 text-gray-400 hover:text-primary"
                        aria-label={`Expand ${item.name}`}
                      >
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSub && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {/* Mobile sub-items — accent border (#1D6FD8) */}
                      <div className="pl-4 pb-1 border-l-2 border-accent/40 ml-3 mt-0.5 space-y-0.5">
                        {mobileItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`block px-3 py-2 text-[12px] font-medium tracking-wide uppercase transition-colors rounded-md ${
                              pathname === sub.href
                                ? 'text-primary bg-primary/5'
                                : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Donate CTA — accent (#1D6FD8) fill, white text */}
            <Link
              href="/contact"
              className="mt-3 mx-1 px-6 py-2.5 bg-accent text-white text-center text-[14px] font-semibold rounded-full hover:bg-accent-light transition-colors"
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