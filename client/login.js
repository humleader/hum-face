// 页面初始化

import './boot'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import Login from 'pages/logins/login'
import ChangePwd from 'pages/logins/changepwd'

ReactDOM.render(
  <ConfigProvider key="provider" locale={zhCN}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/changepwd" component={ChangePwd} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById('root')
)
