import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import lazyloader from 'components/router/lazyloader'

const Setting = props => {
  const { menu = [], pPath } = props

  const RedirectMenu = menu[0]

  const routes = () => {
    return menu.map(page => {
      let tempPath = `${page.path}`
      tempPath = tempPath.replace(`/${pPath}`, pPath)

      return (
        <Route
          key={tempPath}
          exact
          component={lazyloader(() => import(`pages/${tempPath}`))}
          path={`/${tempPath}`}
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
export default Setting
