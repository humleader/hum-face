import React, { useState } from 'react'
import { Modal, message, Input, Form, Select } from 'antd'

import './index.less'

const Option = Select.Option

const PowerModal = props => {
  const { action, form, modal } = props

  const { getFieldDecorator, validateFields } = form
  const { visible, record } = modal

  const [loading, setLoading] = useState(false)

  const close = () => {
    action.hidePowerModal()
  }

  const onSubmit = () => {
    setLoading(true)
    validateFields((errors, values) => {
      if (!errors) {
        action
          .powerUpsert({ ...record, ...values })
          .then(() => {
            message.success('新增成功！')
            close()
            action.powerTree()
          })
          .catch(res => {
            message.error(res.message)
          })
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }

  return (
    <Modal
      className="power-modal"
      title="结构配置"
      visible={visible}
      onCancel={close}
      confirmLoading={loading}
      onOk={onSubmit}
      maskClosable={false}
      destroyOnClose
    >
      <Form className="catalog-form">
        <Form.Item {...formItemLayout} label="权限标识">
          {getFieldDecorator('powerCode', {
            initialValue: record.powerCode,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [
              { required: true, message: '请填写权限标识' },
              { pattern: '^[0-9a-zA-Z_]{1,}$', message: '字母数字下划线组成' }
            ]
          })(<Input disabled={record.id} placeholder="请输入权限标识" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="权限名称">
          {getFieldDecorator('powerName', {
            initialValue: record.powerName,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写权限名称' }]
          })(<Input placeholder="请输入权限名称" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="权限类型">
          {getFieldDecorator('powerType', {
            initialValue: record.powerType,
            rules: [{ required: true, message: '请选择权限类型' }]
          })(
            <Select disabled placeholder="请选择权限类型">
              <Option value="system">系统</Option>
              <Option value="menu">菜单</Option>
              <Option value="function">功能</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="权限路径">
          {getFieldDecorator('powerPath', {
            initialValue: record.powerPath,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写权限路径' }]
          })(<Input placeholder="请输入权限路径" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(PowerModal)
