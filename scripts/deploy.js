/* eslint-disable no-console */

'use strict'

const execa = require('execa')
const Promise = require('bluebird')

console.log('start deploying...')

const startTime = Date.now()
const env = process.env.NODE_ENV || 'development'

const pkgName = process.env.npm_package_name

Promise.resolve()
  .then(async () => {
    // 启动开发服务器
    if (env === 'development') {
      const devServer = `${pkgName}-dev-server`
      await execa.shell(`pm2 startOrRestart process.json --only ${devServer}`).then(ret => {
        console.log(ret.stdout)
      })
    }

    // 启动 Node 服务
    await execa.shell(`pm2 startOrRestart process.json --only ${pkgName}-${env}`).then(ret => {
      console.log(ret.stdout)
    })
    return Promise.resolve()
  })
  .then(() => {
    const time = (Date.now() - startTime) / 1000
    console.log(`deploy success in ${time.toFixed(2)} s`)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
