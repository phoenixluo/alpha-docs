import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Alpha Docs',
  tagline: 'Alpha Cargo 开发者文档',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.alphacargo.io',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'phoenixluo',
  projectName: 'alpha-docs',

  // A broken link is a broken promise to an integrator — fail the build.
  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // Flow diagrams mix CJK and ASCII, which no monospace font aligns
  // consistently — they are drawn as real diagrams, not as text art.
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    // zh-Hans rather than zh: Docusaurus ships translated theme strings for it.
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Namespaced so WMS and Voice can get their own instances later
          // without moving any URL that has already been published.
          routeBasePath: '/tms',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Alpha Docs',
      logo: {
        alt: 'Alpha Cargo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tmsSidebar',
          position: 'left',
          label: 'TMS 开发者指南',
        },
        {
          href: '/tms/postman',
          label: '下载 Postman',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            { label: '快速开始', to: '/tms/' },
            { label: '组织鉴权', to: '/tms/authentication' },
            { label: 'Postman', to: '/tms/postman' },
          ],
        },
        {
          title: '产品',
          items: [
            { label: 'Alpha Cargo TMS', to: '/' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Alpha Cargo.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
      // CJK labels have no spaces to break on, so the default 200px wrap
      // splits them mid-phrase. Give labels room to sit on one line.
      options: {
        flowchart: { wrappingWidth: 320 },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
