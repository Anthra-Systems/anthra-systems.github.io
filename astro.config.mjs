import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.anthrasystems.com",
  base: "/",
  image: {
    domains: ["images.unsplash.com", "media.licdn.com"],
  },
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;

        return !(
          pathname.startsWith("/admin/") ||
          pathname.startsWith("/interview/") ||
          pathname.startsWith("/fr/") ||
          pathname.startsWith("/blog/") ||
          pathname.startsWith("/insights/") ||
          /^\/products\/item-[^/]+\/?$/.test(pathname)
        );
      },
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
    mdx(),
  ],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
