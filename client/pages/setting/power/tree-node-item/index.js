import React, { useEffect, useState } from 'react'
import { Input, Form, Row, Col, Button, message, Select } from 'antd'

import './index.less'

const Option = Select.Option

const TreeNodeItem = props => {
  const { item, form, action } = props

  const { getFieldDecorator, resetFields } = form

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    resetFields()
    return () => {}
  }, [item])

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }

  const isloading = val => {
    setLoading(val)
  }

  const onSubmit = () => {
    isloading(true)

    form.validateFields((errors, values) => {
      if (!errors) {
        action
          .powerUpsert({ ...item, ...values })
          .then(() => {
            action.powerTree()
            message.success('更新成功')
          })
          .catch(res => {
            message.error(res.msg)
          })
        isloading(false)
      } else {
        isloading(false)
      }
    })
  }

  return (
    <Form className="tree-node-item">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="权限标识">
            {getFieldDecorator('powerCode', {
              initialValue: item.powerCode,
              getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
              rules: [
                { required: true, message: '请填写权限标识' },
                { pattern: '^[0-9a-zA-Z_]{1,}$', message: '字母数字下划线组成' }
              ]
            })(<Input disabled={item.id} placeholder="请输入权限标识" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="权限名称">
            {getFieldDecorator('powerName', {
              initialValue: item.powerName,
              getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
              rules: [{ required: true, message: '请填写权限名称' }]
            })(<Input placeholder="请输入权限名称" />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="权限类型">
            {getFieldDecorator('powerType', {
              initialValue: item.powerType,
              rules: [{ required: true, message: '请选择权限类型' }]
            })(
              <Select disabled placeholder="请选择权限类型">
                <Option value="system">系统</Option>
                <Option value="menu">菜单</Option>
                <Option value="function">功能</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="权限路径">
            {getFieldDecorator('powerPath', {
              initialValue: item.powerPath,
              getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
              rules: [{ required: true, message: '请填写权限路径' }]
            })(<Input placeholder="请输入权限路径" />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} className="btns">
          <Button
            onClick={() => {
              resetFields()
            }}
          >
            重置
          </Button>
          <Button type="primary" loading={loading} onClick={onSubmit}>
            保存
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(TreeNodeItem)
