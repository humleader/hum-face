// 页面顶部
import './header.less'
import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
// import MainMenu from './main-menu'

export default function PageHeader({ selectedMenus, menus, responsive, logoutUrl, userName }) {
  return (
    <div className="hum-header">
      {/* <MainMenu
        logoutUrl={logoutUrl}
        selectedMenus={selectedMenus}
        menus={menus}
        responsive={responsive}
      /> */}
      <Header logoutUrl={logoutUrl} userName={userName} />
    </div>
  )
}

PageHeader.propTypes = {
  selectedMenus: PropTypes.array.isRequired,
  menus: PropTypes.array,
  responsive: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  logoutUrl: PropTypes.string.isRequired
}
