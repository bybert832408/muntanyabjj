import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HtmlLangSync from "@/components/HtmlLangSync";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: {
      default: `${dict.site.name} — ${dict.site.tagline}`,
      template: `%s · ${dict.site.name}`,
    },
    description: dict.site.tagline,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <>
      <HtmlLangSync lang={lang} />
      <Header lang={lang} dict={dict} />
      <main>{children}</main>
      <Footer dict={dict} />
    </>
  );
}
