// 页面初始化

import './boot'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { init } from '@rematch/core'
import zhCN from 'antd/es/locale/zh_CN'

import history from './common/history'
import { models } from './store'
// 登录页面不需要layout布局故放在这个路由展示
import Login from 'pages/user/page'

const store = init({
  models
})

ReactDOM.render(
  [
    <ConfigProvider key="provider" locale={zhCN}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </Provider>
    </ConfigProvider>
  ],
  document.getElementById('root')
)
