import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return rss({
    title: 'maystash',
    description:
      'A stash of things I build, break, and figure out — AI, second brains, security, and whatever refuses to leave my head.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.tagline,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
