import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/dictionaries";
import { docs, docLanguageLabels } from "@/lib/site-config";
import { assetPath } from "@/lib/asset-path";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return { title: dict.guies.heading };
}

export default async function GuiesPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const { guies } = dict;
  const { lang } = params;

  const orderedLocales: Locale[] = [
    lang,
    ...locales.filter((locale) => locale !== lang),
  ];

  const cards = [
    { ...guies.manual, paths: docs.manual },
    { ...guies.competition, paths: docs.competition },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
        {guies.heading}
      </h1>
      <p className="mt-3 max-w-2xl text-ink/70">{guies.intro}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
          >
            <div className="h-1.5 bg-blue-logo" />
            <div className="p-6">
              <p className="font-semibold text-ink">{card.title}</p>
              <p className="mt-2 text-sm text-ink/70">{card.description}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-ink/50">
                {card.meta}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {orderedLocales.map((locale, i) => (
                  <a
                    key={locale}
                    href={assetPath(card.paths[locale])}
                    target="_blank"
                    rel="noopener"
                    className={
                      i === 0
                        ? "rounded-full bg-blue-logo px-4 py-1.5 text-sm font-semibold text-ink transition hover:brightness-110"
                        : "rounded-full border border-black/20 px-4 py-1.5 text-sm font-semibold text-ink transition hover:border-black/40"
                    }
                  >
                    {docLanguageLabels[locale]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-black/15 bg-offwhite p-6">
        <p className="font-semibold text-ink">{guies.moreHeading}</p>
        <p className="mt-2 text-sm text-ink/70">{guies.moreText}</p>
      </div>
    </section>
  );
}
