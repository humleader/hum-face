import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import lazyloader from './lazyloader'

const CoreRouter = props => {
  const { menus } = props
  useEffect(() => {
    return () => {}
  }, [])

  const routes = () => {
    return menus.map(pages =>
      pages.children.map(page => (
        <Route
          key={page.id}
          children={page.children}
          component={lazyloader(() => import(`pages${page.ppath}`))}
          path={`${page.ppath}`}
        />
      ))
    )
  }

  return <Switch>{routes()}</Switch>
}
export default CoreRouter
