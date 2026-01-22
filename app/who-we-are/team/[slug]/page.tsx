import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { getTeamMemberWithColleagues, getAllTeamMembers } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { PortableText } from '@portabletext/react';
import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  ExternalLink,
  ArrowLeft,
  GraduationCap,
  Award,
  Users,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface TeamMember {
  _id: string;
  name: string;
  slug: { current: string };
  role: string;
  department?: string;
  bio?: any[];
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  email?: string;
  phone?: string;
  qualifications?: string[];
  expertise?: string[];
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    researchGate?: string;
    orcid?: string;
  };
  colleagues?: Array<{
    _id: string;
    name: string;
    slug: { current: string };
    role: string;
    department?: string;
    image?: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
  }>;
}

const departmentLabels: Record<string, string> = {
  boardMember: 'Board of Directors',
  seniorManagementTeam: 'Senior Management Team',
  headofDepartment: 'Head of Department',
  teamMember: 'Team Member',
};

export async function generateStaticParams() {
  const members = await getAllTeamMembers();
  return members.map((member: { slug: { current: string } }) => ({
    slug: member.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const member: TeamMember | null = await getTeamMemberWithColleagues(slug);

  if (!member) {
    return {
      title: 'Team Member Not Found | AMBSO',
    };
  }

  return {
    title: `${member.name} - ${member.role} | AMBSO`,
    description: `Learn more about ${member.name}, ${member.role} at AMBSO.`,
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member: TeamMember | null = await getTeamMemberWithColleagues(slug);

  if (!member) {
    notFound();
  }

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const hasSocialMedia =
    member.socialMedia?.linkedin ||
    member.socialMedia?.twitter ||
    member.socialMedia?.researchGate ||
    member.socialMedia?.orcid;

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <Container>
          <div className="py-4">
            <Link
              href="/who-we-are/team"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Team</span>
            </Link>
          </div>
        </Container>
      </div>

      {/* Profile Header */}
      <section className="bg-white pb-12">
        <Container>
          <div className="pt-12 md:pt-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-64 h-80 md:w-80 md:h-96 relative rounded-2xl overflow-hidden shadow-xl mx-auto lg:mx-0">
                  {member.image?.asset ? (
                    <Image
                      src={urlFor(member.image).width(640).height(800).url()}
                      alt={member.image.alt || member.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 256px, 320px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                      <span className="text-7xl font-bold text-primary/60">{initials}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                {/* Department Badge */}
                {member.department && (
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                    {departmentLabels[member.department] || member.department}
                  </span>
                )}

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {member.name}
                </h1>
                <p className="text-xl md:text-2xl text-primary font-semibold mb-6">{member.role}</p>

                {/* Social Media Links */}
                {hasSocialMedia && (
                  <div className="flex justify-center lg:justify-start gap-3 mb-8">
                    {member.socialMedia?.linkedin && (
                      <a
                        href={member.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full transition-all"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialMedia?.twitter && (
                      <a
                        href={member.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 hover:bg-sky-500 hover:text-white rounded-full transition-all"
                        aria-label="Twitter Profile"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialMedia?.researchGate && (
                      <a
                        href={member.socialMedia.researchGate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-full transition-all"
                        aria-label="ResearchGate Profile"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialMedia?.orcid && (
                      <a
                        href={member.socialMedia.orcid}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full transition-all"
                        aria-label="ORCID Profile"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Biography and Details */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar - Qualifications & Expertise */}
            <div className="lg:order-2 space-y-6">
              {/* Qualifications */}
              {member.qualifications && member.qualifications.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Qualifications</h3>
                  </div>
                  <ul className="space-y-2">
                    {member.qualifications.map((qual, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Areas of Expertise */}
              {member.expertise && member.expertise.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Award className="w-5 h-5 text-accent-dark" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Areas of Expertise</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((exp, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content - Biography */}
            <div className="lg:col-span-2 lg:order-1">
              {member.bio && member.bio.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Biography</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <PortableText value={member.bio} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Team With Me Section */}
      {member.colleagues && member.colleagues.length > 0 && (
        <section className="py-12 md:py-16 bg-white border-t">
          <Container>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                <span>Team With Me</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Meet My Colleagues
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">  
              {member.colleagues.map((colleague) => (
                <TeamMemberCard key={colleague._id} member={colleague} variant="compact" />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
