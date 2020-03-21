// 健康检查

module.exports = function() {
  return async (ctx, next) => {
    if (ctx.path === '/check_backend_active.html') {
      ctx.body = 'Success!'
    } else {
      await next()
    }
  }
}
