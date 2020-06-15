import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'
import MRoute from './m-route'

const CoreRouter = props => {
  const { menus } = props

  const RedirectMenuPath = menus[0].children[0].path

  const routes = () => {
    return menus.map(pages =>
      pages.children.map((page, idx) => {
        let tempPath = `${page.path}`
        tempPath = tempPath.replace('/', '')
        return (
          <MRoute
            key={page.ppath}
            menu={page.children}
            component={lazyloader(() => import(`pages/${tempPath}`))}
            path={`/${tempPath}`}
          />
        )
      })
    )
  }

  return (
    <Switch>
      {routes()}
      <Redirect to={RedirectMenuPath} />
    </Switch>
  )
}
export default CoreRouter
