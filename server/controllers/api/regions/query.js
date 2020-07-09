module.exports = async ctx => {
  const path = require('../../mock')

  ctx.body = {
    code: 0,
    data: path.objects
  }
}
