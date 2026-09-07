import type { Dictionary } from "@/lib/dictionaries";
import { contact } from "@/lib/site-config";

export default function Galeria({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-black/5 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          {dict.home.galeria.heading}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-black/15 bg-offwhite text-center text-xs text-ink/40"
            >
              {dict.home.galeria.placeholder}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink/60">
          {dict.home.galeria.instagramNote}{" "}
          <a
            href={contact.instagramUrl}
            className="font-semibold text-ink underline decoration-blue-logo decoration-2 underline-offset-2"
          >
            {contact.instagramHandle}
          </a>
        </p>
      </div>
    </section>
  );
}
