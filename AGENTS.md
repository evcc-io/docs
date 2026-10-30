# AI Assistant Instructions for evcc Documentation

## Project Overview

This is the documentation repository for evcc (Electric Vehicle Charge Controller).
The site is built with [Astro](https://astro.build/) and the [Starlight](https://starlight.astro.build/) docs theme.
Device pages are generated from YAML templates that are synchronised with the main evcc repository.
Paths starting with `../evcc/` refer to a local checkout of the main repository (https://github.com/evcc-io/evcc) next to this one; clone it there if it is missing.

## Repository Structure

```
/astro.config.mjs              # Astro + Starlight config (sidebar, locales, plugins)
/src/content.config.ts         # Content collections (docs + device templates)
/src/content/docs/en           # English documentation (source of all translations)
/src/content/docs/<lang>       # Translated documentation, one folder per other locale (pipeline output, never edit by hand)
/src/content/i18n/*.json       # UI strings for components, one dictionary per locale
/src/locales.json              # Locale list (single source of truth)
/scripts/i18n                  # Translation pipeline: checks, status, terms, style sheets
/src/content/docs/{lang}/blog  # Blog posts per locale
/src/pages/[lang]/...          # Auto-generated device list & detail pages
/src/components                # Astro components (.astro)
/src/utils                     # Shared TS helpers (devices, usages, icons)
/src/styles/custom.css         # Theme overrides
/src/scripts                   # Build-time scripts (legacy redirect emitter)
/templates                     # YAML device templates (input for device pages)
/public                        # Static assets served as-is (favicon, openapi.yaml, …)
```

### Documentation content (`/src/content/docs/en`)

Most content is **manually written**, except for:

- **Device list pages** — `chargers`, `meters`, `vehicles`, `smartswitches`, `heating`, `tariffs`, `external-limit` (hems integrations + curtailment devices), `notifications` — rendered by routes under `src/pages/[lang]/` using `src/utils/devices.ts` against the YAML templates.
- **Device detail pages** — same routes, one per template.
- **CLI reference** — `reference/cli/*.md` generated from the main evcc repository (English only, the other locales fall back automatically).
- **REST API** — generated from `public/openapi.yaml` by `starlight-openapi`.

### Templates (`/templates`)

YAML device templates organised by:

- Channel: `nightly/` and `release/`
- Language: `de/`, `en/`
- Category: `charger/`, `meter/`, `vehicle/`, `tariff/`, `hems/`, `curtailer/`, `messenger/`

The nightly/release toggle in the UI switches which collection is used at runtime.

### Internationalization

- **English is the default locale** (`defaultLocale: "en"` in `astro.config.mjs`) and the only hand-written one: edit `src/content/docs/en/` only.
- Every other locale in `src/locales.json` is generated from English by the translation pipeline and stamped with `translatedFrom` in the frontmatter. Never edit them by hand: change the English page, then run `/translate <lang>` (or `/translate all`) to bring the other locales back in sync; `node scripts/i18n/status.mjs <lang>` lists what is missing or outdated.
- The pipeline follows `scripts/i18n/RULES.md` (what is translated, what stays byte-identical, links, assets) and the per-language style sheets in `scripts/i18n/style/<lang>.md`; `en.md` holds the rules for the source text.
- Device templates exist in English and German only; device pages in the other locales show English template data with translated UI chrome.
- Custom UI strings live in `src/content/i18n/<lang>.json` and are read via `Astro.locals.t("key")`, not via `lang === "de" ? … : …` ternaries in components.
- Translated pages reference English assets relatively (e.g. `../../en/features/x.webp`) and never copy them.
- Pages missing in one locale fall back to the default locale (English) automatically; the URL still reflects the requested locale.
- Sidebar group labels are translated via the `translations` field in the sidebar config in `astro.config.mjs`.
- Header UI strings come from Starlight's built-in i18n; only locale-specific overrides go in our components (e.g. `src/components/SiteTitle.astro`, `LanguageSelect.astro`).

### Auto-generated content

#### Device & tariff pages

1. Templates in `/templates/{channel}/{lang}/{category}/`
2. Loaded via content collections defined in `src/content.config.ts`
3. Rendered by routes in `src/pages/[lang]/{chargers,meters,vehicles,smartswitches,heating,tariffs}/`
4. Shared layout & helpers in `src/components/DeviceDetailLayout.astro` and `src/utils/devices.ts`

#### CLI documentation

1. Generated from the main evcc repository — see "Update CLI docs" in `README.md`
2. Output to `src/content/docs/en/reference/cli/*.md` (English only; the other locales fall back)

#### REST API

1. Spec at `public/openapi.yaml`
2. `starlight-openapi` plugin (configured in `astro.config.mjs`) renders the pages under `integrations/rest-api`

#### LLM & crawler outputs

1. `starlight-llm-actions` (configured in `astro.config.mjs`) serves every docs page as markdown at `<page-url>.md`, advertises it via `<link rel="alternate" type="text/markdown">` and generates `/llms.txt`, `/llms-full.txt` and the topic bundles (`/llms-installation.txt`, …). The `llms.txt` entry of a page is its frontmatter `description`.
2. Device pages are custom routes the plugin cannot see: `src/pages/[lang]/*/[slug].md.ts` serve their markdown twins via `deviceMarkdown()` in `src/utils/devices.ts`, and `src/pages/llms-devices.txt.ts` lists them all.
3. `public/robots.txt` points crawlers at the sitemap; nightly device pages stay `noindex`.

### Manual content

Everything else is hand-written:

- Introduction, installation, features, integrations, reference (config & Modbus), FAQ, sponsorship
- Blog posts

## Writing Style Guide

### Product Name

- **Always write "evcc" in lowercase** — even at the beginning of sentences
- Never use "EVCC", "Evcc", or other variations
- Also lowercase "evcc" in external titles (e.g. the media list): rewrite "EVCC" → "evcc" even if the original title uses uppercase
- Prefer "your evcc instance" over a bare "evcc" when referring to a running instance
- Don't mention "evcc" unless necessary for context — within evcc docs the reader already knows. Drop self-referential fluff like "another strength of evcc", "evcc ships with", "the evcc UI"

### Language & Tone

- **Be informal and casual** — address readers directly with "you"
- Direct address only for actions the reader actually performs (UI steps, setup instructions). For technical requirements use an impersonal subject: "The plugin must return the meter reading", not "Return the meter reading"
- Write complete, natural sentences — no telegraphic or clipped phrasing, no semicolon-jammed clauses
- Write for individual professionals, not businesses
- Avoid corporate or marketing language (e.g. don't use words like "convenient", "seamlessly")
- Be concise and direct; describe behaviour, not internals (no libraries / quotas / internal naming schemes in user-facing docs)
- Don't pitch the absence of analytics/telemetry as a feature — frame it as the default

### Terminology

- **Use the shared glossary** — agreed terms per language with explanations live in `../evcc/i18n/glossary/` (`<lang>.json`, rules in `README.md`). Check it before wording anything user-facing; if a concept is missing there, fall back to the UI strings in `../evcc/i18n/<lang>.json`
- The language rules of every locale live in `scripts/i18n/style/<lang>.md`; `en.md` is the sheet for the English source and the translations follow theirs
- Use "solar" instead of "PV" or "photovoltaic"
- Use UK English spelling (e.g., "optimise" not "optimize")
- Exception: the "optimizer" feature is always spelled with "z", matching the UI — generic verbs and nouns keep UK spelling ("optimising", "optimisation")
- Use abbreviations: "e.g." not "for example"
- Use "sponsor token" as two words, lowercase in body text, title case only in headings
- A boxed UI panel is a "card"

### Formatting Conventions

#### Document Structure

- Keep document structure flat where possible — avoid excessive nesting
- Use clear, descriptive section headings
- Consider restructuring if sections become too granular

#### Headings

- Use title case (e.g., "Frequently Asked Questions"); translations follow their style sheet, most use sentence case

#### UI Elements & Technical Terms

- **Bold** for UI elements and modes: **Smart**, **Charging plan**
- **Bold with `→` separator** for UI navigation paths: **Configuration → EEBus**
- `Code formatting` for configuration keys: `residualPower`, `evcc.yaml`
- _Italics_ for technical terms when introducing concepts

#### Lists

- End complete sentences with periods
- Don't use periods for simple fragments
- Be consistent within each list
- Convert bulleted lists to prose when they become too short

#### Numbers & Units

- **Always use a space** between number and unit: `11 kW`, `230 V`
- **Percent is the exception**: no space between number and `%`: `50%`, `60%`
- **Paragraph signs**: space between `§` and number in body text: `§ 14a EnWG`, `§ 9 EEG` (matches the device templates). Only navigation labels and page titles use the compact short form: `§14a, §9`
- Use period for decimals, comma for thousands: `1.4 kW`, `11,200 W`

#### Quotation Marks

- Use "English quotes" for actual quotations
- Prefer _italics_ over quotes for technical terms

#### Prose style

- No em-dashes or en-dashes as sentence connectors
- No history lessons / deprecated aliases in user-facing docs
- Don't add Docker bullets to setup instructions

#### Media List (`media.md`)

- New entries go at the top of their section (newest first), format: `Month Year · source \` + linked original title
- Mark entries whose language differs from English with a language marker after the source, e.g. `(de)`; English entries get no marker. The pipeline adjusts the markers per locale.

#### Markdown Formatting

- **Put each sentence on a separate line** to improve diff handling
- This doesn't affect the rendered HTML output
- Makes reviewing changes much easier in git
- Use standard **prettier** formatting for final formatting
- Run `npm run format` (or `npx prettier --write .`) to format all files

### Starlight / MDX Features

- Use **`.mdx`** for pages that need components; plain `.md` works for prose-only pages
- Component imports use Astro path aliases:
  - `import Screenshot from "@components/Screenshot.astro";`
  - `import { Tabs, TabItem, Steps } from "@astrojs/starlight/components";`
- **Same import path in every locale** — no `../../../../../` gymnastics like Docusaurus had
- **Frontmatter** uses Starlight's schema:
  ```yaml
  ---
  title: "Solar Surplus Charging"
  description: "Explains how solar surplus charging works in Solar and Min+Solar mode and at which power charging starts, pauses or switches phases."
  sidebar:
    order: 1
  ---
  ```
  Don't use Docusaurus' `sidebar_position`.
- **`description` is mandatory** on every English page (exception: the generated `reference/cli/*.md`). Add it when creating a page and revise it when the page's scope changes. See "Page Descriptions" below.
- **Tabs**: `<Tabs>` + `<TabItem label="…">` from `@astrojs/starlight/components`
- **Admonitions** (Starlight set, slightly different from Docusaurus):
  - `:::note` — general note
  - `:::tip` — only for genuinely helpful tips that save users time
  - `:::caution` — important cautions about functionality (replaces Docusaurus' `:::warning`)
  - `:::danger` — actual data-loss / safety risks
  - Use sparingly — prefer integrating information into main text
  - Optional custom title in brackets: `:::caution[Important]`
- **Code blocks** with syntax highlighting: ` ```yaml `, ` ```javascript `
- **Sidebar configuration** is defined centrally in `astro.config.mjs` under `starlight({ sidebar: [...] })` — there are no per-folder `_category_.json` files

#### Internal Linking

##### Link Formats

- **Locale-prefixed absolute links**: `/en/features/solar-charging` or `/de/features/solar-charging`
- **Never use relative links** (`./linux`, `../meters`, `loadpoints#charger`) for pages — the production site (GitHub Pages) serves pages with a trailing slash, so relative links resolve one level too deep and 404. Local dev serves without the trailing slash, so the breakage is invisible locally.
- Relative paths are fine (and preferred) for **co-located images/assets** — Astro bundles them at build time
- **Anchors**: `/en/reference/configuration/site#residualpower`
- **Never include** `.md` or `.mdx` extensions in links
- The REST API pages are not locale-prefixed: link to `/integrations/rest-api`

##### Validation

- `npm run build` validates all internal links via `starlight-links-validator` and fails on broken links, missing anchors, and relative page links — CI enforces this on every PR
- Custom routes under `src/pages/[lang]/` (device pages, `external-limit`, `notifications`, `nightly`) plus the openapi and blog index pages are excluded from validation in `astro.config.mjs`; extend that list when adding new custom routes

##### Best Practices

- Use locale-prefixed absolute paths (`/en/...`, `/de/...`) for clarity
- Keep anchor names (`#section`) consistent between translations
- **Anchor names are always English** in both locales, matching the English heading slug (e.g. `signs-and-directions`, not `vorzeichen-und-richtungen`) — this keeps anchors working when switching languages
- **Create explicit anchors** on headings instead of relying on auto-generated ones
  - Auto-generated anchors change with heading text and differ between languages
  - In `.md` files use the compact form: `### Vehicle Detection {#vehicle}`
  - In `.mdx` files escape the braces, because MDX parses `{...}` as a JSX expression: `### Vehicle Detection \{#vehicle\}`
  - Don't put a `<a id="…"></a>` element between a heading and its first paragraph: Starlight's spacing rule skips paragraphs that follow an `a` element, so the gap below the heading disappears. Use a raw anchor element only for targets that aren't headings, on its own line before the target.

### Page Descriptions

The frontmatter `description` becomes the `<meta name="description">` (search snippets, link previews), the intro line of the page's markdown twin and the page's entry in `llms.txt`, where LLMs decide from that line alone whether to fetch the page.

- **Audience**: a person scanning search results or a page list. They should understand what the page helps them do without opening it. Write for humans first; a good human summary is also the best LLM summary.
- **Style**: one complete, natural sentence with a verb, 90 to 160 characters (translations up to 170), ending with a period. Same tone as the body text: direct, informal, no marketing. No "This page …", no "Learn how to …", no colon followed by a keyword list ("The chargers list: name and type …" is not acceptable).
- **Level**: name the concrete outcome or question the page answers (what you can set up, what behaviour it explains, which platform it covers). Use everyday product terms (charger, meter, home battery, charging point, solar). Mention a config key only when it is the thing people look up (e.g. `residualPower`), at most one or two, written without backticks.
- **Terms**: use the glossary terms (`../evcc/i18n/glossary/`), UI wording from `../evcc/i18n/en.json` and the page's own headings; the pipeline translates the description with the page.
- **Blog posts**: start with the kind and date so readers and LLMs can judge age, e.g. "Release notes for evcc 0.124 from February 2024 with …" or "Community portrait from August 2024: …".
- Good: "Install evcc from the apt repository on Debian, Ubuntu and similar distributions, run it as a systemd service and keep it updated or roll back."
- Bad: "The mqtt section: broker and topic plus user, password, clientid, insecure, caCert, clientCert and clientKey."

### Documentation Best Practices

1. Always check existing documentation before creating new pages
2. Maintain consistency with existing documentation style
3. Use clear, concise language suitable for technical documentation
4. Include code examples where appropriate
5. **Edit English only** and regenerate the other locales with `/translate <lang>` so they stay in sync
6. Every new or reworked page gets a frontmatter `description` following "Page Descriptions" above; check it still fits after content changes
7. Test changes locally with `npm run dev` (serves every locale at `/<lang>/...`)

## Git Workflow

- Main branch: `main`
- Keep commit messages brief and concise
- Reference issues when applicable
- Keep commits focused and atomic

## AI Attribution

Work produced by an AI agent must be attributable as such on GitHub. Append the tool's attribution footer to every PR description, issue body, review, and comment written by an agent, for example:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

Commit messages are the exception: no footer, and no `Co-Authored-By` trailer. Never dress agent work up as human review (e.g. "PR by an agent but looks good to me") in place of the footer.

## Common Tasks

- Updating device docs: edit YAML in `/templates`, rebuild
- Updating prose docs: edit the relevant `.md`/`.mdx` under `src/content/docs/en/`, then `/translate <lang>` for the other locales
- Adding a new sidebar entry: update `astro.config.mjs`
- Adding a new component: drop a `.astro` file into `src/components/`, import via `@components/...`
- Fixing issues: check both templates and rendered output (`npm run build`)

## Important Notes

- This repository is primarily for documentation
- Source code for evcc itself lives in the main evcc repository
- Device templates are kept in sync with releases of the main repo
- Preserve template structure and variables when editing YAML
