#!/usr/bin/env node
// Usage: node scripts/i18n/batches.mjs <lang> --phase core|blog|site|all[+…] --docs <abs path> [--site <abs path>] [--only a.mdx,b.md]
// Prints the locale object for the translate-locale workflow:
// {lang, name, docs, site, batches: [{id, tier, kind, files, words}]}
// files are en-relative paths (docs, blog), the chrome dictionary path or website paths (site).
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { LANG_NAMES, flatten, listPages, readJson, words } from "./lib.mjs";

const MAX_WORDS = 3000;
const INTROS = [
  "chargers",
  "meters",
  "vehicles",
  "smartswitches",
  "heating",
  "heating-outro",
  "tariffs",
  "external-limit",
  "external-limit-outro",
  "curtailment-devices",
  "notifications",
  "notifications-outro",
].map((n) => `_intros/${n}`);

// Entries resolve to .md or .mdx and are dropped when missing.
// _intros/<name> also matches _intros/_<name>.mdx and is always kept (the partials may not exist yet).
const CORE = [
  [
    "B02",
    "core1",
    [
      "index",
      "installation/index",
      "installation/considerations",
      "installation/configuration",
    ],
  ],
  [
    "B03",
    "core1",
    [
      "installation/linux",
      "installation/linux-image",
      "installation/proxmox",
      "installation/freebsd",
    ],
  ],
  ["B04", "core1", ["installation/docker", "installation/home-assistant"]],
  ["B05", "core1", ["installation/macos", "installation/windows"]],
  [
    "B06",
    "core1",
    [
      "features/solar-charging",
      "features/modes",
      "features/dynamic-prices",
      "features/plans",
      "features/co2",
      "features/dynamic-feedin",
    ],
  ],
  [
    "B07",
    "core1",
    ["features/battery", "features/limits", "features/optimizer"],
  ],
  ["B08", "core1", ["features/vehicle", "features/sessions", "features/app"]],
  ["B09", "core1", ["features/loadmanagement", "features/remote-access"]],
  [
    "B10",
    "core2",
    [
      "integrations/mcp",
      "integrations/mqtt-api",
      "integrations/ocpp-forwarding",
      "integrations/sma-sunny-home-manager",
    ],
  ],
  [
    "B11",
    "core2",
    [
      "smarthome/awesome",
      "smarthome/garmin",
      "smarthome/home-assistant",
      "smarthome/homey",
      "smarthome/iobroker",
      "smarthome/openhab",
    ],
  ],
  [
    "B12",
    "core2",
    [
      "reference/configuration/index",
      "reference/configuration/site",
      "reference/configuration/loadpoints",
    ],
  ],
  [
    "B13",
    "core2",
    [
      "reference/configuration/meters",
      "reference/configuration/chargers",
      "reference/configuration/vehicles",
      "reference/configuration/tariffs",
    ],
  ],
  [
    "B14",
    "core2",
    [
      "hems",
      "curtailers",
      "eebus",
      "modbusproxy",
      "mqtt",
      "messaging",
      "influx",
      "interval",
      "log",
      "sponsortoken",
      "telemetry",
      "uri",
    ].map((n) => `reference/configuration/${n}`),
  ],
  [
    "B15",
    "core2",
    [
      "reference/modbus",
      "reference/web-ui",
      "reference/white-label",
      "reference/app",
      "reference/index",
    ],
  ],
  ["B16", "core2", ["reference/plugins"]],
  ["B17", "core2", ["user-defined-devices"]],
  ["B18", "core2", ["faq"]],
  ["B19", "core2", ["contribute", "report-a-problem", "sponsorship"]],
  [
    "B20",
    "core2",
    [
      "media",
      ...INTROS,
      "tariffs/_dynamic_electricity_price",
      "tariffs/_pv_forecast",
    ],
  ],
];

// newest first, ~3k words each
const BLOG = [
  ["2026/10/29/joerg-meintechblog"],
  [
    "2026/10/12/moove-podcast",
    "2026/09/25/highlights-smart-battery-solar-share",
    "2026/08/27/skoda-vehicle-api",
  ],
  [
    "2026/08/19/highlights-release-process-optimizer-customize",
    "2026/07/18/highlights-remote-access-widgets-optimizer",
  ],
  [
    "2026/04/20/community-treffen-rueckblick",
    "2026/02/25/crowdscience",
    "2026/02/18/github-secure-open-source-fund",
  ],
  [
    "2026/01/28/alex-fahrlehrer",
    "2026/01/26/smarthuette-podcast",
    "2026/01/01/highlights-browser-config-ready",
  ],
  [
    "2025/12/18/eu-data-act-petition",
    "2025/12/16/community-treffen-2026",
    "2025/11/29/osnabruecker-ruderverein",
    "2025/10/04/tobias-aus-trebur",
  ],
  [
    "2025/07/30/highlights-config-ui-feedin-ai",
    "2025/06/30/michael-vom-core-team",
  ],
  [
    "2025/04/26/ulrike-und-gunther-aus-alzenau",
    "2025/04/25/evcc-app-fdroid",
    "2025/03/01/evcc-app-for-ios-android",
    "2025/02/19/highlights-forecasts-config-ui",
  ],
  [
    "2025/01/20/tesla-api-update",
    "2024/12/21/olaf-aus-bergisch-gladbach",
    "2024/11/22/highlights-charts-stats",
  ],
  [
    "2024/11/14/andreas-aus-wettringen",
    "2024/10/25/portrait-bastian-aus-alhorn",
    "2024/09/21/portrait-tjarko-grossefehn",
  ],
  [
    "2024/08/25/portrait-christian-trebbin",
    "2024/08/17/highlights-14a-enwg-ocpp-loadmanagement-elli",
    "2024/08/09/portrait-arne-gifhorn",
  ],
  [
    "2024/02/01/v0.124-new-tesla-api",
    "2023/10/05/feature-highlights-10-2023",
    "2023/05/17/linux-infotag-talk",
    "2023/01/11/release-111",
  ],
  [
    "2022/11/26/one-time-sponsoring",
    "2022/05/08/phases-templates-lithuanian",
    "2022/01/18/pvmagazin",
    "2022/01/09/version-0-80",
    "2021/12/31/version-0-77",
    "2021/12/29/version-0-76",
    "2021/12/19/version-0-74",
    "2021/12/12/version-0-73",
    "2021/12/10/version-0-72",
    "2021/12/09/blog-und-dokumentation",
  ],
].map((files, i) => [
  `BL${String(i + 1).padStart(2, "0")}`,
  "blog",
  files.map((f) => `blog/${f}`),
]);

// --- args
const argv = process.argv.slice(2);
const opt = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const lang = argv[0];
const phase = opt("phase");
const docs = opt("docs") && resolve(opt("docs"));
const site = opt("site") && resolve(opt("site"));
const only = opt("only")
  ?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);
if (!lang || lang.startsWith("--") || !phase || !docs) {
  console.error(
    "usage: batches.mjs <lang> --phase core|blog|site|all --docs <abs path> [--site <abs path>] [--only a.mdx,b.md]",
  );
  process.exit(2);
}
const phases = new Set(
  phase === "all" ? ["core", "blog", "site"] : phase.split("+"),
);

const root = process.env.DOCS_ROOT
  ? resolve(process.env.DOCS_ROOT)
  : join(docs, "src/content/docs");
const enPages = listPages("en", root);
const enSet = new Set(enPages);
const fileWords = (rel) => {
  const p = join(root, "en", rel);
  return existsSync(p) ? words(readFileSync(p, "utf8")) : 0;
};
const resolveEntry = (e) => {
  const alt = e.replace(/^_intros\//, "_intros/_");
  const found = [`${e}.mdx`, `${e}.md`, `${alt}.mdx`].find((f) => enSet.has(f));
  return found ?? (e.startsWith("_intros/") ? `${alt}.mdx` : undefined);
};
const batch = (id, tier, kind, files) => ({
  id,
  tier,
  kind,
  files,
  words: files.reduce((a, f) => a + fileWords(f), 0),
});

// group files by directory into <= MAX_WORDS batches (order kept)
function group(files, prefix, tier, kind) {
  const out = [];
  let cur = [];
  let w = 0;
  const flush = () => {
    if (cur.length)
      out.push(
        batch(
          `${prefix}${String(out.length + 1).padStart(2, "0")}`,
          tier,
          kind,
          cur,
        ),
      );
    cur = [];
    w = 0;
  };
  for (const f of files) {
    const fw = fileWords(f);
    if (cur.length && (w + fw > MAX_WORDS || dirname(f) !== dirname(cur[0])))
      flush();
    cur.push(f);
    w += fw;
  }
  flush();
  return out;
}

const table = [...CORE, ...BLOG].map(([id, tier, entries]) => [
  id,
  tier,
  entries.map(resolveEntry).filter(Boolean),
]);
const tabled = new Set(table.flatMap(([, , f]) => f));
const keep = (f) => !only || only.includes(f);

const batches = [];
if (phases.has("core")) {
  const dictPath = `src/content/i18n/${lang}.json`;
  if (!only || only.includes(dictPath) || only.includes("chrome")) {
    const en = readJson(join(dirname(root), "i18n/en.json"));
    const w = en ? words(Object.values(flatten(en)).join(" ")) : 1500;
    batches.push({
      id: "B01",
      tier: "core1",
      kind: "chrome",
      files: [dictPath],
      words: w,
    });
  }
  for (const [id, tier, files] of table.filter(([id]) => /^B\d/.test(id))) {
    const f = files.filter(keep);
    if (f.length) batches.push(batch(id, tier, "docs", f));
  }
  const rest = enPages.filter(
    (f) => !f.startsWith("blog/") && !tabled.has(f) && keep(f),
  );
  batches.push(...group(rest, "BX", "core2", "docs"));
}
if (phases.has("blog")) {
  // posts newer than the table first, newest first
  const rest = enPages
    .filter((f) => f.startsWith("blog/") && !tabled.has(f) && keep(f))
    .sort()
    .reverse();
  const out = [];
  let cur = [];
  for (const f of rest) {
    if (cur.length && batch("", "", "", [...cur, f]).words > MAX_WORDS)
      (out.push(cur), (cur = []));
    cur.push(f);
  }
  if (cur.length) out.push(cur);
  out.forEach((f, i) =>
    batches.push(
      batch(`BN${String(i + 1).padStart(2, "0")}`, "blog", "blog", f),
    ),
  );
  for (const [id, tier, files] of table.filter(([id]) => id.startsWith("BL"))) {
    const f = files.filter(keep);
    if (f.length) batches.push(batch(id, tier, "blog", f));
  }
}
if (phases.has("site") && site && (!only || only.includes("site"))) {
  const src = [
    "i18n/en.toml",
    "content/_index.en.md",
    "content/media-kit.en.md",
  ]
    .map((f) => join(site, f))
    .filter(existsSync);
  batches.push({
    id: "S01",
    tier: "site",
    kind: "site",
    files: [
      `config.toml#languages.${lang}`,
      `i18n/${lang}.toml`,
      `content/_index.${lang}.md`,
      `content/media-kit.${lang}.md`,
    ],
    words: src.reduce((a, f) => a + words(readFileSync(f, "utf8")), 0) || 1400,
  });
}

console.log(
  JSON.stringify(
    { lang, name: LANG_NAMES[lang] ?? lang, docs, site: site ?? null, batches },
    null,
    2,
  ),
);
