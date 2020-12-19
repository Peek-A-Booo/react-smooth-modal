const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup').default;

const svg = require('rollup-plugin-svg')

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: true,
        // extract: 'react-smooth-modal.min.css',
      })
    );
    // config.plugins.push(svg());
    config.plugins = [
      url(),
      svgr({
        // configure however you like, this is just an example
        ref: true,
        memo: true,
        svgoConfig: {
          plugins: [
            { removeViewBox: false },
            { removeAttrs: { attrs: 'g:(stroke|fill):((?!^none$).)*' } }
          ],
        },
      }),
      ...config.plugins,
    ];
    return config;
  },
};
