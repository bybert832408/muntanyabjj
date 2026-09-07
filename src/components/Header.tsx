import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";
import { locales } from "@/lib/dictionaries";

type HeaderDict = {
  site: { name: string };
  nav: { home: string; cta: string };
};

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: HeaderDict;
}) {
  return (
    <header className="sticky top-0 z-50 bg-mbjj-black text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href={`/${lang}`} className="text-lg font-bold tracking-wide">
          {dict.site.name}
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label="Selector d'idioma" className="flex gap-2 text-sm">
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}`}
                className={
                  locale === lang
                    ? "font-semibold text-mbjj-blue"
                    : "text-white/70 hover:text-white"
                }
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </nav>

          <Link
            href={`/${lang}`}
            className="rounded-full bg-mbjj-blue px-4 py-2 text-sm font-semibold text-mbjj-black transition hover:brightness-110"
          >
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
