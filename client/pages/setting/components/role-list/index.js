import React, { useEffect } from 'react'
import history from 'common/history'
import moment from 'moment'
import { Table, Divider } from 'antd'

import './index.less'

const List = props => {
  const { setting } = props

  const { loading, dataSource = {} } = setting.toJS()

  useEffect(() => {
    return () => {}
  }, [])

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name'
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

  const handleOnRowClick = record => {
    return {
      onClick: () => {
        history.push(`/candidate/view/${record.id}`)
      }
    }
  }

  return (
    <div className="page-role">
      page-role
      <Table
        rowKey="id"
        className="table-list"
        loading={loading}
        onRow={handleOnRowClick}
        columns={columns}
        dataSource={dataSource.rows || []}
        pagination={false}
      />
    </div>
  )
}

export default List
