import {
  createTransport,
  Transporter as NodemailerTransporter,
} from 'nodemailer';

import { SendMail, Transporter } from '../../data/protocols/adapters';
import { MailModel } from '../../domain';

export class NodemailerAdapter implements SendMail, Transporter {
  #transporter: NodemailerTransporter = null;

  create(mail: MailModel): void {
    const { login, password } = mail;
    this.#transporter = createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: false,
      auth: {
        user: login,
        pass: password,
      },
    });
  }

  async send(mail: MailModel): Promise<boolean> {
    if (!this.#transporter) return false;

    const { from, to, message, title, username } = mail;
    const hasUsername = username && !String(username).trim();
    const subject = hasUsername ? `${title} - ${username}` : title;
    return await this.#transporter.sendMail({
      from,
      to,
      subject,
      html: [
        '<div style="min-height: 100%; font-family: sans-serif; background-color: #f5f5f5; color: #111; padding: 20px;">',
        `<p style="font-size: 20px; font-weight: 500; mso-line-height-rule: exactly; text-align: center; margin-bottom: 16px;">${title}</p>`,
        `<p style="font-size: 16px;">${message}</p>`,
        '</div>',
      ].join('\n'),
    });
  }
}
