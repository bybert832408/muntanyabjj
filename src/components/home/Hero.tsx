import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { whatsappHref } from "@/lib/site-config";

export default function Hero({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="border-b border-white/10 bg-mbjj-black">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
        <span className="inline-block rounded-full bg-mbjj-blue/15 px-4 py-1 text-sm font-semibold text-mbjj-blue">
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
            className="rounded-full bg-mbjj-blue px-6 py-3 font-semibold text-mbjj-black transition hover:brightness-110"
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
