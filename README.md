# evcc docs

Official documentation repository of [evcc](https://evcc.io).
The site is built with [Astro](https://astro.build/) and the [Starlight](https://starlight.astro.build/) docs theme.

## General

- The source content of the folder `templates` is the `templates/definition` folder in the [evcc repository](https://github.com/evcc-io/evcc).
- We recommend testing changes locally. The instructions below show how to run the documentation site so you can see your edits live as you make them.

## Local setup

First clone the repository, then follow with the steps below.

**Requirement:** [`nodejs`](https://nodejs.org/en/) (version ≥ 26) and `npm` (comes with `nodejs`).

### Installation

```sh
npm ci
```

### Local development

```sh
npm run dev
```

This starts the Astro dev server with hot reload.
Both locales are served from the same instance:

- English: <http://localhost:4321/en>
- German: <http://localhost:4321/de>

### Build

```sh
npm run build
```

This builds the static site into `dist/` and runs the legacy-redirect generator.
The output can be served by any static host.

## Contributing

### Code formatting

Before submitting a PR, run `npm run format` to ensure consistent formatting.
The CI pipeline checks formatting and will fail if files are not formatted.

**VS Code users:** the repository includes recommended settings to format files automatically on save.

### Content changes

**Important:** when making content changes, always update both English and German versions together to prevent translations from getting out of sync.

- English content: `src/content/docs/en/`
- German content: `src/content/docs/de/`

If you only speak one language, mention this in your PR so maintainers can help with the translation.
