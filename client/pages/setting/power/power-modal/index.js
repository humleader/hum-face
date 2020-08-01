import React, { useEffect, useState } from 'react'
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
          .userUpsert({ ...record, ...values })
          .then(() => {
            message.success(record.id ? '修改成功！' : '新增成功！')
            close()
            action.powerTree()
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

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }

  return (
    <Modal
      className="power-modal"
      title="结构配置"
      visible={visible}
      width={800}
      onCancel={close}
      confirmLoading={loading}
      onOk={onSubmit}
      maskClosable={false}
      destroyOnClose
    >
      <Form className="catalog-form">
        <Form.Item className="form-item" {...formItemLayout} label="字段名称">
          {getFieldDecorator('powerCode', {
            initialValue: record.powerCode,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [
              { required: true, message: '请填写字段名称' },
              { max: 100, message: '长度不能超过100' }
            ]
          })(<Input placeholder="不能超过100个字符" />)}
        </Form.Item>

        <Form.Item className="form-item" {...formItemLayout} label="字段标识">
          {getFieldDecorator('powerName', {
            initialValue: record.powerName,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [
              { required: true, message: '请填写字段标识' },
              { pattern: '^[0-9a-zA-Z_]{1,}$', message: '字母数字下划线组成' }
            ]
          })(<Input placeholder="请输入字段标识" />)}
        </Form.Item>

        <Form.Item className="form-item" {...formItemLayout} label="字段标识">
          {getFieldDecorator('powerType', {
            initialValue: record.powerType,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写字段标识' }]
          })(
            <Select placeholder="请输入字段标识">
              <Option value="aaa">aaa</Option>
              <Option value="aaa">aaa</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item className="form-item" {...formItemLayout} label="原始路径">
          {getFieldDecorator('powerPath', {
            initialValue: record.powerPath,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写原始路径' }]
          })(<Input placeholder="请输入原始路径" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(PowerModal)
