import { DbSendMail } from '../../../data/usecases';
import { NodemailerAdapter } from '../../../infra/mail';

export const makeDbSendMail = (): DbSendMail => {
  const nodemailerAdapter = new NodemailerAdapter();
  return new DbSendMail(nodemailerAdapter, nodemailerAdapter);
};
