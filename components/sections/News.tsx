import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Calendar } from 'lucide-react';

const newsItems = [
  {
    title: 'Community Health Camp Reaches 1,000 Beneficiaries',
    excerpt: 'Our latest health camp provided free medical screenings and treatment to over 1,000 community members.',
    date: '2024-01-15',
    image: '/images/news-1.jpg',
    category: 'Community',
    href: '/newsroom/community-health-camp',
  },
  {
    title: 'New Clinical Trial Approved for HIV Prevention',
    excerpt: 'AMBSO receives approval to conduct groundbreaking clinical trial on innovative HIV prevention methods.',
    date: '2024-01-10',
    image: '/images/news-2.jpg',
    category: 'Research',
    href: '/newsroom/hiv-prevention-trial',
  },
  {
    title: 'Partnership with International Health Organization',
    excerpt: 'Strategic collaboration announced to enhance capacity building and research capabilities.',
    date: '2024-01-05',
    image: '/images/news-3.jpg',
    category: 'Collaboration',
    href: '/newsroom/new-partnership',
  },
];

export default function News() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest News
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with our recent activities and achievements
            </p>
          </div>
          <Button href="/newsroom" variant="outline">
            View All News
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.title} hover href={item.href}>
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {new Date(item.date).toLocaleDateString('en-US', {
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
