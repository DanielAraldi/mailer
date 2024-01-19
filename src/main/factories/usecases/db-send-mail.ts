import { DbSendMail } from '../../../data/usecases';
import { SendPrismaRepository } from '../../../infra/db';
import { NodemailerAdapter } from '../../../infra/mail';

export const makeDbSendMail = (): DbSendMail => {
  const sendPrismaRepository = new SendPrismaRepository();
  const nodemailerAdapter = new NodemailerAdapter();
  return new DbSendMail(
    nodemailerAdapter,
    nodemailerAdapter,
    sendPrismaRepository
  );
};
