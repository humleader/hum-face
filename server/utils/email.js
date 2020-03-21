const signature = require('./signature')

function emailContext(data) {
  const contact =
    data.contact === 'Jurry' ? 'jurry.jiang@humleader.com' : 'carry.zhang@humleader.com'
  const Tel = data.contact === 'Jurry' ? '021-62880071' : '021-62880071'
  const contactName = data.contact === 'Jurry' ? 'Jurry Jiang' : 'Carry Zhang'
  const Mobile = data.contact === 'Jurry' ? '13482883858' : '13033607696'

  const html = `
      <div style="font-family: "Times new Roman", "Microsoft YaHei", "微软雅黑", "宋体", Arial, sans-serif;">
        <div style="font-weight:bold;font-size:14px;color:#1c4a81;margin-bottom: 8px;">
          Dear ${data.englishName},
        </div>
        <div style="font-size:14px;color:#1c4a81;margin-bottom: 8px;">
          This pay-slip is sent out by system , if you have any questions about this
        </div>
        <div style="font-size:14px;color:#1c4a81;margin-bottom: 8px;">
          please contact ${contactName}, her contact information is as below : 
        </div>
        <div style="font-size:14px;color:#1c4a81;">
          Email Address: ${contact}
        </div>
        <div style="font-size:14px;color:#1c4a81;">
          Tel: ${Tel}
        </div>
        <div style="font-size:14px;color:#1c4a81;">
          Mobile: ${Mobile}
        </div>
        ${signature}
      </div>`
  return html
}

module.exports = emailContext
