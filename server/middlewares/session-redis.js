const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const config = require('utils/config')

module.exports = option => {
  return session({
    store: redisStore({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password
    }),
    key: 'HUM_SESS', // cookie中此key的值就是sessionId
    cookie: {
      httpOnly: true, // 必启xss
      secure: false, // true=https
      maxAge: 1000 * 60 * 60 * 24 * 7 // 生命周期
    },

    errorHandler: (err, type, ctx) => {
      console.log('--session--\n', err, type, ctx)
    }
  })
}
