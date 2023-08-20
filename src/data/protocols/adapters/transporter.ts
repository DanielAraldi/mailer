import { MailModel } from '../../../domain';

export interface Transporter {
  create: (mail: MailModel) => void;
}
