import { SendMail, Transporter } from '../../data/protocols/adapters';
import { MailModel } from '../../domain';

export class NodemailerAdapter implements SendMail, Transporter {
  public transporter;

  create(): void {
    this.transporter = null;
  }

  async send(mail: MailModel): Promise<boolean> {
    if (!this.transporter) return await Promise.resolve(false);
    return await Promise.resolve(true);
  }
}
