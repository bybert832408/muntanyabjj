import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";

export default function Instructor({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:grid-cols-[minmax(0,260px)_1fr] sm:items-start">
        <Image
          src="/images/pablo-medalles.png"
          alt={dict.home.instructor.name}
          width={1170}
          height={1535}
          className="mx-auto w-full max-w-[260px] rounded-2xl border border-white/10 object-cover"
        />

        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {dict.home.instructor.heading}
          </h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-mbjj-blue">
            {dict.home.instructor.name} · {dict.home.instructor.role}
          </p>
          <p className="mt-4 text-white/70">{dict.home.instructor.bio}</p>

          <div className="mt-6 rounded-2xl border border-white/10 p-6">
            <h3 className="font-semibold text-white">
              {dict.home.instructor.lineageHeading}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {dict.home.instructor.lineageText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
