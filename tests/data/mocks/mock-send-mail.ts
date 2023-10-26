import { MailModel } from '../../domain';
import { SendMail, Transporter } from '../protocols/adapters';
import { Transporter as NodemailerTransporter } from 'nodemailer';

export class NodemailerAdapterSpy implements SendMail, Transporter {
  public mail: MailModel;
  #transporter: NodemailerTransporter = null;

  async send(mail: MailModel): Promise<boolean> {
    this.mail = mail;
    return await Promise.resolve(true);
  }

  create(): void {}
}
