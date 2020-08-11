import React, { useEffect, useState } from 'react'
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
  const { visible, record, roleList } = modal

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (visible) {
      action.getRoleList()
    }
    return () => {}
  }, [visible])

  const close = () => {
    action.hideSetRoleModal()
  }

  const renderOptions = options => {
    return (
      options &&
      options.map((item, idx) => {
        return (
          <Option key={item.id} item={item} value={item.id}>
            {item.roleName}
          </Option>
        )
      })
    )
  }

  const onSubmit = () => {
    setLoading(true)
    validateFields((errors, values) => {
      if (!errors) {
        action
          .userSetRole({ id: record.id, UserRole: record.UserRole, ...values })
          .then(() => {
            message.success('配置成功！')
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
          {getFieldDecorator('roles', {
            initialValue: record.UserRole && record.UserRole.map(res => res.roleId),
            rules: [{ required: true, message: '请选择角色' }]
          })(
            <Select mode="multiple" placeholder="选择角色" allowClear>
              {renderOptions(roleList)}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(UserModal)
