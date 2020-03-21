const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtphm.qiye.163.com',
  port: 465, // SMTP 端口
  secureConnection: true,
  auth: {
    user: 'hr@humleader.com',
    // smtp授权码
    pass: 'MrqEM5g6AzanPUeq'
  }
})
module.exports = transporter
