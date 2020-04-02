'use strict'

const path = require('path')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const webpack = require('webpack')
const fs = require('fs')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const root = path.join(__dirname, '../')
const buildPath = path.join(root, 'build')
const srcPath = path.join(root, 'client')
const dllPath = path.join(srcPath, 'dll/vendor-manifest.json')
const isDllExist = fs.existsSync(dllPath)

const config = {
  mode: 'development',
  entry: {
    app: './app',
    login: './login'
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  optimization: {
    minimize: false
  },
  plugins: [
    // new BundleAnalyzerPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // 在热加载时直接返回更新文件名，而不是文件的id。

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['app']
    }),

    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: 'public/login.html',
      chunks: ['login']
    }),

    ...(isDllExist
      ? [
          new webpack.DllReferencePlugin({
            manifest: require(dllPath)
          }),
          new AddAssetHtmlPlugin({
            filepath: require.resolve('../client/dll/vendor.dll.js')
          })
        ]
      : [])
  ]
}

module.exports = merge(baseConfig, config)
