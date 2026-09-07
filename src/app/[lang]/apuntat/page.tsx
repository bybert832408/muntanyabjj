import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { whatsappHref } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return { title: dict.apuntat.heading };
}

export default async function ApuntatPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const { apuntat } = dict;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
        {apuntat.heading}
      </h1>
      <p className="mt-3 text-ink/70">{apuntat.intro}</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="mb-4 rounded-lg bg-blue-logo/15 px-4 py-3 text-sm text-ink">
            {apuntat.form.underConstruction}
          </p>

          <fieldset disabled className="space-y-4 opacity-70">
            <div>
              <label className="block text-sm text-ink/70" htmlFor="name">
                {apuntat.form.name}
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-ink/70" htmlFor="age">
                {apuntat.form.studentAge}
              </label>
              <input
                id="age"
                type="text"
                className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2"
              />
            </div>

            <div>
              <span className="block text-sm text-ink/70">
                {apuntat.form.typeLabel}
              </span>
              <div className="mt-2 flex gap-4 text-sm text-ink">
                <label className="flex items-center gap-2">
                  <input type="radio" name="type" />
                  {apuntat.form.typeAdult}
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="type" />
                  {apuntat.form.typeKids}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-ink/70" htmlFor="phone">
                {apuntat.form.phone}
              </label>
              <input
                id="phone"
                type="tel"
                className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-ink/70" htmlFor="message">
                {apuntat.form.message}
              </label>
              <textarea
                id="message"
                rows={3}
                className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-blue-logo px-6 py-3 font-semibold text-ink"
            >
              {apuntat.form.submit}
            </button>
          </fieldset>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white p-6 text-center">
          <h2 className="text-lg font-bold text-ink">
            {apuntat.whatsapp.heading}
          </h2>
          <a
            href={whatsappHref(apuntat.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 rounded-full bg-blue-logo px-6 py-3 font-semibold text-ink transition hover:brightness-110"
          >
            {apuntat.whatsapp.button}
          </a>
        </div>
      </div>
    </section>
  );
}
