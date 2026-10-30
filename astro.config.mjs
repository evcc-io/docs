// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlightBlog from "starlight-blog";
import starlightLlmActions from "starlight-llm-actions";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
import starlightLinksValidator from "starlight-links-validator";
import mermaid from "astro-mermaid";
import { unified } from "@astrojs/markdown-remark";
import remarkHeadingId from "remark-heading-id";
import { readdirSync, readFileSync } from "node:fs";
import { matchesGlob } from "node:path";
import locales from "./src/locales.json" with { type: "json" };

const LANGS = Object.keys(locales);
// a one-item brace like {en} is not expanded, so a single locale stays plain
const LANG_GLOB = LANGS.length > 1 ? `{${LANGS.join(",")}}` : LANGS[0];

// UI dictionaries (src/content/i18n/<lang>.json) also feed the site title and
// sidebar labels, so new locales only add their own JSON file.
const dicts = Object.fromEntries(
  readdirSync("src/content/i18n").map((f) => [
    f.replace(".json", ""),
    JSON.parse(readFileSync(`src/content/i18n/${f}`, "utf8")),
  ]),
);
/** @param {string} key */
const tr = (key) =>
  Object.fromEntries(
    Object.entries(dicts)
      .filter(([, d]) => d[key])
      .map(([lang, d]) => [lang, d[key]]),
  );
// Sidebar entry label: English text plus all translations of `sidebar.<id>`.
/** @param {string} id */
const label = (id) => {
  const { en, ...translations } = tr(`sidebar.${id}`);
  return { label: en, translations };
};

export default defineConfig({
  site: "https://docs.evcc.io",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  vite: {
    build: {
      rolldownOptions: {
        // Astro injects "use astro:head-inject" into every MDX module; rolldown
        // warns about non-"use strict" directives once per page. Pure noise.
        checks: { moduleLevelDirective: false },
      },
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkHeadingId],
    }),
  },
  redirects: {
    "/": "/en",
    "/docs": "/de",
    "/docs/Home": "/de",
    "/en/docs": "/en",
    "/en/docs/Home": "/en",
    "/docs/reference/api": "/en/integrations/rest-api",
    "/en/docs/reference/api": "/en/integrations/rest-api",
    "/en/features/external-control": "/en/external-limit",
    "/de/features/external-control": "/de/external-limit",
    "/en/integrations/home-assistant": "/en/smarthome/home-assistant",
    "/de/integrations/home-assistant": "/de/smarthome/home-assistant",
  },
  integrations: [
    mermaid({
      theme: "neutral",
      autoTheme: false,
    }),
    starlight({
      title: tr("site.title"),
      description:
        "Documentation for evcc, the open-source charge controller for solar surplus and dynamic-tariff EV charging.",
      components: {
        Head: "./src/components/Head.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        Search: "./src/components/Search.astro",
        SocialIcons: "./src/components/SocialIcons.astro",
        LanguageSelect: "./src/components/LanguageSelect.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
        EditLink: "./src/components/EditLink.astro",
        MarkdownContent: "./src/components/MarkdownContent.astro",
        MobileTableOfContents: "./src/components/MobileTableOfContents.astro",
        MobileMenuToggle: "./src/components/MobileMenuToggle.astro",
        Header: "./src/components/Header.astro",
        MobileMenuFooter: "./src/components/MobileMenuFooter.astro",
      },
      logo: {
        light: "./src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.ico",
      customCss: [
        "./src/styles/custom.css",
        "./src/styles/evcc-tokens.css",
        "./src/styles/evcc-admonitions.css",
        "./src/styles/evcc-chrome.css",
      ],
      defaultLocale: "en",
      locales,
      editLink: {
        baseUrl: "https://github.com/evcc-io/docs/edit/main/",
      },
      plugins: [
        starlightBlog({
          title: "Blog",
          navigation: "none",
          postCount: 100,
          recentPostCount: 100,
          authors: {
            naltatis: {
              name: "naltatis",
              url: "https://github.com/naltatis",
            },
            derandereandi: {
              name: "derandereandi",
              url: "https://github.com/derandereandi",
            },
            detlef: {
              name: "detlef",
              url: "https://hee.se",
            },
          },
        }),
        starlightOpenAPI([
          {
            base: "integrations/rest-api",
            label: "REST API",
            schema: "./public/openapi.yaml",
          },
        ]),
        starlightLlmActions({
          // Every docs page gets a markdown twin at /{slug}.md, advertised via
          // <link rel="alternate" type="text/markdown">. "simple" flattens
          // MDX components (Tabs, Steps, asides) to plain markdown.
          markdownUrl: "/{slug}.md",
          renderMarkdown: "simple",
          linkAlternate: true,
          llmsTxt: {
            title: "evcc",
            description:
              "Documentation for evcc, the open-source charge controller for solar surplus and dynamic-tariff EV charging. " +
              "English pages live under /en, German under /de (append .md to any page URL for markdown). " +
              "Supported devices (chargers, meters, vehicles, tariffs) are listed in https://docs.evcc.io/llms-devices.txt.",
            // Bundles and index stay English; other locales keep their .md routes.
            exclude: LANGS.filter((l) => l !== "en").map((l) => `${l}/**`),
            promote: ["en", "en/installation/**", "en/features/**"],
            demote: ["en/reference/cli/**", "en/media", "en/blog/**"],
            subsets: [
              {
                label: "Installation",
                description:
                  "installing and initial setup on Linux, Raspberry Pi, Docker, Home Assistant, macOS, Windows",
                paths: ["en/installation/**"],
              },
              {
                label: "Features",
                description:
                  "solar surplus charging, dynamic tariffs, charge planner, home battery, load management, vehicles",
                paths: ["en/features/**"],
              },
              {
                label: "Configuration reference",
                description: "evcc.yaml options, plugins, Modbus, CLI commands",
                paths: ["en/reference/**"],
              },
              {
                label: "Integrations",
                description:
                  "MQTT and REST APIs, MCP server, Home Assistant, openHAB, ioBroker and other smart home systems",
                paths: ["en/integrations/**", "en/smarthome/**"],
              },
              {
                label: "Blog",
                description:
                  "release notes and community posts, oldest first; older posts may describe outdated behaviour",
                paths: ["en/blog/**"],
              },
            ],
          },
          // Page dropdown: copy / view markdown only.
          actions: { printPdf: false, openIn: false },
        }),
        starlightLinksValidator({
          // Translated pages fall back to English, links to them are valid
          errorOnFallbackPages: false,
          // installation guides intentionally link to http://localhost:7070
          errorOnLocalLinks: false,
          // device and integration pages are custom routes (src/pages) the validator cannot see;
          // intro partials (_intros) are checked standalone, their same-page anchors live on the list page
          exclude: ({ file, link }) =>
            (file.includes("/_intros/") && link.startsWith("#")) ||
            [
              `/${LANG_GLOB}/{chargers,meters,vehicles,smartswitches,heating,tariffs,external-limit,notifications,nightly}{,/**,#*}`,
              `/${LANG_GLOB}/reference/state{,#*}`,
              // starlight-openapi and starlight-blog routes are not visible to the validator
              "/integrations/rest-api{,/**}",
              `/${LANG_GLOB}/blog`,
            ].some((glob) => matchesGlob(link.split("?")[0], glob)),
        }),
      ],
      sidebar: [
        {
          ...label("introduction"),
          items: [
            {
              ...label("overview"),
              slug: "",
            },
            {
              ...label("media"),
              slug: "media",
            },
          ],
        },
        {
          ...label("installation"),
          items: [
            { autogenerate: { directory: "installation", collapsed: true } },
          ],
        },
        {
          ...label("devices"),
          items: [
            {
              ...label("chargers"),
              link: "/chargers",
            },
            {
              ...label("meters"),
              link: "/meters",
            },
            {
              ...label("vehicles"),
              link: "/vehicles",
            },
            {
              ...label("smartswitches"),
              link: "/smartswitches",
            },
            {
              ...label("heating"),
              link: "/heating",
            },
            {
              ...label("userDefined"),
              link: "/user-defined-devices",
            },
          ],
        },
        {
          ...label("tariffs"),
          link: "/tariffs",
        },
        {
          ...label("features"),
          items: [
            { autogenerate: { directory: "features", collapsed: true } },
            {
              ...label("externalLimit"),
              link: "/external-limit",
            },
          ],
        },
        {
          ...label("integrations"),
          items: [
            ...openAPISidebarGroups,
            { ...label("mqttApi"), slug: "integrations/mqtt-api" },
            { ...label("mcp"), slug: "integrations/mcp" },
            {
              label: "Sunny Home Manager",
              slug: "integrations/sma-sunny-home-manager",
            },
            {
              ...label("ocppForwarding"),
              slug: "integrations/ocpp-forwarding",
            },
            {
              ...label("notifications"),
              link: "/notifications",
            },
          ],
        },
        {
          ...label("smartHome"),
          items: [
            { label: "Home Assistant", slug: "smarthome/home-assistant" },
            { label: "openHAB", slug: "smarthome/openhab" },
            { label: "ioBroker", slug: "smarthome/iobroker" },
            { label: "Homey", slug: "smarthome/homey" },
            { label: "Garmin", slug: "smarthome/garmin" },
            {
              ...label("more"),
              slug: "smarthome/awesome",
            },
          ],
        },
        {
          ...label("reference"),
          items: [
            {
              label: "evcc.yaml",
              collapsed: true,
              items: [
                {
                  autogenerate: {
                    directory: "reference/configuration",
                    collapsed: true,
                  },
                },
              ],
            },
            { ...label("plugins"), slug: "reference/plugins" },
            { ...label("modbus"), slug: "reference/modbus" },
            { ...label("webUi"), slug: "reference/web-ui" },
            { ...label("whiteLabel"), slug: "reference/white-label" },
            { ...label("apiState"), link: "/reference/state" },
            { ...label("app"), slug: "reference/app" },
            {
              ...label("cli"),
              collapsed: true,
              items: [
                {
                  autogenerate: { directory: "reference/cli", collapsed: true },
                },
              ],
            },
          ],
        },
        { ...label("faq"), slug: "faq" },
        {
          ...label("reportProblem"),
          slug: "report-a-problem",
        },
        {
          ...label("contribute"),
          slug: "contribute",
        },
        { slug: "sponsorship" },
      ],
    }),
    // Starlight bundles its own (older) @astrojs/mdx that ignores `markdown.processor`,
    // which breaks GFM tables and remark plugins in .mdx files.
    // Registering our own copy makes Starlight skip its bundled one.
    mdx({ optimize: true }),
    sitemap({
      // Nightly device pages are noindex and must stay out of the sitemap.
      filter: (page) => !/\/nightly(\/|$)/.test(page),
    }),
  ],
});
