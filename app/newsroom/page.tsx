import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import TweetCard from '@/components/ui/TweetCard';
import { Calendar, Newspaper, Twitter } from 'lucide-react';
import { getAllNews, getTweetEmbeds } from '@/lib/sanity.queries';
import { fetchTweetOEmbeds } from '@/lib/twitter';
import { News as NewsType, TweetEmbed } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';

export const metadata = {
  title: 'Newsroom | AMBSO',
  description: 'Stay updated with the latest news, events, and achievements from AMBSO.',
};

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

export default async function NewsroomPage() {
  // Fetch news articles and tweet embed IDs from Sanity in parallel
  const [newsItems, tweetEmbeds] = await Promise.all([
    getAllNews() as Promise<NewsType[]>,
    getTweetEmbeds() as Promise<TweetEmbed[]>,
  ]);

  // Fetch oEmbed HTML for each active tweet server-side (build time, no CORS)
  const tweetIds = tweetEmbeds.map((t) => t.tweetId);
  console.log(tweetIds)
  const tweets = tweetIds.length > 0 ? await fetchTweetOEmbeds(tweetIds) : [];
  console.log(tweetIds.length)
  return (
    <div className="pt-20 lg:pt-28">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Newspaper className="w-4 h-4" />
              <span>News & Updates</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Newsroom</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Stay updated with the latest news, events, and achievements from AMBSO.
            </p>
          </div>
        </Container>
      </section>

      {/* ── News Articles Grid ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <Container>
          {!newsItems || newsItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getCategoryColor(item.category)}`}>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">{item.excerpt}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── From Our X (Twitter) Feed ────────────────────────────────── */}
      {tweets.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <Container>
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-full text-xs font-semibold mb-3">
                  <Twitter size={12} />
                  <span>X / Twitter</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  From Our Feed
                </h2>
                <p className="text-gray-500 text-sm mt-1.5">
                  Latest updates from AMBSO on X (Twitter)
                </p>
              </div>
              <a
                href="https://x.com/AMBSO_Uganda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1DA1F2] text-[#1DA1F2] rounded-full text-sm font-semibold hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 self-start sm:self-auto shrink-0"
              >
                <Twitter size={15} />
                Follow @AMBSO
              </a>
            </div>

            {/* Tweet grid: 1 col → 2 col → 3 col */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {tweets.map((tweet) => (
                <TweetCard
                  key={tweet.tweetId}
                  html={tweet.html}
                  tweetId={tweet.tweetId}
                  authorName={tweet.authorName}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
