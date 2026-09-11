export default function ComingSoon({
  heading,
  intro,
  comingSoon,
}: {
  heading: string;
  intro: string;
  comingSoon: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
        {heading}
      </h1>
      <p className="mt-4 text-ink/70">{intro}</p>

      <div className="mt-10 rounded-2xl border border-dashed border-black/15 bg-offwhite px-8 py-12">
        <p className="inline-block rounded-full bg-blue-logo px-6 py-2 text-lg font-semibold text-ink">
          {comingSoon}
        </p>
      </div>
    </section>
  );
}
