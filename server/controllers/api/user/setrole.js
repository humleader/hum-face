// 获取用户列表
const UserRoleDao = require('daos/user_role')

module.exports = async ctx => {
  const userRoleDao = new UserRoleDao()

  const { id, roles, UserRole } = ctx.request.body
  const list = roles.map(item => {
    return {
      roleId: item,
      userId: id
    }
  })

  const resData = await userRoleDao.bulkCreate({
    list,
    deleteParams: {
      where: {
        id: UserRole.map(res => res.id)
      }
    }
  })
  ctx.body = {
    code: 0,
    data: resData
  }
}
