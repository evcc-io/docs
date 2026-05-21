export type Lang = "de" | "en";

export const USAGE_LABELS: Record<string, Record<Lang, string>> = {
  grid: { de: "Netzzähler", en: "Grid meter" },
  pv: { de: "PV-Produktion", en: "Solar production" },
  battery: { de: "Batterie", en: "Battery" },
  charge: { de: "Wallbox-Zähler", en: "Charger meter" },
  aux: { de: "Intelligenter Verbraucher", en: "Smart consumer" },
};

export const USAGE_KEYS = Object.keys(USAGE_LABELS);

export function usageLabel(usage: string, lang: Lang): string {
  return USAGE_LABELS[usage]?.[lang] ?? usage;
}
