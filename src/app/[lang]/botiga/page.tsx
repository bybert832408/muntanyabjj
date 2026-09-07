import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import ComingSoon from "@/components/ComingSoon";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return { title: dict.botiga.heading };
}

export default async function BotigaPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return (
    <ComingSoon
      heading={dict.botiga.heading}
      intro={dict.botiga.intro}
      comingSoon={dict.botiga.comingSoon}
    />
  );
}
