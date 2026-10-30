---
name: release-blog
description: Draft the release blog post for the latest evcc minor release — detect the version, interview the author, generate screenshots, write the English post (other locales come from /translate)
---

# Release blog post

Write the blog post for an evcc minor release.
The post is a personal, human document: the author (Michael) decides the final content.
Your job is to prepare, interview, illustrate, and draft — never to publish, commit, or finalise on your own.

## 1. Detect the version

Source of truth: https://github.com/evcc-io/evcc/releases

```bash
gh release list --repo evcc-io/evcc --limit 15
```

Take the latest published minor (`X.Y.0`).
If a blog post for that minor already exists under `src/content/docs/en/blog/`, target the next minor instead.
Confirm the detected version with the author before continuing.

## 2. Gather

- Fetch release notes for the minor and all its patch releases so far:
  `gh release view <tag> --repo evcc-io/evcc --json body -q .body`
- Read the previous release/highlights post (newest post tagged `highlights`) for continuity, tone, and structure.
- For big items, skim the linked PRs in ../evcc when the changelog line is not enough to explain user impact.

## 3. Propose topics

Suggest topics generously — rather more than less; the author cuts, not you.
For each candidate, summarise the **actual impact for users**, not the changelog line.

Good candidates:

- UI changes (usually strong candidates)
- Infra topics, e.g. release process changes (stabler releases, faster bugfix rollouts)
- Structural changes/additions, e.g. new data domains like temperature support
- Notable behaviour changes and breaking changes (at least a pointer)

Always keep the summary block listing added devices/templates/services (the "New Device Support" section from past posts), closing with a link to the release notes.

## 4. Interview the author

The Q&A is integral — do not skip it or draft first.
Use AskUserQuestion rounds:

1. Which topics make the post (multiSelect from your proposals).
2. Per chosen topic: personal angle, anecdotes, opinions, context the changelog doesn't have.
3. Outlook items (what's coming next).
4. Title and slug.

Expect free-text answers; fold them into the draft verbatim in spirit, not as quotes.

## 5. Screenshots

Blog screenshots are generated ad hoc — **no screenshot code, config, or npm script is committed for blog posts**.

- English locale, light theme, single variant. No reproducibility requirement.
- Write throwaway playwright config + specs into `screenshot-generator/.blog-tmp/` (must live inside `screenshot-generator/` so node module resolution finds `@playwright/test` and `sharp`; the scratchpad does not work). Delete the directory when the post is done.
  Reuse from `screenshot-generator/`: the `./evcc` binary, `recipes/*.evcc.yaml` fixtures, SQL dumps, and `recipes/utils/evcc.js` (start/stop, apiReady wait; config paths resolve as `recipes/<name>`, so reference `.blog-tmp` files as `../.blog-tmp/<name>`) plus `recipes/utils/overlay.js` if callouts are needed.
- Fix locale/theme before `page.goto` via `addInitScript` setting `localStorage` keys `settings_locale: "en"` and `settings_theme: "light"` (pattern in `recipes/utils/loop.js`, without its 4-variant loop).
- Viewport 1280x1200, `deviceScaleFactor: 2`; `page.screenshot({path: "…​.webp", quality: 80, omitBackground: true, animations: "disabled"})`, 2x only, clip logic as in `recipes/utils/loop.js`. Mobile shots: `page.setViewportSize({width: 430, height: ~820})`.
- Run with cwd `screenshot-generator/` (every call, the shell cwd resets): `cd screenshot-generator && npx playwright test -c .blog-tmp/blog.config.js .blog-tmp/<spec>`.
- evcc binary must match the release: `gh release download <tag> --repo evcc-io/evcc -p "*macOS-all*"`, extract, copy to `screenshot-generator/evcc`, verify with `./evcc -v`. (Building ../evcc at the tag also works but touches that repo.)
- State setup: prefer existing recipe YAMLs/SQL dumps; use direct API pokes (`request.post("/api/...")`) for cheap state, like ../evcc/tests does. Demo mode is unsuitable (values move randomly). The demo tariff templates (`demo-dynamic-grid`, `demo-solar-forecast`, `demo-co2-forecast`, `demo-temperature-forecast`) are stable and great for forecast screenshots.
- SQL dumps: evcc migrates old schemas on start, and the dump's `CREATE TABLE` may already include newer columns — extend/enrich a copy of an existing dump when a feature needs data the old dump lacks (e.g. `soc_start`, `soc_end`, `added_range` in `sessions`).
- Selectors can differ between the release binary and current recipes (written against nightly) — when a selector fails, check the markup at the tag: `git -C ../evcc grep -n "<term>" <tag> -- assets/js/`.
- Before scripting a new shot, check `src/assets/**` for existing docs screenshots that already show the feature (en-light 2x variant can be copied straight into the post dir).
- Style: broad context (whole card/section, not tight crops), primary colour visible where natural, no code touching the image edge.
- Save images directly into the post directory; they are reviewed together with the surrounding draft content — no separate approval round.
- Videos are optional: playwright `recordVideo` can capture interactions; convert to mp4 and embed via `Video.astro` with a poster webp. Manual for now.

### Device-framing videos (app/phone recordings)

Never draw a phone bezel by hand (looks fake). Use [frames-cli](https://github.com/viticci/frames-cli) with the official Apple product bezels (MacStories "Apple Frames" assets, ~40 MB from cdn.macstories.net — non-interactive setup: download the zip yourself and run `frames setup <extracted>/Frames`):

1. `python3 frames video --alpha --strip-audio --color "Deep Blue" --output framed.mov <recording>.mov` — auto-detects the device (e.g. iPhone 17 Pro Portrait from a 1206x2622 recording), outputs transparent ProRes (huge intermediate, delete after).
2. Composite onto the blog background (evcc-green radial glow + dot grid, generated as SVG via sharp; soft blurred shadow rect behind the phone) and encode:
   `ffmpeg -i framed.mov -loop 1 -framerate 30 -i bg.png -filter_complex "[0:v]scale=<w>:<h>[ph];[1:v][ph]overlay=<x>:<y>,format=yuv420p,fps=30[out]" -map "[out]" -an -t <dur> -c:v libx264 -crf 22 -movflags +faststart out.mp4`
   Square 1080x1080 canvas, phone ~940 px tall, centered. IMPORTANT: always pass `-t <source duration>` — looped image inputs otherwise encode forever.
3. Poster = first-second frame as webp (sharp, quality 80). Embed with `<Video src poster autoplay aspect="1 / 1">`, assets co-located in both locale trees.

Frame colours for the green background: "Deep Blue" or "Silver" (avoid Cosmic Orange).

## 6. Draft the English post

Editorial conventions that emerged in practice:

- **Structure:** 3–4 focus sections (matching title and banner) plus a "Kleinere Verbesserungen"/"Smaller Improvements" bullet section for everything else, then device support.
  Expect sections to get demoted to bullets during review; when one does, remove its screenshot too.
- **Title:** Highlights pattern with the top topics, no trailing "und mehr"; version number goes in the intro, not the title.
  Adjust title, teaser and slug to the FINAL section structure and banner at the end.
- **PR links:** feature bullets link their PR inline on the key phrase (e.g. `[Bereichsnavigation](…/pull/32810)`); one PR can back two bullets.
- **Scannable version numbers:** `<code>0.<u>314</u>.0</code>` — underline the significant part inside code style.
  Intraword `**` fails after digits (CommonMark flanking rule); use HTML tags.
- **Verify novelty** before claiming something is new: `git -C ../evcc tag --contains <commit>` — features often shipped in an earlier minor (e.g. plan strategies, 24h stats).
- **Two planning levels, never mixed:** optimizer (whole home) and Ladeplanung (one loadpoint + vehicle) get separate sections/bullets; see the optimizer-vs-charging-plan memory.
- **Localised screenshots:** when `src/assets` carries per-locale variants, use the matching language per tree (deviation from byte-identical assets is fine).

Path: `src/content/docs/en/blog/YYYY/MM/DD/<slug>.mdx` (date = publication day).

Frontmatter (exact shape from past posts):

```yaml
---
date: YYYY-MM-DD
title: "…"
authors: [naltatis]
tags: [release, highlights]
prev: false
next: false
cover:
  alt: "…"
  image: "./<slug>.webp"
---
```

The cover banner is supplied by the author (built in Claude Design from the previous banner's template).
Provide the input for it: a compact list of the top topics as icon + title + subhead (subheads short and scannable, offer a few wording variants per topic); the author picks and builds the graphic, then hands back a PNG to convert to webp (sharp, quality 80) in the English post directory.
The referenced `./<slug>.webp` must exist or the build fails (Astro `ImageNotFound`) — generate a clearly-marked placeholder (2000x1000, like past banners) via sharp and remind the author to replace it.

Structure:

- Intro of 3–4 sentences: link the previous release post, link the release on GitHub, tease the topics. Then the `{/* excerpt */}` marker.
- One `##` section per topic: what it does, why it matters (user scenario), link into the docs, then image or `<Video>`.
- Feature names bolded inline. Give headings that get back-linked an explicit id in the escaped MDX form (`## Optimizer Progress \{#optimizer\}`), never a separate `<a id>` element below the heading (kills the spacing).
- "New Device Support" section: bolded category lists, closing with a release-notes link.
- "Outlook" as last content section.
- Fixed closing: `---` rule, 💚 thank-you paragraph, seasonal well-wish, then:

  ```
  **Best regards**<br />
  The evcc Team<br />
  Michael, Andi & Uli
  ```

Style: sentence per line, lowercase "evcc", UK English, no marketing language, credit community contributors by GitHub handle with thanks, images as plain `![alt](./name.webp)`.
`{/* TODO: … */}` is the accepted placeholder convention for missing pieces.

## 7. Other locales

English is the only hand-written locale.
Once the author has approved the English post, run `/translate all --phase blog` (German included): the pipeline translates the post line-parallel under `scripts/i18n/RULES.md`, swaps the locale prefix, keeps anchors English and references the English assets.
Never write the German post by hand and never copy assets into other locale trees.

## 8. Finish

- `npm run format`
- `npm run build` (validates internal links)
- Hand the draft to the author for review.
- On the author's explicit go-ahead ("create PR"): set the publication date they name (directory + frontmatter), branch, commit, push, `gh pr create`. Not before.
- Clean up: delete `screenshot-generator/.blog-tmp/` and scratch intermediates.
