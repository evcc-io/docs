import { useTranslations } from "@astrojs/starlight/internal";

// Feature labels, short labels and descriptions live in the UI dictionary
// (src/content/i18n) as feature.<key>.label / .short / .description.
export const FEATURE_KEYS = [
  "1p3p",
  "mA",
  "meter",
  "rfid",
  "battery-control",
  "iso151182",
  "iso15118-2",
  "dim",
  "curtail",
  "sponsorship",
  "sponsorfree",
  "skiptest",
  "ocpp",
  "eebus",
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
