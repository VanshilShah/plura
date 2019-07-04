const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  return {
  plugins: [
    // new BundleAnalyzerPlugin()
    new HardSourceWebpackPlugin(),
    new MomentLocalesPlugin(),
    new Dotenv(),
  ],
  mode: 'development',
  entry: {
    app:  './public/react-components/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}};