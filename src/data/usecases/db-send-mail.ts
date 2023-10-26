import { SendEmail } from '../../domain';
import { SendMail, Transporter } from '../protocols/adapters';

export class DbSendMail implements SendEmail {
  constructor(
    private readonly transporter: Transporter,
    private readonly sendMail: SendMail
  ) {}

  async send(mail: SendEmail.Params): Promise<SendEmail.Result> {
    this.transporter.create(mail);
    return await this.sendMail.send(mail);
  }
}
