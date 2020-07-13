import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Divider, Button, Switch } from 'antd'
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
      dataIndex: 'userSex'
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
      title: '年龄',
      dataIndex: 'canBirthday',
      width: '80px',
      render: item => {
        let age
        if (item && item.indexOf('-') !== -1) {
          const text = moment(item, 'YYYY-MM-DD').fromNow()
          age = parseInt(text, 10)
        } else {
          const text = moment(`${item}-12-31`, 'YYYY-MM-DD').fromNow()
          age = parseInt(text, 10)
        }
        if (isNaN(age)) {
          age = '未知'
        } else {
          age = age + '岁'
        }
        return age
      }
    },
    {
      title: '学历',
      width: '80px',
      dataIndex: 'canEducation'
    },
    {
      title: '创建人',
      dataIndex: 'addUserId',
      width: '80px',
      render: item => {
        return showName(item)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: '140px',
      render: (text, record) => {
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
  const formFields = [
    {
      title: '手机',
      type: 'input',
      placeholder: '输入手机',
      dataIndex: 'canPhone',
      formOptions: {
        initialValue: backParams.canPhone
      }
    },
    {
      title: '职位',
      type: 'input',
      placeholder: '输入职位',
      dataIndex: 'canPosition',
      formOptions: {
        initialValue: backParams.canPosition
      }
    },
    {
      title: '姓名',
      type: 'input',
      placeholder: '输入姓名',
      dataIndex: 'canName',
      formOptions: {
        initialValue: backParams.canName
      }
    },
    {
      title: '所在城市',
      type: 'input',
      placeholder: '所在城市',
      dataIndex: 'canCity',
      formOptions: {
        initialValue: backParams.canCity
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
