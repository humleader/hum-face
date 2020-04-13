const Router = require('koa-router')

const { apiPrefix } = require('utils/config')

const home = require('controllers/home')
const login = require('controllers/login')
const logout = require('controllers/logout')
const customRouter = require('./router')

const router = new Router()

// 首页
router
  .get('/', home)
  .get(`/changepwd`, login)
  .get(`/login`, login)
  .get(`/logout`, logout)
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
    if (apiPrefix && path.startsWith(apiPrefix) && path !== apiPrefix) {
      // await proxy(ctx, next)
    } else {
      // 其他请求 尝试使用首页渲染
      await home(ctx)
    }
  })

module.exports = router
