import Container from '@/components/ui/Container';
import { Target, Eye, Heart, Lightbulb, CheckCircle, Zap, LucideIcon } from 'lucide-react';
import { getAboutPageContent } from '@/lib/sanity.queries';
import { deepMergeWithFallback, fallbackAboutPageContent } from '@/lib/fallback-data';
import { PortableText } from '@portabletext/react';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  CheckCircle,
  Lightbulb,
  Zap,
};

const defaultStoryParagraphs = [
  'Founded in 2016 by experienced Ugandan epidemiologists and clinical trialists, AMBSO emerged from a collaborative partnership with Uro Care Hospital. Our initial focus centered on Voluntary Medical Male Circumcision (VMMC) in partnership with the Infectious Diseases Institute, marking the beginning of our commitment to evidence-based HIV prevention strategies.',
  'Since our inception, we have significantly expanded our scope to address a broader spectrum of health challenges across Africa. Our work now encompasses gender-based violence prevention, substance abuse interventions, emergency resuscitation training, prostate cancer research, and comprehensive clinical trials.',
  'In 2017, AMBSO established the Africa Population Health Surveillance (APHS) program, a landmark initiative designed to monitor and strengthen community health outcomes. This program represents our deep commitment to public health research and community-based service delivery.',
  'Today, AMBSO operates across three core domains: clinical programs, community-based initiatives, and capacity-building efforts. We maintain strategic partnerships with leading international institutions including Karolinska Institutet, USC, Boston College, UCLA, and various East African research centers, enabling us to deliver world-class research and services that transform lives across the continent.',
];

export default async function AboutPage() {
  const sanityContent = await getAboutPageContent();
  const content = deepMergeWithFallback(sanityContent, fallbackAboutPageContent);

  // Check if story content is from Sanity (PortableTextBlock[]) or use fallback
  const hasPortableTextContent = content.story?.content && Array.isArray(content.story.content) && content.story.content.length > 0;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.hero?.title}</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              {content.hero?.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Target className="text-primary mr-3" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">{content.mission?.title}</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.mission?.description}
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Eye className="text-accent-dark mr-3" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">{content.vision?.title}</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.vision?.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {content.coreValues?.sectionTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.coreValues?.values?.map((value, index) => {
              const Icon = iconMap[value.icon ?? ''] || Heart;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 ${value.colorClass?.split(' ')[0] || 'bg-blue-100'} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className={value.colorClass?.split(' ')[1] || 'text-primary'} size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{content.story?.title}</h2>
            <div className="prose prose-lg max-w-none">
              {hasPortableTextContent ? (
                <div className="text-gray-700">
                  <PortableText value={content.story!.content!} />
                </div>
              ) : (
                defaultStoryParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Research Focus */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {content.researchFocus?.sectionTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.researchFocus?.areas?.map((area, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-4">{area.title}</h3>
                <p className="text-gray-700 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
