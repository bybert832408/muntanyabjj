import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import ComingSoon from "@/components/ComingSoon";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return { title: dict.camps.heading };
}

export default async function CampsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return (
    <ComingSoon
      heading={dict.camps.heading}
      intro={dict.camps.intro}
      comingSoon={dict.camps.comingSoon}
    />
  );
}
