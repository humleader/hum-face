import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd'
import './index.less'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker

class SearchForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    decount: PropTypes.number,
    loading: PropTypes.bool,
    formConfig: PropTypes.array
  }

  state = {
    expand: false
  }

  handleSearch = e => {
    const { onSubmit } = this.props
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      onSubmit(err, values)
    })
  }

  handleReset = () => {
    const { formConfig } = this.props
    for (let i = 0; i < formConfig.length; i++) {
      const formItem = formConfig[i]
      if (formItem.type === 'month') {
        this.props.form.setFieldsValue({ [formItem.dataIndex]: moment() })
      } else {
        this.props.form.setFieldsValue({ [formItem.dataIndex]: '' })
      }
    }
    this.handleSearch()
  }

  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }
  renderOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={idx} value={item.codeName || item.id || item.value}>
          {item.codeName || item.sName || item.userAliasName || item.label}
        </Option>
      )
    })
  }

  renderItem = item => {
    switch (item.type) {
      case 'select':
        return (
          <Select placeholder={item.placeholder} {...item.props} allowClear>
            {this.renderOptions(item.options)}
          </Select>
        )
      case 'month':
        return <MonthPicker placeholder={item.placeholder} {...item.props} allowClear />
      case 'date':
        return <RangePicker format="YYYY-MM-DD" {...item.props} allowClear />
      case 'input':
      default:
        return <Input placeholder={item.placeholder} {...item.props} />
    }
  }

  getFields() {
    const { formConfig, decount } = this.props
    const { getFieldDecorator } = this.props.form
    const children = []
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const count = this.state.expand ? 10 : decount || 3
    for (let i = 0; i < formConfig.length; i++) {
      const formItem = formConfig[i]
      children.push(
        <Col span={8} key={`form-${i}`}>
          <FormItem
            label={formItem.title}
            style={{ display: i < count ? 'block' : 'none' }}
            {...formItemLayout}
          >
            {getFieldDecorator(formItem.dataIndex, formItem.formOptions || {})(
              this.renderItem(formItem)
            )}
          </FormItem>
        </Col>
      )
    }
    return children
  }

  render() {
    const { loading, formConfig } = this.props
    return (
      <Form className="m-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button loading={loading} icon="search" type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清除
            </Button>
            {formConfig.length > 3 ? (
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                收缩 <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            ) : null}
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(SearchForm)
