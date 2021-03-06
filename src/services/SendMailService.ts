import nodemailer, { Transporter } from 'nodemailer'
import { resolve } from 'path'
import fs from 'fs'
import handlebars from 'handlebars'
class SendMailService {
  private client: Transporter
  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'kadin.cassin77@ethereal.email',
          pass: 'fvSx84KfDrFx5UTEQh'
        }
      });

      this.client = transporter;
    })
  }

  async execute(to: string, subject: string, variables: object, path: string) {

    const templateFileContent = fs.readFileSync(path).toString("utf8");
    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables)

    const message = await this.client.sendMail({
      to, subject, html, from: "NPS <noreplay@nps.com.br>"
    })

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));


  }
}
export default new SendMailService()