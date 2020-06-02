/* eslint-disable no-console */
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'dist';
const webpackMode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

console.log(`Webpack Mode === ${chalk.yellowBright(webpackMode)}\n`);

console.log(
  `Project Version === ${chalk.yellowBright(process.env.npm_package_version)}`,
);

module.exports = {
  mode: webpackMode,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    proxy: {
      '*': 'http://localhost:3000',
    },
  },
  devtool: 'source-map',
  entry: ['./src/client/index.tsx'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
