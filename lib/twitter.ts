/**
 * Server-side utility for fetching Twitter/X oEmbed HTML.
 *
 * Called at build time (static generation) so:
 *  - no CORS issues (server → server)
 *  - no Twitter API key required
 *  - tweet content is baked into the static HTML
 *
 * Twitter's oEmbed reference:
 *   https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api
 */

export interface TweetOEmbed {
  /** The raw <blockquote> HTML string returned by the oEmbed API */
  html: string;
  authorName: string;
  authorUrl: string;
  url: string;
}

/**
 * Fetches oEmbed HTML for a single tweet ID.
 * Returns null if the tweet is unavailable or the API fails.
 */
export async function fetchTweetOEmbed(tweetId: string): Promise<TweetOEmbed | null> {
  const tweetUrl = `https://twitter.com/i/status/${tweetId}`;

  const params = new URLSearchParams({
    url: tweetUrl,
    omit_script: 'false',   // We load widget.js ourselves
    hide_media: 'false',   // Only show the single tweet
    hide_thread: 'true',
    lang: 'en',
    dnt: 'true',           // Do Not Track
    theme: 'light',
  });

  try {
    const res = await fetch(
      `https://publish.x.com/oembed?${params.toString()}`,
      {
        // Cache for 1 hour during builds; tweets rarely change
        next: { revalidate: 3600 },
      }
    );
    console.log(res)
    if (!res.ok) return null;

    const data = await res.json();
    return {
      html: data.html as string,
      authorName: data.author_name as string,
      authorUrl: data.author_url as string,
      url: data.url as string,
    };
  } catch {
    return null;
  }
}

/**
 * Fetches oEmbed HTML for an array of tweet IDs in parallel.
 * Failures are silently dropped so one bad tweet ID
 * does not prevent the rest from rendering.
 */
export async function fetchTweetOEmbeds(
  tweetIds: string[]
): Promise<Array<TweetOEmbed & { tweetId: string }>> {
  const results = await Promise.allSettled(
    tweetIds.map(async (id) => {
      const embed = await fetchTweetOEmbed(id);
      return embed ? { ...embed, tweetId: id } : null;
    })
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<TweetOEmbed & { tweetId: string }> =>
        r.status === 'fulfilled' && r.value !== null
    )
    .map((r) => r.value);
}
