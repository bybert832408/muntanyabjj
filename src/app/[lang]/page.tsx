import { getDictionary, type Locale } from "@/lib/dictionaries";

export default async function HomePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <section className="mx-auto max-w-5xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl">{dict.home.heading}</h1>
      <p className="mt-4 text-white/70">{dict.home.subheading}</p>
    </section>
  );
}
