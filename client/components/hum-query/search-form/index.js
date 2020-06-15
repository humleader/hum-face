import React, { useState, Fragment, useEffect, useRef } from 'react'
import cn from 'classnames'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import debounce from 'lodash/debounce'

const FormItem = Form.Item
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker

const SearchForm = props => {
  const {
    className,
    loading,
    doSearch,
    params,
    formFields = [],
    form,
    renderActions,
    showSearch = true,
    showReset = true
  } = props

  const { getFieldDecorator, resetFields, getFieldsValue, setFieldsValue } = form

  const [expand, setExpand] = useState(false)
  const [offsetHeight, setOffsetHeight] = useState(0)
  const [showMoreField, setShowMoreField] = useState(false)
  const fieldRef = useRef()

  const isFieldsWidthOverflow = () => {
    const { current } = fieldRef

    if (current) {
      setOffsetHeight(current.offsetHeight)
      return (
        current.offsetWidth <
        [].reduce.call(
          current.children,
          (acc, cur) => {
            acc += cur.offsetWidth + 14
            return acc
          },
          0
        )
      )
    }

    return false
  }
  const onWindowResize = debounce(() => {
    const { current } = fieldRef

    if (current) {
      setTimeout(() => {
        setShowMoreField(isFieldsWidthOverflow())
      }, 25)
    }
  }, 50)

  useEffect(() => {
    const { current } = fieldRef

    if (!showMoreField) {
      if (current && isFieldsWidthOverflow()) {
        setShowMoreField(true)
      }

      window.addEventListener('resize', onWindowResize)
    }
    return () => {}
  }, [])

  const handleSearch = e => {
    e && e.preventDefault()
    const values = getFieldsValue()
    doSearch({ ...params, ...values })
  }

  const handleReset = () => {
    const { pageIndex, pageSize } = params
    resetFields()
    const values = getFieldsValue()
    for (let i = 0; i < formFields.length; i++) {
      const formItem = formFields[i]
      if (values[formItem.dataIndex]) {
        setFieldsValue({ [formItem.dataIndex]: undefined })
      }
    }

    doSearch({ pageIndex, pageSize })
  }

  const renderOptions = options => {
    return (
      options &&
      options.map((item, idx) => {
        return (
          <Option key={idx} value={item.codeName || item.id || item.value}>
            {item.codeName || item.sName || item.userAliasName || item.label}
          </Option>
        )
      })
    )
  }

  const renderItem = item => {
    switch (item.type) {
      case 'select':
        return (
          <Select placeholder={item.placeholder} {...item.props} allowClear>
            {renderOptions(item.options)}
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

  const toggle = () => {
    setExpand(!expand)
  }

  const renderFormActions =
    renderActions ||
    (() => {
      return (
        <Fragment>
          {showMoreField && (
            <Button type="link" onClick={toggle}>
              {expand ? '收起' : '展开'}
            </Button>
          )}
          {showSearch && (
            <Button loading={loading} icon="search" type="primary" onClick={handleSearch}>
              搜索
            </Button>
          )}
          {showReset && <Button onClick={handleReset}>重置</Button>}
        </Fragment>
      )
    })

  return (
    <div className={cn(`hum-search-form`, className)}>
      <Form
        layout="inline"
        className="form-fields"
        style={{ height: expand ? `${offsetHeight - 10}px` : '30px' }}
        onSubmit={handleSearch}
      >
        <div ref={fieldRef}>
          {formFields.map((item, index) => {
            return (
              <FormItem key={`hum-form${index}`}>
                {getFieldDecorator(item.dataIndex, item.formOptions || {})(renderItem(item))}
              </FormItem>
            )
          })}
        </div>
        <Button style={{ display: 'none' }} htmlType="submit" />
      </Form>
      <div className="form-actions">{renderFormActions()}</div>
    </div>
  )
}

export default Form.create()(SearchForm)
