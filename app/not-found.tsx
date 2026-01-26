'use client';

import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-[180px] md:text-[220px] font-bold text-primary/10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-primary/5 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 md:w-20 md:h-20 text-primary/30" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </button>
            <Button href="/" variant="outline" size="lg">
              <Home size={20} className="mr-2" />
              Return Home
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="text-primary mr-2" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                Helpful Links
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/programs"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold">P</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    Our Programs
                  </div>
                  <div className="text-sm text-gray-500">
                    Explore our health initiatives
                  </div>
                </div>
              </a>
              <a
                href="/who-we-are/about"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold">A</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    About Us
                  </div>
                  <div className="text-sm text-gray-500">
                    Learn about AMBSO
                  </div>
                </div>
              </a>
              <a
                href="/newsroom"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold">N</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    Newsroom
                  </div>
                  <div className="text-sm text-gray-500">
                    Latest news and updates
                  </div>
                </div>
              </a>
              <a
                href="/contact"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold">C</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    Contact Us
                  </div>
                  <div className="text-sm text-gray-500">
                    Get in touch with us
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <p className="mt-8 text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <a href="/contact" className="text-primary hover:underline">
              contact us
            </a>{' '}
            and let us know.
          </p>
        </div>
      </Container>
    </div>
  );
}
