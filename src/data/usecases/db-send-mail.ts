import { SendEmail } from '../../domain';
import { SendMail, Transporter } from '../protocols/adapters';
import { SendEmailRepository } from '../protocols/db';

export class DbSendMail implements SendEmail {
  constructor(
    private readonly transporter: Transporter,
    private readonly sendMail: SendMail,
    private readonly sendPrismaRepository: SendEmailRepository
  ) {}

  async send(mail: SendEmail.Params): Promise<SendEmail.Result> {
    this.transporter.create(mail);
    const wasSent = await this.sendMail.send(mail);
    if (wasSent) {
      const { from, message, title, to, username } = mail;
      const data = Object.assign({}, { from, message, title, to, username });
      return await this.sendPrismaRepository.send(data);
    }
    return false;
  }
}
