module.exports = function() {
  return async function(ctx, next) {
    if (ctx.path.startsWith('/api') && ctx.path.indexOf('api/user/login') === -1) {
      if (!ctx.session.user) {
        ctx.status = 401
        ctx.body = {
          code: 1,
          error: '用户登录已失效'
        }
      } else {
        await next()
      }
    } else {
      await next()
    }
  }
}
