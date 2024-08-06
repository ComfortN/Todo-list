// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        path: require.resolve('path-browserify'),
        fs: false,
        crypto: false,
      };
      return webpackConfig;
    },
  },
};
