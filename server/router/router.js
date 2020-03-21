const Router = require('koa-router')
const appConfig = require('utils/config')
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const aliOss = require('ali-oss')
var textract = require('textract')
var todocx = require('./todocx')
// var mime = require('mime')
// const mammoth = require('mammoth')

const { apiPrefix, baseURI, accessKeyId, accessKeySecret } = appConfig

var store = aliOss({
  accessKeyId: accessKeyId,
  accessKeySecret: accessKeySecret,
  bucket: 'anthonyli',
  // bucket: 'humtest',
  region: 'oss-cn-shanghai'
})

// 路由定义
const router = new Router({ prefix: baseURI ? baseURI + apiPrefix : apiPrefix })

const controllersDir = path.join(__dirname, '../controllers/api')
glob
  .sync('**/*.js', {
    cwd: controllersDir
  })
  .forEach(ctrPath => {
    ctrPath = ctrPath.replace(/([/\\])?\.js$/, '')
    const controller = require(path.join(controllersDir, ctrPath))
    router.all('/' + ctrPath, controller)
  })

router.post('/regions/query', async ctx => {
  const path = require('../../mock/regions/query')

  ctx.body = {
    code: 0,
    data: path.objects
  }
})

router.post('/upload', async ctx => {
  let res
  try {
    const stream = fs.createReadStream(ctx.request.files.file.path)
    const result = await store.putStream(`document/${ctx.request.files.file.name}`, stream)
    res = {
      code: 0,
      data: result.url
    }
  } catch (error) {
    res = {
      code: 1,
      error: '上传文件失败！'
    }
  }
  fs.unlinkSync(ctx.request.files.file.path)

  ctx.body = res
})

router.post('/autoupload', async ctx => {
  let res
  const paths = ctx.request.files.file.path
  try {
    const stream = fs.createReadStream(paths)
    const fBuffer = fs.readFileSync(paths)
    const result = {}
    const fileFun = (mime, buffer) => {
      return new Promise((resolve, reject) => {
        try {
          textract.fromBufferWithMime(mime, buffer, (error, text) => {
            if (error) {
              console.log(error)
              resolve(error)
              return
            }
            const canName = text.match(/姓名： (.*?) /)
            const canPhone = text.match(/手机号码： (.*?) /)
            const canSex = text.match(/性别： (.*?) /)
            const canBirthday = text.match(/年龄： (.*?) /)
            const canEducation = text.match(/教育程度： (.*?) /)
            const canEmail = text.match(/电子邮件： (.*?) /)
            const canCity = text.match(/所在地： (.*?) /)
            const canCompany = text.match(/公司名称： (.*?) /)
            const canPosition = text.match(/所任职位： (.*?) /)
            if (canName) {
              result.canName = canName[1]
            }
            if (canPhone) {
              result.canPhone = canPhone[1]
            }
            if (canSex) {
              result.canSex = canSex[1]
            }
            if (canBirthday) {
              result.canBirthday = canBirthday[1]
            }
            if (canEducation) {
              result.canEducation = canEducation[1]
            }
            if (canEmail) {
              result.canEmail = canEmail[1]
            }
            if (canCity) {
              result.canCity = canCity[1]
            }
            if (canCompany) {
              result.canCompany = canCompany[1]
            }
            if (canPosition) {
              result.canPosition = canPosition[1]
            }
            resolve()
          })
        } catch (error) {
          console.log(error)
          resolve(error)
        }
      })
    }
    const results = await store.putStream(`document/${ctx.request.files.file.name}`, stream)
    result.canAttachment = results.url
    const houzui = paths.split('.')
    if (houzui[houzui.length - 1] === 'docx') {
      await fileFun(ctx.request.files.file.type, fBuffer)
    } else if (houzui[houzui.length - 1] === 'doc') {
      const buffer = await todocx(fBuffer)
      await fileFun('text/plain', buffer)
    }

    res = {
      code: 0,
      data: result
    }
  } catch (error) {
    res = {
      code: 1,
      error: '上传文件失败！'
    }
  }
  fs.unlinkSync(ctx.request.files.file.path)

  ctx.body = res
})

module.exports = router
