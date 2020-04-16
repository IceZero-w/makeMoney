const baseConfig = require('./base.config.js');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
  }
})