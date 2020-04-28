const UserService = require('services/user')
module.exports = class {
  findAndCountAll(params) {
    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return UserService.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    return UserService.findAll(params)
  }

  create(params, options = {}) {
    return UserService.create(params, options)
  }

  findOne(params) {
    return UserService.findOne(params)
  }

  update(params, options = {}) {
    return UserService.update(params, options)
  }

  destroy(params) {
    return UserService.destroy(params)
  }
}
