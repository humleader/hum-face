import React from 'react'
import { Route } from 'react-router-dom'

const MRoute = props => {
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={props => {
        return <Component {...rest} {...props} />
      }}
    />
  )
}

export default MRoute
