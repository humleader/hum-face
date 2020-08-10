import React, { useState } from 'react'
import { Modal, message, Form, Select } from 'antd'

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
    action.hideSetRoleModal()
  }

  const onSubmit = () => {
    setLoading(true)
    validateFields((errors, values) => {
      if (!errors) {
        action
          .userUpsert({ ...record, ...values })
          .then(() => {
            message.success(record.id ? '修改成功！' : '配置成功！')
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

  return (
    <Modal
      className="set-role-modal"
      title="配置角色"
      visible={visible}
      width={440}
      onCancel={close}
      confirmLoading={loading}
      onOk={onSubmit}
      maskClosable={false}
      destroyOnClose
    >
      <Form>
        <Form.Item {...formItemLayout} label="角色">
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
      </Form>
    </Modal>
  )
}

export default Form.create()(UserModal)
