// 页面顶部一级导航
import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import isEmpty from 'lodash/isEmpty'

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

    if (isEmpty(menus)) {
      return null
    }

    const menuProps = {
      selectedKeys: selectedMenus
    }

    menuProps.mode = 'horizontal'

    return <Menu {...menuProps}>{menus.map(renderMenu)}</Menu>
  }
}
