import React, { useState } from 'react'
import { Modal, message, Input, Form, Select } from 'antd'
import CryptoJS from 'crypto-js'

import './index.less'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}

const { Option } = Select

const UserModal = props => {
  const { action, form, modal, params } = props

  const { getFieldDecorator, validateFields } = form
  const { visible, record } = modal

  const [loading, setLoading] = useState(false)

  const close = () => {
    action.hideUserModal()
  }

  const onSubmit = () => {
    setLoading(true)
    validateFields((errors, values) => {
      if (!errors) {
        values.userPassword = values.userPassword
          ? CryptoJS.MD5(values.userPassword).toString()
          : ''
        action
          .userUpsert({ ...record, ...values })
          .then(() => {
            message.success(record.id ? '修改成功！' : '新增成功！')
            close()
            action.query(params)
            setLoading(false)
          })
          .catch(res => {
            message.error(res.message)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })
  }

  const title = record.id ? '修改用户' : '新增用户'

  return (
    <Modal
      className="user-modal"
      title={title}
      visible={visible}
      width={440}
      onCancel={close}
      confirmLoading={loading}
      onOk={onSubmit}
      maskClosable={false}
      destroyOnClose
    >
      <Form className="user-form">
        <Form.Item className="form-item" {...formItemLayout} label="昵称">
          {getFieldDecorator('userAliasName', {
            initialValue: record.userAliasName,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写昵称' }]
          })(<Input placeholder="请输入昵称，如：Anthony" />)}
        </Form.Item>

        <Form.Item className="form-item" {...formItemLayout} label="账号">
          {getFieldDecorator('userName', {
            initialValue: record.userName,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [
              { required: true, message: '请填写账号' },
              { type: 'email', message: '请填入邮箱' }
            ]
          })(<Input disabled={!!record.id} placeholder="请输入账号，公司邮箱地址" />)}
        </Form.Item>

        {record.id ? null : (
          <Form.Item className="form-item" {...formItemLayout} label="密码">
            {getFieldDecorator('userPassword', {
              initialValue: record.userPassword,
              getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
              rules: []
            })(<Input placeholder="可不填，默认hum123" />)}
          </Form.Item>
        )}

        <Form.Item className="form-item" {...formItemLayout} label="性别">
          {getFieldDecorator('userSex', {
            initialValue: record.userSex,
            rules: [{ required: true, message: '请选择性别' }]
          })(
            <Select placeholder="选择性别" allowClear>
              <Option value="0">男</Option>
              <Option value="1">女</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item className="form-item" {...formItemLayout} label="手机">
          {getFieldDecorator('userTel', {
            initialValue: record.userTel,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: []
          })(<Input placeholder="请输入账号" />)}
        </Form.Item>

        <Form.Item className="form-item" {...formItemLayout} label="职能">
          {getFieldDecorator('status', {
            initialValue: record.status,
            rules: [{ required: true, message: '请填写职能' }]
          })(
            <Select placeholder="选择职能" allowClear>
              <Option value="0">业务人员</Option>
              <Option value="1">支持人员</Option>
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(UserModal)
