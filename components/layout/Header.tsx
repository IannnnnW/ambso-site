'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navigation = [
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
      { name: 'Community', href: '/programs/community' },
      { name: 'Clinical', href: '/programs/clinical' },
      { name: 'Resource Mobilization', href: '/programs/resource-mobilization'}
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/ambso-site/images/logo.png"
              alt="AMBSO Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-md overflow-hidden">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/donate"
              className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="flex-1 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                      onClick={() => !item.submenu && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <button
                        onClick={() =>
                          setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                        }
                        className="px-3 py-2 text-gray-500"
                      >
                        {openSubmenu === item.name ? '−' : '+'}
                      </button>
                    )}
                  </div>
                  {item.submenu && openSubmenu === item.name && (
                    <div className="pl-6 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/donate"
                className="mx-3 mt-4 px-6 py-2.5 bg-primary text-white text-center rounded-full font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Donate
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
