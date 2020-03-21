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
// 登录页面不需要layout布局故放在这个路由展示

const RouteComponent = withLayout()(CoreRouter)

const store = init({
  models
})

ReactDOM.render(
  [
    <ConfigProvider key="provider" locale={zhCN}>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={RouteComponent} />
        </Router>
      </Provider>
    </ConfigProvider>
  ],
  document.getElementById('root')
)
