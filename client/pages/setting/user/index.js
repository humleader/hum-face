import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Switch, Divider, Popconfirm, message } from 'antd'

import './index.less'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'

import UserModal from './user-modal'
import SetRoleModal from './set-role-modal'

const QueryList = props => {
  const { user, action, common } = props
  const listSource = user.get('listSource').toJS()
  const params = user.get('params').toJS()
  const userModal = user.get('userModal').toJS()
  const roleList = user.get('roleList').toJS()
  const setRoleModal = user.get('setRoleModal').toJS()
  const userList = common.get('userList').toJS()

  const [backParams, setBackParams] = useState({})

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
        return value === '0' ? '男' : '女'
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
        return showName(value)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: '190px',
      render: (text, record) => {
        return (
          <div>
            <a
              onClick={e => {
                e.stopPropagation()
                action.showUserModal(record)
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={e => {
                e.stopPropagation()
                action.showSetRoleModal(record)
              }}
            >
              配置角色
            </a>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title={
                <p>
                  你确定要重置密码吗？
                  <br />
                  重置后的密码为：hum123
                </p>
              }
              onConfirm={e => {
                e.stopPropagation()
                action
                  .userUpsert({ id: record.id, userPassword: 'd7df83a1c841bbc2c2eda47a95acf317' })
                  .then(res => {
                    query(backParams)
                    message.success('重置密码成功！')
                  })
              }}
            >
              <a href="javascript:;">重置密码</a>
            </Popconfirm>
          </div>
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
              <Button
                type="primary"
                onClick={() => {
                  action.showUserModal()
                }}
              >
                新增
              </Button>
            </ToolBar>
          }
          xTable={{
            columns,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            dataSource: listSource
          }}
        />
      </HumContainer>
      <UserModal modal={userModal} action={action} params={backParams} />
      <SetRoleModal modal={{ roleList, ...setRoleModal }} action={action} params={backParams} />
    </div>
  )
}

function mapStateToProps(state) {
  const user = state.user
  const common = state.common
  return {
    common,
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

export default connect(mapStateToProps, mapDispatchToProps)(QueryList)
