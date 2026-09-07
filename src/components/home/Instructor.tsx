import type { Dictionary } from "@/lib/dictionaries";
import { assetPath } from "@/lib/asset-path";

export default function Instructor({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-black/5 bg-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:grid-cols-[minmax(0,260px)_1fr] sm:items-start">
        <picture>
          <source
            type="image/webp"
            srcSet={[
              `${assetPath("/images/pablo-medalles-480.webp")} 480w`,
              `${assetPath("/images/pablo-medalles-800.webp")} 800w`,
            ].join(", ")}
            sizes="(min-width: 640px) 260px, 60vw"
          />
          <img
            src={assetPath("/images/pablo-medalles-800.jpg")}
            alt={dict.home.instructor.name}
            width={800}
            height={1050}
            loading="lazy"
            className="mx-auto w-full max-w-[260px] rounded-2xl border border-black/10 object-cover"
          />
        </picture>

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
      </div>
    </section>
  );
}
