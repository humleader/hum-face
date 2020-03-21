jest.mock('lib/config', () => ({ baseURI: '/' }))
const EventEmitter = require('events')
const error = require('middlewares/error')

class NoThrowError extends EventEmitter {
  emit(...args) {
    try {
      super.emit.apply(this, args)
    } catch (err) {
      // do nothing
    }
  }
}

const ctx = {
  log: { error: jest.fn() },
  render: jest.fn(),
  url: '/example',
  method: 'GET',
  status: 500,
  message: 'xxx',
  session: {}
}

let app
describe('test error middleware', () => {
  beforeEach(() => {
    app = new NoThrowError()
    app.env = 'development'

    ctx.app = app
    ctx.header = {}
  })

  it('should call next function when no error happens', async () => {
    let middleware = error(app)
    const next = jest.fn()
    await middleware(ctx, next)
    expect(next).toBeCalled()

    app.env = 'test'
    middleware = error(app)
    await middleware(ctx, next)
    expect(next).toBeCalled()
  })

  it('should handle error when error happens in development env', async () => {
    let middleware = error(app)
    const next = jest.fn(() => {
      throw new Error('error')
    })
    await middleware(ctx, next)

    expect(next).toBeCalled()
    expect(ctx.render).toBeCalled()

    ctx.header['x-requested-with'] = 'XMLHttpRequest'
    await middleware(ctx, next)

    expect(next).toBeCalled()
    expect(ctx.body).toEqual({
      code: 1,
      error: 'error'
    })
  })

  it('should handle error when error happens in non-development env', async () => {
    app.env = 'test'
    let middleware = error(app)
    const next = jest.fn(() => {
      throw new Error('error')
    })
    await middleware(ctx, next)

    expect(next).toBeCalled()
    expect(ctx.log.error).toBeCalled()
    expect(ctx.render).toBeCalled()

    ctx.header['x-requested-with'] = 'XMLHttpRequest'
    await middleware(ctx, next)

    expect(next).toBeCalled()
    expect(ctx.render).toBeCalled()
    expect(ctx.body).toEqual({
      code: 1,
      error: 'error'
    })
  })
})
