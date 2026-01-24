import Container from '@/components/ui/Container';
import TeamGrid from '@/components/team/TeamGrid';
import { getAllTeamMembers, getTeamPageContent } from '@/lib/sanity.queries';
import { deepMergeWithFallback, fallbackTeamPageContent } from '@/lib/fallback-data';
import { Users } from 'lucide-react';

export const metadata = {
  title: 'Our Team | AMBSO',
  description:
    "Meet the dedicated professionals driving AMBSO's mission to transform Africa through innovative research, training, and service provision.",
};

export default async function TeamPage() {
  const [members, sanityContent] = await Promise.all([
    getAllTeamMembers(),
    getTeamPageContent(),
  ]);

  const content = deepMergeWithFallback(sanityContent, fallbackTeamPageContent);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>Meet Our Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{content.hero?.title}</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              {content.hero?.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Leadership Structure Info */}
      <section className="py-12 bg-white border-b">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.leadershipIntro}
            </p>
          </div>
        </Container>
      </section>

      {/* Team Grid with Filters */}
      <TeamGrid members={members} />
    </div>
  );
}
