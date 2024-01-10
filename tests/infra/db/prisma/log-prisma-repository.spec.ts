import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PrismaHelper, LogPrismaRepository } from '../../../../src/infra/db';
import { LogErrorRepository } from '../../../data/protocols/db/log';

let errorTable: PrismaClient['errors'];

const makeSut = (): LogErrorRepository => new LogPrismaRepository();

describe('LogPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect();
  });

  afterAll(async () => {
    await PrismaHelper.disconnect();
  });

  beforeEach(async () => {
    errorTable = await PrismaHelper.getTable('errors');
    await errorTable.deleteMany();
  });

  describe('logError()', () => {
    test('Should create an error log on success', async () => {
      const sut = makeSut();
      await sut.logError(faker.word.words(10));
      const count = await errorTable.count();
      expect(count).toBe(1);
    });
  });
});
