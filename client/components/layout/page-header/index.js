// 页面顶部
import './header.less'
import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import MainMenu from './main-menu'

export default function PageHeader({ selectedMenus, menus, userInfo }) {
  return (
    <div className="papaya-header">
      <MainMenu selectedMenus={selectedMenus} menus={menus} />
      <Header userInfo={userInfo} />
    </div>
  )
}

PageHeader.propTypes = {
  selectedMenus: PropTypes.array.isRequired,
  menus: PropTypes.array,
  userInfo: PropTypes.string.isRequired
}
