import React from 'react'
import cn from 'classnames'
import Layout from './layout'
import withMenu from './with-menu'

const withLayout = ({
  appCode,
  className = '',
  menus,
  userInfo,
  title,
  logo
}) => WrappedComponent => {
  const CustomerLayout = withMenu(Layout)

  // 注意：props 是 react-router Route 组件注入的 props
  const withLayoutHoc = props => {
    return (
      <CustomerLayout
        appCode={appCode}
        menus={menus}
        userInfo={userInfo}
        title={title}
        logo={logo}
        className={cn(`hum-layout`, className)}
        {...props}
      >
        <WrappedComponent menus={menus} {...props} />
      </CustomerLayout>
    )
  }
  // 调试显示的名称
  withLayoutHoc.displayName = `withLayout(withLayoutHoc)`

  return withLayoutHoc
}

export default withLayout
