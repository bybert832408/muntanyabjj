import type { Dictionary } from "@/lib/dictionaries";
import { contact } from "@/lib/site-config";

export default function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mbjj-black text-white/80">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm">
        <p className="font-semibold text-white">{dict.site.name}</p>
        <p className="mt-1">{dict.footer.affiliation}</p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          <a
            href={`https://wa.me/${contact.whatsappNumber}`}
            className="hover:text-white"
          >
            {contact.whatsappDisplay}
          </a>
          <a href={contact.instagramUrl} className="hover:text-white">
            {dict.footer.instagram} {contact.instagramHandle}
          </a>
        </div>

        <p className="mt-4 text-white/50">
          &copy; {year} {dict.site.name} — {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
