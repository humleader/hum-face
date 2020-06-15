const UserService = require('services/user')
const userService = new UserService()
module.exports = class {
  async findAndCountAll(params) {
    const { where, pageIndex = 1, pageSize = 20, ...rest } = params

    const { count, rows } = await userService.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+pageIndex - 1) * +pageSize,
      ...rest
    })
    return {
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total: count,
      list: rows || []
    }
  }

  findAll(params) {
    return userService.findAll(params)
  }

  create(params, options = {}) {
    return userService.create(params, options)
  }

  findOne(params) {
    return userService.findOne(params)
  }

  update(params, options = {}) {
    return userService.update(params, options)
  }

  destroy(params) {
    return userService.destroy(params)
  }
}
