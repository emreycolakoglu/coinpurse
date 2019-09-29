const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { GenerateSW } = require("workbox-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const htmlProdPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  favicon: "./src/assets/images/icon_64.png",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});
const htmlDevPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const envProdPlugin = new webpack.DefinePlugin({
  "process.env.ENV": JSON.stringify("production"),
  "process.env.VERSION": JSON.stringify(require("./package.json").version)
});
const envDevPlugin = new webpack.DefinePlugin({
  "process.env.ENV": JSON.stringify("development"),
  "process.env.VERSION": JSON.stringify(require("./package.json").version)
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: "css/[name].css",
  chunkFilename: "css/[name].[contenthash].css"
});

const manifestPlugin = new WebpackPwaManifest({
  name: "Coin Purse",
  short_name: "CoinPurse",
  description: "CoinPurse!",
  background_color: "#ffffff",
  theme_color: "#ffffff",
  crossorigin: "use-credentials", //can be null, use-credentials or anonymous
  icons: [
    {
      src: path.resolve("src/assets/images/icon_512.png"),
      sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      destination: path.join("icons")
    },
    {
      src: path.resolve("src/assets/images/icon_512.png"),
      size: "192x192", // multiple sizes
      destination: path.join("icons"),
      ios: true
    }
  ],
  fingerprints: false,
  inject: true,
  ios: true
});

const cleanPlugin = new CleanWebpackPlugin();

const swPlugin = new GenerateSW({
  swDest: "sw.js",
  clientsClaim: true,
  skipWaiting: true
});

const robotsTxtPlugin = new RobotstxtPlugin({
  filePath: "/robots.txt"
});

const copyPlugin = new CopyPlugin([{ from: "./src/_redirects", to: "./" }]);

exports.prodPlugins = [
  htmlProdPlugin,
  manifestPlugin,
  swPlugin,
  copyPlugin,
  robotsTxtPlugin,
  envProdPlugin,
  cssPlugin,
  cleanPlugin
];

exports.devPlugins = [htmlDevPlugin, envDevPlugin, cssPlugin, cleanPlugin];
