---
name: translate
description: Translate docs, blog and website into a locale, or bring an existing locale up to date (status → batches → translate-locale workflow with Opus 5.5 agents)
---

# Translate a locale

Usage: `/translate <lang|all> [--phase core|blog|site|blog+site|all] [--commit] [--worktree]`

The pipeline translates from English only (`src/content/docs/en`), reviews every batch with independent agents and verifies with `scripts/i18n/*`.
Translated locales are never edited by hand; rerun this skill after English changes.

## 1. Preconditions

- `../evcc` checkout present, `../evcc/i18n/glossary/<lang>.json` complete.
- `git status` clean in this repo (and in `../evcc.io` for the site phase), or pass `enStat` (output of `git diff --stat HEAD -- src/content/docs/en | tail -1`) so the gate can tell pre-existing English changes from pipeline damage.
- `src/locales.json` lists the locale; `scripts/i18n/style/<lang>.md` exists (write one from the glossary README section when adding a locale).

## 2. Workspace

- `--worktree` (overnight, several locales in parallel): follow plan section F2:
  `git worktree add .worktrees/<lang> -b i18n/<lang> i18n/infra` (or from `main` once infra is merged), clone `node_modules`, `screenshot-generator/node_modules` and `screenshot-generator/evcc` with `cp -c`, same for the site: `git -C ../evcc.io worktree add $PWD/.worktrees/site-<lang> -b i18n/<lang> <base>`.
- Otherwise (maintenance) stay in the current checkout; if on `main`, `git switch -c i18n/<lang>-update`.

## 3. Prepare

```bash
node scripts/i18n/terms.mjs <lang>            # regenerates scripts/i18n/terms/<lang>.md
node scripts/i18n/status.mjs <lang> --json    # missing / outdated / chrome keys
```

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

Keep the agent count per run under 1,000 (≈170 per locale for `all`); split into `core` and `blog+site` runs for five locales.
On abort or edit: resume with the run id and the same args.

## 6. Report

Read `<scratch>/i18n-report-<lang>-<phase>.md` per locale and summarise: pages, findings by severity, retranslated batches, unresolved items, gate verdicts, commit shas.
Maintenance mode leaves changes uncommitted unless `--commit`; the user opens PRs manually.
