// 页面顶部一级导航
import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import _ from 'lodash'

import { renderMenu } from '../util'

export default class Header extends React.Component {
  static propTypes = {
    selectedMenus: PropTypes.array.isRequired,
    menus: PropTypes.array
  }

  state = {
    visible: false
  }

  render() {
    const { selectedMenus, menus } = this.props

    if (_.isEmpty(menus)) {
      return null
    }

    const menuProps = {
      selectedKeys: selectedMenus,
      theme: 'dark'
    }

    menuProps.mode = 'horizontal'

    return <Menu {...menuProps}>{menus.map(renderMenu)}</Menu>
  }
}
