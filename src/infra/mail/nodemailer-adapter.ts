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
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
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
    return await this.#transporter.sendMail({
      from,
      to,
      text: message,
      subject: hasUsername ? `${title} - ${username}` : title,
    });
  }
}
