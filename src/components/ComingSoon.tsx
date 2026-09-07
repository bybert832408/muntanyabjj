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
      <h1 className="text-3xl font-extrabold sm:text-4xl">{heading}</h1>
      <p className="mt-4 text-white/70">{intro}</p>

      <div className="mt-10 rounded-2xl border border-dashed border-white/20 bg-white/5 px-8 py-12">
        <p className="text-lg font-semibold text-mbjj-blue">{comingSoon}</p>
      </div>
    </section>
  );
}
