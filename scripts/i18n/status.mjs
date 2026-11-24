#!/usr/bin/env node
// Usage: node scripts/i18n/status.mjs <lang> [--json] [--check]
// Lists missing / outdated / current / orphaned pages of a locale and the chrome dictionary parity.
// --check also runs check-page on every current page. Exit 1 if anything is not current.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { checkPage } from "./check-page.mjs";
import {
  DOCS,
  I18N,
  blobHash,
  flatten,
  listPages,
  readJson,
  splitFrontmatter,
} from "./lib.mjs";

const args = process.argv.slice(2);
const lang = args.find((a) => !a.startsWith("--"));
if (!lang) {
  console.error("usage: status.mjs <lang> [--json] [--check]");
  process.exit(2);
}

const en = listPages("en");
const target = new Set(listPages(lang));
const res = { lang, missing: [], outdated: [], current: [], orphaned: [] };
for (const rel of en) {
  if (!target.has(rel)) {
    res.missing.push(rel);
    continue;
  }
  const { data } = splitFrontmatter(
    readFileSync(join(DOCS, lang, rel), "utf8"),
  );
  const hash = blobHash(readFileSync(join(DOCS, "en", rel)));
  (String(data.translatedFrom ?? "") === hash
    ? res.current
    : res.outdated
  ).push(rel);
}
res.orphaned = [...target].filter((rel) => !en.includes(rel));

const enDict = readJson(join(I18N, "en.json"));
const dict = readJson(join(I18N, `${lang}.json`));
if (!enDict) res.chrome = { status: "no en.json" };
else {
  const ek = Object.keys(flatten(enDict));
  const tk = Object.keys(flatten(dict ?? {}));
  const missingKeys = ek.filter((k) => !tk.includes(k));
  res.chrome = {
    status: !dict ? "missing" : missingKeys.length ? "incomplete" : "complete",
    missingKeys,
    extraKeys: tk.filter((k) => !ek.includes(k)),
  };
}

if (args.includes("--check")) {
  res.checkFailures = [];
  for (const rel of res.current) {
    const r = await checkPage(lang, rel);
    if (r.errors.length)
      res.checkFailures.push({ file: rel, errors: r.errors });
  }
}

const ok =
  !res.missing.length &&
  !res.outdated.length &&
  !res.orphaned.length &&
  ["complete", "no en.json"].includes(res.chrome.status) &&
  !res.checkFailures?.length;

if (args.includes("--json")) console.log(JSON.stringify(res, null, 2));
else {
  console.log(
    `${lang}: ${res.current.length} current, ${res.outdated.length} outdated, ${res.missing.length} missing, ${res.orphaned.length} orphaned (of ${en.length} en pages)`,
  );
  for (const k of ["outdated", "missing", "orphaned"])
    if (res[k].length) console.log(`\n${k}:\n  ${res[k].join("\n  ")}`);
  const c = res.chrome;
  console.log(
    `\nchrome: ${c.status}${c.missingKeys?.length ? `, ${c.missingKeys.length} keys missing` : ""}${c.extraKeys?.length ? `, ${c.extraKeys.length} extra keys` : ""}`,
  );
  if (res.checkFailures)
    console.log(
      `\ncheck-page: ${res.checkFailures.length} failing` +
        res.checkFailures.map((f) => `\n  ${f.file}: ${f.errors[0]}`).join(""),
    );
}
process.exit(ok ? 0 : 1);
