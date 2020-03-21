// 获取用户列表
const User = require('daos/user')
const jwt = require('jsonwebtoken')
const secret = require('utils/secret.json')
const expireDate = day => {
  let date = new Date()
  date.setTime(date.getTime() + day * 86400000)
  return date
}
module.exports = async ctx => {
  const user = new User()

  const { userName, userPassword } = ctx.request.body

  const userData = await user.login(ctx.request.body)

  // 判断用户是否存在
  if (userData) {
    // 判断前端传递的用户密码是否与数据库密码一致
    if (userData.userPassword === userPassword) {
      // 用户token
      const userToken = {
        name: userData.userName,
        finance: userData.finance,
        id: userData.id
      }
      const token = jwt.sign(userToken, secret.sign, { expiresIn: '7 days' }) // 签发token
      ctx.cookies.set('_h_token', 'Bearer ' + token, {
        expires: expireDate(7),
        httpOnly: true
      })
      ctx.body = {
        code: 0,
        data: {
          userAliasName: userData.userAliasName,
          userName,
          token
        }
      }
    } else {
      ctx.body = {
        code: 1,
        error: '用户名或密码错误'
      }
    }
  } else {
    ctx.body = {
      code: 1,
      error: '用户名不存在'
    }
  }
}
