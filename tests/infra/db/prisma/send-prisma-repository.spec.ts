import { PrismaClient } from '@prisma/client';
import { PrismaHelper, SendPrismaRepository } from '../../../../src/infra/db';
import { SendEmailRepository } from '../../../../src/data/protocols/db';
import { mockSendMailParams } from '../../../../tests/domain/mocks';

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
      const sendMailParams = mockSendMailParams();
      const isValid = await sut.send(sendMailParams);
      expect(isValid).toBe(true);
    });
  });
});
