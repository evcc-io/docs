# Screenshot Generator

Uses [Playwright](https://playwright.dev) to generate screenshots for the documentation.
All screenshots are generated in **light** and **dark mode** and in every docs language from `../src/locales.json`.
They are written directly to `../src/assets/features/screenshots/` as `<name>-<lang>-<theme>-{1,2}x.webp`.
The `Screenshot` component picks the matching variant based on the page locale.

## Usage

Navigate into this directory and install the dependencies:

```bash
cd screenshot-generator
npm ci
```

Copy a current `evcc` binary into this directory. You may want to build it first.

```bash
cp ../../evcc/evcc ./
```

Generate all screenshots in all languages:

```bash
npm run start
```

Restrict the languages by setting `LANGS`, e.g. to repair a single locale:

```bash
LANGS=nl npm start
```

The evcc binary must contain the UI translation for each locale, since recipes read UI labels from the running instance via `recipes/utils/i18n.js`.

Generate selective screenshots via Playwright UI:

```bash
npm run dev
```

This launches Playwright UI. Run the tasks you want to execute from there. Playwright will write the screenshots to the correct locations.

The spawned evcc instance uses port 7099, so it does not conflict with a local dev instance on 7070.

## Adding new screenshots

The recipes are located in `recipes/**.spec.js`. Modify and add new recipes as needed.
