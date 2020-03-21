import menus from './menu'

const {
  baseURI,
  apiPrefix,
  appCode,
  resourceList,
  userInfo,
  cas,
  env,
  layout,
  smallScreen
} = window.__config__

// 小屏自适应条件判断
const responsive = smallScreen ? innerWidth <= smallScreen : false

const defaultLayout = layout

export {
  // 基础 URI
  baseURI,
  // ajax 请求前缀
  apiPrefix,
  // 系统编号
  appCode,
  cas,
  // 菜单项
  menus,
  // 用户资源列表
  resourceList,
  // 用户信息
  userInfo,
  responsive,
  // 默认布局方式
  defaultLayout,
  env
}
