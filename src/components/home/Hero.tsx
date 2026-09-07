import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { whatsappHref } from "@/lib/site-config";
import { assetPath } from "@/lib/asset-path";

export default function Hero({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-gradient-to-b from-blue-kimono to-ink text-white">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element -- basePath-aware src, no benefit from next/image with images.unoptimized */}
        <img
          src={assetPath("/images/logo.png")}
          alt={dict.site.name}
          width={360}
          height={360}
          className="mx-auto h-24 w-24 sm:h-28 sm:w-28"
        />

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-ink">
          <span className="h-2 w-2 rounded-full bg-blue-logo" aria-hidden />
          {dict.trialBadge}
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {dict.home.hero.heading}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          {dict.home.hero.subheading}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${lang}/apuntat`}
            className="rounded-full bg-blue-logo px-6 py-3 font-semibold text-ink transition hover:brightness-110"
          >
            {dict.home.hero.ctaJoin}
          </Link>
          <a
            href={whatsappHref(dict.apuntat.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white"
          >
            {dict.home.hero.ctaWhatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
