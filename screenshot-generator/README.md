# Screenshot Generator

Uses [Playwright](https://playwright.dev) to generate screenshots for the documentation.
All screenshots are generated in **light** and **dark mode** and in **English** and **German**.
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

Generate all screenshots:

```bash
npm run start
```

Generate selective screenshots via Playwright UI:

```bash
npm run dev
```

This launches Playwright UI. Run the tasks you want to execute from there. Playwright will write the screenshots to the correct locations.

The spawned evcc instance uses port 7099, so it does not conflict with a local dev instance on 7070.

## Adding new screenshots

The recipes are located in `recipes/**.spec.js`. Modify and add new recipes as needed.
