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
import remarkToc from 'remark-toc';
import addTailwindcssReference from './src/plugins/addTailwindcssReference.cjs';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { unified, rehypeHeadingIds } from '@astrojs/markdown-remark';
import compressor from 'astro-compressor';

export default defineConfig({
  site: siteConfig.url,
  base: siteConfig.entry,

  trailingSlash: "never",
  compressHTML: true,
  build: {
    format: 'file',
    assets: 'assets',
  },
  devToolbar: {
    enabled: true
  },

  adapter: cloudflare(),

  integrations: [sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    filenameBase: 'sitemap',
    entryLimit: 50000,
  }), react(), mdx(), partytown(), svelte(), NebulaCMS({
    basePath: '/console',
  }), compressor({ gzip: true, brotli: true })],
  markdown: {
    processor: unified({
      remarkPlugins: [[remarkToc, { heading: 'toc', maxDepth: 3 }]],
      rehypePlugins: [
        rehypeSlug,
        rehypeHeadingIds,
        [rehypeAutolinkHeadings, {
          behavior: 'wrap'
        }]
      ]
    }),
  },
  vite: {
    css: {
      postcss: {
        plugins: [addTailwindcssReference()],
      },
    },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      cssCodeSplit: true
    }
  }
});