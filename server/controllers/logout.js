module.exports = async ctx => {
  ctx.session = null

  const { callbackUrl } = ctx.query

  ctx.redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
}
