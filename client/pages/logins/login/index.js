import React, { useEffect, useState } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import CryptoJS from 'crypto-js'

import axios from 'common/axios'

import './index.less'

const FormItem = Form.Item

const Login = props => {
  const { form } = props

  const { getFieldDecorator, validateFields } = form

  const [loginPending, setLoginPending] = useState(false)

  const searchToObject = search => {
    const pairs = search.substring(1).split('&')
    const obj = {}
    let pair
    let i
    for (i in pairs) {
      if (pairs[i] === '') {
        continue
      }

      pair = pairs[i].split('=')
      obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
    }
    return obj
  }

  useEffect(() => {
    return () => {}
  }, [])

  const makeForm = params => {
    const url = searchToObject(location.search)

    params = {
      ...url,
      ...params
    }

    const form = document.createElement('form')
    form.id = 'form-jump'
    form.name = 'form-jump'
    // 添加到 body 中
    document.body.appendChild(form)
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        // 创建一个输入
        const input = document.createElement('input')
        input.type = 'text'
        input.name = key
        input.value = params[key]
        form.appendChild(input)
      }
    }

    // form 的提交方式
    form.method = 'GET'
    // form 提交路径
    form.action = '/login'
    form.submit()
    document.body.removeChild(form)
  }

  const handleLogin = e => {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        setLoginPending(true)
        values.userPassword = CryptoJS.MD5(values.userPassword).toString()
        axios
          .post('/user/login', values)
          .then(rst => {
            makeForm(values)
          })
          .catch(res => {
            setLoginPending(false)
            message.error(res.message)
          })
      }
    })
  }

  return (
    <div className="page-login">
      <div className="login-box">
        <div className="b-left">
          <p className="logo" />
          <p className="name">禾优曼管理系统</p>
        </div>
        <div className="b-right">
          <div className="login-title">
            <span>登录</span>
            /Login
          </div>
          <Form onSubmit={handleLogin} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入账号' }]
              })(
                <Input
                  className="login-input"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入账号"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('userPassword', {
                rules: [{ required: true, message: '请输入密码' }]
              })(
                <Input
                  className="login-input"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={loginPending}
                className="login-form-button"
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
        <p className="point" />
      </div>
    </div>
  )
}

export default Form.create()(Login)
