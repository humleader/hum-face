/* eslint-disable no-console */

'use strict'

const execa = require('execa')
const fs = require('fs-extra')
const yaml = require('js-yaml')
const path = require('path')
const Promise = require('bluebird')

console.log('start deploying...')

const startTime = Date.now()
const env = process.env.NODE_ENV || 'development'
const root = path.join(__dirname, '..')

const appConfigPath = path.join(root, `config/${env}.app.yaml`)

const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath))

const appName = appConfig.appCode.toLowerCase()

Promise.resolve()
  .then(async () => {
    // 启动 Node 服务
    await execa.shell(`pm2 startOrRestart process.json --only ${appName}-${env}`).then(ret => {
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
