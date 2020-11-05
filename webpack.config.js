const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
 //
 optimization: {
  minimize: true
 },
 // performance
 performance: {
  hints: false,
 },
 //mode
 mode: "production",
 entry: './src/js/index.js',
 output: {
  path: path.resolve(__dirname, 'dist'),
  // filename: 'main_bundle.js'
  filename: 'main_bundle.[contentHash].js'
 },
 //devServer
 devServer: {
  compress: true,
  port: 5000,
  open: true,
  writeToDisk: true
 },
 //loaders
 module: {
  rules: [
   //html loader
   {
    test: /\.html$/i,
    loader: 'html-loader',
    options: {
     minimize: true,
    },
   },
   //file loader
   {
    test: /\.(svg|png|jpg|gif)$/i,
    use: {
     loader: "file-loader",
     options: {
      name: '[name].[hash].[ext]',
      outputPath: 'assets',
     }
    }
   },
   //css loader
   {
    test: /\.scss$/i,
    use: [
     MiniCssExtractPlugin.loader,//3.Extract css into files
     'css-loader',//2.Turns css into common js
     'sass-loader',//1.Turns sass into css
    ],
   },
  ],
 },
 //plugins
 plugins: [
  //html
  new HtmlWebpackPlugin({
   template: "src/index.html",
   minify: {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
   }
  }),
  //css
  new MiniCssExtractPlugin({
   filename: '[name].[contentHash].css',
   chunkFilename: '[id].css',
  }),
  //
  new CleanWebpackPlugin()
 ]
};