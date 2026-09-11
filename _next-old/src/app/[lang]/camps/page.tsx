import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return { title: dict.camps.heading };
}

export default async function CampsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const { camps } = dict;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
        {camps.heading}
      </h1>
      <p className="mt-3 max-w-2xl text-ink/70">{camps.intro}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Link
          href={`/${params.lang}/camps/2026`}
          className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:border-black/20 hover:shadow-md"
        >
          <div className="h-1.5 bg-black/10" />
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-ink">{camps.camp2026.title}</p>
              <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-ink/60">
                {camps.camp2026.badge}
              </span>
            </div>
            <p className="mt-3 text-sm text-ink/70">{camps.camp2026.body}</p>
          </div>
        </Link>

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="h-1.5 bg-blue-logo" />
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-ink">{camps.camp2027.title}</p>
              <span className="rounded-full bg-blue-logo px-3 py-1 text-xs font-semibold text-ink">
                {camps.camp2027.badge}
              </span>
            </div>
            <p className="mt-3 text-sm text-ink/70">{camps.camp2027.body}</p>
            <Link
              href={`/${params.lang}/apuntat`}
              className="mt-5 inline-block rounded-full bg-blue-logo px-5 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              {camps.camp2027.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
