---
name: translate
description: Translate docs, blog and website into a locale, or bring an existing locale up to date (status → batches → translate-locale workflow with Opus 5.5 agents)
---

# Translate a locale

Usage: `/translate <lang|all> [--diff] [--light] [--phase core|blog|site|blog+site|all] [--commit] [--worktree]`

The pipeline translates from English only (`src/content/docs/en`), reviews every batch with independent agents and verifies with `scripts/i18n/*`.
Translated locales are never edited by hand; rerun this skill after English changes.

Two modes:

- **full** (default): every outdated or missing page is translated as a whole, reviewed by two or three agents, then per locale a glossary sweep, screenshots and a gate with build. For new locales, new pages and reworked pages.
- **diff** (`--diff`): only the English change since each page's `translatedFrom` stamp is translated (`node scripts/i18n/endiff.mjs <lang> <path>` shows it), one reviewer checks the changed lines, every other line stays byte-identical (`node scripts/i18n/structure.mjs <lang> <path>` enforces the paragraph and line structure), no sweep, no screenshots, one gate with one build for all locales. For maintenance after editing a few sentences; roughly a quarter of the full run time. Pass `"mode": "diff"` in the workflow args (step 5).

## Small change sets (`--light`)

Use this path whenever the run covers a handful of pages (about ten or fewer per locale), whether docs pages or blog posts, new, reworked or edited. Pick it without being asked; the full gate is for new locales and large batches.

- Pass `"gate": false` in the workflow args (step 5). The workflow then only translates, reviews (two reviewers in full mode, one in diff mode) and fixes. It runs no glossary sweep, no screenshots, no gate agent and no build, so it touches no page outside the batch.
- Limit the batches to the changed pages with `--only` (step 4).
- New and reworked pages run in full mode. Follow-up edits to a page that already has a translation run with `"mode": "diff"`, also when the English page is not committed yet (`check-page.mjs --stamp` keeps the stamped English in git's object store).
- After the run, check deterministically yourself, per locale:
  `node scripts/i18n/status.mjs <lang> --json --check` (the pages are neither missing nor outdated, no check failures) and `npx prettier --check` on the translated files; in diff mode also `node scripts/i18n/structure.mjs <lang> <path>`.
- Do not run `npm run build` per run. Build once when all English edits and all translations of the session are done, or leave it to the user when they say so.
- English edits during a run make its result outdated. Tell the user before starting, collect further edits and bring them in with one diff run afterwards.
- UI screenshots are not part of this path; run the full path with `--phase core` when a change needs new screenshots.

## 1. Preconditions

- `../evcc` checkout present, `../evcc/i18n/glossary/<lang>.json` complete.
- `git status` clean in this repo (and in `../evcc.io` for the site phase), or pass `enStat` (output of `git diff --stat HEAD -- src/content/docs/en | tail -1`) so the gate can tell pre-existing English changes from pipeline damage.
- `src/locales.json` lists the locale; `scripts/i18n/style/<lang>.md` exists (write one from the glossary README section when adding a locale).

## 2. Workspace

- `--worktree` (overnight, several locales in parallel): follow plan section F2:
  `git worktree add .worktrees/<lang> -b i18n/<lang> i18n/infra` (or from `main` once infra is merged), clone `node_modules`, `screenshot-generator/node_modules` and `screenshot-generator/evcc` with `cp -c`, same for the site: `git -C ../evcc.io worktree add $PWD/.worktrees/site-<lang> -b i18n/<lang> <base>`.
- Otherwise (maintenance) stay in the current checkout and on the current branch. Never create or switch branches on your own; the user decides where the work lands.

## 3. Prepare

```bash
node scripts/i18n/status.mjs <lang> --json    # missing / outdated / chrome keys
```

Do not regenerate the terms files on your own.
`node scripts/i18n/terms.mjs <lang>` (rewrites `scripts/i18n/terms/<lang>.md`) runs only when the user asks for it or when the file for a new locale does not exist yet.

Stop if nothing is missing or outdated and the chrome is complete.

## 4. Batches

```bash
node scripts/i18n/batches.mjs <lang> --phase <phase> --docs <abs docs path> [--site <abs site path>] [--only <missing+outdated, comma separated>]
```

One locale object per locale; collect them into `locales`.

## 5. Run

Workflow tool, name `translate-locale`, args:

```json
{ "phase": "<phase>", "commit": <bool>, "scratch": "<session scratchpad>", "locales": [ ...locale objects ] }
```

Optional: `"mode": "diff"`, `"gate": false` (small change sets, see above), `"enStat": "<value>"`.

Launch the Workflow with `scriptPath` set to this checkout's `.claude/workflows/translate-locale.js` when the current directory is a worktree on another branch, otherwise the worktree's (possibly older) copy of the script runs.
Keep the agent count per run under 1,000 (≈170 per locale for `all`); split into `core` and `blog+site` runs for five locales.
On abort or edit: resume with the run id and the same args.

## 6. Report

Read `<scratch>/i18n-report-<lang>-<phase>.md` per locale and summarise: pages, findings by severity, retranslated batches, unresolved items, gate verdicts, commit shas.
Maintenance mode leaves changes uncommitted unless `--commit`; the user opens PRs manually.
With `"gate": false` there is no report file: summarise from the workflow result (findings by severity, applied, rejected, unresolved) and from your own checks.
