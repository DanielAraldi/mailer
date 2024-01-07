import { MailModel, SendEmail } from '../../domain';
import { SendFailedError } from '../errors';
import { badRequest, noContent, serverError } from '../helpers';
import { Controller, HttpResponse, Validation } from '../protocols';

export class SendMailController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly sendEmail: SendEmail
  ) {}

  async handle(request: SendMailController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);

      const wasSent = await this.sendEmail.send(request);
      return wasSent ? noContent() : badRequest(new SendFailedError());
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace SendMailController {
  export type Request = MailModel;
}
