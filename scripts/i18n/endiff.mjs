#!/usr/bin/env node
// Prints the English change a translation has to catch up with.
// Usage: node scripts/i18n/endiff.mjs <lang> <en-relative-path>
//
// The translation's translatedFrom stamp is the git blob hash of the English it was made from, so the
// diff runs from that blob to the current English page. When the working copy is already re-stamped
// (e.g. after check-page --stamp), the stamp of the committed translation (HEAD) is used instead.
// Exit 0: diff printed (or the translation is current). Exit 2: no usable stamp, translate the whole page.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { DOCS, blobHash, splitFrontmatter } from "./lib.mjs";

const [lang, rel] = process.argv.slice(2);
if (!lang || !rel) {
  console.error("usage: endiff.mjs <lang> <en-relative-path>");
  process.exit(1);
}

const git = (args, cwd = DOCS) =>
  execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
const ROOT = git(["rev-parse", "--show-toplevel"]).trim(); // the checkout DOCS belongs to
const stampOf = (text) =>
  String(splitFrontmatter(text).data.translatedFrom ?? "");
const fail = (msg) => {
  console.error(`${lang}/${rel}: ${msg}`);
  process.exit(2);
};

const enFile = join(DOCS, "en", rel);
const trFile = join(DOCS, lang, rel);
const current = blobHash(readFileSync(enFile));

const wc = existsSync(trFile) ? stampOf(readFileSync(trFile, "utf8")) : "";
let head = "";
try {
  head = stampOf(git(["show", `HEAD:${relative(ROOT, trFile)}`], ROOT));
} catch {
  /* not committed yet */
}
// prefer the working copy stamp unless it was already moved to the current English
const from = wc && wc !== current ? wc : head || wc;
if (!from) fail("no stamped translation, translate the whole page");
if (from === current) {
  console.log(`${lang}/${rel}: translation is current (stamp ${current})`);
  process.exit(0);
}

let old;
try {
  old = git(["cat-file", "-p", from], ROOT);
} catch {
  fail(
    `stamp ${from} is not a blob of this repository, translate the whole page`,
  );
}

const oldFile = join(mkdtempSync(join(tmpdir(), "endiff-")), "old.md");
writeFileSync(oldFile, old);
try {
  console.log(
    git(
      ["diff", "--no-index", "--no-prefix", "-U2", "--", oldFile, enFile],
      ROOT,
    ),
  );
} catch (e) {
  if (e.status !== 1) throw e; // 1 = differences found
  console.log(
    `# en/${rel}: ${from} (translation base) -> ${current} (current)\n` +
      [oldFile, enFile].reduce(
        (out, f) =>
          out.replaceAll(f, `en/${rel}`).replaceAll(f.slice(1), `en/${rel}`),
        e.stdout,
      ),
  );
}
