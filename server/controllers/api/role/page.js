const RoleDao = require('daos/role')
const { Op } = require('sequelize')

module.exports = async ctx => {
  const userDao = new RoleDao()

  const { pageIndex = 1, pageSize = 20, ...rest } = ctx.query

  const filter = {}
  const { userName, userTel, userAliasName } = rest

  if (userName) {
    filter.userName = {
      [Op.like]: `%${userName}%`
    }
  }
  if (userTel) {
    filter.userTel = {
      [Op.like]: `%${userTel}%`
    }
  }

  if (userAliasName) {
    filter.userAliasName = {
      [Op.like]: `%${userAliasName}%`
    }
  }

  const userData = await userDao.findAndCountAll({
    where: {
      ...rest,
      ...filter
    },
    order: [['createTime', 'DESC']],
    pageIndex,
    pageSize
  })

  ctx.body = {
    code: 0,
    data: userData
  }
}
