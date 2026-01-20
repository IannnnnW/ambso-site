import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { Calendar } from 'lucide-react';

const newsItems = [
  {
    title: 'Community Health Camp Reaches 1,000 Beneficiaries',
    excerpt: 'Our latest health camp provided free medical screenings and treatment to over 1,000 community members in Wakiso District.',
    date: '2024-01-15',
    category: 'Community Programs',
    image: '/images/news-1.jpg',
  },
  {
    title: 'New Clinical Trial Approved for HIV Prevention',
    excerpt: 'AMBSO receives approval to conduct groundbreaking clinical trial on innovative HIV prevention methods.',
    date: '2024-01-10',
    category: 'Research',
    image: '/images/news-2.jpg',
  },
  {
    title: 'Partnership with International Health Organization',
    excerpt: 'Strategic collaboration announced to enhance capacity building and research capabilities across East Africa.',
    date: '2024-01-05',
    category: 'Collaborations',
    image: '/images/news-3.jpg',
  },
];

export default function NewsroomPage() {
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
                <div className="aspect-video bg-gray-200" />
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
