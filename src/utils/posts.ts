import { getCollection, type CollectionEntry } from "astro:content";
import { getReadingTime } from "./utils";

export type Post = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    const at = a.data.updatedDate ?? a.data.pubDate;
    const bt = b.data.updatedDate ?? b.data.pubDate;
    return bt.valueOf() - at.valueOf();
  });
}

export async function getTagCounts(): Promise<{ name: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export async function getCategoryCounts(): Promise<{ name: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const cat of post.data.categories) {
      map.set(cat, (map.get(cat) || 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export async function getPostsByYear(): Promise<{ year: number; posts: Post[] }[]> {
  const posts = await getPublishedPosts();
  const map = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(post);
  }
  return [...map.entries()]
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => b.year - a.year);
}

export async function getPostCount(): Promise<number> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.length;
}

export async function getDynamics(): Promise<CollectionEntry<"dynamics">[]> {
  const list = await getCollection("dynamics");
  return list.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getRandomPosts(
  count: number,
  excludeId?: string,
): Promise<Post[]> {
  const posts = (await getPublishedPosts()).filter((p) => p.id !== excludeId);
  for (let i = posts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [posts[i], posts[j]] = [posts[j], posts[i]];
  }
  return posts.slice(0, count);
}

export async function getTotalWords(): Promise<number> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  let total = 0;
  for (const p of posts) {
    total += getReadingTime(p.body || "", 320).words;
  }
  return total;
}
