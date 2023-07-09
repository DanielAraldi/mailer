import {
  ApiError,
  PromiseHandler,
  SendEmailService,
} from './MailProtocols';

export default {
  async create(request, response) {
    let err, informations = null;

    [err, informations] = await PromiseHandler(
      SendEmailService(request.body)
    );

    if (err)
      throw new ApiError(
        'Algo ocorreu de errado ao enviar o e-mail, por favor verifique os dados que foram inseridos!',
        400
      );

    response.status(200).json({ message: 'Email enviado', informations });
  },
};
