import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import VideoEmbed from '@/components/ui/VideoEmbed';
import CoreValueCard from '@/components/ui/CoreValueCard';
import { ArrowRight, Briefcase, Microscope, Handshake, Calendar, LucideIcon } from 'lucide-react';
import { getAboutPageContent, getPartnersWithCollaborators, getFeaturedPartners } from '@/lib/sanity.queries';
import { deepMergeWithFallback, fallbackAboutPageContent, fallbackStoryContent } from '@/lib/fallback-data';
import { urlFor } from '@/lib/sanity.client';
import { PortableText } from '@portabletext/react';
import type { PartnerWithCollaborators, Partner } from '@/lib/sanity.types';

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Microscope,
  Handshake,
  Calendar,
};

export const metadata = {
  title: 'About Us | AMBSO',
  description: 'Learn about Africa Medical and Behavioural Sciences Organization (AMBSO) - our mission, vision, values, and history.',
};

export default async function AboutPage() {
  const [sanityContent, partnersWithCollaborators, partners] = await Promise.all([
    getAboutPageContent(),
    getPartnersWithCollaborators(),
    getFeaturedPartners(),
  ]);

  const content = deepMergeWithFallback(sanityContent, fallbackAboutPageContent);

  // Check if story content is from Sanity (PortableTextBlock[]) or use fallback
  const hasPortableTextContent = content.story?.content && Array.isArray(content.story.content) && content.story.content.length > 0;

  // Extract all lead collaborators from partners
  const allCollaborators = (partnersWithCollaborators as PartnerWithCollaborators[])?.flatMap(
    (partner) => partner.leadCollaborators || []
  ) || [];

  return (
    <div className="pt-20 lg:pt-28">
      {/* Hero Section — staff.jpg background */}
      <section className="relative text-white py-24 min-h-[480px] flex items-center overflow-hidden">
        {/* Background: staff photo */}
        <Image
          src="/images/staff.jpg"
          alt="AMBSO Staff"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay: dark primary blue from left so text is legible,
            fades to a lighter tint on the right to let the photo breathe */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-primary/35 to-primary/15" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {content.hero?.title}
              </h1>
              <p className="text-xl text-gray-100 leading-relaxed">
                {content.hero?.description}
              </p>
            </div>
            {content.hero?.videoUrl && (
              <div className="hidden lg:block">
                <VideoEmbed
                  videoUrl={content.hero.videoUrl}
                  title="Watch This Video"
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Mobile Video Section */}
      {content.hero?.videoUrl && (
        <section className="py-8 bg-gray-50 lg:hidden">
          <Container>
            <VideoEmbed
              videoUrl={content.hero.videoUrl}
              title="Watch This Video"
            />
          </Container>
        </section>
      )}

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <CoreValueCard
              keyword="Mission"
              title={content.mission?.title ?? 'Our Mission'}
              description={content.mission?.description ?? ''}
              heightClass="h-56"
            />
            <CoreValueCard
              keyword="Vision"
              title={content.vision?.title ?? 'Our Vision'}
              description={content.vision?.description ?? ''}
              heightClass="h-56"
            />
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            {content.coreValues?.sectionTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.coreValues?.values?.map((value, index) => (
              <CoreValueCard
                key={index}
                index={index}
                keyword={value.title.split(' ')[0]}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Our History/Story */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {content.story?.title}
            </h2>
            <div className="prose prose-lg max-w-none">
              {hasPortableTextContent ? (
                <div className="text-gray-700">
                  <PortableText value={content.story!.content!} />
                </div>
              ) : (
                fallbackStoryContent.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Video Section (Standalone) */}
      {content.videoSection?.videoUrl && (
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              {content.videoSection.title && (
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  {content.videoSection.title}
                </h2>
              )}
              <VideoEmbed
                videoUrl={content.videoSection.videoUrl}
                title={content.videoSection.title}
              />
            </div>
          </Container>
        </section>
      )}

      {/* Partners Logos */}
      {partners && partners.length > 0 && (
        <section className="py-16 bg-white">
          <Container>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              {content.collaboratorsSection?.title || 'Our Collaborators'}
            </h2>
            {content.collaboratorsSection?.subtitle && (
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                {content.collaboratorsSection.subtitle}
              </p>
            )}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {(partners as Partner[]).map((partner) => (
                <div key={partner._id} className="flex items-center justify-center">
                  {partner.logo ? (
                    <img
                      src={urlFor(partner.logo).height(60).url()}
                      alt={partner.name}
                      className="h-12 md:h-16 w-auto object-contain transition-all"
                    />
                  ) : (
                    <span className="text-gray-500 font-medium">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* What We Do */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {content.whatWeDo?.sectionTitle || 'What We Do'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.whatWeDo?.items || [
              { title: 'Our Programs', description: 'We implement clinical, community, and capacity building programs across Uganda', link: '/programs', icon: 'Briefcase' },
              { title: 'Our Research', description: 'We conduct clinical trials and behavioral research to address health challenges', link: '/research', icon: 'Microscope' },
              { title: 'Our Partners', description: 'We collaborate with leading academic and research institutions globally', link: '/collaborations', icon: 'Handshake' },
              { title: 'Upcoming Events', description: 'Stay updated with our latest events and community activities', link: '/newsroom', icon: 'Calendar' },
            ]).map((item, index) => {
              const Icon = iconMap[item.icon || 'Briefcase'] || Briefcase;
              return (
                <Link
                  key={index}
                  href={item.link}
                  className="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <span className="inline-flex items-center text-primary text-sm font-medium">
                    Explore
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Involved
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join us in our mission to transform Africa through innovative research, training, and service provision.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/donate"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Donate Now
              </Link>
              <Link
                href="/opportunities/careers"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                View Careers
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
