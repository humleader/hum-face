import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { getActiveMenu, getParents, getChildPath, getDisplayName } from './util'

// 计算当前选中的菜单项
export default function withMenu(WrappedComponent) {
  const withMenuHoc = props => {
    const {
      location: { pathname },
      menus
    } = props

    const [selectedMenus, setSelectedMenus] = useState([])

    const basicMenus = () => {
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

    const { mainMenu, siderMenu } = basicMenus()

    // 根据 URL 找出需要 active 的菜单选项
    // 并获取实际的路径
    const findselectedMenusByURL = (menus, pathname) => {
      const activeMenu = getActiveMenu(menus, pathname)
      return getParents(activeMenu)
    }

    // 设置选中的菜单
    const activeMenuByURL = pathname => {
      const selectedMenus = findselectedMenusByURL(menus, pathname)
      setSelectedMenus(selectedMenus)
    }

    useEffect(() => {
      activeMenuByURL(pathname)
      return () => {}
    }, [pathname])

    return (
      <WrappedComponent
        {...props}
        selectedMenus={selectedMenus}
        mainMenu={mainMenu}
        siderMenu={siderMenu}
      />
    )
  }
  withMenuHoc.displayName = `withMenu(${getDisplayName(WrappedComponent)})`

  return withMenuHoc
}
