import {
  ApiError,
  PromiseHandler,
  RequestValidatorAdapter,
  SendEmailService,
  constructFileArray,
} from './MailProtocols';

export default {
  async create(request, response) {
    let err,
      informations,
      fileArray = null;

    const {
      userName,
      from,
      to,
      title,
      message,
      login,
      password,
      files,
    } = request.body;

    [err, informations] = await PromiseHandler(
      RequestValidatorAdapter(request.body)
    );

    if (err) throw new ApiError(err.message, 400);

    if (files && files.length > 0) fileArray = constructFileArray(files);

    [err, informations] = await PromiseHandler(
      SendEmailService(
        userName,
        from,
        to,
        title,
        message,
        fileArray,
        login,
        password
      )
    );

    if (err)
      throw new ApiError(
        'Algo ocorreu de errado ao enviar o e-mail, por favor verifique os dados que foram inseridos!',
        400
      );

    response.status(200).json({ message: 'Email enviado', informations });
  },
};
