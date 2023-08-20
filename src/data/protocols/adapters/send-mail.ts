import { MailModel } from '../../../domain';

export interface SendMail {
  send: (mail: MailModel) => Promise<boolean>;
}
