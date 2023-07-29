import { createTransport } from 'nodemailer';

import { ApiError } from '../errors/ApiError';
import { PromiseHandler } from '../helpers/PromiseHandler';
import { type SendEmail } from '../@types';

export const SendEmailService = async (mail: SendEmail) => {
  const transporter = createTransport({
    name: 'smtp.gmail.com',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: mail.login,
      pass: mail.password,
    },
  });

  const fromPeople = `${mail.username} ${mail.from}`.trim();

  const responseHandler = await PromiseHandler(
    transporter.sendMail({
      html: `<body><p>${mail.title + ' - ' + mail.message}</p></body>`,
      from: fromPeople,
      to: mail.to,
      subject: mail.title,
      text: mail.message,
    })
  );

  if (responseHandler instanceof Error) {
    throw new ApiError(
      'Algo ocorreu de errado ao enviar o e-mail, por favor verifique os dados que foram inseridos!',
      400
    );
  }

  return responseHandler;
};
