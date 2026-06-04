// @ts-check
import fs from "node:fs";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import starlightBlog from "starlight-blog";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
import mermaid from "astro-mermaid";
import remarkHeadingId from "remark-heading-id";

const langRedirectScript = fs.readFileSync(
  new URL("./src/scripts/lang-redirect.js", import.meta.url),
  "utf8",
);

export default defineConfig({
  site: "https://docs.evcc.io",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
  redirects: {
    "/": "/en",
    "/docs": "/de",
    "/docs/Home": "/de",
    "/en/docs": "/en",
    "/en/docs/Home": "/en",
    "/docs/reference/api": "/en/integrations/rest-api",
    "/en/docs/reference/api": "/en/integrations/rest-api",
  },
  integrations: [
    mermaid({
      theme: "neutral",
      autoTheme: false,
    }),
    starlight({
      title: {
        en: "evcc - smart charging",
        de: "evcc - Smart laden",
      },
      description: "evcc Dokumentation",
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        SocialIcons: "./src/components/SocialIcons.astro",
        LanguageSelect: "./src/components/LanguageSelect.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
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
      locales: {
        en: { label: "English", lang: "en" },
        de: { label: "Deutsch", lang: "de" },
      },
      head: [{ tag: "script", content: langRedirectScript }],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/evcc-io/evcc",
        },
      ],
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
        starlightLlmsTxt({
          exclude: ["**/blog/**"],
        }),
      ],
      sidebar: [
        {
          label: "Introduction",
          translations: { de: "Einführung" },
          items: [
            {
              label: "Overview",
              translations: { de: "Überblick" },
              slug: "",
            },
            {
              label: "Talks, Videos & Blogs",
              translations: { de: "Vorträge, Videos & Blogs" },
              slug: "media",
            },
          ],
        },
        {
          label: "Installation",
          items: [
            { autogenerate: { directory: "installation", collapsed: true } },
          ],
        },
        {
          label: "Devices",
          translations: { de: "Geräte" },
          items: [
            {
              label: "Chargers",
              translations: { de: "Wallboxen" },
              link: "/chargers",
            },
            {
              label: "PV, Battery, Grid, Meter",
              translations: { de: "PV, Batterie, Netz, Zähler" },
              link: "/meters",
            },
            {
              label: "Vehicles",
              translations: { de: "Fahrzeuge" },
              link: "/vehicles",
            },
            {
              label: "Smart switches",
              translations: { de: "Schaltbare Steckdosen" },
              link: "/smartswitches",
            },
            {
              label: "Heating",
              translations: { de: "Heizgeräte" },
              link: "/heating",
            },
            {
              label: "User-defined devices",
              translations: { de: "Benutzerdefinierte Geräte" },
              link: "/user-defined-devices",
            },
          ],
        },
        {
          label: "Tariffs & forecasts",
          translations: { de: "Tarife & Vorhersagen" },
          link: "/tariffs",
        },
        {
          label: "Features",
          translations: { de: "Funktionen" },
          items: [{ autogenerate: { directory: "features", collapsed: true } }],
        },
        {
          label: "Integrations",
          translations: { de: "Integrationen" },
          items: [
            ...openAPISidebarGroups,
            { label: "MQTT API", slug: "integrations/mqtt-api" },
            { label: "Home Assistant", slug: "integrations/home-assistant" },
            { label: "MCP-Server", slug: "integrations/mcp" },
            {
              label: "Sunny Home Manager",
              slug: "integrations/sma-sunny-home-manager",
            },
          ],
        },
        {
          label: "Reference",
          translations: { de: "Referenz" },
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
            { label: "Plugins", slug: "reference/plugins" },
            { label: "Modbus", slug: "reference/modbus" },
            {
              label: "CLI",
              collapsed: true,
              items: [
                {
                  autogenerate: { directory: "reference/cli", collapsed: true },
                },
              ],
            },
          ],
        },
        { label: "FAQ", translations: { de: "Häufige Fragen" }, slug: "faq" },
        { slug: "sponsorship" },
      ],
    }),
    sitemap({
      // Nightly device pages are noindex and must stay out of the sitemap.
      filter: (page) => !/\/nightly(\/|$)/.test(page),
    }),
  ],
});
