// Post-build: emit static HTML files at legacy /docs/<path> and /en/docs/<path>
// that meta-refresh to the new locations. Required because GitHub Pages is
// fully static and Astro's redirects config can't wildcard-match arbitrary slugs.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const DIST = path.join(ROOT, "dist");

function* walkHtml(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkHtml(p);
    else if (e.name === "index.html") yield p;
  }
}

function urlFor(file) {
  const rel = path.relative(DIST, path.dirname(file));
  return "/" + rel.replaceAll(path.sep, "/");
}

function makeRedirectHtml(target) {
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${target}">
<script>window.location.replace(${JSON.stringify(target)})</script>
</head>
<body><p>Redirecting to <a href="${target}">${target}</a></p></body></html>`;
}

let count = 0;
for (const file of walkHtml(DIST)) {
  const url = urlFor(file); // e.g. /en/features/solar-charging or /de/...
  // Match /en/<slug> → legacy /en/docs/<slug>
  let legacy = null;
  if (url.startsWith("/en/") && url !== "/en") {
    legacy = "/en/docs" + url.slice(3);
  } else if (url.startsWith("/de/") && url !== "/de") {
    legacy = "/docs" + url.slice(3);
  } else continue;

  const legacyFile = path.join(DIST, legacy.slice(1), "index.html");
  if (fs.existsSync(legacyFile)) continue;
  fs.mkdirSync(path.dirname(legacyFile), { recursive: true });
  fs.writeFileSync(legacyFile, makeRedirectHtml(url));
  count++;
}

// Also map locale-prefixed REST API URLs to the flat OpenAPI URLs
// /<lang>/integrations/rest-api/* → /integrations/rest-api/*
for (const file of walkHtml(DIST)) {
  const url = urlFor(file);
  if (!url.startsWith("/integrations/rest-api")) continue;
  for (const lang of ["en", "de"]) {
    const localePath = `/${lang}${url}`;
    const localeFile = path.join(DIST, localePath.slice(1), "index.html");
    if (fs.existsSync(localeFile)) continue;
    fs.mkdirSync(path.dirname(localeFile), { recursive: true });
    fs.writeFileSync(localeFile, makeRedirectHtml(url));
    count++;
    // Also add a /docs-prefixed legacy variant for the EN locale
    if (lang === "en") {
      const docsPath = `/en/docs${url}`;
      const docsFile = path.join(DIST, docsPath.slice(1), "index.html");
      if (!fs.existsSync(docsFile)) {
        fs.mkdirSync(path.dirname(docsFile), { recursive: true });
        fs.writeFileSync(docsFile, makeRedirectHtml(url));
        count++;
      }
    } else {
      const docsPath = `/docs${url}`;
      const docsFile = path.join(DIST, docsPath.slice(1), "index.html");
      if (!fs.existsSync(docsFile)) {
        fs.mkdirSync(path.dirname(docsFile), { recursive: true });
        fs.writeFileSync(docsFile, makeRedirectHtml(url));
        count++;
      }
    }
  }
}

console.log(`[legacy-redirects] wrote ${count} redirect pages`);
