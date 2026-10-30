#!/usr/bin/env node
// Usage: node scripts/i18n/check-page.mjs <lang> <en-relative-path> [--stamp]
// Compares a translated page with its English source and prints {file, errors, warnings}.
// --stamp writes translatedFrom (git blob hash of the en source) into the target on success.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import {
  DOCS,
  REPO,
  blobHash,
  flatten,
  inlineCode,
  maskCode,
  splitFrontmatter,
} from "./lib.mjs";

// props and frontmatter keys whose values get translated
const TRANSLATABLE = new Set([
  "title",
  "description",
  "alt",
  "altLarge",
  "altSmall",
  "caption",
  "label",
  "text",
  "subline",
  "tagline",
]);
const LINK_ATTRS = new Set(["href", "to", "src", "poster"]);
const TAG_RE =
  /<(\/?)([A-Za-z][\w.]*)((?:\s+[\w:-]+(?:=(?:"[^"]*"|'[^']*'|\{[^}]*\}))?)*)\s*\/?>/g;
const ATTR_RE = /([\w:-]+)(?:=("[^"]*"|'[^']*'|\{[^}]*\}))?/g;
const LINK_RE = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

const TYPO = {
  all: [
    [
      /\d\.\d+\s?(?:kWh|MWh|Wh|kW|W|V|A|ct|€|km|h)(?![\p{L}])/u,
      "decimal point before a unit, use a decimal comma",
    ],
    [
      /^\s*(?:[-*]|\d+\.)?\s*(?:The|You|If you|With the) /,
      "looks like English prose",
    ],
  ],
  nl: [
    [/\d\s%/, "no space before % (50%)"],
    [
      /(?<!\p{L})(?:je|jij|jou|jouw)(?!\p{L})/iu,
      "informal je/jij/jou, use u/uw",
    ],
  ],
  it: [[/\d\s%/, "no space before % (50%)"]],
  da: [[/\d%/, "space before % (50 %)"]],
  cs: [
    [/\d%/, "non-breaking space before % (50 %)"],
    [/"/, "straight quote, use „…“"],
  ],
  fr: [
    [/\d%/, "non-breaking space before % (50 %)"],
    [/"/, "straight quote, use « … »"],
    [/ :/, "ASCII space before :, use a non-breaking space"],
    [
      /[\p{L}\d)»*][:;?!](?:\s|$)/u,
      "missing non-breaking space before : ; ? !",
    ],
    [
      /(?<!\p{L})(?:tu|ton|ta|tes|toi)(?!\p{L})/iu,
      "informal tu/ton/ta, use vous",
    ],
  ],
};

const sha = (s) => createHash("sha1").update(s).digest("hex").slice(0, 10);
const lineAt = (text, idx) => text.slice(0, idx).split("\n").length;

// Build the comparable skeleton of a page body.
function skeleton(body, offset, file, lang, errors) {
  const { masked, fences } = maskCode(body);
  const lines = masked.split("\n");
  const orig = body.split("\n");
  const docsParent = dirname(DOCS);
  const ln = (i) => i + 1 + offset;

  // link or asset target -> comparable value
  const target = (t, line) => {
    // relative asset: ./x, ../x or a bare path like win10-srv/x.png (no scheme, no leading / or #)
    if (/^\.{1,2}\//.test(t) || !/^(\/|#|@|[a-z][a-z0-9+.-]*:)/i.test(t)) {
      const abs = resolve(dirname(file), t.replace(/[?#].*$/, ""));
      if (lang !== "en" && !existsSync(abs))
        errors.push(`L${line}: relative asset ${t} does not resolve`);
      return `asset:${relative(docsParent, abs)}`;
    }
    // locale prefix -> placeholder, without building a regex from the argument
    const p = `/${lang}`;
    return t === p || t.startsWith(`${p}/`) || t.startsWith(`${p}#`)
      ? `/{lang}${t.slice(p.length)}`
      : t;
  };

  const tokens = [];
  const lineStart = [];
  lines.reduce((pos, l, i) => ((lineStart[i] = pos), pos + l.length + 1), 0);
  const add = (pos, k, line) => tokens.push({ pos, k, line });

  for (const f of fences) {
    const i = f.line - 1;
    add(
      lineStart[i],
      `code ${f.info} ${sha(f.content.join("\n").trimEnd())}`,
      ln(i),
    );
    if (f.unclosed) errors.push(`L${ln(i)}: code fence not closed`);
  }

  const sections = [[]];
  let table = null;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const t = l.trim();
    if (table && !t.startsWith("|")) {
      add(table.pos, `table ${table.rows}x${table.cols}`, table.line);
      table = null;
    }
    if (t.startsWith("|")) {
      if (!table)
        table = {
          pos: lineStart[i],
          line: ln(i),
          rows: 0,
          cols: t.replace(/\\\|/g, "").split("|").length - 2,
        };
      table.rows++;
    }
    const h = l.match(/^(#{1,6})\s+(.*?)\s*$/);
    if (h) {
      const id = h[2].match(/\\?\{#([\w-]+)\\?\}$/);
      add(lineStart[i], `h${h[1].length}${id ? "#" + id[1] : ""}`, ln(i));
      sections.push([]);
    } else if (/^\s*:::/.test(l)) {
      add(lineStart[i], t.match(/^:::\w*/)[0], ln(i));
    } else if (/^\s*(---|\*\*\*)\s*$/.test(l)) {
      add(lineStart[i], "---", ln(i));
    } else if (/^import\s/.test(l)) {
      const m = l.match(/^import\s+(.+?)\s+from\s+["'](.+?)["']/);
      add(
        lineStart[i],
        m ? `import ${m[1]} from ${target(m[2], ln(i))}` : t,
        ln(i),
      );
    } else if (t === "{/* excerpt */}") {
      add(lineStart[i], "excerpt", ln(i));
    }
    const sec = sections.at(-1);
    for (const m of l.matchAll(LINK_RE)) sec.push(target(m[1], ln(i)));
    const ref = l.match(/^\s*\[[^\]]+\]:\s*(\S+)/);
    if (ref) sec.push(target(ref[1], ln(i)));
    if (l) for (const c of inlineCode(orig[i])) sec.push("`" + c + "`");
  }
  if (table) add(table.pos, `table ${table.rows}x${table.cols}`, table.line);

  for (const m of masked.matchAll(TAG_RE)) {
    const line = lineAt(masked, m.index) + offset;
    const attrs = [];
    for (const a of m[3].matchAll(ATTR_RE)) {
      if (TRANSLATABLE.has(a[1])) continue;
      let v = a[2] ?? "";
      if (LINK_ATTRS.has(a[1]) && /^["']/.test(v))
        v = JSON.stringify(target(v.slice(1, -1), line));
      attrs.push(`${a[1]}=${v}`);
    }
    add(
      m.index,
      `<${m[1]}${m[2]}${attrs.length ? " " + attrs.sort().join(" ") : ""}>`,
      line,
    );
  }

  tokens.sort((a, b) => a.pos - b.pos);
  const sectionLines = [
    offset + 1,
    ...tokens.filter((t) => /^h\d/.test(t.k)).map((t) => t.line),
  ];
  return { tokens, sections, sectionLines, masked };
}

// prose only: no tags, link targets, html comments or jsx expressions
const prose = (masked) =>
  masked
    .replace(/^(import .*|\s*:::.*)$/gm, "")
    .replace(TAG_RE, (s) => s.replace(/[^\n]/g, " "))
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/<!--[\s\S]*?-->|\{[^}\n]*\}/g, (s) => s.replace(/[^\n]/g, " "));

async function compileMdx(text, warnings) {
  try {
    const [{ compile }, { default: gfm }] = await Promise.all([
      import("@mdx-js/mdx"),
      import("remark-gfm"),
    ]);
    await compile(text, { remarkPlugins: [gfm] });
    return null;
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") {
      warnings.push("@mdx-js/mdx not resolvable, MDX compile skipped");
      return null;
    }
    const p = e.place?.start ?? e.place ?? {};
    return `MDX does not compile at L${e.line ?? p.line ?? "?"}: ${e.reason ?? e.message}`;
  }
}

export async function checkPage(lang, rel, { stamp = false } = {}) {
  const enFile = join(DOCS, "en", rel);
  const file = join(DOCS, lang, rel);
  const out = {
    file: file.startsWith(REPO) ? relative(REPO, file) : file,
    errors: [],
    warnings: [],
  };
  const { errors, warnings } = out;
  if (!existsSync(enFile))
    return (errors.push(`en source ${rel} not found`), out);
  if (!existsSync(file)) return (errors.push("target missing"), out);

  const enText = readFileSync(enFile, "utf8");
  const text = readFileSync(file, "utf8");
  const en = splitFrontmatter(enText);
  const tg = splitFrontmatter(text);
  const partial = rel.split("/").some((seg) => seg.startsWith("_"));

  // frontmatter
  const ef = flatten(en.data);
  const tf = flatten(tg.data);
  delete ef.translatedFrom;
  delete tf.translatedFrom;
  const ek = Object.keys(ef);
  const tk = Object.keys(tf);
  for (const k of ek.filter((k) => !(k in tf)))
    errors.push(`frontmatter: key ${k} missing`);
  for (const k of tk.filter((k) => !(k in ef)))
    errors.push(`frontmatter: extra key ${k}`);
  for (const k of ek.filter((k) => k in tf)) {
    const last = k.split(".").at(-1);
    if (last === "title" && partial) {
      if (tf[k] !== ef[k])
        errors.push(`frontmatter: partial title must stay "${ef[k]}"`);
    } else if (last === "image" && typeof ef[k] === "string") {
      const r = (base, v) =>
        /^\.{1,2}\//.test(v) ? resolve(dirname(base), v) : v;
      const want = r(enFile, ef[k]);
      if (r(file, String(tf[k])) !== want)
        errors.push(
          `frontmatter: ${k} must resolve to ${relative(dirname(file), want)}`,
        );
      else if (!existsSync(want))
        errors.push(`frontmatter: ${k} does not resolve`);
    } else if (TRANSLATABLE.has(last)) {
      if (last === "title" && tf[k] === ef[k])
        warnings.push(`frontmatter: ${k} identical to English`);
    } else if (JSON.stringify(tf[k]) !== JSON.stringify(ef[k])) {
      errors.push(
        `frontmatter: ${k} changed (${JSON.stringify(ef[k])} -> ${JSON.stringify(tf[k])})`,
      );
    }
  }
  if (!partial && "description" in tf) {
    const d = String(tf.description).trim();
    const len = [...d].length;
    if (len < 90 || len > 170 || !d.endsWith("."))
      errors.push(
        `frontmatter: description must be 90-170 characters ending with a period (has ${len})`,
      );
  }

  // MDX compile (frontmatter blanked so line numbers stay)
  if (rel.endsWith(".mdx")) {
    const blank = "\n".repeat(tg.offset) + tg.body;
    const err = await compileMdx(blank, warnings);
    if (err) errors.push(err);
  }

  // skeleton
  const a = skeleton(en.body, en.offset, enFile, "en", []);
  const b = skeleton(tg.body, tg.offset, file, lang, errors);
  const mism = [];
  const n = Math.max(a.tokens.length, b.tokens.length);
  for (let i = 0; i < n && mism.length < 3; i++) {
    const x = a.tokens[i];
    const y = b.tokens[i];
    if (x?.k !== y?.k)
      mism.push(
        `structure: en L${x?.line ?? "end"} ${x?.k ?? "(nothing)"} vs ${lang} L${y?.line ?? "end"} ${y?.k ?? "(nothing)"}`,
      );
  }
  if (a.tokens.length !== b.tokens.length)
    mism.push(
      `structure: ${a.tokens.length} elements in en, ${b.tokens.length} in ${lang}`,
    );
  errors.push(...mism);

  // links, assets, inline code: same multiset per section
  if (a.sections.length === b.sections.length) {
    let reported = 0;
    for (let s = 0; s < a.sections.length && reported < 3; s++) {
      const left = [...b.sections[s]];
      const missing = [];
      for (const v of a.sections[s]) {
        const j = left.indexOf(v);
        if (j < 0) missing.push(v);
        else left.splice(j, 1);
      }
      if (!missing.length && !left.length) continue;
      reported++;
      const fmt = (l) =>
        l.map((v) => v.replace("/{lang}", "/" + lang)).join(", ");
      errors.push(
        `section at ${lang} L${b.sectionLines[s]}:` +
          (missing.length ? ` missing ${fmt(missing)};` : "") +
          (left.length ? ` unexpected ${fmt(left)}` : ""),
      );
    }
  }

  // leftover /en/ links and typography
  const tlines = b.masked.split("\n");
  tlines.forEach((l, i) => {
    if (/(?<![\w.\-/])\/en(?=\/|#|"|'|\)|$)/.test(l))
      errors.push(`L${i + 1 + tg.offset}: /en/ link left, use /${lang}/`);
  });
  const rules = [...TYPO.all, ...(TYPO[lang] ?? [])];
  const seen = {};
  prose(b.masked)
    .split("\n")
    .forEach((l, i) => {
      for (const [re, msg] of rules) {
        if (!re.test(l) || (seen[msg] = (seen[msg] ?? 0) + 1) > 5) continue;
        warnings.push(`L${i + 1 + tg.offset}: ${msg}`);
      }
    });

  if (stamp && !errors.length) {
    const hash = blobHash(readFileSync(enFile));
    const line = `translatedFrom: "${hash}"`;
    const fm = /^translatedFrom:.*$/m.test(tg.raw)
      ? tg.raw.replace(/^translatedFrom:.*$/m, line)
      : [tg.raw, line].filter(Boolean).join("\n");
    writeFileSync(file, `---\n${fm}\n---\n${tg.body}`);
    out.stamped = hash;
  }
  return out;
}

if (import.meta.main) {
  const [lang, rel] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (!lang || !rel) {
    console.error("usage: check-page.mjs <lang> <en-relative-path> [--stamp]");
    process.exit(2);
  }
  const res = await checkPage(lang, rel, {
    stamp: process.argv.includes("--stamp"),
  });
  console.log(JSON.stringify(res, null, 2));
  process.exit(res.errors.length ? 1 : 0);
}
