import { SendEmail } from '../../../../domain/usecases/send';

export interface SendEmailRepository {
  send: (data: SendEmailRepository.Params) => Promise<SendEmailRepository.Result>;
}

export namespace SendEmailRepository {
  export type Params = SendEmail.Params;
  export type Result = boolean;
}
