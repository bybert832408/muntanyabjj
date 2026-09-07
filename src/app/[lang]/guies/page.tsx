import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import ComingSoon from "@/components/ComingSoon";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return { title: dict.guies.heading };
}

export default async function GuiesPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return (
    <ComingSoon
      heading={dict.guies.heading}
      intro={dict.guies.intro}
      comingSoon={dict.guies.comingSoon}
    />
  );
}
