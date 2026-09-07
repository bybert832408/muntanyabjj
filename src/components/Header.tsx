import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { locales } from "@/lib/dictionaries";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const navItems = [
    { href: `/${lang}/tarifes`, label: dict.nav.prices },
    { href: `/${lang}/camps`, label: dict.nav.camps },
    { href: `/${lang}/guies`, label: dict.nav.guides },
    { href: `/${lang}/botiga`, label: dict.nav.shop },
  ];

  return (
    <header className="sticky top-0 z-50 bg-mbjj-black text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href={`/${lang}`} className="text-lg font-bold tracking-wide">
          {dict.site.name}
        </Link>

        <nav
          aria-label="Navegació principal"
          className="flex flex-wrap items-center gap-4 text-sm text-white/80"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

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
            href={`/${lang}/apuntat`}
            className="rounded-full bg-mbjj-blue px-4 py-2 text-sm font-semibold text-mbjj-black transition hover:brightness-110"
          >
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
