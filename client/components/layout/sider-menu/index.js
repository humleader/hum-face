import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import './index.less'

import { renderMenu } from '../util'

export default function SiderMenu(props) {
  const { collapsed, logo, title, selectedMenus, menus, onCollapse, openKeys, onMenuClick } = props

  const logoContent = (
    <Link className="logo-link" to="/">
      {logo && <img src={logo} alt={title} />}
      {(!collapsed || !logo) && <h1>{title}</h1>}
    </Link>
  )

  let menuProps = {}
  if (!collapsed) {
    menuProps = { openKeys }
  }

  return !isEmpty(menus) ? (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      {logoContent}
      <Menu
        mode="inline"
        inlineIndent={24}
        style={{ height: '100%', background: '#fff' }}
        inlineCollapsed={collapsed}
        selectedKeys={selectedMenus}
        {...menuProps}
      >
        {menus.map(menu => {
          return renderMenu(menu, onMenuClick)
        })}
      </Menu>
    </Layout.Sider>
  ) : (
    logoContent
  )
}
