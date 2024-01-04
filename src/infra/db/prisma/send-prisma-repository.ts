import { PrismaHelper } from './prisma-helper';
import { SendEmailRepository } from '../../../data/protocols/db';

export class SendPrismaRepository implements SendEmailRepository {
  async send(
    data: SendEmailRepository.Params
  ): Promise<SendEmailRepository.Result> {
    const mailTable = await PrismaHelper.getTable('mail');

    const dataTo = data.to;
    const result = await mailTable.create({
      data: {
        ...data,
        to: {
          create: dataTo.map(email => ({
            email,
          })),
        },
      },
    });
    return !!result.id;
  }
}
