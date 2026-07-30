import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { HandCoins, Calendar, ArrowRight } from 'lucide-react';
import { getAllGrants } from '@/lib/sanity.queries';

export const revalidate = 3600;

export const metadata = {
  title: 'Grants | AMBSO',
  description:
    'AMBSO grant opportunities supporting impact research and health innovation. View current calls and how to apply.',
};

interface GrantListItem {
  _id: string;
  name: string;
  slug: { current: string };
  shortDescription?: string;
  status: 'open' | 'closed' | 'upcoming';
  deadline?: string;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const statusStyles: Record<string, string> = {
  open: 'bg-green-100 text-green-700',
  upcoming: 'bg-amber-100 text-amber-700',
  closed: 'bg-gray-200 text-gray-600',
};

export default async function GrantsPage() {
  const grants: GrantListItem[] = await getAllGrants();

  return (
    <div className="pt-20 lg:pt-28">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Grants</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              AMBSO grant opportunities supporting impact research, capacity building, and health
              innovation across Africa.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="mb-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Current Grant Opportunities</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-10" />
          </div>

          {grants.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {grants.map((grant) => (
                <Link
                  key={grant._id}
                  href={`/opportunities/grants/${grant.slug.current}`}
                  className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                      {grant.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full capitalize flex-shrink-0 ${
                        statusStyles[grant.status] ?? statusStyles.closed
                      }`}
                    >
                      {grant.status}
                    </span>
                  </div>

                  {grant.shortDescription && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {grant.shortDescription}
                    </p>
                  )}

                  <div className="mt-auto flex items-center gap-1.5 text-sm text-gray-500">
                    <Calendar size={14} className="text-primary/60" />
                    {grant.deadline ? `Closes ${formatDate(grant.deadline)}` : 'Rolling applications'}
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <HandCoins className="text-primary" size={40} />
              </div>
              <p className="text-lg text-gray-600 mb-8">
                No open grant calls at this time. Please check back later or contact us for more information.
              </p>
              <Button href="/contact">
                Contact Us
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
