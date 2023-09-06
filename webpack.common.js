const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    theme: ["./src/theme.js", "./src/sass/theme.sass"],
    badge_only: "./src/sass/badge_only.sass",
  },
  output: {
    filename: "js/[name].js?[fullhash]",
    path: path.resolve(__dirname, "sphinx_rtd_theme/static"),
  },
  externals: {
    jquery: "jQuery",
  },
  module: {
    rules: [
      {
        test: require.resolve("./src/theme.js"),
        use: [
          {
            loader: "imports-loader",
            options: {
              type: "commonjs",
              imports: [
                {
                  // syntax: "default",
                  moduleName: "jquery",
                  name: "$",
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader?indentedSyntax",
            options: {
              sassOptions: {
                includePaths: [
                  "node_modules/bourbon/app/assets/stylesheets",
                  "node_modules/bourbon-neat/app/assets/stylesheets",
                  "node_modules/font-awesome/scss",
                  "node_modules/wyrm/sass",
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'css/fonts/[name][ext]?[fullhash]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css?[fullhash]",
      chunkFilename: "css/[name].css?[fullhash]",
    }),
  ],
};
