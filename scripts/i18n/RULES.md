# Translation Rules

These rules bind every agent and person who translates the English docs into another locale.
They apply together with the style sheet `scripts/i18n/style/<lang>.md` and the terms file `scripts/i18n/terms/<lang>.md`.
When the style sheet and these rules disagree, these rules win for structure and the style sheet wins for language.

## Source and Target

- The English page `src/content/docs/en/<path>` is the only source; every other locale, German included, is a translation of it.
- The translation goes to the same relative path under `src/content/docs/<lang>/`, with the English file name (also for `_*.mdx` partials).
- Write one file at a time and never print file contents in your answer.
- After writing a file, run `node scripts/i18n/check-page.mjs <lang> <path> --stamp` and fix the page until it exits with 0.
  Its warnings are hints, review each one.
- Finally run `npx prettier --write` on the files you wrote, never on anything else.

## Keep Byte-Identical

- Frontmatter keys and every non-text value: `date`, `authors`, `tags`, `prev`, `next`, `sidebar.*`, `toc_max_heading_level`, `tableOfContents.*`, `draft`, `slug`.
  Do not add or remove keys; the only key the checker adds is `translatedFrom`.
- The `title` of partials (files starting with `_`).
- Every `import` line, including order and names.
- The structure of every fenced code block: language tag and meta, number of lines, keys, commands, flags and every value that is not an example (see "Translate" for what may change inside code).
- Inline code that names a config key, command, flag, file, path, URL, topic or version (`` `residualPower` ``, `` `evcc.yaml` ``, `` `evcc migrate` ``).
- Component tags and their props, except the translatable props listed below.
- JSX expressions in braces (`{…}`), e.g. `src={mcpVideo}`.
- `{/* excerpt */}` in blog posts, at the same position relative to the surrounding paragraphs.
- Anchors and their English ids: `{#id}` in `.md`, `\{#id\}` in `.mdx`, `<a id="…"></a>`.
  Never translate or invent an anchor id.
- Admonition types (`:::note`, `:::tip`, `:::caution`, `:::danger`) and the closing `:::`.
- Thematic breaks (`---`) and inline HTML (`<div class="…">`, `<br/>`, `<details>`).
- Table structure: same number of rows and columns, same column order.
- Names: evcc (always lowercase, also at the start of a sentence), EEBUS, OCPP, MQTT, Modbus, SunSpec, SG Ready, SEMP, RFID, Home Assistant, openHAB, ioBroker, Homey, Docker, Proxmox, Raspberry Pi, product and vendor names, GitHub handles and names of people.
- Config keys, CLI commands and flags, file names and paths, environment variables, API paths, topics, URLs and version numbers.

## Links

- Internal links change only their locale prefix: `/en/` becomes `/<lang>/`.
  This also applies to pages that exist only in English and fall back automatically, e.g. `/<lang>/reference/cli/evcc`, `/<lang>/chargers`, `/<lang>/blog`.
- Keep the anchor part (`#residualpower`) unchanged.
- The REST API stays unprefixed: `/integrations/rest-api`.
- External links point to the target-language version of the page when one exists (Wikipedia articles, manufacturer manuals, app stores, evcc.io), otherwise to a language-neutral page, otherwise to the English link.
  Only use a localised URL you have verified: `check-page.mjs` requests every external link that differs from the English one and fails on 404, so never guess a URL.
  Links to `docs.evcc.io/en/…` in quoted material stay.
- Never use relative links to pages.

## Images, Videos and Other Assets

Translated pages reference the English assets and never create copies.
The one exception is a localised version that already exists in the locale folder (same file name as the English asset, or `-en` replaced by `-<lang>`, e.g. the German diagrams and screenshots): reference that file relatively (`./x-de.svg`) instead of the English one.
`check-page.mjs` warns when such a file exists and the page does not use it.

- A relative asset reference `./x` in `en/<dir>/<file>` becomes a path that climbs out of the locale directory and back into `en/<dir>/`: one `../` per directory level of the page plus one for the locale folder.
- Examples:
  - `en/features/solar-charging.mdx`: `./surplus.webp` becomes `../../en/features/surplus.webp`.
  - `en/reference/configuration/site.mdx`: `import x from "./img/x.webp"` becomes `import x from "../../../en/reference/configuration/img/x.webp"`.
  - `en/blog/2026/10/29/post.mdx`: `cover.image: "./banner.webp"` becomes `"../../../../../en/blog/2026/10/29/banner.webp"`.
- References that already climb out of the docs tree (`../../../../assets/…`) stay as they are, because the locale folder has the same depth.
- The rule covers `![]()`, frontmatter `image`, MDX imports, `src="…"` and `poster="…"`.
- `<Screenshot name="…">` keeps its `name`; the component picks the localised screenshot itself.
- `check-page.mjs` verifies that every asset resolves to the English file or to its localised version in the locale folder.

## Translate

- Prose, list items, table cells and headings (keep the anchor).
- Frontmatter `title`, `description` and `cover.alt`.
- The `description` is one natural sentence with a verb, 90 to 170 characters, ending with a period.
  It names what the page helps the reader do, without "This page …" or a list of keywords.
  Blog descriptions keep the kind and date at the start ("Release notes from February 2024 …").
- Props: `caption`, `alt`, `altLarge`, `altSmall`, `label` (TabItem, unless the label is a file, product or protocol name such as `compose.yml` or `evcc.yaml`), `title` and `description` (NavCard, Card), `text` (Badge), `subline`.
- Children of `CtaButton`, `Card` and similar components.
- Comments and example values inside code blocks and inline code: comments, `title` and `name` values, message texts, sample device names, placeholders such as `<your-ip>` or `${variable}`.
  Keys, commands, flags, hosts, paths, URLs, numbers and real identifiers stay.
  The checker compares the code structure, so a translated comment passes and a changed key fails.
- Admonition titles in brackets: `:::note[Title]`.
- Link texts and image alt texts.

## UI Strings and Terminology

- Bold UI names (**Smart**, **Configuration**) and navigation paths (**Configuration → EEBUS**) use the exact UI translation from the terms file.
- When a UI string is missing from the terms file, look it up with `node scripts/i18n/terms.mjs <lang> "<English string>"`.
- When the lookup finds nothing, the bold text is not a UI string: translate it naturally.
- When the UI string is marked `(untranslated in UI)`, keep the English UI text in bold and do not invent a translation.
- In running prose, use the glossary term for each concept, inflected as the grammar requires.
- Use one term per concept across the whole batch; never alternate between synonyms.
- Inside bold UI references the UI string wins over the glossary; in prose the glossary wins.
- Record doubts instead of stalling.

## Dates and Media

- Dates written in prose (e.g. "Update 12 March 2026") use the locale date format from the style sheet.
  Frontmatter dates stay ISO (`2026-03-12`).
- `media.md`: keep external titles verbatim, including their language.
  Mark entries whose language differs from the target locale with a language marker after the source, e.g. `(de)` or `(en)`; same-language entries get no marker.

## Structure

- One sentence per line, mirroring the English line structure wherever the language allows.
- Never merge or split paragraphs, never reorder sections, list items or sentences across lines.
- Headings use sentence case unless the style sheet says otherwise.
- No em-dashes or en-dashes as sentence connectors.
- Never introduce `{`, `}` or `<` in MDX prose, they break the MDX parser.
  Never put a straight `"` inside a prop value.
- Keep the original markup inside a line (bold, links, inline code) around the matching words of the translation.

## Do Not

- Add, drop, soften, sharpen or explain content.
- Add translator notes, comments or "(translated)" markers.
- Edit files outside your batch, anything under `src/content/docs/en/`, components, configs or scripts.
- Run `npm run format`, `npm run build` or a dev server in batch stages.
- Commit, stage, create branches or open pull requests.
