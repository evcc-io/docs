# Screenshot Generator

Uses [Playwright](https://playwright.dev) to generate screenshots for the documentation.
All screenshots are generated in **light** and **dark mode** and in **English** and **German**.

## Usage

Navigate into this directory and install the dependencies:

```bash
cd screenshot-generator
npm ci
```

Copy the `evcc` binary file into this directory. You may want to build it first.

```bash
cp /path/to/evcc ./
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

## Adding new screenshots

The recipes are located in `recipes/**.spec.js`. Modify and add new recipes as needed.
