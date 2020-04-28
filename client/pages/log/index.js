import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import lazyloader from 'components/router/lazyloader'

const Log = props => {
  const { menu = [] } = props

  const RedirectMenu = menu[0]

  const pPath = 'log'

  const routes = () => {
    return menu.map(page => {
      let tempPath = `${page.path}`
      tempPath = tempPath.replace(`/${pPath}`, pPath)

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
      <Redirect to={`${RedirectMenu.path}`} />
    </Switch>
  )
}
export default Log
