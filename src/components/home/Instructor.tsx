import type { Dictionary } from "@/lib/dictionaries";
import { assetPath } from "@/lib/asset-path";

export default function Instructor({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-white/10">
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
            className="mx-auto w-full max-w-[260px] rounded-2xl border border-white/10 object-cover"
          />
        </picture>

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
