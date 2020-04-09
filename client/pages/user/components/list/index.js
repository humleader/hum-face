import React, { Component } from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import moment from 'moment'
import { Table, Divider } from 'antd'
import './index.less'

export default class List extends Component {
  static propTypes = {
    list: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      cardActionType: ''
    }
  }

  columns = [
    {
      title: '姓名',
      dataIndex: 'canName',
      fixed: 'left'
    },
    {
      title: '英文名',
      dataIndex: 'canEnName',
      fixed: 'left'
    },
    {
      title: '目前公司',
      dataIndex: 'canCompany',
      fixed: 'left'
    },
    {
      title: '学历',
      dataIndex: 'canEducation'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: updateTime => {
        return moment(updateTime).format('YYYY-MM-DD')
      }
    },
    {
      title: '操作',
      key: 'action',
      width: '120px',
      fixed: 'right',
      render: (text, record) => {
        const { action } = this.props
        return (
          <span>
            <a
              onClick={e => {
                e.stopPropagation()
                history.push(`/candidate/add/${record.id}`)
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={e => {
                e.stopPropagation()
                action.showModal(record)
              }}
            >
              推荐项目
            </a>
          </span>
        )
      }
    }
  ]

  handleOnRowClick = record => {
    return {
      onClick: () => {
        history.push(`/candidate/view/${record.id}`)
      }
    }
  }

  componentDidMount() {}

  render() {
    const { list } = this.props

    const { loading, dataSource = {} } = list.toJS()

    return (
      <Table
        rowKey="id"
        className="table-list"
        loading={loading}
        onRow={this.handleOnRowClick}
        columns={this.columns}
        dataSource={dataSource.rows || []}
        // scroll={{ x: 1600 }}
        pagination={false}
      />
    )
  }
}
