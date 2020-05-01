'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const yaml = require('js-yaml')
const fs = require('fs-extra')
const baseConfig = require('./webpack.config.base')
const root = path.join(__dirname, '../')
const env = process.env.NODE_ENV || 'development'
const appConfigPath = path.join(root, `config/${env}.app.yaml`)
const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath)) || {}

const appName = appConfig.appCode.toLowerCase()
const buildPath = path.join(root, `build/${appName}/static`)
const publicPath = `/${appName}/static/`

const config = {
  mode: 'production',
  entry: {
    app: './app',
    login: './login'
  },
  devtool: false,
  output: {
    path: buildPath,
    publicPath: publicPath,
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    hashDigestLength: 22
  },
  // 合并优化方式
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)(\?.*)?$/,
          chunks: 'all',
          enforce: true
        },
        common: {
          minChunks: 3,
          test: /\.(js)(\?.*)?$/,
          name: 'common',
          chunks: 'all'
        },
        antd: {
          minChunks: 3,
          test: /(antd)/,
          priority: 100,
          name: 'antd',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      // new BundleAnalyzerPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash:22].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['styles', 'common', 'app']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: 'public/login.html',
      chunks: ['styles', 'common', 'login']
    })
  ]
}

module.exports = merge(baseConfig, config)
