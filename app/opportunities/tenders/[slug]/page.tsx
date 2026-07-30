import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import DocumentDownloadList from '@/components/ui/DocumentDownloadList';
import { getTender, getAllTenderSlugs } from '@/lib/sanity.queries';
import { ArrowLeft, Calendar, Mail, Phone, User, CheckCircle2 } from 'lucide-react';
import type { Tender } from '@/lib/sanity.types';

export const revalidate = 3600;

interface TenderPageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  goods: 'Goods',
  services: 'Services',
  works: 'Works',
  consultancy: 'Consultancy',
};

export async function generateStaticParams() {
  const slugs = await getAllTenderSlugs();
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: TenderPageProps) {
  const { slug } = await params;
  const tender: Tender | null = await getTender(slug);
  if (!tender) {
    return { title: 'Tender Not Found | AMBSO' };
  }
  return {
    title: `${tender.title} | Tenders | AMBSO`,
    description: tender.summary ?? `Details for AMBSO tender ${tender.referenceNumber ?? tender.title}.`,
  };
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function TenderDetailPage({ params }: TenderPageProps) {
  const { slug } = await params;
  const tender: Tender | null = await getTender(slug);

  if (!tender) {
    notFound();
  }

  const deadlinePassed = new Date(tender.closingDate) < new Date();
  const isOpen = tender.status === 'open' && !deadlinePassed;

  return (
    <div className="pt-20 lg:pt-28">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="py-16 md:py-20">
            <Link
              href="/opportunities/tenders"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Tenders
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                  isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isOpen ? 'Open' : 'Closed'}
              </span>
              {tender.referenceNumber && (
                <span className="px-3 py-1 bg-white/15 text-white text-xs font-medium rounded-full">
                  Ref: {tender.referenceNumber}
                </span>
              )}
              {tender.category && (
                <span className="px-3 py-1 bg-white/15 text-white text-xs font-medium rounded-full">
                  {categoryLabels[tender.category] ?? tender.category}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{tender.title}</h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} />
                Closing date: {formatDate(tender.closingDate)}
              </span>
              {tender.estimatedValue && (
                <span>Estimated value: {tender.estimatedValue}</span>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-14 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {tender.description && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <PortableTextRenderer value={tender.description} />
              </div>
            )}

            {tender.eligibilityCriteria && tender.eligibilityCriteria.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
                <ul className="space-y-3">
                  {tender.eligibilityCriteria.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tender.submissionInstructions && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Submission Instructions</h2>
                <PortableTextRenderer value={tender.submissionInstructions} />
              </div>
            )}

            <DocumentDownloadList title="Tender Documents" documents={tender.documents} />

            {tender.contactPerson && (tender.contactPerson.name || tender.contactPerson.email || tender.contactPerson.phone) && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <div className="bg-gray-50 rounded-xl p-6 space-y-2">
                  {tender.contactPerson.name && (
                    <p className="flex items-center gap-2 text-gray-700">
                      <User size={16} className="text-primary" /> {tender.contactPerson.name}
                    </p>
                  )}
                  {tender.contactPerson.email && (
                    <p className="flex items-center gap-2">
                      <Mail size={16} className="text-primary" />
                      <a href={`mailto:${tender.contactPerson.email}`} className="text-primary hover:underline">
                        {tender.contactPerson.email}
                      </a>
                    </p>
                  )}
                  {tender.contactPerson.phone && (
                    <p className="flex items-center gap-2 text-gray-700">
                      <Phone size={16} className="text-primary" /> {tender.contactPerson.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {!isOpen && (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 text-sm font-semibold rounded-full mb-4">
                  Tender Closed
                </span>
                <p className="text-gray-600">
                  The closing date for this tender has passed. See current opportunities on the{' '}
                  <Link href="/opportunities/tenders" className="text-primary hover:underline font-medium">tenders page</Link>.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
