const nodemailer = require('nodemailer')
const config = require('utils/config')

const { host, port, auth } = config.nodemailer

const transporter = nodemailer.createTransport({
  host: host,
  port: port, // SMTP 端口
  secureConnection: true,
  auth: {
    user: auth.user,
    // smtp授权码
    pass: auth.pass
  }
})
module.exports = transporter
