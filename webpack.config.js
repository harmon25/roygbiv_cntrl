const path = require('path');
const webpack = require('webpack');


const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
/*
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

*/

var plugins = [
    new DedupePlugin(),
    new UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true
    })
  ]


module.exports = {
  context: path.resolve(__dirname, './apps/phx_web/web/static'),
  entry: {
    app: './js/app.js',
  },
  module: {
   rules: [
     {
       test: /\.css$/,
       use: [
         'style-loader',
         {
           loader: 'css-loader',
           options: { modules: true }
         },
       ],
     },
     {
       test: /\.js$/,
       exclude: /(node_modules)/,
       use: [{
         loader: 'babel-loader',
         options: { presets: ['react', 'es2015'] }
       }],
     },
     {
       test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
       loader: 'file',
     },
     // Loaders for other file types can go here
   ],
 },
  plugins: [],
  output: {
    path: path.resolve(__dirname, './apps/phx_web/priv/static/js'),
    filename: '[name].bundle.js',
  },
};
