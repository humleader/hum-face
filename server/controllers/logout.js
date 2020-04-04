module.exports = async ctx => {
  ctx.session = null

  ctx.redirect(`/login`)
}
