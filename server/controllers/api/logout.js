const { baseURI } = require('utils/config')

module.exports = async ctx => {
  ctx.session = null

  ctx.redirect(`${baseURI}/login`)
}
