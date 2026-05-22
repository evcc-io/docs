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

function writeRedirect(legacyPath, target) {
  const legacyFile = path.join(DIST, legacyPath.slice(1), "index.html");
  if (fs.existsSync(legacyFile)) return false;
  fs.mkdirSync(path.dirname(legacyFile), { recursive: true });
  fs.writeFileSync(legacyFile, makeRedirectHtml(target));
  return true;
}

for (const file of walkHtml(DIST)) {
  const url = urlFor(file); // e.g. /en/features/solar-charging or /de/...
  // Match /en/<slug> → legacy /en/docs/<slug>
  let legacy = null;
  if (url.startsWith("/en/") && url !== "/en") {
    legacy = "/en/docs" + url.slice(3);
  } else if (url.startsWith("/de/") && url !== "/de") {
    // German was the default locale on the old site (no /de prefix)
    // and lived under /docs/<slug>
    legacy = "/docs" + url.slice(3);
  } else continue;

  if (writeRedirect(legacy, url)) count++;

  // German blog also lived at /blog/<path> (no /docs prefix) on the old site
  if (url.startsWith("/de/blog")) {
    const blogLegacy = url.slice(3); // "/de/blog/..." → "/blog/..."
    if (writeRedirect(blogLegacy, url)) count++;
  }
}

// Also map locale-prefixed REST API URLs to the flat OpenAPI URLs
// /<lang>/integrations/rest-api/* → /integrations/rest-api/*
for (const file of walkHtml(DIST)) {
  const url = urlFor(file);
  if (!url.startsWith("/integrations/rest-api")) continue;
  for (const lang of ["en", "de"]) {
    if (writeRedirect(`/${lang}${url}`, url)) count++;
    // Also add a /docs-prefixed legacy variant
    const docsLegacy = lang === "en" ? `/en/docs${url}` : `/docs${url}`;
    if (writeRedirect(docsLegacy, url)) count++;
  }
}

// Old site had device listing pages nested under /docs/devices/<type>.
// The new structure is flat — /<lang>/<type>.
const DEVICE_TYPES = [
  "chargers",
  "meters",
  "vehicles",
  "smartswitches",
  "heating",
];
for (const type of DEVICE_TYPES) {
  if (writeRedirect(`/docs/devices/${type}`, `/de/${type}`)) count++;
  if (writeRedirect(`/en/docs/devices/${type}`, `/en/${type}`)) count++;
}

// /docs/devices/plugins was the Docusaurus-era plugin reference.
// Map it to the new reference location.
if (writeRedirect(`/docs/devices/plugins`, `/de/reference/plugins`)) count++;
if (writeRedirect(`/en/docs/devices/plugins`, `/en/reference/plugins`)) count++;

// One blog post had a period in its old slug that Astro strips.
// /blog/2024/02/01/v0.124-new-tesla-api → /<lang>/blog/2024/02/01/v0124-new-tesla-api
{
  const oldSlug = "/blog/2024/02/01/v0.124-new-tesla-api";
  const newSlug = "/blog/2024/02/01/v0124-new-tesla-api";
  if (writeRedirect(oldSlug, `/de${newSlug}`)) count++;
  if (writeRedirect(`/en${oldSlug}`, `/en${newSlug}`)) count++;
}

// Docusaurus-only blog index pages (tags, archive, authors). Fall back to /de/blog.
for (const stub of ["archive", "authors", "tags"]) {
  if (writeRedirect(`/blog/${stub}`, "/de/blog")) count++;
  if (writeRedirect(`/en/blog/${stub}`, "/en/blog")) count++;
}

// Docusaurus stubs that had inbound links but no replacement page.
for (const stub of ["/search", "/markdown-page"]) {
  if (writeRedirect(stub, "/de")) count++;
  if (writeRedirect(`/en${stub}`, "/en")) count++;
}

console.log(`[legacy-redirects] wrote ${count} redirect pages`);
