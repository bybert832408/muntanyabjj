import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { SITE_URL } from "./src/config/site.ts";

// Dominio propio: la web vive en la raíz, sin basePath.
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  integrations: [tailwind()],
});
