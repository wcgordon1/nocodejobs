import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import devtoolBreakpoints from "astro-devtool-breakpoints";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 3000,
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables"
    }
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true
  },
  site: 'https://tustinrecruiting.com',
  integrations: [tailwind(), sitemap(), mdx(), devtoolBreakpoints()]
});