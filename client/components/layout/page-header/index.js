// 页面顶部
import './header.less'
import React from 'react'

import Header from './header'
import MainMenu from './main-menu'

export default function PageHeader({ selectedMenus, menus, userInfo }) {
  return (
    <div className="hum-header">
      {/* <MainMenu selectedMenus={selectedMenus} menus={menus} /> */}
      <div className="ant-menu" />
      <Header userInfo={userInfo} />
    </div>
  )
}
