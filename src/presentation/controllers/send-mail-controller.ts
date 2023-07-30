import { MailModel, SendEmail } from '../../domain';
import { Controller, HttpResponse } from '../protocols';

export class SendMailController implements Controller {
  constructor(private readonly sendEmail: SendEmail) {}

  async handle(request: SendMailController.Request): Promise<HttpResponse> {
    await this.sendEmail.send(request);
    return null;
  }
}

export namespace SendMailController {
  export type Request = MailModel;
}
