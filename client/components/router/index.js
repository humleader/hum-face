import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'
import Auth from '../auth'
import pages from '../../pages'

// 改为 PureComponent 防止菜单收缩导致重新渲染
export default class CoreRouter extends React.PureComponent {
  get routes() {
    return pages.map(page => (
      <Auth key={page} component={lazyloader(() => import(`pages/${page}`))} path={`/${page}`} />
    ))
  }

  render() {
    return (
      <Switch>
        {this.routes}
        <Redirect to="/home" />
      </Switch>
    )
  }
}
