import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { Calendar } from 'lucide-react';
import { getAllNews } from '@/lib/sanity.queries';
import { News as NewsType } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';


export default async function NewsroomPage() {
  const newsItems: NewsType[] = await getAllNews();
  if (!newsItems || newsItems.length === 0) {
    return null;
  }
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Newsroom</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Stay updated with the latest news, events, and achievements from AMBSO.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card key={item.title} hover>
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
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.excerpt}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
