import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Divider } from 'antd'

import './index.less'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'

import RoleModal from './role-modal'

const QueryList = props => {
  const { role, action, common } = props
  const listSource = role.get('listSource').toJS()
  const params = role.get('params').toJS()
  const roleModal = role.get('roleModal').toJS()
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
      title: '角色编码',
      dataIndex: 'roleCode'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '创建人',
      dataIndex: 'userId',
      width: '80px',
      render: value => {
        return showName(value)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: '130px',
      render: (text, record) => {
        return (
          <div>
            <a
              onClick={e => {
                e.stopPropagation()
                action.showRoleModal(record)
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={e => {
                e.stopPropagation()
                action.showRoleModal(record)
              }}
            >
              设置权限
            </a>
          </div>
        )
      }
    }
  ]
  const formFields = [
    {
      title: '账户',
      type: 'input',
      placeholder: '输入角色编码',
      dataIndex: 'roleCode',
      formOptions: {
        initialValue: backParams.roleCode
      }
    },
    {
      title: '昵称',
      type: 'input',
      placeholder: '输入角色名称',
      dataIndex: 'roleName',
      formOptions: {
        initialValue: backParams.roleName
      }
    }
  ]

  return (
    <div className="page-role">
      <HumBreadcrumb item="角色管理" />
      <HumContainer className="role-container">
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
                  action.showRoleModal()
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
      <RoleModal modal={roleModal} action={action} params={backParams} />
    </div>
  )
}

function mapStateToProps(state) {
  const role = state.role
  const common = state.common
  return {
    common,
    role
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.role
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryList)
