type FooterDict = {
  site: { name: string };
  footer: { affiliation: string; contact: string; rights: string };
};

export default function Footer({ dict }: { dict: FooterDict }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mbjj-black text-white/80">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm">
        <p className="font-semibold text-white">{dict.site.name}</p>
        <p className="mt-1">{dict.footer.affiliation}</p>
        <p className="mt-4 text-white/50">
          &copy; {year} {dict.site.name} — {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
