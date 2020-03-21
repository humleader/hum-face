import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { cas } from 'common/config'

class Header extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    action: PropTypes.object,
    user: PropTypes.object,
    logoutUrl: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { getUserList } = this.props.action
    getUserList()
  }

  logout(e) {
    if (!cas.enable) {
      e.preventDefault()
      this.props.action.logout()
    }
  }

  render() {
    const { userName, logoutUrl, user } = this.props
    const { userInfo } = user.toJS()
    return (
      <div className="headerinfo">
        <div className="userinfo">
          <Icon className="userimg" type="user" />
          <div className="name">
            <p>
              {userName || userInfo.userName} ({userInfo.userAliasName && userInfo.userAliasName})
            </p>
          </div>
        </div>
        <a onClick={e => this.logout(e)} className="logout" href={logoutUrl}>
          <Icon type="logout" />
          退出登录
        </a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const user = state.user
  return {
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.user
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
