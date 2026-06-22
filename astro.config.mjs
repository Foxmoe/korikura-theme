// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig, profileConfig } from './src/config.js';

import cloudflare from '@astrojs/cloudflare';
import siteamap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';

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
  integrations: [siteamap(), react(), mdx(), partytown()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
});