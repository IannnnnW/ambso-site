import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import DocumentDownloadList from '@/components/ui/DocumentDownloadList';
import { getGrantBySlug, getAllGrantSlugs } from '@/lib/sanity.queries';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import type { Grant } from '@/lib/sanity.types';
import type { PortableTextBlock } from 'sanity';

export const revalidate = 3600;

interface GrantPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllGrantSlugs();
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: GrantPageProps) {
  const { slug } = await params;
  const grant: Grant | null = await getGrantBySlug(slug);
  if (!grant) {
    return { title: 'Grant Not Found | AMBSO' };
  }
  return {
    title: grant.seo?.metaTitle ?? `${grant.name} | Grants | AMBSO`,
    description: grant.seo?.metaDescription ?? `Details and application information for the ${grant.name} grant at AMBSO.`,
  };
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const statusStyles: Record<string, string> = {
  open: 'bg-green-100 text-green-700',
  upcoming: 'bg-amber-100 text-amber-700',
  closed: 'bg-gray-200 text-gray-600',
};

function GrantSection({ title, value }: { title: string; value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <PortableTextRenderer value={value} />
    </div>
  );
}

export default async function GrantDetailPage({ params }: GrantPageProps) {
  const { slug } = await params;
  const grant: Grant | null = await getGrantBySlug(slug);

  if (!grant) {
    notFound();
  }

  const deadlinePassed = grant.deadline ? new Date(grant.deadline) < new Date() : false;
  const isOpen = grant.status === 'open' && !deadlinePassed;
  const canApply = isOpen && !!grant.applicationFormUrl;

  const hasEligibility =
    (grant.eligibility?.applicants && grant.eligibility.applicants.length > 0) ||
    (grant.eligibility?.ineligibleCosts && grant.eligibility.ineligibleCosts.length > 0);

  return (
    <div className="pt-20 lg:pt-28">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="py-16 md:py-20">
            <Link
              href="/opportunities/grants"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Grants
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                  statusStyles[deadlinePassed ? 'closed' : grant.status] ?? statusStyles.closed
                }`}
              >
                {deadlinePassed ? 'Closed' : grant.status}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{grant.name}</h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} />
                {grant.deadline
                  ? `Application deadline: ${formatDate(grant.deadline)}`
                  : 'Applications reviewed on a rolling basis'}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-14 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <GrantSection title="Description" value={grant.description} />
            <GrantSection title="Funding Scope" value={grant.fundingScope} />
            <GrantSection title="Funding Amount" value={grant.fundingAmount} />
            <GrantSection title="Duration of Grant" value={grant.durationOfGrant} />
            <GrantSection title="Application and Award Details" value={grant.applicationAndAwardDetails} />

            {hasEligibility && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
                {grant.eligibility?.applicants && grant.eligibility.applicants.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Applicants</h3>
                    <PortableTextRenderer value={grant.eligibility.applicants} />
                  </div>
                )}
                {grant.eligibility?.ineligibleCosts && grant.eligibility.ineligibleCosts.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Ineligible Costs and Activities
                    </h3>
                    <PortableTextRenderer value={grant.eligibility.ineligibleCosts} />
                  </div>
                )}
              </div>
            )}

            <GrantSection
              title="Instructions for Submission of the Application"
              value={grant.submissionInstructions}
            />

            <DocumentDownloadList documents={grant.supportingDocuments} />

            {/* Apply */}
            <div className="border-t border-gray-100 pt-10">
              {canApply ? (
                <div className="bg-primary/5 rounded-xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Apply?</h2>
                  <p className="text-gray-600 mb-6">
                    {grant.deadline
                      ? `Submit your application by ${formatDate(grant.deadline)}.`
                      : 'Applications are reviewed on a rolling basis.'}
                  </p>
                  <a
                    href={grant.applicationFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-md"
                  >
                    Apply Now <ExternalLink size={16} />
                  </a>
                </div>
              ) : isOpen || grant.status === 'upcoming' ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 text-sm font-semibold rounded-full mb-4">
                    Applications Not Yet Open
                  </span>
                  <p className="text-gray-600">
                    Applications are not yet open. The application link will be published when the call goes out.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 text-sm font-semibold rounded-full mb-4">
                    Applications Closed
                  </span>
                  <p className="text-gray-600">
                    This grant call has closed. See current opportunities on the{' '}
                    <Link href="/opportunities/grants" className="text-primary hover:underline font-medium">grants page</Link>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
