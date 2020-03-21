import './sider-menu.less'
import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { renderMenu } from '../util'

export default function SiderMenu(props) {
  const {
    collapsed,
    logo,
    title,
    selectedMenus,
    menus,
    responsive,
    onCollapse,
    onMenuClick
  } = props

  const logoContent = (
    <div className="logo">
      <Link to="/">
        {logo && <img src={logo} alt={title} />}
        {(!collapsed || !logo) && <h1>{title}</h1>}
      </Link>
    </div>
  )

  return !_.isEmpty(menus) ? (
    <Layout.Sider collapsible={!responsive} collapsed={collapsed} onCollapse={onCollapse}>
      {logoContent}
      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={selectedMenus}
        onClick={onMenuClick}
      >
        {menus.map(renderMenu)}
      </Menu>
    </Layout.Sider>
  ) : (
    logoContent
  )
}

SiderMenu.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired,
  selectedMenus: PropTypes.array.isRequired,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  responsive: PropTypes.bool,
  onMenuClick: PropTypes.func,
  onCollapse: PropTypes.func.isRequired
}
