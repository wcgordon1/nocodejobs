import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    analytics: true,
    webAnalytics: true,
    speedInsights: true,
  }),
  server: {
    port: 3000,
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'css-variables'
    }
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true
  },
  site: 'https://bestelectricianjobs.com',
  integrations: [tailwind(), sitemap(), mdx()]
});