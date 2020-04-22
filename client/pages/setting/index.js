import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

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
        exact
        component={lazyloader(() =>
          import(`pages/setting/page${page.path.replace('/setting', '')}`)
        )}
        path={`${page.path}`}
      />
    ))
  }

  return (
    <Switch>
      {routes()}
      <Redirect to="/setting/user" />
    </Switch>
  )
}
export default Setting
