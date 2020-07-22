// 获取用户列表
const UserDao = require('daos/user')

module.exports = async ctx => {
  const userDao = new UserDao()

  const { userName, userPassword, newPwd } = ctx.request.body

  const resData = await userDao.findOne({
    where: {
      userName
    }
  })

  // 判断用户是否存在
  if (resData) {
    // 判断前端传递的用户密码是否与数据库密码一致
    if (resData.userPassword === userPassword) {
      // 用户token
      const res = await userDao.update(
        {
          userPassword: newPwd
        },
        {
          where: {
            id: resData.id
          }
        }
      )
      ctx.session = null
      ctx.body = {
        code: 0,
        data: res,
        message: '修改成功'
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
