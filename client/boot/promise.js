// 使用 bluebird 替换默认的 Promise

import Promise from 'bluebird'

Promise.config({ warnings: false, longStackTraces: true })

window.Promise = Promise
require('babel-runtime/core-js/promise').default = Promise
