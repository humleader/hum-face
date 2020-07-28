import React, { useState } from 'react'
import { Modal, message, Input, Form } from 'antd'

import './index.less'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const RoleModal = props => {
  const { action, form, modal, params } = props

  const { getFieldDecorator, validateFields } = form
  const { visible, record } = modal

  const [loading, setLoading] = useState(false)

  const close = () => {
    action.hideRoleModal()
  }

  const onSubmit = () => {
    setLoading(true)
    validateFields((errors, values) => {
      if (!errors) {
        action
          .roleUpsert({ ...record, ...values })
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

  const title = record.id ? '修改角色' : '新增角色'

  return (
    <Modal
      className="role-modal"
      title={title}
      visible={visible}
      width={440}
      onCancel={close}
      confirmLoading={loading}
      onOk={onSubmit}
      maskClosable={false}
      destroyOnClose
    >
      <Form>
        <Form.Item className="form-item" {...formItemLayout} label="角色编码">
          {getFieldDecorator('roleCode', {
            initialValue: record.roleCode,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写角色编码' }]
          })(<Input disabled={!!record.id} placeholder="请输入角色编码" />)}
        </Form.Item>

        <Form.Item className="form-item" {...formItemLayout} label="角色名称">
          {getFieldDecorator('roleName', {
            initialValue: record.roleName,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写角色名称' }]
          })(<Input placeholder="请输入角色名称" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(RoleModal)
