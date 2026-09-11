import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/dictionaries";
import { assetPath } from "@/lib/asset-path";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return { title: dict.camps.camp2026.title };
}

export default async function Camp2026Page({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const { camps } = dict;
  const { camp2026 } = camps;
  const { detail } = camp2026;

  const galleryPlaceholders = Array.from({ length: 8 });

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <Link
        href={`/${params.lang}/camps`}
        className="text-sm font-semibold text-ink/60 transition hover:text-ink"
      >
        {detail.back}
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
          {camp2026.title}
        </h1>
        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-ink/60">
          {camp2026.badge}
        </span>
      </div>
      <p className="mt-2 text-ink/70">{detail.subtitle}</p>

      <picture>
        <source
          type="image/webp"
          srcSet={[
            `${assetPath("/images/camp-2026-480.webp")} 480w`,
            `${assetPath("/images/camp-2026-800.webp")} 800w`,
            `${assetPath("/images/camp-2026-1200.webp")} 1200w`,
          ].join(", ")}
          sizes="(min-width: 768px) 500px, 90vw"
        />
        <img
          src={assetPath("/images/camp-2026-1200.jpg")}
          alt={detail.posterAlt}
          width={1200}
          height={1612}
          loading="lazy"
          className="mx-auto mt-8 w-full max-w-md rounded-2xl border border-black/10 shadow-sm"
        />
      </picture>

      <p className="mt-8 max-w-2xl text-ink/70">{detail.story}</p>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-ink">{detail.galleryHeading}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {galleryPlaceholders.map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-black/15 bg-black/5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-8 w-8 text-ink/25"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink/50">{detail.galleryNote}</p>
      </div>
    </section>
  );
}
