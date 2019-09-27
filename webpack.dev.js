const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const devPlugins = require("./webpack.plugins").devPlugins;

module.exports = {
  mode: "development",
  // Change to your "entry-point".
  entry: path.resolve(__dirname, "src/index"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    chunkFilename: "js/[name].[chunkhash].chunk.js",
    publicPath: '/',
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            /* eslint-disable camelcase */
            ascii_only: true
            /* eslint-enable camelcase */
          }
        },
        parallel: true,
        cache: true
      })
    ],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0
    }
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        // Include jsx, and js files.
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer"), require("cssnano")],
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer"), require("cssnano")],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        include: /src/
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/,
        loader: "file-loader",
        query: {
          outputPath: "./fonts/",
          name: "[name].[ext]?[hash]"
        }
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: "file-loader",
        query: {
          outputPath: "./img/",
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    host: "0.0.0.0",
    open: true,
    openPage: "http://localhost:3000/",
    overlay: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [...devPlugins]
};
