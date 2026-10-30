#!/usr/bin/env node
// Usage: node scripts/i18n/glossary-check.mjs <lang>
// Report only: English glossary terms left in translated prose, occurrence counts per agreed term,
// compound/hyphen slips and register leaks. Exit 1 when leaks or pattern hits exist.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  DOCS,
  EVCC,
  evccI18n,
  flatten,
  glossary,
  listPages,
  maskCode,
  splitFrontmatter,
  wordRe,
} from "./lib.mjs";

const lang = process.argv[2];
if (!lang || !EVCC) {
  console.error(
    lang
      ? "evcc repo not found (expected ../evcc or EVCC_ROOT)"
      : "usage: glossary-check.mjs <lang>",
  );
  process.exit(2);
}

const gEn = glossary("en");
const gL = glossary(lang) ?? {};
// words that are part of the target language anyway (UI strings, agreed terms) are no leaks
const native = Object.values(flatten(evccI18n(lang) ?? {}))
  .concat(Object.values(gL))
  .join("\n");

// compounds written with a hyphen after a symbol/abbreviation: flag the spaced variant
const EXTRA = {
  nl: ["OCPP-verbinding", "MQTT-broker", "EEBUS-apparaat"],
  da: ["OCPP-forbindelse", "MQTT-broker"],
  cs: [],
  fr: [],
  it: [],
};
const compounds = [
  ...Object.values(gL).filter((t) => /^[A-Z₀-₉0-9]+-\p{Ll}/u.test(t)),
  ...(EXTRA[lang] ?? []),
];
const PATTERNS = [
  [/(?<![\w.\/-])CO2(?![\w.])/g, "CO2 instead of CO₂"],
  ...compounds.map((c) => [
    wordRe([c.replace("-", " ")], "gu"),
    `"${c.replace("-", " ")}" instead of ${c}`,
  ]),
];
const REGISTER = {
  nl: ["je", "jij", "jou", "jouw"],
  fr: ["tu", "ton", "ta", "tes", "toi"],
  // "ty" is left out: it is also the plural demonstrative ("ty soubory")
  cs: [
    "tvůj",
    "tvoje",
    "tvá",
    "tvé",
    "tvého",
    "tvému",
    "tvým",
    "tvými",
    "tebe",
    "tobě",
    "tebou",
  ],
};
if (REGISTER[lang]) PATTERNS.push([wordRe(REGISTER[lang]), "informal address"]);

// prose of all target pages: title, description, body without code, tags, link targets
const pages = listPages(lang).map((rel) => {
  const text = readFileSync(join(DOCS, lang, rel), "utf8");
  const { data, body, offset } = splitFrontmatter(text);
  const prose = maskCode(body)
    .masked.replace(/<\/?[A-Za-z][^>]*>/g, (s) => s.replace(/[^\n]/g, " "))
    .replace(/\]\([^)]*\)|\{[^}\n]*\}|https?:\/\/\S+/g, " ");
  const head = offset
    ? [
        `${data.title ?? ""} ${data.description ?? ""}`,
        ...Array(offset - 1).fill(""),
      ]
    : [];
  const lines = [...head, ...prose.split("\n")];
  return { rel, lines };
});

const hits = (re) => {
  const out = [];
  for (const { rel, lines } of pages)
    lines.forEach((l, i) => {
      for (const m of l.matchAll(re)) out.push(`${rel}:${i + 1} ${m[0]}`);
    });
  return out;
};

const leaks = [];
const counts = [];
for (const [key, e] of Object.entries(gEn)) {
  const term = gL[key];
  if (!term) continue;
  // stem match: the last word may carry an English plural/verb suffix
  const enRe = wordRe([e.other], "giu", "(?:s|es|ed|ing)?");
  if (
    term.toLowerCase() !== e.other.toLowerCase() &&
    !wordRe([e.other], "iu").test(native)
  ) {
    const h = hits(enRe);
    if (h.length) leaks.push({ key, en: e.other, [lang]: term, hits: h });
  }
  counts.push([key, term, hits(wordRe([term], "giu", "\\p{L}{0,4}")).length]);
}
const patternHits = PATTERNS.map(([re, msg]) => ({
  msg,
  hits: hits(re),
})).filter((p) => p.hits.length);

console.log(
  `glossary-check ${lang}: ${pages.length} pages, ${leaks.length} English-term leaks, ${patternHits.reduce((a, p) => a + p.hits.length, 0)} pattern hits`,
);
for (const l of leaks)
  console.log(
    `\nleak "${l.en}" (${l.key}, use "${l[lang]}"):\n  ${l.hits.slice(0, 10).join("\n  ")}${l.hits.length > 10 ? `\n  … ${l.hits.length - 10} more` : ""}`,
  );
for (const p of patternHits)
  console.log(
    `\n${p.msg}:\n  ${p.hits.slice(0, 10).join("\n  ")}${p.hits.length > 10 ? `\n  … ${p.hits.length - 10} more` : ""}`,
  );
console.log(`\nagreed term occurrences (key, term, count):`);
for (const [k, t, n] of counts)
  console.log(`  ${k.padEnd(24)} ${t.padEnd(30)} ${n}`);
process.exit(leaks.length || patternHits.length ? 1 : 0);
