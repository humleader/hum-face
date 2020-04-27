import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import lazyloader from 'components/router/lazyloader'

const Setting = props => {
  const { menu = [] } = props

  const routes = () => {
    return menu.map(page => {
      let tempPath = `${page.path}`
      tempPath = tempPath.replace('/setting/', '')

      return (
        <Route
          key={page.path}
          exact
          component={lazyloader(() => import(`pages/setting/page/${tempPath}`))}
          path={`${page.path}`}
        />
      )
    })
  }

  return (
    <Switch>
      {routes()}
      <Redirect to="/setting/user" />
    </Switch>
  )
}
export default Setting
