import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import DocumentDownloadList from '@/components/ui/DocumentDownloadList';
import { getCareer, getAllCareerSlugs } from '@/lib/sanity.queries';
import { ArrowLeft, MapPin, Calendar, Briefcase, Mail, ExternalLink, CheckCircle2 } from 'lucide-react';
import type { Career } from '@/lib/sanity.types';

export const revalidate = 3600;

interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

const departmentLabels: Record<string, string> = {
  research: 'Research',
  clinical: 'Clinical',
  community: 'Community Programs',
  administration: 'Administration',
  finance: 'Finance',
  it: 'IT',
  other: 'Other',
};

const employmentTypeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
  volunteer: 'Volunteer',
};

export async function generateStaticParams() {
  const slugs = await getAllCareerSlugs();
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CareerPageProps) {
  const { slug } = await params;
  const career: Career | null = await getCareer(slug);
  if (!career) {
    return { title: 'Position Not Found | AMBSO' };
  }
  return {
    title: `${career.title} | Careers | AMBSO`,
    description: `Apply for the ${career.title} position at AMBSO.`,
  };
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function StringList({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
            <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-1" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const career: Career | null = await getCareer(slug);

  if (!career) {
    notFound();
  }

  const deadlinePassed = new Date(career.applicationDeadline) < new Date();
  const isOpen = career.status === 'open' && !deadlinePassed;

  return (
    <div className="pt-20 lg:pt-28">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="py-16 md:py-20">
            <Link
              href="/opportunities/careers"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Careers
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                  isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isOpen ? 'Open' : 'Closed'}
              </span>
              {career.department && (
                <span className="px-3 py-1 bg-white/15 text-white text-xs font-medium rounded-full">
                  {departmentLabels[career.department] ?? career.department}
                </span>
              )}
              {career.employmentType && (
                <span className="px-3 py-1 bg-white/15 text-white text-xs font-medium rounded-full">
                  {employmentTypeLabels[career.employmentType] ?? career.employmentType}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{career.title}</h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm">
              {(career.location?.name || career.location?.city) && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} />
                  {[career.location?.name, career.location?.city].filter(Boolean).join(', ')}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} />
                Application deadline: {formatDate(career.applicationDeadline)}
              </span>
              {career.salaryRange && (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={15} />
                  {career.salaryRange}
                </span>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-14 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {career.description && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Role</h2>
                <PortableTextRenderer value={career.description} />
              </div>
            )}

            <StringList title="Key Responsibilities" items={career.responsibilities} />
            <StringList title="Requirements" items={career.requirements} />
            <StringList title="Qualifications" items={career.qualifications} />
            <StringList title="Desired Skills" items={career.desiredSkills} />

            <DocumentDownloadList documents={career.supportingDocuments} />

            {/* Apply */}
            <div className="border-t border-gray-100 pt-10">
              {isOpen ? (
                <div className="bg-primary/5 rounded-xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">How to Apply</h2>
                  <p className="text-gray-600 mb-6">
                    Submit your application by {formatDate(career.applicationDeadline)}.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {career.applicationLink && (
                      <a
                        href={career.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-md"
                      >
                        Apply Now <ExternalLink size={16} />
                      </a>
                    )}
                    {career.applicationEmail && (
                      <a
                        href={`mailto:${career.applicationEmail}?subject=${encodeURIComponent(`Application: ${career.title}`)}`}
                        className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors"
                      >
                        <Mail size={16} /> {career.applicationEmail}
                      </a>
                    )}
                    {!career.applicationLink && !career.applicationEmail && (
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-md"
                      >
                        Contact Us to Apply
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 text-sm font-semibold rounded-full mb-4">
                    Applications Closed
                  </span>
                  <p className="text-gray-600">
                    The application deadline for this position has passed. Explore our other
                    openings on the <Link href="/opportunities/careers" className="text-primary hover:underline font-medium">careers page</Link>.
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
