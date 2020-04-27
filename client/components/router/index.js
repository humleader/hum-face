import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'
import MRoute from './m-route'

const CoreRouter = props => {
  const { menus } = props

  const routes = () => {
    return menus.map(pages =>
      pages.children.map(page => {
        return (
          <MRoute
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
