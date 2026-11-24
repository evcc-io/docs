import type { MarkdownHeading } from "astro";

type Partial = { Content: any; getHeadings: () => MarkdownHeading[] };

// Prose around the device lists lives in MDX partials per locale,
// src/content/docs/<lang>/_intros/_<name>.mdx (ignored by the docs loader).
const partials = import.meta.glob<Partial>(
  "/src/content/docs/*/_intros/_*.mdx",
  { eager: true },
);

/** Partial for the given locale, English until it is translated. */
export function intro(lang: string, name: string): Partial {
  return (
    partials[`/src/content/docs/${lang}/_intros/_${name}.mdx`] ??
    partials[`/src/content/docs/en/_intros/_${name}.mdx`]
  );
}
