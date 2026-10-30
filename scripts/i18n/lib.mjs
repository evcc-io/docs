// Shared helpers for the scripts in scripts/i18n/.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

export const SCRIPTS = dirname(fileURLToPath(import.meta.url));
export const REPO = resolve(SCRIPTS, "../..");
export const DOCS = process.env.DOCS_ROOT
  ? resolve(process.env.DOCS_ROOT)
  : join(REPO, "src/content/docs");
// UI chrome dictionary sits next to the docs collection (src/content/i18n)
export const I18N = join(dirname(DOCS), "i18n");

// main evcc repo: next to this checkout, or next to the main checkout when running in .worktrees/<lang>
export const EVCC = [
  process.env.EVCC_ROOT,
  join(REPO, "../evcc"),
  join(REPO, "../../../evcc"),
].find((p) => p && existsSync(join(p, "i18n/glossary")));

export const LANG_NAMES = {
  en: "English",
  de: "German",
  nl: "Dutch",
  fr: "French",
  da: "Danish",
  it: "Italian",
  cs: "Czech",
};

export const readJson = (p) =>
  existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null;

// first 12 hex of the git blob sha1, identical to `git hash-object`
export function blobHash(buf) {
  const head = Buffer.from(`blob ${buf.length}\0`);
  return createHash("sha1")
    .update(Buffer.concat([head, buf]))
    .digest("hex")
    .slice(0, 12);
}

// all .md/.mdx files below <DOCS>/<lang>, relative, sorted, without reference/cli
export function listPages(lang, root = DOCS) {
  const base = join(root, lang);
  const out = [];
  const walk = (dir) => {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.mdx?$/.test(name)) out.push(relative(base, p));
    }
  };
  walk(base);
  return out.filter((f) => !f.startsWith("reference/cli/")).sort();
}

export function splitFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, raw: "", body: text, offset: 0 };
  return {
    data: YAML.parse(m[1]) ?? {},
    raw: m[1],
    body: text.slice(m[0].length),
    offset: m[0].split("\n").length - 1,
  };
}

// nested object -> { "a.b": value }, arrays stay leaves
export function flatten(obj, pre = "", out = {}) {
  for (const [k, v] of Object.entries(obj ?? {})) {
    if (v && typeof v === "object" && !Array.isArray(v))
      flatten(v, pre + k + ".", out);
    else out[pre + k] = v;
  }
  return out;
}

export const words = (text) => text.split(/\s+/).filter(Boolean).length;

// Replace fenced code by empty lines and inline code by spaces, keeping line numbers.
// Returns the masked text plus the fenced blocks found.
export function maskCode(text) {
  const lines = text.split("\n");
  const fences = [];
  let open = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (open) {
      const t = line.trim();
      if (
        t.startsWith(open.marker) &&
        /^([`~])\1*$/.test(t) &&
        t[0] === open.marker[0]
      ) {
        fences.push(open);
        open = null;
      } else open.content.push(line.slice(open.indent.length));
      lines[i] = "";
      continue;
    }
    const m = line.match(/^(\s*)(`{3,}|~{3,})(.*)$/);
    if (m) {
      open = {
        line: i + 1,
        indent: m[1],
        marker: m[2],
        info: m[3].trim(),
        content: [],
      };
      lines[i] = "";
      continue;
    }
    lines[i] = line.replace(/(`+)[^`]*?\1/g, (s) => " ".repeat(s.length));
  }
  if (open) fences.push({ ...open, unclosed: true });
  return { masked: lines.join("\n"), fences };
}

export function inlineCode(line) {
  return [...line.matchAll(/(`+)([^`]*?)\1/g)].map((m) => m[2]);
}

// Unicode-aware whole-word regex for a list of words/phrases
export function wordRe(list, flags = "giu", suffix = "") {
  const esc = list.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(
    `(?<![\\p{L}\\p{N}])(?:${esc.join("|")})${suffix}(?![\\p{L}\\p{N}])`,
    flags,
  );
}

export function evccI18n(lang) {
  if (!EVCC) return null;
  return readJson(join(EVCC, "i18n", `${lang}.json`));
}

export function glossary(lang) {
  if (!EVCC) return null;
  return readJson(join(EVCC, "i18n/glossary", `${lang}.json`));
}
