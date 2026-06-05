import { getCollection } from "astro:content";
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
    return code.replace(/^/, "      - ").replace(/\n/gm, "\n        ");
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

export function filterMetersByUsage<
  T extends DeviceEntry & { data: { render: Array<{ usage?: string }> } },
>(meters: T[], usage: "grid" | "pv" | "battery" | "charge" | "aux"): T[] {
  return meters.filter((m) => m.data.render.some((r) => r.usage === usage));
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
    return (
      CHARGER_GROUPS[g] !== "smartswitch" && HEATING_GROUPS[g] !== "heating"
    );
  });
}

function stableStringify(value: any): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  const keys = Object.keys(value).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
}

// Compare release and nightly entries on the fields the user actually sees:
// description, capabilities + requirements, params, and render (the YAML
// config block). Deprecated params are dropped from both sides — DeviceParams
// hides them anyway, so a nightly-only `deprecated: true` row shouldn't
// surface the toggle.
export function nightlyDiffersFromRelease(
  release: DeviceEntry,
  nightly: DeviceEntry | undefined,
): boolean {
  if (!nightly) return false;
  const stripParams = (params: any[] | undefined) =>
    (params ?? []).filter((p) => p && p.name && !p.deprecated);
  const snapshot = (e: DeviceEntry) => ({
    description: e.data.description ?? "",
    capabilities: [...(e.data.capabilities ?? [])].sort(),
    requirements: [...(e.data.requirements ?? [])].sort(),
    params: stripParams((e.data as any).params),
    render: (e.data as any).render ?? [],
  });
  return (
    stableStringify(snapshot(release)) !== stableStringify(snapshot(nightly))
  );
}

/**
 * Features surfaced on a device-overview row (chargers/meters/etc.).
 * Mirrors the chip set rendered by `DeviceCardList`.
 */
const OVERVIEW_HIDDEN = new Set([
  "sponsorship",
  "sponsorfree",
  "skiptest",
  "eebus",
]);

export function overviewFeaturesFor(
  d: DeviceEntry,
  opts: { showSponsorFree?: boolean; showSponsorRequired?: boolean } = {},
): string[] {
  const base = [
    ...(d.data.capabilities ?? []),
    ...(d.data.requirements ?? []),
  ].filter((f) => !OVERVIEW_HIDDEN.has(f));
  const requiresSponsorship = (d.data.requirements ?? []).includes(
    "sponsorship",
  );
  // The two sponsor chips are independent: enable the green "sponsorship" chip,
  // the grey "sponsorfree" inverse, or both.
  if (opts.showSponsorRequired && requiresSponsorship) base.push("sponsorship");
  if (opts.showSponsorFree && !requiresSponsorship) base.push("sponsorfree");
  return base;
}

import { FEATURE_KEYS } from "@components/features";

export function availableOverviewFeatures(
  devices: DeviceEntry[],
  opts: { showSponsorFree?: boolean; showSponsorRequired?: boolean } = {},
): string[] {
  const seen = new Set<string>();
  for (const d of devices)
    for (const f of overviewFeaturesFor(d, opts)) seen.add(f);
  // "sponsorship" is surfaced as a coloured row badge, not a filter toggle.
  seen.delete("sponsorship");
  return [...seen].sort((a, b) => {
    const ia = FEATURE_KEYS.indexOf(a);
    const ib = FEATURE_KEYS.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

import { USAGE_KEYS, usageLabel } from "@utils/usages";

export function availableUsages(
  devices: Array<DeviceEntry & { data: { render: Array<{ usage?: string }> } }>,
): string[] {
  const seen = new Set<string>();
  for (const d of devices)
    for (const r of d.data.render) if (r.usage) seen.add(r.usage);
  return [...seen].sort(
    (a, b) => USAGE_KEYS.indexOf(a) - USAGE_KEYS.indexOf(b),
  );
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

  // "sponsorship" is surfaced via the info box (and, for chargers, the grey
  // "sponsorfree" inverse badge) — never as a plain feature chip.
  const sponsorshipIdx = features.indexOf("sponsorship");
  if (sponsorshipIdx > -1) features.splice(sponsorshipIdx, 1);
  else if (type === "charger") features.push("sponsorfree");

  const eebusIdx = features.indexOf("eebus");
  if (eebusIdx > -1) features.splice(eebusIdx, 1);

  return features;
}

export type Channel = "release" | "nightly";

/**
 * Content-collection key for a device category, e.g.
 * `collectionName("chargers", "en", "nightly")` → `"chargers-nightly-en"`.
 * The prefix matches the collection keys in `content.config.ts` (plural).
 * Smart switches and heating use the `chargers` collection.
 */
export function collectionName(
  prefix: "chargers" | "meters" | "vehicles" | "tariffs",
  lang: "de" | "en",
  channel: Channel,
): string {
  return `${prefix}-${channel === "nightly" ? "nightly-" : ""}${lang}`;
}

/**
 * StarlightPage frontmatter fragment that keeps a page out of search engines
 * (noindex meta) and the local Pagefind index (`pagefind: false` makes
 * Starlight drop the `data-pagefind-body` marker). Spread into nightly pages.
 */
export const nightlyPageHead = [
  { tag: "meta" as const, attrs: { name: "robots", content: "noindex" } },
];

/** Link to the device's source template in the evcc repo (undefined if none). */
export function templateEditUrl(
  entry: DeviceEntry,
  dir: "charger" | "meter" | "vehicle" | "tariff",
): string | undefined {
  return entry.data.template
    ? `https://github.com/evcc-io/evcc/tree/master/templates/definition/${dir}/${entry.data.template}.yaml`
    : undefined;
}

/** YAML config blocks for a device detail page (non-meter categories). */
export function buildCodeBlocks(
  entry: DeviceEntry,
  type: "charger" | "vehicle" | "smartswitch" | "heating" | "tariff",
): string[] {
  const render = (entry.data.render as any[]) ?? [];
  if (type === "tariff") {
    const groupKey = TARIFF_GROUPS[entry.data.product.group ?? ""] ?? "price";
    const preamble = CODE_PREAMBLES[groupKey];
    const list = groupKey === "solar";
    return render.map((r) => {
      const src = r.advanced ?? r.default;
      return `${preamble}\n${indent(src, list).trimEnd()}`;
    });
  }
  return render.map((r) => {
    const preamble =
      type === "charger"
        ? (CODE_PREAMBLES[r.usage ?? "charger"] ?? CODE_PREAMBLES.charger)
        : CODE_PREAMBLES[type];
    const src = r.advanced ?? r.default;
    return `${preamble}\n${indent(src).trimEnd()}`;
  });
}

/**
 * Static paths for a device detail route. Loads the channel's collection plus
 * its counterpart, and resolves a cross-channel link: release pages link to
 * nightly only when it differs, nightly pages link back to release when a
 * same-id entry exists.
 */
export async function deviceDetailPaths(opts: {
  prefix: "chargers" | "meters" | "vehicles" | "tariffs";
  /** URL segment, e.g. "smartswitches" (may differ from the collection prefix). */
  urlType: string;
  channel: Channel;
  filterType?: "charger" | "smartswitch" | "heating";
}) {
  const { prefix, urlType, channel, filterType } = opts;
  const other: Channel = channel === "nightly" ? "release" : "nightly";
  const paths: any[] = [];
  for (const lang of ["en", "de"] as const) {
    const coll = await getCollection(
      collectionName(prefix, lang, channel) as any,
    );
    const otherColl = await getCollection(
      collectionName(prefix, lang, other) as any,
    );
    const otherById = new Map<string, any>(
      otherColl.map((e: any) => [e.id, e]),
    );
    const list = filterType
      ? filterByType(coll as any, filterType)
      : (coll as any[]);
    for (const entry of list) {
      const otherEntry = otherById.get(entry.id);
      const counterpartHref =
        channel === "release"
          ? nightlyDiffersFromRelease(entry, otherEntry)
            ? `/${lang}/nightly/${urlType}/${entry.id}`
            : undefined
          : otherEntry
            ? `/${lang}/${urlType}/${entry.id}`
            : undefined;
      paths.push({
        params: { lang, slug: entry.id },
        props: { entry, lang, counterpartHref },
      });
    }
  }
  return paths;
}

/** Usage-tab descriptors for a meter detail page. */
export function buildMeterTabs(entry: DeviceEntry, lang: "de" | "en") {
  return ((entry.data.render as any[]) ?? []).map((render) => {
    const usage = render.usage ?? "meter";
    const preamble = CODE_PREAMBLES[usage] ?? CODE_PREAMBLES.meter;
    const src = render.advanced ?? render.default;
    return {
      usage,
      label: usageLabel(usage, lang),
      code: `${preamble}\n${indent(src).trimEnd()}`,
    };
  });
}
