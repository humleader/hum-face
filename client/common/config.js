import menus from './menu'

const { baseURI, apiPrefix, appCode, userInfo, env, pageTitle } = window.__config__

export {
  pageTitle,
  // 基础 URI
  baseURI,
  // ajax 请求前缀
  apiPrefix,
  // 系统编号
  appCode,
  // 菜单项
  menus,
  // 用户信息
  userInfo,
  // 环境
  env
}
