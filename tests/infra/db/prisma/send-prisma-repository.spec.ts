import { PrismaClient } from '@prisma/client';
import { PrismaHelper, SendPrismaRepository } from '../../../../src/infra/db';
import { SendEmailRepository } from '../../../../src/data/protocols/db';
import { mockMailDatabaseParams } from '../../mocks';

let mailTable: PrismaClient['mail'];

const makeSut = (): SendEmailRepository => new SendPrismaRepository();

describe('SendPrismaRepository', () => {
  beforeAll(async () => {
    await PrismaHelper.connect();
  });

  afterAll(async () => {
    await PrismaHelper.disconnect();
  });

  beforeEach(async () => {
    mailTable = await PrismaHelper.getTable('mail');
    await mailTable.deleteMany();
  });

  describe('send()', () => {
    test('Should return true if the email was sent.', async () => {
      const sut = makeSut();
      const mailDatabaseParams = mockMailDatabaseParams();
      const isValid = await sut.send(mailDatabaseParams);
      expect(isValid).toBe(true);
    });
  });
});
