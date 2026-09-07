import type { Dictionary } from "@/lib/dictionaries";
import { contact } from "@/lib/site-config";

export default function Galeria({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {dict.home.galeria.heading}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-center text-xs text-white/40"
            >
              {dict.home.galeria.placeholder}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-white/60">
          {dict.home.galeria.instagramNote}{" "}
          <a
            href={contact.instagramUrl}
            className="font-semibold text-mbjj-blue hover:underline"
          >
            {contact.instagramHandle}
          </a>
        </p>
      </div>
    </section>
  );
}
