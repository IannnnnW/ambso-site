import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { PortableText } from '@portabletext/react';
import { getPartner, getAllPartnerSlugs } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { ArrowLeft, Globe, ExternalLink, Users } from 'lucide-react';

interface CollaboratorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPartnerSlugs();
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CollaboratorPageProps) {
  const { slug } = await params;
  const partner = await getPartner(slug);

  if (!partner) {
    return { title: 'Collaborator Not Found | AMBSO' };
  }

  return {
    title: `${partner.name} | AMBSO Collaborations`,
    description: `Learn about AMBSO's collaboration with ${partner.name}.`,
  };
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || '#';
      return (
        <a
          href={href}
          className="text-primary hover:underline"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>
    ),
  },
};

interface LeadCollaborator {
  name: string;
  position: string;
  title?: string;
  bio?: string;
  profileUrl?: string;
  picture?: { asset: { _ref: string }; alt?: string };
}

interface ResearchGroup {
  name: string;
  description?: string;
  readMoreUrl?: string;
}

interface RelatedItem {
  title: string;
  slug: { current: string };
}

export default async function CollaboratorPage({ params }: CollaboratorPageProps) {
  const { slug } = await params;
  const partner = await getPartner(slug);

  if (!partner) {
    notFound();
  }

  const hasFeaturedImage = !!(partner.featuredImage?.asset);

  return (
    <div className="pt-20 lg:pt-28">
      {/* Hero */}
      <section className={`relative ${hasFeaturedImage ? 'bg-gray-900' : 'bg-gradient-to-r from-primary to-primary-light'}`}>
        {hasFeaturedImage && (
          <div className="absolute inset-0">
            <img
              src={urlFor(partner.featuredImage).width(1920).height(500).url()}
              alt={partner.featuredImage.alt || partner.name}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          </div>
        )}
        <Container>
          <div className="relative py-16 md:py-24">
            <Link
              href="/collaborations"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Collaborations
            </Link>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  {partner.name}
                </h1>
                {partner.country && (
                  <p className="text-white/70 flex items-center gap-2">
                    <Globe size={16} />
                    {partner.country}
                  </p>
                )}
              </div>

              {partner.logo?.asset && (
                <div className="bg-white rounded-xl p-4 inline-flex items-center justify-center shadow-lg flex-shrink-0">
                  <img
                    src={urlFor(partner.logo).height(64).url()}
                    alt={partner.logo.alt || partner.name}
                    className="max-h-16 max-w-[160px] object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main content */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10 xl:gap-14 items-start">

            {/* ── Left: primary content (2/3) ─────────────────────────── */}
            <div className="lg:col-span-2">

              {/* Partnership overview */}
              {partner.description && (
                <div className="prose prose-lg max-w-none mb-10">
                  <PortableText value={partner.description} components={portableTextComponents} />
                </div>
              )}

              {/* Lead Collaborators */}
              {partner.leadCollaborators && partner.leadCollaborators.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users size={18} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Our Lead Collaborator{partner.leadCollaborators.length > 1 ? 's' : ''}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {partner.leadCollaborators.map((collab: LeadCollaborator, idx: number) => (
                      <div key={idx} className="bg-[#f8f9fb] rounded-xl p-6 flex gap-5 border border-gray-100">
                        {/* Photo */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 self-start">
                          {collab.picture?.asset ? (
                            <img
                              src={urlFor(collab.picture).width(160).height(160).url()}
                              alt={collab.picture.alt || collab.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                              {collab.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">{collab.name}</h3>
                          {collab.title && (
                            <p className="text-primary text-sm font-semibold mt-0.5">{collab.title}</p>
                          )}
                          <p className="text-gray-500 text-sm mt-0.5 mb-3">{collab.position}</p>

                          {collab.bio && (
                            <p className="text-gray-700 text-sm leading-relaxed">{collab.bio}</p>
                          )}

                          {collab.profileUrl && (
                            <a
                              href={collab.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1 mt-3"
                            >
                              View profile <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Groups */}
              {partner.researchGroups && partner.researchGroups.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">Research Groups</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {partner.researchGroups.map((group: ResearchGroup, idx: number) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 flex flex-col">
                        <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
                        {group.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1">{group.description}</p>
                        )}
                        {group.readMoreUrl && (
                          <a
                            href={group.readMoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1 mt-auto"
                          >
                            Read more <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* ── Right: sticky sidebar (1/3) ─────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">

                {/* Visit website */}
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Visit Website <ExternalLink size={15} />
                  </a>
                )}

                {/* Partnership details card */}
                {(partner.country || partner.partnershipStartDate || (partner.partnershipType?.length > 0)) && (
                  <div className="bg-[#f8f9fb] rounded-xl p-5 border border-gray-100 space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Partnership Details</h3>

                    {partner.country && (
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Country</p>
                        <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                          <Globe size={14} className="text-primary flex-shrink-0" />
                          {partner.country}
                        </div>
                      </div>
                    )}

                    {partner.partnershipStartDate && (
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Partnership Since</p>
                        <p className="text-gray-900 font-medium">
                          {new Date(partner.partnershipStartDate).getFullYear()}
                        </p>
                      </div>
                    )}

                    {partner.partnershipType && partner.partnershipType.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Type</p>
                        <div className="flex flex-wrap gap-1.5">
                          {partner.partnershipType.map((type: string) => (
                            <span key={type} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium capitalize">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Related Programs */}
                {partner.relatedPrograms && partner.relatedPrograms.length > 0 && (
                  <div className="bg-[#f8f9fb] rounded-xl p-5 border border-gray-100">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Related Programs</h3>
                    <ul className="space-y-2">
                      {partner.relatedPrograms.map((item: RelatedItem) => (
                        <li key={item.slug.current}>
                          <Link
                            href={`/programs/${item.slug.current}`}
                            className="text-primary text-sm hover:underline flex items-start gap-1.5"
                          >
                            <span className="mt-1 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Research */}
                {partner.relatedResearch && partner.relatedResearch.length > 0 && (
                  <div className="bg-[#f8f9fb] rounded-xl p-5 border border-gray-100">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Related Research</h3>
                    <ul className="space-y-2">
                      {partner.relatedResearch.map((item: RelatedItem) => (
                        <li key={item.slug.current}>
                          <Link
                            href={`/research/${item.slug.current}`}
                            className="text-primary text-sm hover:underline flex items-start gap-1.5"
                          >
                            <span className="mt-1 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Back CTA */}
      <section className="py-10 bg-gray-50 border-t">
        <Container>
          <div className="text-center">
            <Link
              href="/collaborations"
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to All Collaborations
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
