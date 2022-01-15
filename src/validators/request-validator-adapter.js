import * as yup from 'yup';

import { ApiError } from '../errors/ApiError';

export const RequestValidatorAdapter = async body => {
  const schema = yup.object().shape({
    host: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .required('Campo Host é obrigatório!')
      .typeError('Host deve ser do tipo String')
      .default('smtps.uhserver.com'),
    port: yup
      .number()
      .positive()
      .integer()
      .strict(true)
      .default(465)
      .required('Campo Porta é obrigatório!'),
    userName: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .default('')
      .max(250, 'Limite de 250 caracteres'),
    from: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .email()
      .required('Campo De é obrigatório!')
      .typeError('E-mail deve ser do tipo String'),
    to: yup
      .array(
        yup
          .string()
          .ensure()
          .trim()
          .strict(true)
          .email()
          .required('Campo Para é obrigatório!')
          .typeError('E-mail deve ser do tipo String')
      )
      .strict(true)
      .required('Campo Para é obrigatório!')
      .typeError('Campo Para deve ser do tipo Array de String'),
    title: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .default('')
      .max(300, 'Limite de 300 caracteres'),
    message: yup.string().trim().strict(true).default(''),
    login: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .max(250, 'Limite de 250 caracteres')
      .required('Campo Login é obrigatório')
      .typeError('Login deve ser do tipo String'),
    password: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .required('Campo Senha é obrigaótio!')
      .typeError('Password deve ser do tipo String'),
    files: yup
      .array()
      .of(
        yup.object().shape({
          fileName: yup
            .string()
            .ensure()
            .trim()
            .strict(true)
            .min(1, 'Deve ser informado um nome para o arquivo')
            .required('Campo nome do arquivo é obrigatório!')
            .typeError('O arquivo/imagem deve ter um nome'),
          data: yup
            .string()
            .ensure()
            .trim()
            .strict(true)
            .required('Os dados em Base64 da imagem são obrigatórios!')
            .typeError('Deve ser informado os dados em Base64 da imagem'),
        })
      )
      .strict(true)
      .max(10, 'Limite máximo de 10 arquivos!')
      .typeError('Pode ser enviado apenas até 10 arquivos'),
  });

  try {
    await schema.validate(body, { abortEarly: false });
  } catch (err) {
    const { inner } = err;
    const message = inner.map(({ name, value, type, errors }) => {
      return { name, value, type, errors };
    });
    console.error(err);
    throw new ApiError(message);
  }
};
