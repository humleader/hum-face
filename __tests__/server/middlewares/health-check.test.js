const healthCheck = require('middlewares/health-check')

describe('middlewares/health-check', () => {
  let ctx
  let next

  beforeEach(() => {
    ctx = {
      path: '/check_backend_active.html'
    }
    next = jest.fn()
  })

  it('call next when path not equal "/check_backend_active.html"', async () => {
    ctx.path = '/any'
    await healthCheck()(ctx, next)
    expect(next).toBeCalled()
  })

  it('return "Success!" when path equal "/check_backend_active.html"', async () => {
    await healthCheck()(ctx, next)

    expect(ctx.body).toBe('Success!')
    expect(next).not.toBeCalled()
  })
})
