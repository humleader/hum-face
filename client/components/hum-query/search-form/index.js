import React, { useState, Fragment, useEffect, useRef } from 'react'
import cn from 'classnames'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import debounce from 'lodash/debounce'

const FormItem = Form.Item
const { Option, OptGroup } = Select
const { MonthPicker, RangePicker } = DatePicker

const SearchForm = props => {
  const {
    className,
    loading,
    doSearch,
    params,
    searchParams,
    formFields = [],
    form,
    renderActions,
    showSearch = true,
    showReset = true
  } = props

  const { getFieldDecorator, getFieldsValue, resetFields } = form

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
    doSearch({ ...searchParams, ...values, pageIndex: 1 })
  }

  const handleReset = () => {
    resetFields()
    doSearch(params)
  }

  const renderOptions = options => {
    return (
      options &&
      options.map((item, idx) => {
        if (item.children) {
          return (
            <OptGroup key={`${item.value}${idx}`} label={item.name}>
              {item.children.map(res => {
                return (
                  <Option key={res.id} value={res.id}>
                    {res.name}
                  </Option>
                )
              })}
            </OptGroup>
          )
        }
        return (
          <Option key={idx} value={item.value}>
            {item.label}
          </Option>
        )
      })
    )
  }

  const renderItem = item => {
    switch (item.type) {
      case 'select':
        return (
          <Select
            showSearch
            optionFilterProp="children"
            placeholder={item.placeholder}
            allowClear
            {...item.props}
          >
            {renderOptions(item.options)}
          </Select>
        )
      case 'month':
        return <MonthPicker placeholder={item.placeholder} allowClear {...item.props} />
      case 'date':
        return (
          <DatePicker
            placeholder={item.placeholder}
            format="YYYY-MM-DD"
            allowClear
            {...item.props}
          />
        )
      case 'rangePicker':
        return (
          <RangePicker
            placeholder={item.placeholder}
            format="YYYY-MM-DD"
            allowClear
            {...item.props}
          />
        )
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
