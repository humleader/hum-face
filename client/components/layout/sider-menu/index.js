import SiderMenu from './sider-menu'
import withResponsive from './with-responsive'

export default function SiderMenuWrap(props) {
  return withResponsive(SiderMenu, props.responsive)(props)
}
