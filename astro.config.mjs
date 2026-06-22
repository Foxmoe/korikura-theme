// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig, profileConfig } from './src/config.js';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import svelte from '@astrojs/svelte';
import NebulaCMS from 'nebula-cms';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
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
  }), react(), mdx(), partytown(), svelte(), NebulaCMS({
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