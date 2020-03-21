const removePrefix = require('middlewares/remove-prefix')

describe('middlewares/remove-prefix', () => {
  let ctx
  let prefix
  let next = jest.fn()

  beforeEach(() => {
    prefix = '/xxx'
    ctx = {
      path: '/xxx/query'
    }
  })

  it('do nothing when prefix is empty', async () => {
    await removePrefix()(ctx, next)

    expect(ctx.path).toBe(ctx.path)
  })

  it('do nothing when prefix is "/"', async () => {
    await removePrefix('/')(ctx, next)

    expect(ctx.path).toBe(ctx.path)
  })

  it('do nothing when ctx.path not startsWith prefix', async () => {
    await removePrefix('/abc')(ctx, next)

    expect(ctx.path).toBe(ctx.path)
  })

  it('remove prefix when ctx.path startsWith prefix', async () => {
    await removePrefix(prefix)(ctx, next)

    expect(ctx.path).toBe('/query')
  })

  it('return "/" when ctx.path equal prefix', async () => {
    ctx.path = prefix
    await removePrefix(prefix)(ctx, next)

    expect(ctx.path).toBe('/')
  })
})
