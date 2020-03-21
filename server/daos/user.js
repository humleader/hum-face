module.exports = class {
  async findOrSave(opts = {}) {
    return global.M.User.findOrCreate({
      where: {
        userName: opts.userName
      },
      defaults: {
        userName: opts.userName
      }
    })
  }

  // 获取用户列表
  async getUserList(filter) {
    return global.M.User.findAll({
      where: {
        ...filter
      }
    })
  }

  async getUserById(userName) {
    return global.M.User.findOne({
      where: {
        userName
      }
    })
  }

  async login(params) {
    return global.M.User.findOne({
      where: {
        userName: params.userName
      }
    })
  }
}
