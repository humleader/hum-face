const UserService = require('services/user')
const userService = new UserService()
module.exports = class {
  findAndCountAll(params) {
    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return userService.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
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
