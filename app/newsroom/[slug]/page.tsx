import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { PortableText } from '@portabletext/react';
import { getNewsWithRelated, getAllNewsSlugs } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { Calendar, User, Tag, ArrowLeft, Clock } from 'lucide-react';

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getNewsWithRelated(slug);

  if (!article) {
    return {
      title: 'Article Not Found | AMBSO',
    };
  }

  return {
    title: `${article.title} | AMBSO Newsroom`,
    description: article.excerpt || `Read about ${article.title} from AMBSO`,
  };
}

// Custom components for PortableText
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Article image'}
          className="w-full rounded-lg shadow-md"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
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
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getReadingTime(content: unknown[]): number {
  // Estimate reading time based on content blocks
  let wordCount = 0;
  content?.forEach((block: unknown) => {
    const typedBlock = block as { _type: string; children?: { text?: string }[] };
    if (typedBlock._type === 'block' && typedBlock.children) {
      typedBlock.children.forEach((child) => {
        if (child.text) {
          wordCount += child.text.split(/\s+/).length;
        }
      });
    }
  });
  return Math.max(1, Math.ceil(wordCount / 200));
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    research: 'bg-blue-100 text-blue-700',
    programs: 'bg-green-100 text-green-700',
    events: 'bg-purple-100 text-purple-700',
    partnerships: 'bg-amber-100 text-amber-700',
    impact: 'bg-primary/10 text-primary',
    community: 'bg-teal-100 text-teal-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getNewsWithRelated(slug);

  if (!article) {
    notFound();
  }

  const readingTime = getReadingTime(article.content);

  return (
    <div className="pt-20">
      {/* Hero Section with Featured Image */}
      <section className="relative bg-gray-900">
        {article.featuredImage && (
          <div className="absolute inset-0">
            <img
              src={urlFor(article.featuredImage).width(1920).height(600).url()}
              alt={article.featuredImage.alt || article.title}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
          </div>
        )}
        <Container>
          <div className="relative py-16 md:py-24">
            {/* Back Link */}
            <Link
              href="/newsroom"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Newsroom
            </Link> 

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {formatDate(article.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {readingTime} min read
              </div>
              {article.author && (
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {article.author.name}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Excerpt/Lead */}
            {article.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                {article.excerpt}
              </p>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={article.content}
                components={portableTextComponents}
              />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag size={18} className="text-gray-500 mr-2" />
                  {article.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Card */}
            {article.author && (
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-4">
                  {article.author.image && (
                    <img
                      src={urlFor(article.author.image).width(80).height(80).url()}
                      alt={article.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Written by</p>
                    <h3 className="font-semibold text-gray-900">{article.author.name}</h3>
                    {article.author.role && (
                      <p className="text-sm text-gray-600">{article.author.role}</p>
                    )}
                    {article.author.slug && (
                      <Link
                        href={`/who-we-are/team/${article.author.slug.current}`}
                        className="text-primary text-sm hover:underline mt-2 inline-block"
                      >
                        View Profile
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {article.relatedNews && article.relatedNews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {article.relatedNews.map((related: {
                _id: string;
                title: string;
                slug: { current: string };
                excerpt?: string;
                featuredImage?: { asset: { _ref: string }; alt?: string };
                category?: string;
                publishedAt: string;
              }) => (
                <Link
                  key={related._id}
                  href={`/newsroom/${related.slug.current}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {related.featuredImage && (
                      <img
                        src={urlFor(related.featuredImage).width(400).height(225).url()}
                        alt={related.featuredImage.alt || related.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      {related.category && (
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(related.category)}`}>
                          {related.category.charAt(0).toUpperCase() + related.category.slice(1)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(related.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {related.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Back to Newsroom CTA */}
      <section className="py-12 bg-white border-t">
        <Container>
          <div className="text-center">
            <Link
              href="/newsroom"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to All News
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
