const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "src"),
  entry: {
    "fullscript-js": "./index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].umd.min.js",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".mjs", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
      },
    ],
  },
  optimization: {
    sideEffects: true, //Note that any imported file is subject to tree shaking. This means if you use something like css-loader in your project and import a CSS file, it needs to be added to the side effect list so it will not be unintentionally dropped in production mode:
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "../bundle_sizes.html",
    }),
  ],
};
