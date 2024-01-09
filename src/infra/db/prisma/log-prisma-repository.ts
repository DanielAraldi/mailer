import { PrismaHelper } from './prisma-helper';
import { LogErrorRepository } from '../../../data/protocols/db/log';

export class LogPrismaRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorTable = await PrismaHelper.getTable('errors');
    await errorTable.create({
      data: {
        stack,
      },
    });
  }
}
