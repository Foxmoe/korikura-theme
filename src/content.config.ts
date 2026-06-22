import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional().meta({ description: 'The author of the post.' }),
    pubDate: z.coerce.date().meta({ description: 'The date the post was published.' }),
    updatedDate: z.coerce.date().optional().meta({ description: 'The date the post was last updated.' }),
    tags: z.array(z.string()).meta({ description: 'A list of tags for the post.' }),
    categories: z.array(z.string()).meta({ description: 'A list of categories for the post.' }),
    draft: z.boolean().optional().meta({ description: 'Whether the post is a draft.' }),
  }).meta({title:'Blog Post', description: 'The schema for a blog post.',files:['md','mdx'] }),
});

export const collections = { posts };