# AI Assistant Instructions for evcc Documentation

## Project Overview

This is the documentation repository for evcc (Electric Vehicle Charge Controller).
The documentation is generated from templates and synchronized with the main evcc repository.

## Repository Structure

```
/docs                               # German documentation (default locale)
/blog                               # German blog posts (default locale)
/templates                          # YAML device templates
/i18n/en                            # English translations
  /docusaurus-plugin-content-docs   # English docs (maps to /docs)
  /docusaurus-plugin-content-blog   # English blog (maps to /blog)
  /docusaurus-theme-classic         # UI strings, navigation
/static                             # Images, logos, API specs
/src                                # React components, utilities
```

### Documentation (`/docs`)

Main documentation content.
Most content is **manually written**, except for:

- `docs/devices/*.mdx` - Device lists auto-generated from templates
- `docs/tariffs.mdx` - Tariff providers auto-generated from templates
- `docs/reference/cli/*.md` - CLI documentation auto-generated from main evcc repo

### Templates (`/templates`)

YAML device templates organized by:

- `nightly/` and `release/` versions
- Language subdirectories (`de/`, `en/`)
- Device categories:
  - `charger/` - Wallboxes and charging stations
  - `meter/` - Energy meters, inverters, batteries
  - `vehicle/` - Vehicle integrations
  - `tariff/` - Dynamic tariff and forecast providers

### Internationalization (`/i18n`)

- **German is the default locale** (main content in `/docs` and `/blog`)
- English translations in `/i18n/en/`
- UI strings and navigation labels in `docusaurus-theme-classic/`
- Some blog posts have English versions, others remain German-only

### Content Workflows

#### Auto-Generated Content

##### Device & Tariff Pages

1. Templates in `/templates/{version}/{lang}/{category}/`
2. Processed by `src/generateFromTemplate.js`
3. Output to `docs/devices/*.mdx` and `docs/tariffs.mdx`
4. Marked with `<!-- AUTO-GENERATED CONTENT BELOW THIS LINE -->`

##### CLI Documentation

1. Generated from main evcc repository
2. Output to `docs/reference/cli/*.md`
3. See README.md section "Update CLI docs" for generation instructions

#### Manual Content

Everything else is manually maintained:

- Core documentation pages
- Installation guides
- Feature descriptions
- Blog posts
- FAQ and troubleshooting

## Writing Style Guide

### Product Name

- **Always write "evcc" in lowercase** - even at the beginning of sentences
- Never use "EVCC", "Evcc", or other variations

### Language & Tone

- **Be informal and casual** - address readers directly with "you" (English) or "du" (German)
- Write for individual professionals, not businesses
- Avoid corporate or marketing language (e.g. don't use words like "bequem", "convenient", "seamlessly")
- Be concise and direct
- Use simple, factual language without embellishment

### Terminology

#### English

- Use "solar" instead of "PV" or "photovoltaic"
- Use UK English spelling (e.g., "optimise" not "optimize")
- Use abbreviations: "e.g." not "for example"

#### German

- Use "PV-Anlage" with hyphen (follow Duden rules for compound words)
- Be consistent with hyphens: "PV-Überschuss", "PV-Modus"
- Use abbreviations: "z. B." not "beispielsweise"

### Formatting Conventions

#### Document Structure

- Keep document structure flat where possible - avoid excessive nesting
- Use clear, descriptive section headings
- Consider restructuring if sections become too granular

#### Headings

- **German**: Use sentence case (e.g., "Häufige Fragen")
- **English**: Use title case (e.g., "Frequently Asked Questions")

#### UI Elements & Technical Terms

- **Bold** for UI elements and modes: **PV-Modus**, **Min+PV**
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

#### Markdown Formatting

- **Put each sentence on a separate line** to improve diff handling
- This doesn't affect the rendered HTML output
- Makes reviewing changes much easier in git
- Use standard **prettier** formatting for final formatting
- Run `npx prettier --write .` to format all files

#### Docusaurus Features

- Use **MDX** format for advanced features (React components in markdown)
- Import components: `import Screenshot from "../../src/components/Screenshot"`
- Tabs for multi-language/multi-platform content: `<Tabs>` and `<TabItem>`
- Admonitions: `:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger`
  - Use sparingly - prefer integrating information into main text
  - `:::warning` for important cautions about functionality
  - `:::tip` only for genuinely helpful tips that save users time
- Code blocks with syntax highlighting: ` ```yaml `, ` ```javascript `
- Frontmatter for metadata: `sidebar_position`, `title`, `tags`
- Images automatically optimized from `/static/img/`

#### Internal Linking

##### Link Formats

- **Absolute links**: `/docs/features/solar-charging` - Always from root
- **Relative links**: `../features/vehicle` or `./configuration` - For nearby pages
- **Anchors**: `/docs/reference/configuration/site#residualpower` - For specific sections
- **Never include** `.md` or `.mdx` extensions in links

##### German/English Considerations

- **German docs** (`/docs`): Use standard paths like `/docs/features/solar-charging`
- **English docs** (`/i18n/en`): Use the **same paths** - Docusaurus handles locale routing
- Links automatically switch to the current language version
- If English page doesn't exist, link falls back to German

##### Component Import Paths

- **German**: `import Screenshot from "../../src/components/Screenshot"`
- **English**: `import Screenshot from "../../../../../src/components/Screenshot"`
- Path depth differs due to i18n folder structure

##### Best Practices

- Prefer absolute paths (`/docs/...`) for clarity and consistency
- Use relative paths (`../`) only within the same section
- Always test links in both language versions
- Keep anchor names (#section) consistent between translations
- **Create explicit anchors** with `{#anchor-name}` on headings instead of relying on auto-generated ones
  - Auto-generated anchors change with heading text and differ between languages
  - Example: `### Vehicle Detection {#vehicle}` ensures stable, language-independent linking

### Documentation Best Practices

1. Always check existing documentation before creating new pages
2. Maintain consistency with existing documentation style
3. Use clear, concise language suitable for technical documentation
4. Include code examples where appropriate
5. **Update both German and English versions together** to prevent divergence
6. Test your changes locally with `npm run start` (German) or `npm run start:en` (English)

## Git Workflow

- Main branch: `main`
- Keep commit messages brief and concise
- Reference issues when applicable
- Keep commits focused and atomic

## Common Tasks

- Updating documentation: Edit templates in `/templates` directory
- Adding new features: Create corresponding documentation templates
- Fixing issues: Check both templates and generated output
- Testing: Verify template processing and output formatting

## Important Notes

- This repository is primarily for documentation
- Code changes should be made in the main evcc repository
- Documentation is automatically synchronized with releases
- Always preserve existing template structure and variables
