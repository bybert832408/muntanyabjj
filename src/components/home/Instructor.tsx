import type { Dictionary } from "@/lib/dictionaries";
import { assetPath } from "@/lib/asset-path";

export default function Instructor({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-black/5 bg-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:grid-cols-[1.2fr_1fr] sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            {dict.home.instructor.heading}
          </h2>
          <p className="mt-2 inline-block rounded-full bg-blue-logo/10 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-ink">
            {dict.home.instructor.name} · {dict.home.instructor.role}
          </p>
          <p className="mt-4 text-ink/70">{dict.home.instructor.bio}</p>

          <div className="mt-6 rounded-2xl border border-black/10 bg-offwhite p-6">
            <h3 className="font-semibold text-ink">
              {dict.home.instructor.lineageHeading}
            </h3>
            <p className="mt-2 text-sm text-ink/70">
              {dict.home.instructor.lineageText}
            </p>
          </div>
        </div>

        <div className="relative flex h-64 items-end justify-center sm:h-[420px] lg:h-[480px]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 85% at 62% 38%, #1E3A8A 0%, #1E3A8A 32%, rgba(30,58,138,0.55) 55%, rgba(30,58,138,0) 85%)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-aware src, transparent cutout meant to sit directly on the gradient, no card framing */}
          <img
            src={assetPath("/images/pablo-instructor.png")}
            alt={dict.home.instructor.name}
            width={577}
            height={1000}
            className="relative h-full w-auto object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
