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
    // app: './app',
    login: './login'
  },
  devtool: 'cheap-module-source-map',
  output: {
    pathinfo: true,
    path: buildPath,
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].js'
  },
  devServer: {
    hot: true, // 模块热替换
    compress: true, // 一切服务都启用 gzip 压缩
    disableHostCheck: true,
    port: 9001,
    historyApiFallback: {
      rewrites: [
        {
          from: /!^\/api/g,
          to: '/'
        }
      ]
    },
    inline: true
  },
  optimization: {
    minimize: false
  },
  plugins: [
    // new BundleAnalyzerPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // 在热加载时直接返回更新文件名，而不是文件的id。

    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'public/index.html',
    //   chunks: ['app']
    // }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
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
