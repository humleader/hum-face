import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'

const CoreRouter = props => {
  const { menus } = props

  const routes = () => {
    return menus.map(pages =>
      pages.children.map(page => {
        // console.log(pathRoute, '========pathRoute=======pathRoute')
        return (
          <Route
            key={page.ppath}
            menu={page.children}
            component={lazyloader(() => import(`pages/${page.ppath}`))}
            path={`/${page.ppath}`}
          />
        )
      })
    )
  }

  return (
    <Switch>
      {routes()}
      <Redirect to="/setting" />
    </Switch>
  )
}
export default CoreRouter
