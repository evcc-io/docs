type Lang = "de" | "en";

const labels: Record<string, Partial<Record<Lang, string>>> = {
  "1p3p": { de: "1P/3P", en: "1P/3P" },
  mA: { de: "mA-Regelung", en: "mA regulation" },
  meter: { de: "Integrierter Zähler", en: "Built-in meter" },
  rfid: { de: "RFID", en: "RFID" },
  "battery-control": { de: "Batteriesteuerung", en: "Battery control" },
  iso151182: { de: "ISO 15118-2", en: "ISO 15118-2" },
  "iso15118-2": { de: "ISO 15118-2", en: "ISO 15118-2" },
  dim: { de: "Dimmbar", en: "Dimmable" },
  curtail: { de: "Abregelbar", en: "Curtailable" },
  sponsorship: { de: "Sponsortoken", en: "Sponsor token" },
  sponsorfree: { de: "Kein Sponsortoken", en: "No sponsor token" },
  skiptest: { de: "", en: "" },
  ocpp: { de: "OCPP", en: "OCPP" },
  eebus: { de: "EEBus", en: "EEBus" },
};

const shortLabels: Record<string, Partial<Record<Lang, string>>> = {
  mA: { de: "mA", en: "mA" },
  meter: { de: "Zähler", en: "meter" },
  "battery-control": { de: "Batteriesteuerung", en: "battery control" },
  iso151182: { de: "ISO", en: "ISO" },
  "iso15118-2": { de: "ISO", en: "ISO" },
  dim: { de: "dimmbar", en: "dimmable" },
  curtail: { de: "abregelbar", en: "curtailable" },
  sponsorship: { de: "Sponsoring", en: "sponsoring" },
  sponsorfree: { de: "sponsorfrei", en: "sponsor free" },
};

const descriptions: Record<string, Partial<Record<Lang, string>>> = {
  "1p3p": {
    de: "Automatische Phasenumschaltung. Nützlich beim [PV-Überschussladen](/de/features/solar-charging).",
    en: "Automatic phase switching. Useful for [solar surplus charging](/en/features/solar-charging).",
  },
  mA: {
    de: "Feinere Ladestromregelung (mA statt A) für bessere PV-Überschussnutzung.",
    en: "Finer charging current regulation (mA instead of A) for better solar surplus use.",
  },
  rfid: {
    de: "Integrierter RFID-Kartenleser zur [Fahrzeugerkennung](/de/features/vehicle).",
    en: "Integrated RFID card reader for [vehicle identification](/en/features/vehicle).",
  },
  meter: {
    de: "Unterstützung für einen integrierten Zähler.",
    en: "Support for an integrated meter.",
  },
  iso151182: {
    de: "Plug & Charge (Fahrzeugerkennung, SoC-Übermittlung).",
    en: "Plug & Charge (vehicle identification, SoC transmission).",
  },
  "iso15118-2": {
    de: "Plug & Charge (Fahrzeugerkennung, SoC-Übermittlung).",
    en: "Plug & Charge (vehicle identification, SoC transmission).",
  },
  "battery-control": {
    de: "Externe Steuerung von Hausbatterie-Lade- und Entladevorgängen durch evcc.",
    en: "External control of home battery charging and discharging via evcc.",
  },
  dim: {
    de: "Verbrauchsleistung kann reduziert werden (bspw. §14a EnWG). Siehe [Externe Steuerung](/de/features/external-control).",
    en: "Power consumption can be reduced (e.g. §14a EnWG). See [External Control](/en/features/external-control).",
  },
  curtail: {
    de: "Wechselrichter-Erzeugung kann reduziert werden (bspw. §9 EEG). Siehe [Externe Steuerung](/de/features/external-control).",
    en: "Inverter production can be reduced (e.g. §9 EEG). See [External Control](/en/features/external-control).",
  },
  ocpp: {
    de: "Kommunikation über das offene OCPP-Protokoll.",
    en: "Communication via the open OCPP protocol.",
  },
};

export function featureLabel(feature: string, lang: Lang): string {
  const entry = labels[feature];
  if (entry && entry[lang]) return entry[lang]!;
  return feature;
}

export function featureShortLabel(feature: string, lang: Lang): string {
  const entry = shortLabels[feature];
  if (entry && entry[lang]) return entry[lang]!;
  return featureLabel(feature, lang);
}

export function featureDescription(feature: string, lang: Lang): string | null {
  const entry = descriptions[feature];
  if (entry && entry[lang]) return entry[lang]!;
  return null;
}

export const FEATURE_KEYS = Object.keys(labels);
