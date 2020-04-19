import React, { useEffect, useState } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import CryptoJS from 'crypto-js'

import axios from 'common/axios'

import './index.less'

const FormItem = Form.Item

const Changepwd = props => {
  const { form } = props

  const { getFieldDecorator, validateFields } = form

  const [loginPending, setLoginPending] = useState(false)
  const [changeStatus, setChangeStatus] = useState(false)

  useEffect(() => {
    return () => {}
  }, [])

  const handleLogin = e => {
    e.preventDefault()
    validateFields((err, values) => {
      const { newPwd, confirmPwd } = values

      if (newPwd !== confirmPwd) {
        message.error('新密码和确认密码不一致')
        return
      }

      if (!err) {
        setLoginPending(true)
        values.userPassword = CryptoJS.MD5(values.userPassword).toString()
        values.newPwd = CryptoJS.MD5(values.newPwd).toString()
        values.confirmPwd = CryptoJS.MD5(values.confirmPwd).toString()
        axios
          .post('/user/changepwd', values)
          .then(rst => {
            setLoginPending(false)
            setChangeStatus(true)
            message.success('修改密码成功')
          })
          .catch(res => {
            setLoginPending(false)
            message.error(res.message)
          })
      }
    })
  }

  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 }
  }

  return (
    <div className="page-changepwd">
      <div className="b-left">修改密码</div>
      <div className="b-right">
        <Form onSubmit={handleLogin}>
          <FormItem className="form-item" label="账号" {...formLayout}>
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
          <FormItem className="form-item" label="原始密码" {...formLayout}>
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
          <FormItem className="form-item" label="新密码" {...formLayout}>
            {getFieldDecorator('newPwd', {
              rules: [{ required: true, message: '请输入新密码' }]
            })(
              <Input
                className="login-input"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入新密码"
              />
            )}
          </FormItem>
          <FormItem className="form-item" label="确认密码" {...formLayout}>
            {getFieldDecorator('confirmPwd', {
              rules: [{ required: true, message: '请输入确认密码' }]
            })(
              <Input
                className="login-input"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入确认密码"
              />
            )}
          </FormItem>

          {changeStatus ? (
            <Button
              size="large"
              onClick={() => {
                location.href = window.location.origin + '/login'
              }}
              className="login-form-button"
            >
              去登录
            </Button>
          ) : (
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loginPending}
              className="login-form-button"
            >
              登录
            </Button>
          )}
        </Form>
      </div>
      <p className="point" />
    </div>
  )
}

export default Form.create()(Changepwd)
