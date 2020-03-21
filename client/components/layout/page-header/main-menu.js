// 页面顶部一级导航
import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Popover, Icon } from 'antd'
import _ from 'lodash'

import { renderMenu } from '../util'

export default class Header extends React.Component {
  static propTypes = {
    selectedMenus: PropTypes.array.isRequired,
    menus: PropTypes.array,
    logoutUrl: PropTypes.string.isRequired,
    responsive: PropTypes.bool
  }

  state = {
    visible: false
  }

  render() {
    const { selectedMenus, menus, responsive, logoutUrl } = this.props

    if (_.isEmpty(menus)) {
      return null
    }

    const menuProps = {
      selectedKeys: selectedMenus,
      theme: 'dark'
    }

    if (responsive) {
      menuProps.style = { border: 0 }
      menuProps.onClick = () => this.setState({ visible: false })
    } else {
      menuProps.mode = 'horizontal'
    }

    const content = (
      <Menu {...menuProps}>
        {menus.map(renderMenu)}
        {responsive && (
          <Menu.Item>
            <a href={logoutUrl}>
              <Icon type="logout" />
              <span>退出登录</span>
            </a>
          </Menu.Item>
        )}
      </Menu>
    )

    return responsive ? (
      <Popover
        overlayClassName="popover-menu"
        placement="bottomRight"
        content={content}
        trigger="click"
        onClick={() => this.setState({ visible: true })}
        onVisibleChange={visible => this.setState({ visible })}
        visible={this.state.visible}
      >
        <Icon type="bars" />
      </Popover>
    ) : (
      content
    )
  }
}
