import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// Repo de GitHub Pages: bybert832408.github.io/muntanyabjj
// Equivalente al basePath/assetPrefix condicionados que usaba Next.js.
export default defineConfig({
  site: "https://bybert832408.github.io",
  base: "/muntanyabjj",
  trailingSlash: "always",
  integrations: [tailwind()],
});
