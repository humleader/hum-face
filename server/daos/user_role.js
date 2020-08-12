const UserRoleService = require('services/user_role')
const userRoleService = new UserRoleService()
module.exports = class {
  bulkCreate(params, options = {}) {
    const { sequelize } = global.M
    const { deleteParams, list } = params
    return sequelize.transaction(async t => {
      await userRoleService.destroy({ transaction: t, ...deleteParams })
      await userRoleService.bulkCreate(list, { transaction: t, ...options })
    })
  }
}
