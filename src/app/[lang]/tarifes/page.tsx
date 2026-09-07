import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { pricing } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return { title: dict.tarifes.heading };
}

export default async function TarifesPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const { tarifes } = dict;

  const cards = [
    {
      label: tarifes.monthly.label,
      price: pricing.monthly,
      period: tarifes.monthly.period,
      highlight: true,
    },
    {
      label: tarifes.dropIn.label,
      price: pricing.dropIn,
      period: tarifes.dropIn.period,
      highlight: false,
    },
    {
      label: tarifes.private.label,
      price: pricing.private,
      period: tarifes.private.period,
      highlight: false,
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{tarifes.heading}</h1>
      <p className="mt-3 text-white/70">{tarifes.intro}</p>

      <span className="mt-6 inline-block rounded-full bg-mbjj-blue/15 px-4 py-1 text-sm font-semibold text-mbjj-blue">
        {tarifes.trial}
      </span>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={
              card.highlight
                ? "rounded-2xl border-2 border-mbjj-blue bg-mbjj-blue/10 p-8 text-center"
                : "rounded-2xl border border-white/10 p-8 text-center"
            }
          >
            <p className="font-semibold text-white">{card.label}</p>
            <p className="mt-4 text-4xl font-extrabold text-mbjj-blue">
              {card.price}
              {pricing.currency}
            </p>
            <p className="mt-1 text-sm text-white/60">{card.period}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 p-8 text-center">
        <h2 className="text-xl font-bold">{tarifes.ctaHeading}</h2>
        <Link
          href={`/${params.lang}/apuntat`}
          className="mt-4 inline-block rounded-full bg-mbjj-blue px-6 py-3 font-semibold text-mbjj-black transition hover:brightness-110"
        >
          {tarifes.ctaButton}
        </Link>
      </div>
    </section>
  );
}
