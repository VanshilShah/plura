const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  plugins: [
    // new BundleAnalyzerPlugin()
    new HardSourceWebpackPlugin(),
    new MomentLocalesPlugin(),
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
  },
  watch: true
};