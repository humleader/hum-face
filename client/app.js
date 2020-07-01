// 页面初始化

import './boot'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { init } from '@rematch/core'
import zhCN from 'antd/es/locale/zh_CN'

import CoreRouter from 'components/router'
import withLayout from 'components/layout/with-layout'
import history from './common/history'
import { models } from './store'

import logo from './assets/images/logo.png'

import { userInfo, menus, appCode, pageTitle } from 'common/config'

const RouteComponent = withLayout({
  title: pageTitle,
  appCode,
  userInfo,
  menus,
  logo
})(CoreRouter)

const store = init({
  models
})

ReactDOM.render(
  <ConfigProvider key="provider" locale={zhCN}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={RouteComponent} />
      </Router>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
