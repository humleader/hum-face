import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import lazyloader from 'components/router/lazyloader'
import Power from 'pages/setting/page/power'
import Role from 'pages/setting/page/role'
import User from 'pages/setting/page/user'

const Setting = props => {
  const { menu } = props
  useEffect(() => {
    return () => {}
  }, [])

  console.log(menu, '========menu')

  const routes = () => {
    return (
      menu &&
      menu.map(page => (
        <Route
          key={page.path}
          exact
          component={lazyloader(() => import(`pages/setting/page/role`))}
          path={`${page.path}`}
        />
      ))
    )
  }

  return (
    <Switch>
      {/* {routes()} */}
      <Route exact component={Power} path="/setting/power" />
      <Route exact component={Role} path="/setting/role" />
      <Route exact component={User} path="/setting/user" />
      <Redirect to="/setting/user" />
    </Switch>
  )
}
export default Setting
