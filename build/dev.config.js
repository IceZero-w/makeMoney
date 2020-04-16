const baseConfig = require('./base.config.js');
const merge = require('webpack-merge');
const envConfig = require('./env.config.js');

module.exports = merge(baseConfig, {})