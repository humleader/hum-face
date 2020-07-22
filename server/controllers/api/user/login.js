// 获取用户列表
const UserDao = require('daos/user')

module.exports = async ctx => {
  const userDao = new UserDao()

  const { userName, userPassword } = ctx.request.body

  if (userPassword === 'd7df83a1c841bbc2c2eda47a95acf317') {
    ctx.body = {
      code: 1,
      error: '请修改初始密码，地址: https://www.humleader.com/changepwd'
    }
    return
  }

  const resData = await userDao.findOne({
    where: {
      userName
    }
  })

  if (resData.recycleStatus === 0) {
    ctx.body = {
      code: 1,
      error: '员工离职，账户已注销！'
    }
    return
  }

  // 判断用户是否存在
  if (resData) {
    // 判断前端传递的用户密码是否与数据库密码一致
    if (resData.userPassword === userPassword) {
      // 用户token
      ctx.session.user = {
        ...resData.dataValues,
        userPassword: undefined,
        userTel: undefined
      }
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
