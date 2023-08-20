import { SendEmail } from '../../domain';
import { NodemailerAdapter } from '../../infra/adapters';

export class DbSendMail implements SendEmail {
  constructor(private readonly nodemailerAdapter: NodemailerAdapter) {}

  async send(mail: SendEmail.Params): Promise<SendEmail.Result> {
    this.nodemailerAdapter.create(mail);
    return await this.nodemailerAdapter.send(mail);
  }
}
