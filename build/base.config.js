
const webpack = require('webpack');
const envConfig = require('./env.config.js');

module.exports = {
  entry: `${__dirname}/../src/main.js`,
  resolve: {
    alias: {
      '@': `${__dirname}/../src`
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        domain: JSON.stringify(envConfig.online.domain),
      }
    }),
  ],
}