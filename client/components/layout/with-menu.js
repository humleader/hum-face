import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { getActiveMenu, getParents, getChildPath, getDisplayName } from './util'

// 计算当前选中的菜单项
export default function withMenu(WrappedComponent) {
  return class extends React.Component {
    static displayName = `withMenu(${getDisplayName(WrappedComponent)})`

    static propTypes = {
      menus: PropTypes.array,
      layout: PropTypes.string,
      location: PropTypes.object
    }

    static contextTypes = {
      router: PropTypes.object
    }

    static defaultProps = {
      // basic 默认布局，包含导航头和侧边菜单
      // header: 顶部布局，只显示导航头
      // sider: 侧边布局
      // null: 空白布局
      layout: 'basic'
    }

    state = {
      selectedMenus: []
    }

    componentDidMount(props) {
      this.activeMenuByURL(this.props.location.pathname)
    }

    componentUpdateMount(nextProps, nextState, nextContext) {
      function getPathname(context) {
        return context.router.route.location.pathname
      }

      const currentPathName = getPathname(this.context)
      const nextPathName = getPathname(nextContext)

      if (currentPathName !== nextPathName) {
        this.activeMenuByURL(nextPathName)
      }
    }

    render() {
      const { selectedMenus } = this.state

      const { mainMenu, siderMenu } = this.menus

      return (
        <WrappedComponent
          {...this.props}
          selectedMenus={selectedMenus}
          mainMenu={mainMenu}
          siderMenu={siderMenu}
        />
      )
    }

    get basicMenus() {
      const { menus } = this.props
      const { selectedMenus } = this.state

      const mainMenu = menus.map(m => {
        const menu = _.omit(m, 'children')
        menu.path = getChildPath(m)

        return menu
      })

      const selectedMainMenu = menus.find(m => m.id === selectedMenus[0])
      const siderMenu =
        (selectedMainMenu && selectedMainMenu.children) || _.get(menus, '[0].children')

      return { mainMenu, siderMenu }
    }

    get headerMenus() {
      return { mainMenu: this.props.menus, siderMenu: null }
    }

    get siderMenus() {
      return { mainMenu: null, siderMenu: this.props.menus }
    }

    get blankMenus() {
      return { mainMenu: null, siderMenu: null }
    }

    get menus() {
      const { layout } = this.props
      const menus = this[`${layout}Menus`]
      if (layout && !menus) {
        // eslint-disable-next-line
        console.warn(`WARNING: layout: ${layout} 非法，期望为 basic|header|sider|null`)
      }
      return menus || {}
    }

    // 设置选中的菜单
    activeMenuByURL(pathname) {
      const { menus } = this.props
      const { selectedMenus: preSelectKeys } = this.state
      const selectedMenus = this.findselectedMenusByURL(menus, pathname) || preSelectKeys
      this.setState({ selectedMenus })
    }

    // 根据 URL 找出需要 active 的菜单选项
    // 并获取实际的路径
    findselectedMenusByURL(menus, pathname) {
      const activeMenu = getActiveMenu(menus, pathname)
      return getParents(activeMenu)
    }
  }
}
