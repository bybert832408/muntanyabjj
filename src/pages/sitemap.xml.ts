import type { APIRoute } from "astro";
import { locales } from "@/i18n/config";
import { SITE_URL } from "@/config/site";

const PAGES = ["", "tarifes/", "camps/", "camps/2026/", "guies/", "botiga/", "apuntat/"];

export const GET: APIRoute = () => {
  const urls = PAGES.flatMap((page) =>
    locales.map((locale) => {
      const loc = `${SITE_URL}/${locale}/${page}`;
      const alternates = locales
        .map((altLocale) => `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${SITE_URL}/${altLocale}/${page}" />`)
        .join("\n");
      return `  <url>\n    <loc>${loc}</loc>\n${alternates}\n  </url>`;
    })
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
