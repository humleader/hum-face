import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Switch } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'
import history from 'common/history'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'

const QueryList = props => {
  const { setting, action, common } = props
  const listSource = setting.get('listSource').toJS()
  const params = setting.get('params').toJS()
  let historyParams = setting.get('historyParams')
  historyParams = historyParams && historyParams.toJS()
  const userList = common.get('userList').toJS()

  const [backParams, setBackParams] = useState({})

  useEffect(() => {
    if (historyParams) {
      setBackParams(historyParams)
      action.setHistoryParams(undefined)
    }
    return () => {}
  }, [])

  const query = data => {
    setBackParams(data)
    return action.query(data)
  }

  const showName = id => {
    const list = userList
    const ab = list.find(item => {
      return item.id === Number(id)
    })
    return ab ? ab.userAliasName : ''
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '账户',
      dataIndex: 'userName'
    },
    {
      title: '昵称',
      dataIndex: 'userAliasName'
    },
    {
      title: '性别',
      dataIndex: 'userSex',
      render: value => {
        return value === 0 ? '男' : '女'
      }
    },
    {
      title: '手机',
      dataIndex: 'userTel'
    },
    {
      title: '状态',
      render: record => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="注销"
            checked={record.recycleStatus}
            onChange={() => {
              action
                .userUpsert({
                  id: record.id,
                  recycleStatus: record.recycleStatus ? 0 : 1
                })
                .then(() => {
                  query(backParams)
                })
            }}
          />
        )
      }
    },
    {
      title: '创建人',
      dataIndex: 'addUserId',
      width: '80px',
      render: value => {
        console.log(value)
        return showName(value)
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <a
            onClick={e => {
              e.stopPropagation()
              history.push(`/candidate/add/${record.id}`)
            }}
          >
            编辑
          </a>
        )
      }
    }
  ]
  const formFields = [
    {
      title: '账户',
      type: 'input',
      placeholder: '输入账户',
      dataIndex: 'userName',
      formOptions: {
        initialValue: backParams.userName
      }
    },
    {
      title: '昵称',
      type: 'input',
      placeholder: '输入昵称',
      dataIndex: 'userAliasName',
      formOptions: {
        initialValue: backParams.userAliasName
      }
    },
    {
      title: '手机',
      type: 'input',
      placeholder: '输入手机',
      dataIndex: 'userTel',
      formOptions: {
        initialValue: backParams.userTel
      }
    },
    {
      title: '状态',
      type: 'select',
      placeholder: '请选择状态',
      dataIndex: 'recycleStatus',
      options: [
        { label: '启动', value: 1 },
        { label: '注销', value: 0 }
      ],
      formOptions: {
        initialValue: backParams.recycleStatus
      }
    }
  ]

  return (
    <div className="page-user">
      <HumBreadcrumb item="用户管理" />
      <HumContainer className="user-container">
        <HumQuery
          params={params}
          query={query}
          xForm={{
            formFields
          }}
          toolBar={
            <ToolBar>
              <Button type="primary">
                <Link to="/power/add">新增</Link>
              </Button>
            </ToolBar>
          }
          xTable={{
            columns,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            // scroll: { x: 1800 },
            dataSource: listSource
          }}
        />
      </HumContainer>
    </div>
  )
}

function mapStateToProps(state) {
  const setting = state.setting
  const common = state.common
  return {
    common,
    setting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.setting
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryList)
