import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config.ts";

export async function GET() {
  const allPosts = await getCollection("posts");
  const publishedPosts = allPosts.filter(
    (post) => !post.data.draft && post.data.pubDate
  );

  const sorted = publishedPosts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.url,
    customData: `<language>${siteConfig.lang.toLowerCase()}</language>`,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}`,
    })),
  });
}