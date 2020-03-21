import React, { useEffect, useState } from 'react'
import { Form, Icon, Input, Button, message as $message } from 'antd'

import './index.less'

const FormItem = Form.Item

const Login = props => {
  const { getFieldDecorator } = props.form

  const [loginPending, setLoginPending] = useState(false)

  useEffect(() => {
    return () => {}
  }, [])

  const handleLogin = e => {
    const { login, setUserName, setUserAliasName } = props.action
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoginPending(true)
        login(values)
          .then(rst => {
            localStorage.setItem('userName', values.userName)
            localStorage.setItem('_h_token', rst.token)
            localStorage.setItem('userAliasName', rst.userAliasName)
            setUserName(values.userName)
            setUserAliasName(rst.userAliasName)
            location.href = '/face/home'
          })
          .catch(res => {
            setLoginPending(false)
            $message.error(res.message)
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
