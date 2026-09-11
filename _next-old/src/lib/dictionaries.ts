import type caDict from "@/dictionaries/ca.json";

export const locales = ["ca", "es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ca";

export type Dictionary = typeof caDict;

const dictionaries = {
  ca: () => import("@/dictionaries/ca.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
