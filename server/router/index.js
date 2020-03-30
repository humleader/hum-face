const Router = require('koa-router')

const { apiPrefix, baseURI } = require('utils/config')

const home = require('controllers/home')
const customRouter = require('./router')

const router = new Router()

// 首页
router
  .get('/', home)
  .get(`${baseURI}/login`, home)
  // 路由定义
  .use(customRouter.routes())
  // 自动代理到 java 和 首页渲染
  .all('*', async (ctx, next) => {
    const path = ctx.path

    // 如果路径以 apiPrefix 开头，认为是 ajax 请求
    if (!apiPrefix) {
      /* eslint-disable no-console */
      console.warn('apiPrefix 未配置，proxy 功能无法正常使用！')
    }

    // 自动代理
    if (path.startsWith('/sockjs-node') && path !== apiPrefix) {
      ctx.body = {
        code: 0,
        data: ''
      }
      return
      // await proxy(ctx, next)
    }

    // 自动代理
    if (apiPrefix && path.startsWith(apiPrefix) && path !== apiPrefix) {
      // await proxy(ctx, next)
    } else {
      // 其他请求 尝试使用首页渲染
      await home(ctx)
    }
  })

module.exports = router
