import { useTranslations } from "@astrojs/starlight/internal";
import en from "../content/i18n/en.json";

// Feature labels, short labels and descriptions live in the UI dictionary
// (src/content/i18n) as feature.<key>.label / .short / .description;
// the order of the keys there is the display order.
export const FEATURE_KEYS = [
  ...new Set(
    Object.keys(en)
      .filter((k) => k.startsWith("feature.") && k !== "feature.heading")
      .map((k) => k.split(".")[1]),
  ),
];

function lookup(feature: string, field: string, lang: string | undefined) {
  const t = useTranslations(lang);
  const key = `feature.${feature}.${field}` as any;
  return t.exists(key) ? t(key) : null;
}

export function featureLabel(
  feature: string,
  lang: string | undefined,
): string {
  return lookup(feature, "label", lang) ?? feature;
}

export function featureShortLabel(
  feature: string,
  lang: string | undefined,
): string {
  return lookup(feature, "short", lang) ?? featureLabel(feature, lang);
}

export function featureDescription(
  feature: string,
  lang: string | undefined,
): string | null {
  return lookup(feature, "description", lang);
}
