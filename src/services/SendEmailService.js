import { createTransport } from 'nodemailer';

import { createFileBody } from '../utils';

import { ApiError } from '../errors/ApiError';

import { PromiseHandler } from '../helpers/PromiseHandler';

export const SendEmailService = async (
  userName = '',
  from,
  to,
  title = '',
  message = '',
  fileArray = [],
  login,
  password
) => {
  const transporter = createTransport({
    name: 'smtp.gmail.com',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: login,
      pass: password,
    },
  });

  let files = null;
  if (fileArray === null) fileArray = [];
  if (fileArray.length > 0) files = createFileBody(fileArray);

  const fromPeople = `${userName} ${from}`.trim();

  const [err, informations] = await PromiseHandler(
    transporter.sendMail({
      html: `<body><p>${title + " - " + message}</p></body>`,
      from: fromPeople,
      to: to,
      subject: title,
      text: message,
      attachments: files,
    })
  );

  if (err)
  throw new ApiError(
    'Algo ocorreu de errado ao enviar o e-mail, por favor verifique os dados que foram inseridos!',
    400
    );

  return informations;
};
