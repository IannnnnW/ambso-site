import Link from 'next/link';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Briefcase, Users, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { getCareers } from '@/lib/sanity.queries';

export const revalidate = 3600;

export const metadata = {
  title: 'Careers | AMBSO',
  description:
    'Join our team of dedicated professionals transforming Africa through innovative research, training, and service provision.',
};

interface CareerListItem {
  _id: string;
  title: string;
  slug: { current: string };
  department?: string;
  employmentType?: string;
  location?: { name?: string; city?: string };
  applicationDeadline: string;
  status: string;
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

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function CareersPage() {
  const careers: CareerListItem[] = await getCareers();

  return (
    <div className="pt-20 lg:pt-28">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Join our team of dedicated professionals transforming Africa through innovative research,
              training, and service provision.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Work at AMBSO?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At AMBSO, you&apos;ll be part of a dynamic team making real impact in communities across Africa.
              We offer opportunities for professional growth, meaningful work, and competitive benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Meaningful Work</h3>
              <p className="text-sm text-gray-600">Contribute to health research and programs that transform lives</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Collaborative Culture</h3>
              <p className="text-sm text-gray-600">Work with diverse, talented professionals from around the world</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-purple-600" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Professional Growth</h3>
              <p className="text-sm text-gray-600">Access training, mentorship, and career development opportunities</p>
            </Card>
          </div>

          {/* Current Openings */}
          <div className="mb-4 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Current Openings</h3>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-10" />
          </div>

          {careers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {careers.map((job) => (
                <Link
                  key={job._id}
                  href={`/opportunities/careers/${job.slug.current}`}
                  className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                      {job.title}
                    </h4>
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex-shrink-0">
                      Open
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.department && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {departmentLabels[job.department] ?? job.department}
                      </span>
                    )}
                    {job.employmentType && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
                        {employmentTypeLabels[job.employmentType] ?? job.employmentType}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-gray-500">
                    {(job.location?.name || job.location?.city) && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="text-primary/60" />
                        {job.location?.name ?? job.location?.city}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary/60" />
                      Apply by {formatDate(job.applicationDeadline)}
                    </span>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center bg-gray-50 p-12 rounded-xl max-w-3xl mx-auto">
              <p className="text-gray-600 mb-6">
                There are no open positions at the moment. We regularly post new opportunities —
                check back soon or contact us to learn about upcoming positions.
              </p>
              <Button href="/contact">
                Get in Touch
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
