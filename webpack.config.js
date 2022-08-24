const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './resources/js/app.js',
  },
  devtool: 'inline-source-map',
 devServer: {
   static: './public/js',
 },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
 optimization: {
   runtimeChunk: 'single',
 },
};