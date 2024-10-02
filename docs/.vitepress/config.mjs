import {createRequire} from 'module';

import {default as isDevRelease} from '@lando/vitepress-theme-default-plus/is-dev-release';

import {defineConfig} from '@lando/vitepress-theme-default-plus/config';

const require = createRequire(import.meta.url);

// get plugin stuff
const {name, version} = require('../../package.json');
const landoPlugin = name.replace('@lando/', '');

const sidebarEnder = landoPlugin && version ? {
  text: process?.env?.LANDO_MVB_VERSION ? process.env.LANDO_MVB_VERSION : `v${version}`,
  collapsed: true,
  items: [
    {
      text: 'Other Doc Versions',
      items: [
        {rel: 'mvb', text: 'stable', target: '_blank', link: '/v/stable/'},
        {rel: 'mvb', text: 'edge', target: '_blank', link: '/v/edge/'},
        {text: '<strong>see all versions</strong>', link: '/v/'},
      ],
    },
    {text: 'Other Releases', link: 'https://github.com/lando/core/releases'},
  ],
} : false;

// add release notes
if (sidebarEnder && !isDevRelease(version)) {
  sidebarEnder.items.splice(1, 0, {
    text: 'Release Notes',
    link: `https://github.com/lando/core/releases/tag/v${version}`,
  });
}

export default defineConfig({
  title: 'Lando Core',
  description: 'The offical Lando Core.',
  landoDocs: 3,
  landoPlugin,
  version,
  base: '/core/v3/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/core/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/core/favicon.svg', type: 'image/svg+xml'}],
  ],
  rewrites: {
    'lando-service.md': 'services/lando.md',
  },
  themeConfig: {
    sidebar: sidebar(),
    multiVersionBuild: {
      satisfies: '>=3.21.2',
    },
    sidebarEnder,
  },
});

function sidebar() {
  return [
    {
      text: 'Landofile',
      collapsed: false,
      items: [
        {text: 'Basics', link: '/index'},
        {text: 'Services', link: '/services'},
        {text: 'Recipes', link: '/recipes'},
        {text: 'Tooling', link: '/tooling'},
        {text: 'Proxy', link: '/proxy'},
        {text: 'Events', link: '/events'},
      ],
    },
    {
      text: 'Configuration',
      collapsed: false,
      items: [
        {text: 'Global', link: '/global'},
        {text: 'Environment', link: '/env'},
        {text: 'Experimental', link: '/experimental'},
        {text: 'Orchestrator', link: '/orchestrator'},
        {text: 'Performance', link: '/performance'},
        {text: 'Plugins', link: '/plugins'},
        {text: 'Releases', link: '/releases'},
        {text: 'SSH', link: '/ssh'},
        {text: 'Security', link: '/security'},
        {text: 'Files', link: '/files'},
      ],
    },
    {
      text: 'Plugins',
      collapsed: false,
      items: [
        {text: 'Healthcheck', link: '/healthcheck'},
        {text: 'Networking', link: '/networking'},
        {text: 'Scanner', link: '/scanner'},
      ],
    },
    {
      text: 'Services',
      collapsed: false,
      items: [
        {text: 'Lando Service', link: '/services/lando'},
        {text: 'L-337 Service <small><strong>(BETA)</strong></small>', link: '/services/l337'},
      ],
    },
    {
      text: 'Contribution',
      collapsed: false,
      items: [
        {text: 'Development', link: '/development'},
        {text: 'Team', link: '/team'},
      ],
    },
    {
      text: 'Help & Support',
      collapsed: false,
      items: [
        {text: 'GitHub', link: 'https://github.com/lando/core/issues/new/choose'},
        {text: 'Slack', link: 'https://www.launchpass.com/devwithlando'},
        {text: 'Contact Us', link: '/support'},
        {text: 'Examples', link: 'https://github.com/lando/core/tree/main/examples'},
      ],
    },
  ];
};
