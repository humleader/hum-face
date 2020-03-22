/* eslint-disable no-console */
'use strict'

const path = require('path')
const fs = require('fs-extra')
// const ip = require('dev-ip')
const yaml = require('js-yaml')
const Promise = require('bluebird')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const WebpackDevServer = require('webpack-dev-server')

Promise.promisifyAll(fs)

// const devIp = ip()[0]

const env = process.env.NODE_ENV || 'development'
const devIp = '127.0.0.1'

const root = path.join(__dirname, '..')
const viewsPath = path.join(root, 'server/views')
const configPath = path.join(root, `config/webpack.config.${env}`)
const appConfigPath = path.join(root, `config/${env}.app.yaml`)

const config = require(configPath)
const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath))

const entry = config.entry
const devPort = appConfig.server.devPort
const devClient = [`webpack-dev-server/client?http://${devIp}:${devPort}/`]
const publicPath = (config.output.publicPath = `http://${devIp}:${devPort}/build/`)

fs.removeSync(viewsPath)

Object.keys(entry).forEach(entryName => {
  entry[entryName] = devClient.concat(entry[entryName])
})

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {
  quiet: true, // webpack 的错误或警告在控制台不可见
  noInfo: true,
  hot: true, // 模块热替换
  compress: true, // 一切服务都启用 gzip 压缩
  disableHostCheck: true,
  publicPath: publicPath,
  inline: true,

  // 请求重定向：
  // http://${devIp}:${devPort}/build/* =>
  // http://${devIp}:${devPort}/webpack-dev-server/*
  proxy: {
    '/build': {
      target: `http://${devIp}:${devPort}/`,
      rewrite: req => {
        req.url = '/webpack-dev-server'
      }
    }
  },

  // 允许跨域
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'x-requested-with, content-type, Authorization'
  },

  // 设置 webpack-dev-server 启动的 express 的 app
  before(app) {
    app.use(bodyParser.json())
    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    )

    function requireUncached(module) {
      try {
        // 删除缓存，动态加载
        delete require.cache[require.resolve(module)]
        return require(module)
      } catch (e) {
        console.log(`can't load module in ${module}. at scripts/server.js requireUncached`)
      }
    }

    // 根据 mock 请求发送响应
    function sendValue(req, res, value) {
      if (typeof value === 'function') {
        value = value(req, res)
      }

      if (value.$$header) {
        Object.keys(value.$$header).forEach(key => {
          res.setHeader(key, value.$$header[key])
        })
      }

      const delay = value.$$delay || 0

      delete value.$$header
      delete value.$$delay

      Promise.delay(delay, value).then(result => {
        res.send(result)
      })
    }

    // 处理 restful mock 接口
    const mockMap = require(path.join(root, 'mock/mock-map'))

    // 对于每个 mock 请求，require mock 文件夹下的对应路径文件，并返回响应
    Object.keys(mockMap).forEach(mockPath => {
      app.all(path.posix.join('/mock', mockPath), function(req, res) {
        const value = requireUncached(path.join(root, 'mock', mockMap[mockPath]))

        sendValue(req, res, value)
      })
    })

    app.all('/mock/*', function(req, res) {
      const mockPath = path.join(root, req.path)

      const value = requireUncached(mockPath)
      if (value) {
        sendValue(req, res, value)
      } else {
        res.sendStatus(404)
      }
    })
  }
})

// 编译 webpack config 中。。。
compiler.plugin('compile', () => {
  console.log('webpack building...')
})

// webpack config 编译完成
compiler.plugin('done', stats => {
  const time = (stats.endTime - stats.startTime) / 1000

  // 编译出错
  if (stats.hasErrors()) {
    console.log('webpack build error')

    return console.log(
      stats.toString({
        colors: true,
        timings: false,
        hash: false,
        version: false,
        assets: false,
        reasons: false,
        chunks: false,
        children: false,
        chunkModules: false,
        modules: false
      })
    )
  }

  const outputPath = config.output.path
  const assets = stats.compilation.assets

  // 将 html 的模板文件打包到 viewsPath 的目录下
  Promise.map(Object.keys(assets), file => {
    const asset = assets[file]
    const filePath = path.relative(outputPath, asset.existsAt)

    if (path.extname(filePath) === '.html') {
      const content = asset.source()
      const distPath = path.join(viewsPath, filePath)

      return fs.outputFileAsync(distPath, content)
    }
  }).then(() => {
    console.log(`webpack build success in ${time.toFixed(2)} s`)
  })
})

server.listen(devPort, null, () => {
  console.log(`webpack-dev-server started at localhost:${devPort}`)
})
