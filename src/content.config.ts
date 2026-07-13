import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional().meta({ description: 'The author of the post.' }),
    pubDate: z.coerce.date().meta({ description: 'The date the post was published.' }),
    updatedDate: z.coerce.date().optional().meta({ description: 'The date the post was last updated.' }),
    tags: z.array(z.string()).default([]).meta({ description: 'A list of tags for the post.' }),
    categories: z.array(z.string()).default([]).meta({ description: 'A list of categories for the post.' }),
    cover: z.string().optional().meta({ description: 'Cover image url for the post.' }),
    coverAlt: z.string().optional().meta({ description: 'Alt text of the cover image.' }),
    draft: z.boolean().default(false).meta({ description: 'Whether the post is a draft.' }),
    license: z.string().optional().meta({ description: 'License name, overrides site default.' }),
    licenseUrl: z.string().optional().meta({ description: 'License url, overrides site default.' }),
    featured: z.boolean().default(false).meta({ description: 'Pin to top of lists.' }),
    toc: z.boolean().default(true).meta({ description: 'Show table of contents.' }),
  }).meta({ title: 'Blog Post', description: 'The schema for a blog post.', files: ['md', 'mdx'] }),
});

const dynamics = defineCollection({
  loader: glob({ base: './src/content/dynamics', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().optional().meta({ description: 'Optional title for the dynamic.' }),
    date: z.coerce.date().meta({ description: 'Publish date of the dynamic.' }),
    author: z.string().optional().meta({ description: 'Author of the dynamic.' }),
  }).meta({ title: 'Dynamic', description: 'A short status / tweet-like post.', files: ['md', 'mdx'] }),
});

export const collections = { posts, dynamics };
