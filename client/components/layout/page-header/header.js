import React from 'react'
import { Icon } from 'antd'

// 页面顶部文本
export default function Header({ userInfo }) {
  return (
    <div className="userinfo">
      <span className="username">你好，{userInfo.userAliasName}</span>
      <a className="logout" href="/logout">
        <Icon type="logout" />
        退出登录
      </a>
    </div>
  )
}
