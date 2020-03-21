'use strict'

const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const pkg = require('../package.json')

// 并行执行loader
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const homeDir = os.homedir()
const happyTempDir = path.join(homeDir, `.happypack/${pkg.group}/${pkg.name}`)

const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'client')
const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

const appConfigPath = path.join(root, `config/${env}.app.yaml`)
const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath)) || {}

module.exports = {
  context: srcPath,

  // 处理相关文件的检索及引用方式
  resolve: {
    alias: {
      common: path.join(srcPath, 'common'),
      components: path.join(srcPath, 'components'),
      utils: path.join(srcPath, 'utils'),
      assets: path.join(srcPath, 'assets'),
      pages: path.join(srcPath, 'pages')
    }
  },
  // 模块的处理配置，匹配规则对应文件，使用相应loader配置成可识别的模块
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 编译js或jsx文件，使用babel-loader转换es6为es5
        loader: 'happypack/loader',
        options: {
          id: 'js'
        }
      },
      {
        oneOf: [
          {
            test: /\.html$/,
            resourceQuery: /\?.*/,
            use: ['nunjucks-loader', 'extract-loader', 'html-loader']
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            resourceQuery: /\?.*/,
            loader: 'url-loader'
          },
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            loader: 'file-loader',
            options: {
              name: isDev ? '[path][name].[ext]' : '[hash:22].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [require('autoprefixer')(), require('cssnano')()]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modules: true,
              localIndexName: '[name]__[local]___[hash:base64:5]',
              modifyVars: getTheme(appConfig.theme)
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      tempDir: happyTempDir,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      ],
      verbose: isDev,
      verboseWhenProfiling: isDev
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn']
    }),

    new HtmlWebpackPlugin({
      inject: false,
      filename: 'error.html',
      template: 'public/error.html'
    })
  ]
}

// 获取主题
function getTheme(theme) {
  // 全局默认配置
  const defaultTheme = require(path.join(srcPath, 'theme/default'))

  // 已配置主题
  if (theme) {
    const themePath = path.join(srcPath, 'theme', theme)

    if (fs.existsSync(`${themePath}.js`)) {
      return Object.assign(defaultTheme, require(themePath))
    } else {
      // eslint-disable-next-line
      console.warn(`WARNING: 主题 ${theme} 不存在，请确认主题配置是否正确`)
    }
  }

  return defaultTheme
}
