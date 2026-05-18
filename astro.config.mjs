// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import starlightBlog from "starlight-blog";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
import mermaid from "astro-mermaid";
export default defineConfig({
  site: "https://docs.evcc.io",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  redirects: {
    "/": "/en",
    "/docs": "/de",
    "/docs/Home": "/de",
    "/en/docs": "/en",
    "/en/docs/Home": "/en",
    "/docs/reference/api": "/en/integrations/rest-api",
    "/en/docs/reference/api": "/en/integrations/rest-api",
    "/de/reference/plugins": "/de/plugins",
    "/en/reference/plugins": "/en/plugins",
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
      },
      logo: {
        light: "./src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.ico",
      customCss: ["./src/styles/custom.css"],
      defaultLocale: "en",
      locales: {
        en: { label: "English", lang: "en" },
        de: { label: "Deutsch", lang: "de" },
      },
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
      ],
      sidebar: [
        { label: "Introduction", translations: { de: "Einführung" }, slug: "" },
        {
          label: "Installation",
          items: [{ autogenerate: { directory: "installation", collapsed: true } }],
        },
        {
          label: "Devices",
          translations: { de: "Geräte" },
          items: [
            { label: "Chargers", translations: { de: "Wallboxen" }, link: "/chargers" },
            { label: "PV, Battery, Grid, Meter", translations: { de: "PV, Batterie, Netz, Zähler" }, link: "/meters" },
            { label: "Vehicles", translations: { de: "Fahrzeuge" }, link: "/vehicles" },
            { label: "Smart switches", translations: { de: "Schaltbare Steckdosen" }, link: "/smartswitches" },
            { label: "Heating", translations: { de: "Heizgeräte" }, link: "/heating" },
            { label: "User-defined", translations: { de: "Benutzerdefiniert" }, link: "/plugins" },
          ],
        },
        {
          label: "Features",
          translations: { de: "Funktionen" },
          items: [{ autogenerate: { directory: "features", collapsed: true } }],
        },
        {
          label: "Tariffs & forecasts",
          translations: { de: "Tarife & Vorhersagen" },
          link: "/tariffs",
        },
        {
          label: "Integrations",
          translations: { de: "Integrationen" },
          items: [
            { autogenerate: { directory: "integrations", collapsed: true } },
            ...openAPISidebarGroups,
          ],
        },
        {
          label: "Reference",
          translations: { de: "Referenz" },
          items: [
            {
              label: "evcc.yaml",
              collapsed: true,
              items: [{ autogenerate: { directory: "reference/configuration", collapsed: true } }],
            },
            { label: "Modbus", slug: "reference/modbus" },
            {
              label: "CLI",
              collapsed: true,
              items: [{ autogenerate: { directory: "reference/cli", collapsed: true } }],
            },
          ],
        },
        { label: "FAQ", translations: { de: "Häufige Fragen" }, slug: "faq" },
        { slug: "sponsorship" },
      ],
    }),
    sitemap(),
  ],
});
