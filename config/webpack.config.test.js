'use strict'

const path = require('path')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const webpack = require('webpack')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    pathinfo: true,
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      allChunks: true
    }),

    // new CopyWebpackPlugin([{ from: '../client/dll/vendor.dll.js', to: '../build/' }]),
    // new BundleAnalyzerPlugin(),
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
            filepath: require.resolve('../client/dll/vendor.dll.js'), // 相当于path.join(__dirname, '../static/vendordev.dll.js')
            includeSourcemap: false
          })
          // new HtmlWebpackIncludeAssetsPlugin({
          //   assets: ['/vendor.dll.js'],
          //   append: false,
          //   hash: true
          // })
        ]
      : [])
  ]
}

module.exports = merge(baseConfig, config)
