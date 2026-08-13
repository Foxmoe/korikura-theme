// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { siteConfig } from './src/config';

function rehypeMoveStyleToData() {
  const walk = (node) => {
    if (
      node &&
      node.type === 'element' &&
      node.properties &&
      node.properties.style != null
    ) {
      node.properties['data-style'] = node.properties.style;
      delete node.properties.style;
    }
    if (node && Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  };
  return (tree) => {
    walk(tree);
  };
}

const codeGroupTransformer = {
  name: 'code-group-data',
  pre(node, context) {
    let meta = '';
    const mo = this && this.options && this.options.meta;
    if (mo && typeof mo.__raw === 'string') meta = mo.__raw;
    else if (typeof context?.meta === 'string') meta = context.meta;
    if (!meta) return;
    const m = /(?:^|\s)group=([\w-]+)/.exec(meta);
    if (!m) return;
    node.properties = node.properties || {};
    node.properties['data-group'] = m[1];
  },
};

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import svelte from '@astrojs/svelte';
import clarity from "@bitfresh/astro-clarity";
import NebulaCMS from 'nebula-cms';
import tailwindcss from '@tailwindcss/vite';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import remarkSubSup from 'remark-sub-sup';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import addTailwindcssReference from 'astro-tailwind-autoref';
import compressor from 'astro-compressor';

const hashNode = {
  type: 'element',
  tagName: 'span',
  properties: { className: ['heading-hash'], 'aria-hidden': 'true' },
  children: [],
};

export default defineConfig({
  site: siteConfig.url,
  base: siteConfig.entry,

  trailingSlash: "never",
  compressHTML: true,
  build: {
    format: 'directory', 
    assets: 'assets',
    inlineStylesheets: 'never',
  },

  adapter: cloudflare(),

  integrations: [clarity({
      projectId: "ss3a1su3uz",
      enabled: true,  
    }),
    sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    filenameBase: 'sitemap',
    entryLimit: 50000,
     filter: (page) => {
    if (page.includes('/tags/') || page.includes('/categories/')) return false;
    if (page.includes('/console') || page.includes('/search') || page.includes('/assets/')) return false;
    return true;
  },
  }), react(), mdx(), svelte(), NebulaCMS({
    basePath: '/console',
  }), compressor({ gzip: true, brotli: true })],
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkSubSup,
        [remarkMath, { singleDollarTextMath: true }],
        [remarkToc, { heading: 'toc', maxDepth: 3 }],
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: 'wrap',
          properties: { class: 'heading-anchor', 'aria-hidden': 'true', tabindex: -1 },
          content: hashNode,
        }],
        [rehypeKatex, { strict: false, throwOnError: false }],
        rehypeMoveStyleToData,
      ],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
      transformers: [codeGroupTransformer],
    },
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
    }
  }
});
