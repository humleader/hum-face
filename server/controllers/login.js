const { baseURI, apiPrefix, pageTitle } = require('utils/config')

const env = process.env.NODE_ENV || 'development'

module.exports = async ctx => {
  const { callbackUrl } = ctx.query
  if (ctx.session.user && ctx.path !== '/changepwd') {
    ctx.redirect(callbackUrl || '/')
  } else {
    await render(ctx)('login', {
      pageTitle,
      config: JSON.stringify({ baseURI, apiPrefix })
    })
  }
}

// 优化模板不存在的时候的提示
const render =
  env === 'development'
    ? ctx => {
        return async (...args) => {
          try {
            await ctx.render(...args)
          } catch (e) {
            ctx.body = 'HTML 静态模板编译中，请稍后刷新页面...'
          }
        }
      }
    : ctx => ctx.render
