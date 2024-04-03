import { themes as prismThemes } from "prism-react-renderer";

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "evcc - Sonne tanken ☀️🚘",
    tagline: "Sonne tanken ☀️🚘",
    url: "https://docs.evcc.io",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    onBrokenAnchors: "throw",
    favicon: "img/favicon.ico",
    organizationName: "evcc-io", // Usually your GitHub org/user name.
    projectName: "docs", // Usually your repo name.
    i18n: {
      defaultLocale: "de",
      locales: ["de", "en"],
      localeConfigs: {
        en: {
          htmlLang: "en-GB",
        },
      },
    },
    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            remarkPlugins: [require("mdx-mermaid")],
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl: "https://github.com/evcc-io/docs/tree/main",
            editLocalizedFiles: true,
          },
          blog: {
            showReadingTime: true,
            blogSidebarTitle: "Letzte Beiträge",
            blogSidebarCount: 15,
            postsPerPage: 5,
            editUrl: "https://github.com/evcc-io/docs/tree/main",
            feedOptions: {
              type: "all",
              copyright: `Copyright © ${new Date().getFullYear()} evcc.io`,
            },
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          logo: {
            alt: "evcc Logo",
            src: "img/logo.svg",
            href: "https://evcc.io",
            target: "_self",
          },
          items: [
            {
              href: "https://evcc.io",
              position: "left",
              label: "Sonne tanken",
              target: "_self",
            },
            {
              to: "blog",
              position: "right",
              label: "Blog",
            },
            {
              type: "doc",
              docId: "Home",
              position: "right",
              label: "Dokumentation",
            },
            {
              href: "https://github.com/evcc-io/evcc",
              label: "GitHub",
              position: "right",
              target: "_self",
            },
            {
              type: "localeDropdown",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Community",
              items: [
                {
                  label: "Anwender Forum",
                  href: "https://github.com/evcc-io/evcc/discussions",
                  target: "_self",
                },
                {
                  label: "Entwickler Slack",
                  href: "https://evcc.io/slack",
                  target: "_self",
                },
              ],
            },
            {
              title: "Contribute",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/evcc-io/evcc",
                  target: "_self",
                },
                {
                  label: "Sponsoring",
                  href: "https://github.com/sponsors/evcc-io",
                },
              ],
            },
            {
              title: "About",
              items: [
                {
                  label: "Impressum",
                  href: "https://evcc.io/impressum/",
                  target: "_self",
                },
                {
                  label: "Datenschutz",
                  href: "https://evcc.io/datenschutz/",
                  target: "_self",
                },
              ],
            },
          ],
          copyright: `© ${new Date().getFullYear()} evcc`,
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.oceanicNext,
        },
        algolia: {
          appId: "4D0L431W8V",
          apiKey: "0652a7b2c47e97f00cb0f3e305ba741a",
          indexName: "evcc",
          contextualSearch: true,
        },
      }),
  }
);
