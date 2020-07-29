import React, { useEffect, useState } from 'react'
import { Input, Form, Row, Col, Button, Select, message } from 'antd'

import './index.less'

import isJSON from 'common/utils/isJSON'

const { TextArea } = Input

const TreeNodeItem = props => {
  const { item, form, queryTree, documentTypeUuid } = props

  const { getFieldDecorator, setFieldsValue, resetFields } = form

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    resetFields()
    return () => {}
  }, [item])

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }
  const formItemLayout2 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 }
  }

  const isloading = val => {
    setLoading(val)
  }

  const onSubmit = () => {
    isloading(true)

    form.validateFields(async (errors, data) => {
      if (!errors) {
        const temp = {
          ...item,
          ...data,
          config: typeof data.config !== 'string' ? JSON.stringify(data.config) : data.config,
          children: undefined
        }
        service
          .fieldUpdate(temp)
          .then(() => {
            queryTree(documentTypeUuid)
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
          <Form.Item className="form-item" {...formItemLayout} label="字段名称">
            {getFieldDecorator('displayName', {
              initialValue: item.displayName,
              getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
              rules: [
                { required: true, message: '请填写字段名称' },
                { max: 100, message: '长度不能超过100' }
              ]
            })(<Input placeholder="不能超过100个字符" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="form-item" {...formItemLayout} label="字段标识">
            {getFieldDecorator('name', {
              initialValue: item.name,
              getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
              rules: [
                { required: true, message: '请填写字段标识' },
                { pattern: '^[0-9a-zA-Z_]{1,}$', message: '字母数字下划线组成' }
              ]
            })(<Input disabled={item.uuid} placeholder="请输入字段标识" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item className="form-item" {...formItemLayout2} label="报文路径">
            {getFieldDecorator('path', {
              initialValue: item.path,
              getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
              rules: [{ required: true, message: '请填写报文路径' }]
            })(<Input readOnly={item.uuid} placeholder="请输入报文路径" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item className="form-item" {...formItemLayout2} label="原始路径">
            {getFieldDecorator('sourcePath', {
              initialValue: item.sourcePath,
              getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
              rules: [{ required: true, message: '请填写原始路径' }]
            })(<Input readOnly={item.uuid} placeholder="请输入原始路径" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item className="form-item" {...formItemLayout2} label="字段描述">
            {getFieldDecorator('description', {
              initialValue: item.description,
              rules: []
            })(<TextArea rows={4} placeholder="请输入指标描述" />)}
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
