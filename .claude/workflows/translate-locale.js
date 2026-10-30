export const meta = {
  name: "translate-locale",
  description:
    "Translate evcc docs, blog and website into locales with independent AI review and deterministic gates",
  whenToUse:
    "Overnight locale runs and /translate <lang> maintenance; args come from scripts/i18n/batches.mjs",
  phases: [
    {
      title: "Translate",
      detail:
        "per batch: translate → review A ∥ review B (∥ review A2 for core1) → fix",
      model: "claude-opus-5-5",
    },
    {
      title: "Screenshots",
      detail: "one locale at a time on port 7099, beside translation",
    },
    {
      title: "Finalize",
      detail:
        "per locale: glossary sweep, build + gates, commit, report (serialised)",
    },
  ],
};

// args: { phase: 'core'|'blog'|'site'|'blog+site'|'all', commit: boolean, scratch: '/abs/dir',
//         locales: [{ lang, name, docs, site, batches: [{ id, tier, kind, files, words }] }] }
const {
  locales,
  phase = "all",
  commit = false,
  scratch,
  enStat = "",
  screenshots = true,
} = args;
const MODEL = "claude-opus-5-5";
const SEV = ["critical", "major", "minor", "nit"];
const KINDS = (phase === "all" ? "core+blog+site" : phase)
  .split("+")
  .flatMap((p) => (p === "core" ? ["chrome", "docs"] : [p]));

const FINDING = {
  type: "object",
  required: ["file", "severity", "type", "issue"],
  properties: {
    file: { type: "string" },
    line: { type: "integer" },
    severity: { enum: SEV },
    type: {
      enum: [
        "omission",
        "addition",
        "meaning",
        "terminology",
        "ui-string",
        "number-unit",
        "register",
        "fluency",
        "typography",
        "consistency",
        "markup",
        "anchor-link",
        "description",
      ],
    },
    source: { type: "string" },
    target: { type: "string" },
    issue: { type: "string" },
    suggestion: { type: "string" },
  },
};
const REVIEW = {
  type: "object",
  required: ["findings", "verdict"],
  properties: {
    findings: { type: "array", items: FINDING },
    verdict: { enum: ["pass", "fix", "retranslate"] },
    notes: { type: "string" },
  },
};
const TRANSLATE = {
  type: "object",
  required: ["files"],
  properties: {
    files: {
      type: "array",
      items: {
        type: "object",
        required: ["path", "status", "checkPage"],
        properties: {
          path: { type: "string" },
          status: { enum: ["written", "skipped", "failed"] },
          checkPage: { enum: ["pass", "fail", "n/a"] },
          notes: { type: "string" },
        },
      },
    },
    uiTermsMissing: { type: "array", items: { type: "string" } },
    glossaryDoubts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          en: { type: "string" },
          chosen: { type: "string" },
          why: { type: "string" },
        },
      },
    },
    problems: { type: "array", items: { type: "string" } },
  },
};
const FIX = {
  type: "object",
  required: ["applied", "rejected", "checkPage", "verdict"],
  properties: {
    applied: { type: "integer" },
    rejected: {
      type: "array",
      items: {
        type: "object",
        properties: {
          file: { type: "string" },
          line: { type: "integer" },
          reason: { type: "string" },
        },
      },
    },
    checkPage: { enum: ["pass", "fail", "n/a"] },
    verdict: { enum: ["done", "retranslate"] },
    unresolved: { type: "array", items: { type: "string" } },
  },
};
const SWEEP = {
  type: "object",
  required: ["leaksFixed"],
  properties: {
    leaksFixed: { type: "integer" },
    variantsFixed: {
      type: "array",
      items: {
        type: "object",
        properties: {
          concept: { type: "string" },
          from: { type: "string" },
          to: { type: "string" },
          count: { type: "integer" },
        },
      },
    },
    unresolved: { type: "array", items: { type: "string" } },
    notes: { type: "string" },
  },
};
const GATE = {
  type: "object",
  required: ["build", "formatCheck", "committed", "reportPath"],
  properties: {
    build: { enum: ["pass", "fail", "n/a"] },
    formatCheck: { enum: ["pass", "fail", "n/a"] },
    status: {
      type: "object",
      properties: {
        missing: { type: "integer" },
        outdated: { type: "integer" },
        checkFailures: { type: "integer" },
      },
    },
    glossaryLeaks: { type: "integer" },
    screenshots: { type: "integer" },
    outOfScopeRestored: { type: "array", items: { type: "string" } },
    committed: { type: "string" },
    reportPath: { type: "string" },
    unresolved: { type: "array", items: { type: "string" } },
    notes: { type: "string" },
  },
};
const SHOTS = {
  type: "object",
  required: ["count"],
  properties: {
    count: { type: "integer" },
    zeroByte: { type: "array", items: { type: "string" } },
    errors: { type: "array", items: { type: "string" } },
    notes: { type: "string" },
  },
};

// ---------- prompt templates ----------
const P = {};

P.docsCommon = `Locale: {{LANG}} ({{LANG_NAME}}). Docs worktree: {{WT}} (git branch i18n/{{LANG}}). Work only inside this worktree; run every command from its root.
Binding references (read them first, in this order): {{RULES}} (what to keep, what to translate, what never to do), {{STYLE}} (form of address, typography, numbers), {{TERMS}} (glossary per concept and the exact UI strings).
Never touch anything under src/content/docs/en or under any locale other than {{LANG}}, never edit files outside your batch, never run npm run build or npm run format, never commit, stage or create branches. Return only JSON per the schema (StructuredOutput); never print file contents.`;

P.translateDocs = `You translate evcc documentation from English into {{LANG_NAME}}.
{{DOCS_COMMON}}

Batch {{BATCH_ID}} ({{KIND}}), paths relative to src/content/docs/en/:
{{FILES}}

For each file:
- Read the English source. Write the translation to the same path under src/content/docs/{{LANG}}/ (same file name, also for _*.mdx partials; overwrite if it exists), one file at a time.
- If that target file already exists, read it first: it may be an earlier translation or hand-written {{LANG_NAME}} text. Keep its wording wherever it matches the English in meaning and detail, and change only what differs from the English or breaks RULES.md; do not rewrite good sentences for the sake of it.
- Translate as a native technical writer would: natural {{LANG_NAME}}, same meaning, same level of detail, same tone (direct, no marketing), form of address per the style sheet even though the English uses "you" casually. One sentence per line as in the source.
- Keep the structure identical where RULES.md says so (frontmatter keys, code structure with localised comments and example values, components, anchors, internal link targets apart from the locale prefix); external links and asset paths follow the link and asset rules in RULES.md (prefer an existing localised asset, verify a localised external link exists).
- Then run: node scripts/i18n/check-page.mjs {{LANG}} <path> --stamp
  Fix every error it reports and re-run until it exits 0. Treat warnings as hints; fix the ones that are real.
- Finally run: npx prettier --write <every file you wrote>
UI strings: a bold UI element or an "A → B" path uses the exact UI translation from the terms file. If it is missing there, run: node scripts/i18n/terms.mjs {{LANG}} "<English string>". If it is not a UI string at all, translate naturally and list it under uiTermsMissing.
When the glossary and the UI string disagree, the UI string wins inside bold UI references and the glossary wins in running prose. Record real doubts in glossaryDoubts; do not stall on them.`;

P.translateChrome = `You translate the UI chrome strings of the evcc documentation site from English into {{LANG_NAME}}.
{{DOCS_COMMON}}

Batch {{BATCH_ID}}: create src/content/i18n/{{LANG}}.json from src/content/i18n/en.json (read de.json as a second reference for tone and length).
- Produce every key that exists in en.json, same key names, same order. Values are short UI strings, sidebar labels (sidebar.*), the site title (site.title), feature labels and descriptions, and a few longer strings with markdown or inline HTML.
- Keep placeholders like {{href}} or {{issuesUrl}} exactly. Keep inline HTML tags and markdown syntax. Rewrite internal links /en/... to /{{LANG}}/... (the REST API link /integrations/rest-api has no prefix).
- Sidebar labels and short labels are navigation text: short, sentence case per the style sheet, consistent with the UI terms file (e.g. the UI's own names for Configuration, Vehicles, Sessions).
- starlightBlog.* keys: translate them too; keep the i18next plural suffixes (_one/_other) and the {{count}} / {{author}} / {{tag}} placeholders and the {{date, datetime(...)}} expression unchanged.
- translationNotice.text: the sentence shown on every translated page next to the edit link; make it short and natural.
- Validate: node -e "JSON.parse(require('fs').readFileSync('src/content/i18n/{{LANG}}.json','utf8'))" and node scripts/i18n/status.mjs {{LANG}} --json (chrome.i18nMissingKeys must be empty), then npx prettier --write src/content/i18n/{{LANG}}.json.
Return files: [{ path: "src/content/i18n/{{LANG}}.json", status, checkPage: "n/a" }].`;

P.reviewA = `You are an independent reviewer of a {{LANG_NAME}} translation of evcc documentation. You did not write it. You do not edit files; you report.
{{DOCS_COMMON}}

Batch {{BATCH_ID}} ({{KIND}}). For each path below compare the source src/content/docs/en/<path> with the target src/content/docs/{{LANG}}/<path> (for the chrome batch: src/content/i18n/en.json vs src/content/i18n/{{LANG}}.json, key by key):
{{FILES}}

Method: both files have one sentence per line, so walk them line by line. For every sentence check: nothing missing, nothing added, same meaning and the same conditions and negations, numbers and units identical in value and formatted per the style sheet, the glossary term used for each concept (inflection is fine), bold UI strings equal to the terms file, correct form of address, anchors and internal links unchanged except the locale prefix, external links and assets localised only as RULES.md allows, evcc lowercase. Check title and description (90 to 170 characters, one natural sentence, same content as the English). Ignore whitespace and prettier formatting. Do not report style preferences as errors.
Severity: critical = wrong or missing instruction, changed meaning, wrong number; major = wrong glossary or UI term, wrong register, broken markup or link; minor = correct but clumsy, typography; nit = taste.
{{ADVERSARIAL}}
Verdict: pass (no critical, at most two major), fix (otherwise), retranslate (a file is unusable: missing sections, wrong language, machine-like throughout).
Quote the source and the target line in every finding and give a concrete suggestion in {{LANG_NAME}}.`;

P.reviewB = `You are a native {{LANG_NAME}} reader reviewing documentation pages for evcc. You read the {{LANG_NAME}} text only. Do NOT open anything under src/content/docs/en/ or src/content/i18n/en.json; judge the text as a reader would. You do not edit files; you report.
Locale: {{LANG}}. Docs worktree: {{WT}}. Read {{STYLE}} and {{TERMS}} first. Return only JSON per the schema.

Batch {{BATCH_ID}} ({{KIND}}), files under src/content/docs/{{LANG}}/ (for the chrome batch: src/content/i18n/{{LANG}}.json):
{{FILES}}

Report where the text does not read like it was written in {{LANG_NAME}}: calques and English sentence order, wrong or inconsistent form of address, inconsistent terms for the same thing within these files (name both variants), wrong compounds or hyphenation, typography (quotes, apostrophes, spaces before punctuation, decimal comma, unit spacing, percent), heading case, descriptions that do not read as one natural sentence, sentences a reader would stumble on. Do not report markup, code, links or anchors; other checks cover them. Do not rewrite for taste; report what a careful editor would change.
Severity: major = a reader misreads or is put off; minor = noticeable; nit = taste. Verdict: pass / fix / retranslate (only if the text is unreadable throughout).
Give the target excerpt and a concrete suggestion for each finding.`;

P.fix = `You apply review findings to a {{LANG_NAME}} translation of evcc documentation.
{{DOCS_COMMON}}

Batch {{BATCH_ID}} ({{KIND}}), files under src/content/docs/{{LANG}}/ (for the chrome batch: src/content/i18n/{{LANG}}.json):
{{FILES}}

Review reports (JSON): {{REPORTS}}

For each finding: apply it with a minimal edit, or reject it with a one-line reason (contradicts RULES.md, contradicts the terms file, two reviewers disagree and the current text is correct, the suggestion changes the meaning). Apply consistency fixes to every occurrence in the batch files, not only the quoted line.
Then run node scripts/i18n/check-page.mjs {{LANG}} <path> --stamp for every touched page until it exits 0 (for the chrome JSON: node scripts/i18n/status.mjs {{LANG}} --json must show no missing chrome keys), and npx prettier --write on the touched files.
Verdict retranslate only if a file has more than five critical findings or a reviewer requested it and you agree; otherwise done.`;

P.sweep = `You do the locale-wide consistency sweep for the {{LANG_NAME}} translation of evcc documentation.
{{DOCS_COMMON}}
Scope of this run: {{SCOPE}}.

1. Run: node scripts/i18n/glossary-check.mjs {{LANG}} (it exits 1 when it has findings). Fix every English-term leak and every compound or register slip it lists, in the translated files only.
2. For each glossary concept in the terms file, grep src/content/docs/{{LANG}} (and src/content/i18n/{{LANG}}.json) for plausible variant wordings (synonyms, other compounds, other spellings) and unify them to the agreed term unless the context clearly demands otherwise. Record each unification.
3. Re-run node scripts/i18n/check-page.mjs {{LANG}} <path> --stamp on every page you touched (exit 0) and npx prettier --write on the touched files.
4. Run glossary-check again and report what remains.`;

P.gate = `You run the quality gate for the {{LANG_NAME}} translation of evcc documentation and, if everything passes, commit it.
{{DOCS_COMMON}}
Exception to the rules above: you may run npm run build and npm run format:check here, and you may commit when COMMIT is true.
Phase: {{PHASE}}. COMMIT: {{COMMIT}}. Commit message: "{{MESSAGE}}". Summary of this locale's batches, sweep and screenshots (JSON): {{SUMMARY}}

Execute every item in order and record a verdict with a one-line detail for each:
1. node scripts/i18n/status.mjs {{LANG}} --json --check → in the scope of this phase (core = all non-blog pages and chrome; blog = blog posts) there must be 0 missing, 0 outdated and 0 check failures. Pages outside the phase scope may be missing.
2. npm run build exits 0 (the links validator runs inside it).
3. npm run format:check exits 0.
4. node scripts/i18n/glossary-check.mjs {{LANG}} → advisory: list the remaining leaks and pattern hits with the sweep's classification (code values, product names, verbatim titles are false positives); this item does not fail the gate.
5. English untouched: the command git diff --stat HEAD -- src/content/docs/en | tail -1 must print exactly "{{EN_STAT}}" (the value recorded before this run; an empty value means no output). For information, list modified paths from git status --porcelain outside src/content/docs/{{LANG}}/, src/content/i18n/{{LANG}}.json, src/assets/ (files containing -{{LANG}}-) and scripts/i18n/terms/{{LANG}}.md; they may predate this run. Never restore, revert or check out anything.
6. Screenshots (core phase only): find src/assets -name "*-{{LANG}}-*.webp" | wc -l should be 152 and there must be no zero-byte file; report the count.
7. Fallback audit: after the build, compare dist/{{LANG}}/**/index.html with the dist/en twin; pages that are identical apart from the locale prefix must only be reference/cli/* and device or custom routes. Any other page is an untranslated leak; list them.
8. From the summary: every batch has at least two reviewer results and checkPage pass; no unresolved critical finding; the unresolved list has at most five items.
9. If COMMIT is true and items 1 to 5 pass: git add src/content/docs/{{LANG}} src/content/i18n/{{LANG}}.json src/assets scripts/i18n/terms && git commit -q -m "{{MESSAGE}}" (no trailer, no footer, no co-author line). Then git status --porcelain must be empty and you report the short commit sha. If a gate failed, do not commit; report what failed.
10. Write the report to {{SCRATCH}}/i18n-report-{{LANG}}-{{PHASE}}.md: branch, commit sha, pages in scope, a per-batch table (findings by severity, applied, rejected, retranslated, unresolved), sweep summary, each gate verdict, unresolved items. Return its path.`;

P.shots = `You generate the {{LANG_NAME}} UI screenshots for the evcc documentation.
Docs worktree: {{WT}}. Work only in {{WT}}/screenshot-generator and never edit any file there or elsewhere. Return only JSON per the schema.
The generator runs Playwright against a local evcc on port 7099 (the evcc binary and node_modules are present in the worktree). Run the recipes one spec file at a time so each command finishes within ten minutes:
  cd {{WT}}/screenshot-generator && for each f in recipes/*.spec.js: LANGS={{LANG}} npx playwright test <f>
If a spec fails, rerun it once; then move on and record the failure. Afterwards count the output: find {{WT}}/src/assets -name "*-{{LANG}}-*.webp" | wc -l (expect 152) and list zero-byte files. Make sure no evcc process is left running on port 7099 when you finish (pkill -f "evcc --config" if needed).`;

P.siteTranslate = `You translate the evcc.io homepage and media kit from English into {{LANG_NAME}}.
Site worktree (Hugo): {{SITE_WT}} (git branch i18n/{{LANG}}). Work only inside it; run commands from its root. Read {{RULES}} and {{STYLE}} for language rules and {{TERMS}} for terminology; the Hugo-specific rules below win for structure. Never commit. Return only JSON per the schema; never print file contents.

Produce these four outputs together:
1. config.toml: fill the existing [languages.{{LANG}}] block: remove the disabled = true line, translate title, params.description, params.langMsg ("This page is available in {{LANG_NAME}}." in {{LANG_NAME}}), params.langSwitch, params.langStay, and set docsUrl = "https://docs.evcc.io/{{LANG}}/" and blogUrl = "https://docs.evcc.io/{{LANG}}/blog/". Keep weight and locale as they are. Do not touch any other block.
2. i18n/{{LANG}}.toml: copy i18n/en.toml and translate every value; keep all 24 keys, keep inline HTML and placeholders ({{ . }}) exactly. TOML quoting: values with apostrophes use basic "..." strings; values with inline HTML containing double quotes use literal '...' strings; never mix.
3. content/_index.{{LANG}}.md from content/_index.en.md: translate the prose and the translatable shortcode params. A shortcode param is translatable only if its value differs between _index.en.md and _index.de.md (title, alt, subline, name); every other param, the shortcode names, group=, icon=, img=, src=, anchors like {#devices} and (#community-...), HTML comments and the (/slack) link stay byte-identical. Rewrite https://docs.evcc.io/en/ links to https://docs.evcc.io/{{LANG}}/ (the docs exist for this locale). GitHub and other external links unchanged.
4. content/media-kit.{{LANG}}.md from content/media-kit.en.md: keep the front matter (hideHero: true), translate the prose, keep links and image paths.
Verify: hugo --minify -d {{SCRATCH}}/evcc.io-{{LANG}} exits 0 without i18n warnings; test -f {{SCRATCH}}/evcc.io-{{LANG}}/{{LANG}}/index.html; the number of shortcode calls ({{</ or {{%) in content/_index.{{LANG}}.md equals the number in content/_index.en.md; grep finds no docs.evcc.io/en/ in the new content files; the two new content files and the toml are listed by git status. Run npx prettier --write on the files you changed (the repo has a prettier config with the go-template plugin).
Return files with checkPage "n/a".`;

P.siteReview = `You are an independent reviewer of the {{LANG_NAME}} translation of the evcc.io homepage and media kit. You do not edit; you report. Site worktree: {{SITE_WT}}. Read {{STYLE}} and {{TERMS}} first. Return only JSON per the schema.
Compare, line by line: config.toml [languages.{{LANG}}] block vs [languages.en]; i18n/{{LANG}}.toml vs i18n/en.toml (same 24 keys, placeholders and inline HTML intact, TOML quoting valid); content/_index.{{LANG}}.md vs content/_index.en.md (same shortcode calls in the same order, only translatable params changed, docs links point to /{{LANG}}/); content/media-kit.{{LANG}}.md vs content/media-kit.en.md. Then read the {{LANG_NAME}} text on its own as a native reader: fluency, register per the style sheet, consistent terms, typography, marketing-free tone like the English.
Severity and verdict as follows: critical = wrong meaning, broken shortcode or TOML; major = wrong glossary or UI term, wrong register, broken link; minor = clumsy or typography; nit = taste. Verdict pass / fix / retranslate. Quote source and target and give a concrete suggestion.`;

P.siteFix = `You apply review findings to the {{LANG_NAME}} translation of evcc.io and then verify and commit it.
Site worktree: {{SITE_WT}} (git branch i18n/{{LANG}}). Read {{RULES}} (language rules only) and {{STYLE}}. COMMIT: {{COMMIT}}. Return only JSON per the schema.
Review report (JSON): {{REPORTS}}
Apply each finding with a minimal edit or reject it with a one-line reason. Then: hugo --minify --printI18nWarnings -d {{SCRATCH}}/evcc.io-{{LANG}} exits 0 with no i18n warnings (Hugo version deprecation warnings are acceptable); test -f {{SCRATCH}}/evcc.io-{{LANG}}/{{LANG}}/index.html; shortcode call count equals en; no docs.evcc.io/en/ left in the new files; i18n/{{LANG}}.toml has 24 keys; the [languages.{{LANG}}] block has no disabled line; npx prettier --write on changed files; git diff --name-only i18n/infra lists only config.toml, i18n/{{LANG}}.toml, content/_index.{{LANG}}.md, content/media-kit.{{LANG}}.md (restore anything else with git checkout i18n/infra -- <file> and list it).
If COMMIT is true and all checks pass: git add config.toml i18n/{{LANG}}.toml content/_index.{{LANG}}.md content/media-kit.{{LANG}}.md && git commit -q -m "Add {{LANG_NAME}} homepage and media kit" (no trailer, no footer); report the short sha in committed. Write a short report to {{SCRATCH}}/i18n-report-{{LANG}}-site.md and return its path. Set build to the hugo verdict and formatCheck to "n/a".`;

// ---------- helpers ----------
const fill = (tpl, v) =>
  tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in v ? v[k] : `{{${k}}}`));
const vars = (L, b, extra = {}) => {
  const base = {
    LANG: L.lang,
    LANG_NAME: L.name,
    WT: L.docs,
    SITE_WT: L.site ?? "",
    BATCH_ID: b?.id ?? "",
    KIND: b?.kind ?? "",
    FILES: (b?.files ?? []).map((f) => `- ${f}`).join("\n"),
    RULES: `${L.docs}/scripts/i18n/RULES.md`,
    STYLE: `${L.docs}/scripts/i18n/style/${L.lang}.md`,
    TERMS: `${L.docs}/scripts/i18n/terms/${L.lang}.md`,
    SCRATCH: scratch,
    PHASE: phase,
    COMMIT: String(commit),
    EN_STAT: enStat,
    ADVERSARIAL: "",
    ...extra,
  };
  base.DOCS_COMMON = fill(P.docsCommon, base);
  return base;
};

async function call(tpl, v, opts) {
  const prompt = fill(tpl, v);
  const r = await agent(prompt, { model: MODEL, ...opts });
  if (r) return r;
  log(`retry: ${opts.label}`);
  return agent(
    prompt +
      "\n\n(Second attempt. The first attempt returned nothing. Check what already exists on disk, finish the task and return the JSON.)",
    { model: MODEL, ...opts, label: `${opts.label} (retry)` },
  );
}
const lock = () => {
  let p = Promise.resolve();
  return (fn) => (p = p.then(fn, fn));
};
const buildLock = lock(); // ponytail: one Astro build at a time; promise chain, no lock files
const shotLock = lock(); // one Playwright run on port 7099 at a time

// ---------- work list ----------
const tierOrder = { core1: 0, core2: 1, blog: 2, site: 3 };
const R = Object.fromEntries(
  locales.map((L) => [L.lang, { batches: {}, unresolved: [], site: null }]),
);
const items = [];
const n = Math.max(...locales.map((L) => L.batches.length));
for (let i = 0; i < n; i++)
  for (const L of locales) {
    const b = L.batches[i];
    if (b && KINDS.includes(b.kind)) items.push({ L, b });
  }
items.sort((x, y) => (tierOrder[x.b.tier] ?? 9) - (tierOrder[y.b.tier] ?? 9));
const remaining = Object.fromEntries(
  locales.map((L) => [
    L.lang,
    items.filter((i) => i.L === L && i.b.kind !== "site").length,
  ]),
);
const docsWork = Object.values(remaining).some((x) => x > 0);
log(
  `${items.length} batches across ${locales.length} locales, phase=${phase}, commit=${commit}`,
);

// screenshots: independent of translation, sequential across locales, started now (core phase only)
const shots = {};
if (KINDS.includes("docs") && screenshots)
  for (const L of locales)
    shots[L.lang] = shotLock(() =>
      call(P.shots, vars(L), {
        label: `${L.lang} screenshots`,
        phase: "Screenshots",
        schema: SHOTS,
        effort: "low",
      }),
    );

async function runBatch(L, b, attempt = 1) {
  const lbl = `${L.lang} ${b.id}`;
  const tpl = b.kind === "chrome" ? P.translateChrome : P.translateDocs;
  const t = await call(tpl, vars(L, b), {
    label: `${lbl} translate${attempt > 1 ? " #2" : ""}`,
    phase: "Translate",
    schema: TRANSLATE,
    effort: "high",
  });
  if (!t) {
    R[L.lang].unresolved.push(`${b.id}: translate returned nothing`);
    return null;
  }
  const reviewers = [
    () =>
      call(P.reviewA, vars(L, b), {
        label: `${lbl} review A`,
        phase: "Translate",
        schema: REVIEW,
        effort: "high",
      }),
    () =>
      call(P.reviewB, vars(L, b), {
        label: `${lbl} review B`,
        phase: "Translate",
        schema: REVIEW,
        effort: "high",
      }),
  ];
  if (b.tier === "core1")
    reviewers.push(() =>
      call(
        P.reviewA,
        vars(L, b, {
          ADVERSARIAL:
            "Assume at least three real errors survived the first pass; your job is to find them. Prefer precision: every finding must quote the source and the target line.",
        }),
        {
          label: `${lbl} review A2`,
          phase: "Translate",
          schema: REVIEW,
          effort: "high",
        },
      ),
    );
  const reviews = (await parallel(reviewers)).filter(Boolean); // per-item barrier: the fixer needs all reports
  const findings = reviews.flatMap((r) => r.findings ?? []);
  let fix = null;
  if (findings.length)
    fix = await call(P.fix, vars(L, b, { REPORTS: JSON.stringify(reviews) }), {
      label: `${lbl} fix`,
      phase: "Translate",
      schema: FIX,
      effort: "medium",
    });
  const wantsRedo =
    fix?.verdict === "retranslate" ||
    reviews.some((r) => r.verdict === "retranslate");
  if (wantsRedo && attempt === 1) {
    log(`${lbl}: retranslate`);
    return runBatch(L, b, 2);
  }
  const bySev = Object.fromEntries(
    SEV.map((s) => [s, findings.filter((f) => f.severity === s).length]),
  );
  const translateOk = (t.files ?? []).every(
    (f) => f.status === "written" && f.checkPage !== "fail",
  );
  const checkPage = fix ? fix.checkPage : translateOk ? "pass" : "fail";
  const rec = {
    id: b.id,
    kind: b.kind,
    attempt,
    files: b.files.length,
    reviewers: reviews.length,
    findings: bySev,
    applied: fix?.applied ?? 0,
    rejected: fix?.rejected?.length ?? 0,
    checkPage,
    uiTermsMissing: t.uiTermsMissing ?? [],
    glossaryDoubts: t.glossaryDoubts ?? [],
    problems: t.problems ?? [],
    unresolved: fix?.unresolved ?? [],
  };
  if (checkPage === "fail")
    R[L.lang].unresolved.push(`${b.id}: check-page failing`);
  if (wantsRedo)
    R[L.lang].unresolved.push(`${b.id}: retranslate requested twice`);
  if (reviews.length < 2)
    R[L.lang].unresolved.push(
      `${b.id}: only ${reviews.length} reviewer result(s)`,
    );
  return rec;
}

async function runSite(L, b) {
  const v = vars(L, b);
  const t = await call(P.siteTranslate, v, {
    label: `${L.lang} site translate`,
    phase: "Translate",
    schema: TRANSLATE,
    effort: "high",
  });
  if (!t) return { error: "translate returned nothing" };
  const r = await call(P.siteReview, v, {
    label: `${L.lang} site review`,
    phase: "Translate",
    schema: REVIEW,
    effort: "high",
  });
  const f = await call(
    P.siteFix,
    vars(L, b, {
      REPORTS: JSON.stringify(r ?? { findings: [], verdict: "pass" }),
    }),
    {
      label: `${L.lang} site fix + hugo`,
      phase: "Finalize",
      schema: GATE,
      effort: "medium",
    },
  );
  log(`${L.lang} site: hugo=${f?.build} committed=${f?.committed || "no"}`);
  return { translate: t, review: r, gate: f };
}

async function finalize(L) {
  const scope =
    phase === "blog" || phase === "blog+site"
      ? "blog posts"
      : phase === "core"
        ? "core docs and chrome"
        : "everything";
  const sweep = await call(P.sweep, vars(L, null, { SCOPE: scope }), {
    label: `${L.lang} sweep`,
    phase: "Finalize",
    schema: SWEEP,
    effort: "medium",
  });
  R[L.lang].sweep = sweep;
  R[L.lang].screenshots = shots[L.lang] ? await shots[L.lang] : null;
  const summary = JSON.stringify({
    batches: Object.values(R[L.lang].batches),
    sweep,
    screenshots: R[L.lang].screenshots,
    unresolved: R[L.lang].unresolved,
  });
  const msg = KINDS.includes("docs")
    ? `Add ${L.name} translation of docs`
    : `Add ${L.name} translation of blog posts`;
  const gatePhase = KINDS.includes("docs")
    ? KINDS.includes("blog")
      ? "core+blog"
      : "core"
    : "blog";
  R[L.lang].gate = await call(
    P.gate,
    vars(L, null, { SUMMARY: summary, MESSAGE: msg, PHASE: gatePhase }),
    {
      label: `${L.lang} gate`,
      phase: "Finalize",
      schema: GATE,
      effort: "medium",
    },
  );
  log(
    `${L.lang}: build=${R[L.lang].gate?.build} format=${R[L.lang].gate?.formatCheck} committed=${R[L.lang].gate?.committed || "no"}`,
  );
}

await pipeline(items, async ({ L, b }) => {
  if (b.kind === "site") {
    R[L.lang].site = await runSite(L, b);
    return;
  }
  const rec = await runBatch(L, b);
  if (rec) R[L.lang].batches[b.id] = rec;
  if (--remaining[L.lang] === 0) await buildLock(() => finalize(L)); // locale done → serialised finalize, no global barrier
});
if (!docsWork) await Promise.all(Object.values(shots));
return { phase, commit, locales: R };
