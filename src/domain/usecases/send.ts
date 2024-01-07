import { MailModel } from '../models';

export interface SendEmail {
  send: (mail: SendEmail.Params) => Promise<SendEmail.Result>;
}

export namespace SendEmail {
  export type Params = MailModel;
  export type Result = boolean;
}
