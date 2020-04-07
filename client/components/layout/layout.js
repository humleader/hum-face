import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'

import './layout.less'

import PageHeader from './page-header'
import SiderMenu from './sider-menu'

const AntdLayout = props => {
  const {
    children,
    title,
    logo,
    mainMenu,
    siderMenu,
    selectedMenus,
    className,
    appCode,
    openKeys,
    onMenuClick,
    userInfo
  } = props

  const [collapsed, setCollapsed] = useState(false)

  const collapsedKey = `${appCode}_sider_collapsed`

  const handleOnCollapse = (collapsed, type) => {
    localStorage[collapsedKey] = collapsed.toString()
    setCollapsed(collapsed)
  }

  useEffect(() => {
    setCollapsed(localStorage[collapsedKey] === 'true')
    return () => {}
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }} className={className}>
      <SiderMenu
        logo={logo}
        title={title}
        menus={siderMenu}
        selectedMenus={selectedMenus}
        openKeys={openKeys}
        onMenuClick={onMenuClick}
        collapsed={collapsed}
        onCollapse={handleOnCollapse}
      />
      <Layout>
        <PageHeader userInfo={userInfo} menus={mainMenu} selectedMenus={selectedMenus} />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AntdLayout
