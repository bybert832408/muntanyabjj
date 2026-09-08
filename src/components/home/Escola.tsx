import type { Dictionary } from "@/lib/dictionaries";

export default function Escola({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-black/5 bg-offwhite">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:pt-28 lg:pt-36">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          {dict.home.escola.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70">{dict.home.escola.intro}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.home.escola.values.map((value, i) => (
            <div
              key={value.title}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-logo text-sm font-bold text-ink">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{value.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm font-semibold text-ink/80">
          {dict.home.escola.affiliation}
        </p>
      </div>
    </section>
  );
}
