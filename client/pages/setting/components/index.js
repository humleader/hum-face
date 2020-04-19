import React from 'react'
import PropTypes from 'prop-types'

import List from './list'

export default class ListTable extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired
  }

  componentDidMount() {}

  render() {
    const { action, user } = this.props
    const list = user.get('list')

    return (
      <div className="hum-content">
        {/* 列表 */}
        <List list={list} action={action} />
      </div>
    )
  }
}
