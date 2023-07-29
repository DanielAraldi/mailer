import { Request, Response } from 'express';
import { ApiError, PromiseHandler, SendEmailService } from './MailProtocols';

export default {
  async create(request: Request, response: Response) {
    const responseHandler = await PromiseHandler(
      SendEmailService(request.body)
    );

    if (responseHandler instanceof Error) {
      throw new ApiError(
        'Algo ocorreu de errado ao enviar o e-mail, por favor verifique os dados que foram inseridos!',
        400
      );
    }

    response.status(200).json({ message: 'Email enviado', responseHandler });
  },
};
