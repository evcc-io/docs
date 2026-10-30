import { useTranslations } from "@astrojs/starlight/internal";

export const USAGE_KEYS = ["grid", "pv", "battery", "charge", "aux"];

export function usageLabel(usage: string, lang: string | undefined): string {
  const t = useTranslations(lang);
  return USAGE_KEYS.includes(usage) ? t(`usage.${usage}` as any) : usage;
}
