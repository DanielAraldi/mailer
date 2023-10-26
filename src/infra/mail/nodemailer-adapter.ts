import {
  createTransport,
  Transporter as NodemailerTransporter,
} from 'nodemailer';

import { SendMail, Transporter } from '../../data/protocols/adapters';
import { MailModel } from '../../domain';

export class NodemailerAdapter implements SendMail, Transporter {
  #transporter: NodemailerTransporter = null;

  create(mail: MailModel): void {
    this.#transporter = createTransport({
      pool: true,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: mail.login,
        pass: mail.password,
      },
    });
  }

  async send(mail: MailModel): Promise<boolean> {
    if (!this.#transporter) return false;

    const isUsername = mail.username && !String(mail.username).trim();
    return await this.#transporter.sendMail({
      from: mail.from,
      to: mail.to,
      text: mail.message,
      subject: isUsername ? `${mail.title} - ${mail.username}` : mail.title,
    });
  }
}
