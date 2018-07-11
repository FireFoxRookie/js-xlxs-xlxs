'use strict'

let webpack = require('webpack')
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '..', 'dist')
  },
  devServer: {
    inline: true,
    port: "8080",
    public: 'http://localhost:8080/',
    contentBase: path.join(__dirname, '..', 'src')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: path.resolve(__dirname, '../node_modules')
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, '../node_modules')
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: 'body'
    }),
    new VueLoaderPlugin()
  ]
}