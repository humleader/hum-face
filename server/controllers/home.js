const {
  baseURI,
  appCode,
  apiPrefix,
  pageTitle,
  version,
  layout,
  cas,
  smallScreen
} = require('utils/config')
// 获取用户列表

const env = process.env.NODE_ENV || 'development'

module.exports = async ctx => {
  const initState = getInitState()
  const config = await getConfig(ctx)

  await render(ctx)('index', {
    pageTitle,
    config: JSON.stringify(config),
    initState: JSON.stringify(initState),
    baseURI
  })
}

// 提供给前台 redux 作为初始化 state
function getInitState() {
  return {}
}

// 获取全局配置
async function getConfig(ctx) {
  let userInfo = {}
  if (cas.enable) {
    userInfo = {
      nickname: ctx.session.userName,
      nicknameCn: ctx.session.userNameCN || ctx.session.userName
    }
  } else {
    userInfo = {
      ...ctx.user
    }
  }

  return {
    // 基础 URI
    baseURI,
    // ajax 请求前缀
    apiPrefix,
    // 系统编号
    appCode,
    cas,
    // 用户信息
    userInfo,
    env,
    version,
    layout,
    smallScreen
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
