import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { formatDateToChinese } from "@/utils/utils";

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const items = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => {
      const body = (post.body || "").replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`~\-]/g, " ");
      return {
        title: post.data.title,
        description: post.data.description || "",
        url: `/posts/${post.id}`,
        tags: post.data.tags,
        content: body.slice(0, 2000),
        pubDate: formatDateToChinese(post.data.pubDate),
      };
    });

  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
