import { marked } from "marked";
import countries from "i18n-iso-countries";
// @ts-ignore
import countriesDe from "i18n-iso-countries/langs/de.json";
// @ts-ignore
import countriesEn from "i18n-iso-countries/langs/en.json";

countries.registerLocale(countriesEn);
countries.registerLocale(countriesDe);

export const TARIFF_GROUPS: Record<string, "price" | "co2" | "solar"> = {
  "Dynamic electricity price": "price",
  "Dynamischer Strompreis": "price",
  "CO₂ Vorhersage": "co2",
  "CO₂ forecast": "co2",
  "PV Vorhersage": "solar",
  "PV forecast": "solar",
};

export const GROUP_SORT_ORDER: Record<string, number> = {
  "Dynamic electricity price": 1,
  "Dynamischer Strompreis": 1,
  "CO₂ Vorhersage": 2,
  "CO₂ forecast": 2,
  "PV Vorhersage": 3,
  "PV forecast": 3,
};

export const CHARGER_GROUPS: Record<string, "smartswitch"> = {
  "Switchable sockets": "smartswitch",
  "Schaltbare Steckdosen": "smartswitch",
};

export const HEATING_GROUPS: Record<string, "heating"> = {
  Wärmeerzeuger: "heating",
  "Heating devices": "heating",
};

export const CODE_PREAMBLES: Record<string, string> = {
  vehicle: "vehicles:\n    - name: my_car",
  charger: "chargers:\n    - name: my_charger",
  smartswitch: "chargers:\n    - name: my_smartswitch",
  heating: "chargers:\n    - name: my_heating",
  meter: "meters:\n    - name: my_meter",
  grid: "meters:\n    - name: my_grid",
  pv: "meters:\n    - name: my_pv",
  battery: "meters:\n    - name: my_battery",
  charge: "meters:\n    - name: my_charger",
  aux: "meters:\n    - name: my_aux",
  price: "tariffs:\n    grid:",
  co2: "tariffs:\n    co2:",
  solar: "tariffs:\n    solar:",
};

const TRANSLATIONS_DE: Record<string, string> = {
  "tab.grid": "Netz",
  "tab.pv": "PV",
  "tab.battery": "Batterie",
  "tab.charge": "Wallbox",
  "tab.aux": "AUX",
  global: "Global",
};

const TRANSLATIONS_EN: Record<string, string> = {
  "tab.grid": "Grid",
  "tab.pv": "PV",
  "tab.battery": "Battery",
  "tab.charge": "Wallbox",
  "tab.aux": "AUX",
  global: "Global",
};

export function translate(lang: "de" | "en", key: string): string {
  if (!key) return key;
  const translations = lang === "de" ? TRANSLATIONS_DE : TRANSLATIONS_EN;
  if (translations[key]) return translations[key];
  const countryName = countries.getName(key, lang);
  if (countryName) return countryName;
  return key;
}

export function renderMarkdown(md: string | undefined | null): string {
  if (!md) return "";
  return marked.parse(md, { async: false }) as string;
}

export function renderMarkdownInline(md: string | undefined | null): string {
  if (!md) return "";
  return marked.parseInline(md, { async: false }) as string;
}

export function indent(code: string, list = false): string {
  if (list) {
    return code
      .replace(/^/, "      - ")
      .replace(/\n/gm, "\n        ");
  }
  return code.replace(/^/gm, "      ");
}

export interface DeviceEntry {
  id: string;
  slug: string;
  data: {
    template?: string;
    product: {
      brand?: string;
      description?: string;
      group?: string;
      identifier?: string;
    };
    description?: string;
    render: Array<{
      usage?: string;
      default: string;
      advanced?: string;
    }>;
    capabilities?: string[];
    requirements?: string[];
    countries?: string[];
  };
}

function brandKey(d: DeviceEntry) {
  const { brand, description } = d.data.product;
  if (brand) {
    return `${brand} ${description ?? ""}`.toLowerCase();
  }
  return (description ?? "").toLowerCase();
}

function groupSortValue(d: DeviceEntry) {
  return GROUP_SORT_ORDER[d.data.product.group ?? ""] ?? 0;
}

export function sortDevices<T extends DeviceEntry>(devices: T[]): T[] {
  return [...devices].sort((a, b) => {
    const va = groupSortValue(a);
    const vb = groupSortValue(b);
    if (va !== vb) return va - vb;
    const ga = (a.data.product.group ?? "").toLowerCase();
    const gb = (b.data.product.group ?? "").toLowerCase();
    if (ga !== gb) return ga < gb ? -1 : 1;
    return brandKey(a) < brandKey(b) ? -1 : 1;
  });
}

export function groupBy<T extends DeviceEntry>(devices: T[]): Map<string, T[]> {
  const out = new Map<string, T[]>();
  for (const d of devices) {
    const g = d.data.product.group ?? "";
    if (!out.has(g)) out.set(g, []);
    out.get(g)!.push(d);
  }
  return out;
}

export function filterMetersByUsage<T extends DeviceEntry & { data: { render: Array<{ usage?: string }> } }>(
  meters: T[],
  usage: "grid" | "pv" | "battery" | "charge" | "aux",
): T[] {
  return meters.filter((m) =>
    m.data.render.some((r) => r.usage === usage),
  );
}

export function filterByType<T extends DeviceEntry>(
  devices: T[],
  type: "charger" | "smartswitch" | "heating",
): T[] {
  if (type === "smartswitch") {
    return devices.filter(
      (d) => CHARGER_GROUPS[d.data.product.group ?? ""] === "smartswitch",
    );
  }
  if (type === "heating") {
    return devices.filter(
      (d) => HEATING_GROUPS[d.data.product.group ?? ""] === "heating",
    );
  }
  // charger: exclude smartswitch + heating
  return devices.filter((d) => {
    const g = d.data.product.group ?? "";
    return CHARGER_GROUPS[g] !== "smartswitch" && HEATING_GROUPS[g] !== "heating";
  });
}

export function featuresFor(
  type: "charger" | "meter" | "tariff" | "vehicle" | "smartswitch" | "heating",
  entry: DeviceEntry,
  lang: "de" | "en",
): string[] {
  const countryList =
    type === "tariff"
      ? (entry.data.countries ?? ["global"]).map((c) => translate(lang, c))
      : [];

  let features = [
    ...(entry.data.capabilities ?? []),
    ...(entry.data.requirements ?? []),
    ...countryList,
  ].filter((f) => f !== "skiptest");

  if (type === "charger") {
    const idx = features.indexOf("sponsorship");
    if (idx > -1) features.splice(idx, 1);
    else features.push("sponsorfree");
  }

  const eebusIdx = features.indexOf("eebus");
  if (eebusIdx > -1) features.splice(eebusIdx, 1);

  return features;
}
