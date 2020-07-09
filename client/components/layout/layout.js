import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'

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
    action,
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
    action.getUserList()
    action.queryRegions()
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
        <Layout.Content className="hum-content-container">{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}

function mapStateToProps(state) {
  const common = state.common
  return {
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.common
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AntdLayout)
