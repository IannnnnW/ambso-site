import Container from '@/components/ui/Container';
import ResourcesGrid from '@/components/resources/ResourcesGrid';
import { getAllResources } from '@/lib/sanity.queries';
import { BookOpen, FileText, Presentation, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Resources | AMBSO',
  description:
    "Access publications, research abstracts, and educational materials from AMBSO's research and programs.",
};

export default async function ResourcesPage() {
  const resources = await getAllResources();

  // Calculate stats
  const publicationsCount = resources.filter(
    (r: { resourceType: string }) => r.resourceType === 'publication'
  ).length;
  const abstractsCount = resources.filter(
    (r: { resourceType: string }) => r.resourceType === 'abstract'
  ).length;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Research Library</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Explore AMBSO&apos;s scholarly contributions including peer-reviewed publications,
              conference abstracts, and research presentations.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{publicationsCount}</p>
              <p className="text-sm text-gray-600">Publications</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-3">
                <Presentation className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{abstractsCount}</p>
              <p className="text-sm text-gray-600">Abstracts</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{resources.length}</p>
              <p className="text-sm text-gray-600">Total Resources</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(resources.flatMap((r: { authors?: string[] }) => r.authors || [])).size}
              </p>
              <p className="text-sm text-gray-600">Contributors</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Resources Grid with Tabs */}
      <ResourcesGrid resources={resources} />
    </div>
  );
}
