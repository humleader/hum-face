import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import List from 'pages/user/page'

const User = props => {
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <Switch>
      <Route component={List} path="/" />
    </Switch>
  )
}
export default User
