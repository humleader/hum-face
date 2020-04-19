import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import lazyloader from 'components/router/lazyloader'

const Setting = props => {
  const { children } = props
  useEffect(() => {
    return () => {}
  }, [])

  const routes = () => {
    return children.map(page => (
      <Route
        key={page.id}
        component={lazyloader(() => import(`pages/setting/page${page.path}`))}
        path={`${page.path}`}
      />
    ))
  }

  return <Switch>{routes()}</Switch>
}
export default Setting
