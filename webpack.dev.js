const { merge } = require("webpack-merge");
const WatchPlugin = require("webpack-watch-files-plugin").default;
const ShellPlugin = require("webpack-shell-plugin-next");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  // The dev server uses both contentBase and publicPath. The contentBase is
  // used to server the built docs, and publicPath is the bundle path for live
  // reloading. The publicPath intercepts requests to the static assets in
  // _static/. Opening http://localhost:1919 is everything you need for
  // development.
  devServer: {
    port: 1919,
    open: false,
    hot: false,
    liveReload: true,
    static: "docs/build/html/",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  plugins: [
    new WatchPlugin({
      files: ["./docs/**/*.rst", "./docs/**/*.py"],
    }),
    new ShellPlugin({
      onBuildStart: {
        scripts: ["make -C docs clean html"],
        blocking: true,
        parallel: false,
      },
    })
  ]
});
