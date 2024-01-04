import { PrismaHelper } from "./prisma-helper";
import { SendEmailRepository } from "../../../data/protocols/db";

export class SendPrismaRepository implements SendEmailRepository {
  async send(data: SendEmailRepository.Params
  ): Promise<SendEmailRepository.Result> {
    const mailTable = await PrismaHelper.getTable('Mail');

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
    console.log(dataTo);
    console.log(result.id);
    return !!result.id;
  }
}
