const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "evcc",
    tagline: "Sonne tanken. Ganz einfach.",
    url: "https://docs.evcc.io",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    favicon: "img/favicon.ico",
    organizationName: "evcc-io", // Usually your GitHub org/user name.
    projectName: "docs", // Usually your repo name.

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            remarkPlugins: [require("mdx-mermaid")],
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl: "https://github.com/evcc-io/docs/tree/main",
          },
          blog: {
            showReadingTime: true,
            blogSidebarTitle: 'Letzte Beiträge',
            blogSidebarCount: 15,
            postsPerPage: 5,
            editUrl: "https://github.com/evcc-io/docs/tree/main",
            feedOptions: {
              type: 'all',
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
          },
          items: [
            {
              type: "doc",
              docId: "Home",
              position: "left",
              label: "Dokumentation",
            },
            {
              to: "blog",
              position: "left",
              label: "Blog",
            },
            {
              href: "https://github.com/evcc-io/evcc",
              label: "GitHub",
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
                },
                {
                  label: "Entwickler Slack",
                  href: "https://join.slack.com/t/evccgroup/shared_invite/zt-fw52e6lt-tdazCp1LPdPlYuKz3PvTAw",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "Sponsoring",
                  href: "https://github.com/sponsors/andig",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/evcc-io/evcc",
                },
              ],
            },
          ],
          copyright: `© ${new Date().getFullYear()} evcc`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
        algolia: {
          appId: "BH4D9OD16A",
          apiKey: "a8ce38c1da09ca6af96ea43ee47d1fc4",
          indexName: "evcc",
          contextualSearch: false,
        },
      }),
  }
);
