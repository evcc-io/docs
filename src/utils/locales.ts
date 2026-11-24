import locales from "../locales.json";

export type Locale = keyof typeof locales;
export const LOCALES = Object.keys(locales) as Locale[];
/** Hand-written locales; every other locale is translated from English. */
export const SOURCE_LOCALES: string[] = ["en", "de"];
/** Device templates exist in en and de only; other locales show English data. */
export const templateLocale = (lang: string): "de" | "en" =>
  lang === "de" ? "de" : "en";
export const localePaths = () => LOCALES.map((lang) => ({ params: { lang } }));
