import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import lazyloader from 'components/router/lazyloader'

const Log = props => {
  const { menu = [] } = props

  const routes = () => {
    return menu.map(page => {
      let tempPath = `${page.path}`
      tempPath = tempPath.replace('/log', 'log')

      return (
        <Route
          key={page.path}
          exact
          component={lazyloader(() => import(`pages/${tempPath}`))}
          path={`${page.path}`}
        />
      )
    })
  }

  return (
    <Switch>
      {routes()}
      <Redirect to="/log/login" />
    </Switch>
  )
}
export default Log
