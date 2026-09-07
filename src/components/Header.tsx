"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { locales } from "@/lib/dictionaries";
import { assetPath } from "@/lib/asset-path";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: `/${lang}/tarifes`, label: dict.nav.prices },
    { href: `/${lang}/camps`, label: dict.nav.camps },
    { href: `/${lang}/guies`, label: dict.nav.guides },
    { href: `/${lang}/botiga`, label: dict.nav.shop },
  ];

  const localeLinkClass = (locale: Locale) =>
    locale === lang
      ? "rounded-full bg-blue-logo px-2 py-0.5 font-semibold text-ink"
      : "px-2 py-0.5 text-white/70 hover:text-white";

  return (
    <header className="sticky top-0 z-50 bg-blue-kimono text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href={`/${lang}`}
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-aware src, no benefit from next/image with images.unoptimized */}
          <img
            src={assetPath("/images/logo-64.png")}
            alt={dict.site.name}
            width={40}
            height={40}
            className="h-10 w-10"
          />
        </Link>

        <nav
          aria-label="Navegació principal"
          className="hidden items-center gap-4 text-sm text-white/80 md:flex"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <nav aria-label="Selector d'idioma" className="flex gap-1 text-sm">
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}`}
                className={localeLinkClass(locale)}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </nav>

          <Link
            href={`/${lang}/apuntat`}
            className="rounded-full bg-blue-logo px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            {dict.nav.cta}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          className="p-2 text-white md:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 px-4 pb-6 md:hidden"
        >
          <nav
            aria-label="Navegació principal"
            className="flex flex-col gap-4 pt-4 text-base"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav
            aria-label="Selector d'idioma"
            className="mt-4 flex gap-2 text-sm"
          >
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}`}
                onClick={() => setOpen(false)}
                className={localeLinkClass(locale)}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </nav>

          <Link
            href={`/${lang}/apuntat`}
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-blue-logo px-4 py-2 text-center text-sm font-semibold text-ink transition hover:brightness-110"
          >
            {dict.nav.cta}
          </Link>
        </div>
      )}
    </header>
  );
}
