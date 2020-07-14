import React, { useEffect } from 'react'
import { Modal, message, Input, Form } from 'antd'
import './index.less'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const UserModal = props => {
  const { actions, form, modal } = props

  const { getFieldDecorator, validateFields } = form
  const { visible, record, loading } = modal

  useEffect(() => {
    return () => {}
  }, [])

  const close = () => {
    actions.close()
  }

  const onSubmit = () => {
    validateFields((errors, values) => {
      if (!errors) {
        console.log(errors)
        message.error('adfafd')
      }
    })
  }

  const title = record.id ? '修改用户' : '新增用户'

  return (
    <Modal
      className="user-modal"
      title={title}
      visible={visible}
      confirmLoading={loading}
      width={440}
      onCancel={close}
      onOk={onSubmit}
      maskClosable={false}
      destroyOnClose
    >
      <Form className="user-form">
        <Form.Item className="form-item" {...formItemLayout} label="昵称">
          {getFieldDecorator('displayName', {
            initialValue: undefined,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写昵称' }]
          })(<Input placeholder="请输入昵称" />)}
        </Form.Item>
        <Form.Item className="form-item" {...formItemLayout} label="账号">
          {getFieldDecorator('name', {
            initialValue: undefined,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写账号' }]
          })(<Input placeholder="请输入账号" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(UserModal)
