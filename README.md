# evcc docs

Official documentation repository of [evcc](https://evcc.io).

## General

- The source content of the folder `templates` is the `templates/definition` folder in the [evcc repository](https://github.com/evcc-io/evcc)
- We recommend to test changes locally, use the instructions below to run the documentation page locally as you can see how the changes will look like on the web page while you make changes.

## Local setup

First clone the repository, then follow with the following steps.

**Requirement:** You need to have [`nodejs`](https://nodejs.org/en/) (version >= 22) and `npm` installed (comes with `nodejs`).

### Installation

```sh
$ npm ci
```

### Local Development

```sh
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

Start in English mode.

```sh
npm run start -- --locale en
```

### Build

```sh
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service. It should be run before any changes are committed, as it also includes link checking.

### Update CLI docs

CLI documentation is automatically generated.
Generation needs to be triggered manually.
Run this command inside the evcc core repository (e.g. `./evcc`).

```sh
go run main.go gendoc ../evcc-docs/docs/reference/cli/
```

## Contributing

### Code Formatting

Before submitting a PR, run `npm run format` to ensure consistent code formatting.

The CI pipeline will automatically check formatting and fail if files are not properly formatted.

**VS Code users:** The repository includes recommended settings to format files automatically on save.

### Content Changes

**Important:** When making content changes, always update both German and English versions together to prevent translations from getting out of sync.

- German content: `/docs` and `/blog`
- English content: `/i18n/en/docusaurus-plugin-content-docs/current` and `/i18n/en/docusaurus-plugin-content-blog`

If you only speak one language, please mention this in your PR so maintainers can help with the translation.
