import type caDict from "@/dictionaries/ca.json";
import caJson from "@/dictionaries/ca.json";
import esJson from "@/dictionaries/es.json";
import enJson from "@/dictionaries/en.json";

export const locales = ["ca", "es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ca";

export type Dictionary = typeof caDict;

const dictionaries: Record<Locale, Dictionary> = {
  ca: caJson,
  es: esJson,
  en: enJson,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Acceso por clave punteada, p.ej. t("ca", "nav.tarifes").
 * Para acceso tipado a bloques completos, usar getDictionary(locale) directamente.
 */
export function t(locale: Locale, keyPath: string): string {
  const value = keyPath
    .split(".")
    .reduce<unknown>((node, key) => (node as Record<string, unknown>)?.[key], dictionaries[locale]);

  if (typeof value !== "string") {
    throw new Error(`Clau de diccionari no trobada o no textual: "${keyPath}" (${locale})`);
  }

  return value;
}
