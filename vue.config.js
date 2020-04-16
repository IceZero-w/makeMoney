const devConfig = require("./build/dev.config.js");
const proConfig = require("./build/pro.config.js");
const envConfig = require("./build/env.config.js");

console.dir(process, devConfig, "---devConfig");

module.exports = {
  lintOnSave: false,
  publicPath:
    process.env.NODE_ENV === "production" ? envConfig.online.publicPath : "/",
  configureWebpack:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
  devServer: {
    proxy: {
      "/api": {
        target: "http:" + envConfig.online.domain,
        ws: true,
        changeOrigin: true
      }
    }
  }
  // chainWebpack: (config) => {
  //   config.plugin('definePlugin')
  //     .use(DefinePlugin, [{
  //       'process.env': {
  //         domain: JSON.stringify(envConfig.online.domain),
  //       },
  //     }])
  // },
};
