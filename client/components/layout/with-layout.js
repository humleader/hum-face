import React from 'react'
import PropTypes from 'prop-types'
import Layout from './layout'
import withMenu from './with-menu'
import logoPng from '../../assets/images/logo.png'

import { userInfo, menus, appCode, baseURI, responsive, defaultLayout } from 'common/config'

let { nicknameCn = '' } = userInfo

const withLayout = (layout = defaultLayout) => WrappedComponent => {
  const CustomerLayout = withMenu(Layout)

  return class extends React.Component {
    static displayName = `${layout}Layout`
    static propTypes = {
      location: PropTypes.object.isRequired
    }
    render() {
      // 注意：此处使用的 location 是有 react-router Route 组件注入的 props
      const { location } = this.props
      return layout !== 'blank' ? (
        <CustomerLayout
          menus={menus}
          logoutUrl={`${baseURI}/logout`}
          userName={nicknameCn}
          title="禾优曼管理系统"
          appCode={appCode}
          logo={logoPng}
          responsive={responsive}
          className={this.className}
          layout={layout}
          location={location}
        >
          <WrappedComponent {...this.props} />
        </CustomerLayout>
      ) : (
        <WrappedComponent {...this.props} />
      )
    }

    get className() {
      let className = `hum-layout hum-layout-${layout}`
      if (responsive) {
        className += ' hum-layout-responsive'
      }

      return className
    }
  }
}

export default withLayout
