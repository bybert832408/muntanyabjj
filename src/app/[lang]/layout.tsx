import { getDictionary, locales, type Locale } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HtmlLangSync from "@/components/HtmlLangSync";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
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
