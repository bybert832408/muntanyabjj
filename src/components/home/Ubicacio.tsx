import type { Dictionary } from "@/lib/dictionaries";
import { contact, location, osmEmbedUrl, osmLink } from "@/lib/site-config";

export default function Ubicacio({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {dict.home.ubicacio.heading}
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title={location.name}
              src={osmEmbedUrl()}
              className="h-72 w-full"
              loading="lazy"
            />
            <a
              href={osmLink()}
              className="block bg-white/5 px-4 py-2 text-center text-sm text-mbjj-blue hover:underline"
            >
              {dict.home.ubicacio.mapLinkLabel}
            </a>
          </div>

          <dl className="space-y-6 text-sm">
            <div>
              <dt className="text-white/50">{dict.home.ubicacio.addressLabel}</dt>
              <dd className="mt-1 font-semibold text-white">{location.name}</dd>
            </div>
            <div>
              <dt className="text-white/50">{dict.home.ubicacio.phoneLabel}</dt>
              <dd className="mt-1">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  className="font-semibold text-mbjj-blue hover:underline"
                >
                  {contact.whatsappDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/50">{dict.home.ubicacio.instagramLabel}</dt>
              <dd className="mt-1">
                <a
                  href={contact.instagramUrl}
                  className="font-semibold text-mbjj-blue hover:underline"
                >
                  {contact.instagramHandle}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
