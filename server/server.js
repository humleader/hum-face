require('app-module-path/register')

const Promise = require('bluebird')

Promise.config({
  warnings: false,
  longStackTraces: true
})

global.Promise = Promise

const path = require('path')
const Koa = require('koa')

// 三方中间件
const koabody = require('koa-body')
const jwt = require('koa-jwt')
const helmet = require('koa-helmet')

// 配置
const secret = require('./utils/secret.json')
const config = require('./utils/config')
const pkg = require('../package.json')
global.M = require('./models')(config.dbOption)

// 中间件
// const checkToken = require('./middlewares/check-token')
const healthCheck = require('./middlewares/health-check')
const tplRender = require('./middlewares/tpl-render')
// const sessionRedis = require('./middlewares/session-redis')

const router = require('./router')

const app = new Koa()
const isDev = app.env === 'development'
const port = config.server.port

app.name = pkg.name
app.keys = [`${pkg.group}-${pkg.name}`]

app.use(helmet())
// app.use(checkToken())
app.use(healthCheck())
// app.use(sessionRedis())

// 日志
app.use(
  koabody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      uploadDir: path.join(__dirname, './uploads')
    }
  })
)

// view
app.use(tplRender(isDev))

// 需要开启 静态资源
const staticServer = require('koa-static-cache')
app.use(
  staticServer(path.join(__dirname, '../build'), {
    maxage: 3600 * 24 * 30,
    gzip: true
  })
)
app.use(
  staticServer(path.join(__dirname, '../uploads'), {
    maxage: 3600 * 24 * 30,
    gzip: true
  })
)

app.use(
  jwt({ secret: secret.sign }).unless({
    path: [/^(?!\/hum\/api)/, /^\/hum\/api\/user\/login/, /^\/hum\/api\/salary\/preview/]
  })
)

// 路由配置
app.use(router.routes(), router.allowedMethods())

// 启动服务
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
