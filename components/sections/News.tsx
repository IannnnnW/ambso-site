import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Calendar } from 'lucide-react';
import { getAllNews } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { News as NewsType } from '@/lib/sanity.types';

interface NewsProps {
  content?: {
    title?: string;
    subtitle?: string;
    viewAllText?: string;
    viewAllLink?: string;
  };
}

const defaultContent = {
  title: 'Latest News',
  subtitle: 'Stay updated with our recent activities and achievements',
  viewAllText: 'View All News',
  viewAllLink: '/newsroom',
};

export default async function News({ content }: NewsProps) {
  const newsItems: NewsType[] = await getAllNews();

  const title = content?.title ?? defaultContent.title;
  const subtitle = content?.subtitle ?? defaultContent.subtitle;
  const viewAllText = content?.viewAllText ?? defaultContent.viewAllText;
  const viewAllLink = content?.viewAllLink ?? defaultContent.viewAllLink;

  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>
          <Button href={viewAllLink} variant="outline">
            {viewAllText}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item._id} hover href={`/newsroom/${item.slug.current}`}>
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                {item.featuredImage && (
                  <img
                    src={urlFor(item.featuredImage).width(600).height(400).url()}
                    alt={item.featuredImage.alt || item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  {item.category && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full capitalize">
                      {item.category}
                    </span>
                  )}
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {new Date(item.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{item.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}