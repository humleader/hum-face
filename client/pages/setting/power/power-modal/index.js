import { useEffect } from 'react'
import { Modal, message, Input, Form, Select } from 'antd'
import service from '../../service'
import { connect } from 'dva'
import './index.less'

const Option = Select.Option

const CatalogModal = props => {
  const { visible, actions, documentTypeUuid, item = {}, editType, form, globalStore } = props

  const { getFieldDecorator, validateFields } = form

  const { dataTypeList } = globalStore

  const close = () => {
    actions.close()
  }

  useEffect(() => {
    if (visible) {
    }
    return () => {}
  }, [visible])

  const onSubmit = () => {
    validateFields(async (errors, values) => {
      if (!errors) {
        try {
          const res =
            editType === 'add'
              ? await service.fieldCreate({
                  parentUuid: item.uuid,
                  ...values,
                  documentTypeUuid
                })
              : await service.fieldUpdate({
                  ...item,
                  ...values,
                  documentTypeUuid
                })
          if (res) {
            actions.refreshTree()
            close()
            message.success('保存成功')
          }
        } catch (e) {
          message.error(e.msg)
        }
      }
    })
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }

  return (
    <Modal
      className="catalog-modal"
      title="结构配置"
      visible={visible}
      width={800}
      onCancel={close}
      onOk={onSubmit}
      maskClosable={false}
      destroyOnClose
    >
      <Form className="catalog-form">
        <Form.Item className="form-item" {...formItemLayout} label="字段名称">
          {getFieldDecorator('displayName', {
            initialValue: editType === 'edit' ? item.displayName : undefined,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [
              { required: true, message: '请填写字段名称' },
              { max: 100, message: '长度不能超过100' }
            ]
          })(<Input placeholder="不能超过100个字符" />)}
        </Form.Item>
        <Form.Item className="form-item" {...formItemLayout} label="字段类型">
          {getFieldDecorator('dataType', {
            initialValue: item.dataType,
            rules: [{ required: true, message: '请选择字段类型' }]
          })(
            <Select
              placeholder="选择字段类型"
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {dataTypeList.map((item, index) => {
                return (
                  <Option key={`${item.value}${index}`} value={item.value}>
                    {item.displayName}
                  </Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item className="form-item" {...formItemLayout} label="字段标识">
          {getFieldDecorator('name', {
            initialValue: editType === 'edit' ? item.name : undefined,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [
              { required: true, message: '请填写字段标识' },
              { pattern: '^[0-9a-zA-Z_]{1,}$', message: '字母数字下划线组成' }
            ]
          })(<Input disabled={item.uuid && editType !== 'add'} placeholder="请输入字段标识" />)}
        </Form.Item>
        <Form.Item className="form-item" {...formItemLayout} label="原始路径">
          {getFieldDecorator('sourceName', {
            initialValue: editType === 'edit' ? item.sourcePath : undefined,
            getValueFromEvent: event => event.target.value.replace(/^\s+|\s+$/gm, ''),
            rules: [{ required: true, message: '请填写原始路径' }]
          })(
            <Input
              disabled={item.uuid && editType !== 'add'}
              addonBefore={editType === 'edit' ? '' : item.sourcePath + '.'}
              placeholder="请输入原始路径"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default connect(state => ({
  globalStore: state.global
}))(Form.create()(CatalogModal))
