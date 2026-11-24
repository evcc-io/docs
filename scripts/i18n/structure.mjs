#!/usr/bin/env node
// Checks that a translation mirrors the English paragraph and line structure (RULES.md, "Structure").
// Usage: node scripts/i18n/structure.mjs <lang> <en-relative-path>
// Exit 1 when the number of paragraphs or the number of lines in a paragraph differs.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DOCS, splitFrontmatter } from "./lib.mjs";

const [lang, rel] = process.argv.slice(2);
if (!lang || !rel) {
  console.error("usage: structure.mjs <lang> <en-relative-path>");
  process.exit(1);
}

// paragraphs = runs of non-blank lines; blank lines inside fenced code blocks don't split
const paragraphs = (file) => {
  const out = [];
  let cur = [];
  let code = false;
  for (const line of splitFrontmatter(readFileSync(file, "utf8")).body.split(
    "\n",
  )) {
    if (line.trim().startsWith("```")) code = !code;
    if (!code && line.trim() === "") {
      if (cur.length) out.push(cur);
      cur = [];
    } else cur.push(line);
  }
  if (cur.length) out.push(cur);
  return out;
};

const trFile = join(DOCS, lang, rel);
if (!existsSync(trFile)) {
  console.error(`${lang}/${rel}: missing`);
  process.exit(1);
}
const en = paragraphs(join(DOCS, "en", rel));
const tr = paragraphs(trFile);
const issues = [];
if (en.length !== tr.length)
  issues.push(`paragraphs: ${en.length} in en, ${tr.length} in ${lang}`);
for (let i = 0; i < Math.min(en.length, tr.length); i++)
  if (en[i].length !== tr[i].length)
    issues.push(
      `paragraph ${i + 1} ("${en[i][0].slice(0, 60)}"): ${en[i].length} lines in en, ${tr[i].length} in ${lang}`,
    );

if (issues.length) {
  console.error(`${lang}/${rel}:\n  ${issues.join("\n  ")}`);
  process.exit(1);
}
console.log(`${lang}/${rel}: structure ok (${en.length} paragraphs)`);
