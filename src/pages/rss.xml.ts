// rss.xml

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config.ts";
export async function get(context: { site: string }) {
    const posts = await getCollection("posts", (data) => !data.data.draft);
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        customData: `<language>${siteConfig.lang.toLowerCase()}</language>`,
        items: posts
            .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
            .map((post) => ({
                title: post.data.title,
                description: post.data.description,
                pubDate: post.data.pubDate,
                link: `/posts/${post.id}/`,
            })),
    });
}