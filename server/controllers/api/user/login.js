// 获取用户列表
const User = require('daos/user')

module.exports = async ctx => {
  const user = new User()

  const { userName, userPassword } = ctx.request.body

  const userData = await user.findOne({
    where: {
      userName
    }
  })

  // 判断用户是否存在
  if (userData) {
    // 判断前端传递的用户密码是否与数据库密码一致
    if (userData.userPassword === userPassword) {
      // 用户token
      ctx.session.user = userData
      ctx.body = {
        code: 0,
        data: '',
        message: '登录成功'
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
