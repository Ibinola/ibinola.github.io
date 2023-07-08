import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://michaelib.me',
  integrations: [mdx(), sitemap(), react()],
  output: "server",
  adapter: vercel()
});