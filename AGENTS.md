# AI Assistant Instructions for evcc Documentation

## Project Overview

This is the documentation repository for evcc (Electric Vehicle Charge Controller).
The site is built with [Astro](https://astro.build/) and the [Starlight](https://starlight.astro.build/) docs theme.
Device pages are generated from YAML templates that are synchronised with the main evcc repository.

## Repository Structure

```
/astro.config.mjs                   # Astro + Starlight config (sidebar, locales, plugins)
/src/content.config.ts              # Content collections (docs + device templates)
/src/content/docs/en                # English documentation (default locale)
/src/content/docs/de                # German documentation
/src/content/docs/{lang}/blog       # Blog posts per locale
/src/pages/[lang]/...               # Auto-generated device list & detail pages
/src/components                     # Astro components (.astro)
/src/utils                          # Shared TS helpers (devices, usages, icons)
/src/styles/custom.css              # Theme overrides
/src/scripts                        # Build-time scripts (legacy redirect emitter)
/templates                          # YAML device templates (input for device pages)
/public                             # Static assets served as-is (favicon, openapi.yaml, …)
```

### Documentation content (`/src/content/docs/{en,de}`)

Most content is **manually written**, except for:

- **Device list pages** — `chargers`, `meters`, `vehicles`, `smartswitches`, `heating`, `tariffs` — rendered by routes under `src/pages/[lang]/` using `src/utils/devices.ts` against the YAML templates.
- **Device detail pages** — same routes, one per template.
- **CLI reference** — `reference/cli/*.md` generated from the main evcc repository (English only, German falls back automatically).
- **REST API** — generated from `public/openapi.yaml` by `starlight-openapi`.

### Templates (`/templates`)

YAML device templates organised by:

- Channel: `nightly/` and `release/`
- Language: `de/`, `en/`
- Category: `charger/`, `meter/`, `vehicle/`, `tariff/`

The nightly/release toggle in the UI switches which collection is used at runtime.

### Internationalization

- **English is the default locale** (`defaultLocale: "en"` in `astro.config.mjs`).
- German content lives under `src/content/docs/de/`.
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
2. Output to `src/content/docs/en/reference/cli/*.md` (English only; German falls back)

#### REST API

1. Spec at `public/openapi.yaml`
2. `starlight-openapi` plugin (configured in `astro.config.mjs`) renders the pages under `integrations/rest-api`

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

- **Be informal and casual** — address readers directly with "you" (English) or "du" (German)
- Write for individual professionals, not businesses
- Avoid corporate or marketing language (e.g. don't use words like "bequem", "convenient", "seamlessly")
- Be concise and direct; describe behaviour, not internals (no libraries / quotas / internal naming schemes in user-facing docs)
- Don't pitch the absence of analytics/telemetry as a feature — frame it as the default

### Terminology

#### English

- Use "solar" instead of "PV" or "photovoltaic"
- Use UK English spelling (e.g., "optimise" not "optimize")
- Use abbreviations: "e.g." not "for example"
- Use "sponsor token" as two words, lowercase in body text, title case only in headings

#### German

- Use "PV-Anlage" with hyphen (follow Duden rules for compound words)
- Be consistent with hyphens: "PV-Überschuss", "PV-Modus"
- Use abbreviations: "z. B." not "beispielsweise"
- Use "Sponsortoken" as one word, not "Sponsor Token" or "Sponsor-Token"

### Formatting Conventions

#### Document Structure

- Keep document structure flat where possible — avoid excessive nesting
- Use clear, descriptive section headings
- Consider restructuring if sections become too granular

#### Headings

- **German**: Use sentence case (e.g., "Häufige Fragen")
- **English**: Use title case (e.g., "Frequently Asked Questions")

#### UI Elements & Technical Terms

- **Bold** for UI elements and modes: **PV-Modus**, **Min+PV**
- **Bold with `→` separator** for UI navigation paths: **Konfiguration → Externe Steuerung**, **Configuration → EEBus**
- `Code formatting` for configuration keys: `residualPower`, `evcc.yaml`
- _Italics_ for technical terms when introducing concepts

#### Lists

- End complete sentences with periods
- Don't use periods for simple fragments
- Be consistent within each list
- Convert bulleted lists to prose when they become too short

#### Numbers & Units

- **Always use a space** between number and unit: `11 kW`, `230 V`
- **German**: Use comma for decimals, period for thousands: `1,4 kW`, `11.200 W`
- **English**: Use period for decimals, comma for thousands: `1.4 kW`, `11,200 W`

#### Quotation Marks

- **German**: Use „German quotes“ for actual quotations
- **English**: Use "English quotes" for actual quotations
- Prefer _italics_ over quotes for technical terms

#### Prose style

- No em-dashes or en-dashes as sentence connectors
- No history lessons / deprecated aliases in user-facing docs
- Don't add Docker bullets to setup instructions

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
- **Same import path in both locales** — no `../../../../../` gymnastics like Docusaurus had
- **Frontmatter** uses Starlight's schema:
  ```yaml
  ---
  title: "Solar Surplus Charging"
  sidebar:
    order: 1
  ---
  ```
  Don't use Docusaurus' `sidebar_position`.
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
- Astro's router preserves the prefix, so use the locale-prefixed form for clarity
- **Anchors**: `/en/reference/configuration/site#residualpower`
- **Never include** `.md` or `.mdx` extensions in links

##### Best Practices

- Use locale-prefixed absolute paths (`/en/...`, `/de/...`) for clarity
- Keep anchor names (`#section`) consistent between translations
- **Create explicit anchors** on headings instead of relying on auto-generated ones
  - Auto-generated anchors change with heading text and differ between languages
  - In `.md` files use the compact form: `### Vehicle Detection {#vehicle}`
  - In `.mdx` files use a raw HTML anchor element on the line above (MDX parses `{...}` as a JSX expression, so the compact form breaks the build):

    ```mdx
    <a id="vehicle"></a>

    ### Vehicle Detection
    ```

### Documentation Best Practices

1. Always check existing documentation before creating new pages
2. Maintain consistency with existing documentation style
3. Use clear, concise language suitable for technical documentation
4. Include code examples where appropriate
5. **Update both English and German versions together** to prevent divergence
6. Test changes locally with `npm run dev` (serves both locales at `/en/...` and `/de/...`)

## Git Workflow

- Main branch: `main`
- Keep commit messages brief and concise
- Reference issues when applicable
- Keep commits focused and atomic

## Common Tasks

- Updating device docs: edit YAML in `/templates`, rebuild
- Updating prose docs: edit the relevant `.md`/`.mdx` under `src/content/docs/{en,de}/`
- Adding a new sidebar entry: update `astro.config.mjs`
- Adding a new component: drop a `.astro` file into `src/components/`, import via `@components/...`
- Fixing issues: check both templates and rendered output (`npm run build`)

## Important Notes

- This repository is primarily for documentation
- Source code for evcc itself lives in the main evcc repository
- Device templates are kept in sync with releases of the main repo
- Preserve template structure and variables when editing YAML
