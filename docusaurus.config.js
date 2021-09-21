const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'evcc',
  tagline: 'Sonne tanken. Ganz einfach.',
  url: 'https://evcc.io',
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'evcc-io', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  trailingSlash: 'false',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [require('mdx-mermaid')],
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'evcc Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: 'https://evcc.io', label: 'Home', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'doc',
            docId: 'Home',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/evcc-io/evcc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/evccgroup/shared_invite/zt-fw52e6lt-tdazCp1LPdPlYuKz3PvTAw',
              },
              {
                label: 'Forum',
                href: 'https://github.com/evcc-io/evcc/discussions',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Sponsoring',
                href: 'https://github.com/sponsors/andig',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/evcc-io/evcc',
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
    }),
});
