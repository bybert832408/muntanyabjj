import { getDictionary, type Locale } from "@/lib/dictionaries";
import Hero from "@/components/home/Hero";
import Escola from "@/components/home/Escola";
import Instructor from "@/components/home/Instructor";
import Horaris from "@/components/home/Horaris";
import Galeria from "@/components/home/Galeria";
import Ubicacio from "@/components/home/Ubicacio";

export default async function HomePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <>
      <Hero lang={params.lang} dict={dict} />
      <Escola dict={dict} />
      <Instructor dict={dict} />
      <Horaris dict={dict} />
      <Galeria dict={dict} />
      <Ubicacio dict={dict} />
    </>
  );
}
