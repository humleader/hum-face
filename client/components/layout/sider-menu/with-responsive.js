import 'rc-drawer-menu/assets/index.css'
import React from 'react'
import { Icon } from 'antd'
import DrawerMenu from 'rc-drawer-menu'
import _ from 'lodash'

// 自适应布局
export default function withResponsive(WrappedComponent, responsive) {
  return props => {
    /* eslint-disable react/prop-types */
    const { collapsed, onCollapse, menus } = props
    const hide = () => onCollapse(false)

    return responsive && !_.isEmpty(menus) ? (
      <DrawerMenu
        level={null}
        open={collapsed}
        handleChild={<Icon type={collapsed ? 'menu-fold' : 'menu-unfold'} />}
        onHandleClick={() => onCollapse(!collapsed)}
        onMaskClick={hide}
      >
        <WrappedComponent {...props} collapsed={false} onMenuClick={hide} />
      </DrawerMenu>
    ) : (
      <WrappedComponent {...props} />
    )
  }
}
