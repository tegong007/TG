const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "./",
  outputDir: "release/html",
  lintOnSave: true,
  productionSourceMap: false,
  transpileDependencies: true,
  pages: { index: { entry: "src/renderer/main.ts" } },
  chainWebpack: (config) => {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], { __VUE_OPTIONS_API__: "true", __VUE_PROD_DEVTOOLS: "false", __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false" });
      return definitions;
    });
    config.plugin("html-index").tap((htmlInfo) => {
      htmlInfo[0].title = process.env.VUE_APP_TITLE;
      return htmlInfo;
    });
  },
});
