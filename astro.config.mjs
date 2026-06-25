// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import svelte from '@astrojs/svelte';
import NebulaCMS from 'nebula-cms';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: siteConfig.url,
  base: siteConfig.entry,

  trailingSlash: "ignore",
  compressHTML: true,

  devToolbar: {
    enabled: true
  },

  adapter: cloudflare(),

  integrations: [sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    filenameBase: 'sitemap',
    entryLimit: 50000,
  }),
  react(),
  mdx({
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
    ]
  }),
  partytown(),
  svelte(),
  NebulaCMS({
    basePath: '/console',
  })],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
});