import { SendEmail } from '../../domain';

export class SendMailSpy implements SendEmail {
  public result: boolean = true;
  public mail: SendEmail.Params;

  async send(mail: SendEmail.Params): Promise<SendEmail.Result> {
    this.mail = mail;
    return await Promise.resolve(this.result);
  }
}
