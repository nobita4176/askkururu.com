// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  'mount': {
    'src': {
      'src': '/src',
      'url': '/',
    },
    'public': {
      'src': '/public',
      'url': '/',
      'static': true,
    },
  },
  'plugins': [
  ],
  'packageOptions': {
  },
  'devOptions': {
  },
  'buildOptions': {
    'out': 'docs',
  },
};
