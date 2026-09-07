import type { Dictionary } from "@/lib/dictionaries";

export default function Escola({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {dict.home.escola.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-white/70">{dict.home.escola.intro}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.home.escola.values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-white/10 p-6"
            >
              <h3 className="font-semibold text-mbjj-blue">{value.title}</h3>
              <p className="mt-2 text-sm text-white/70">{value.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm font-semibold text-white/80">
          {dict.home.escola.affiliation}
        </p>
      </div>
    </section>
  );
}
