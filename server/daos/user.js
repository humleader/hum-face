module.exports = class {
  findAndCountAll(params) {
    const { User } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return User.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { User } = global.M

    return User.findAll(params)
  }

  create(params, options = {}) {
    const { User } = global.M

    return User.create(params, options)
  }

  findOne(params) {
    const { User } = global.M

    return User.findOne(params)
  }

  update(params, options = {}) {
    const { User } = global.M

    return User.update(params, options)
  }

  destroy(params) {
    const { User } = global.M

    return User.destroy(params)
  }
}
