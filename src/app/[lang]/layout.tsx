import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HtmlLangSync from "@/components/HtmlLangSync";
import { assetPath, siteOrigin } from "@/lib/asset-path";

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
    metadataBase: new URL(siteOrigin),
    title: {
      default: `${dict.site.name} — ${dict.site.tagline}`,
      template: `%s · ${dict.site.name}`,
    },
    description: dict.site.tagline,
    openGraph: {
      title: dict.site.name,
      description: dict.site.tagline,
      images: [assetPath("/images/logo.png")],
    },
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
