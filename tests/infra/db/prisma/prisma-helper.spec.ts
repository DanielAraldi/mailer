import { PrismaHelper } from '../../../../src/infra/db';

describe('PrismaHelper', () => {
  beforeAll(async () => await PrismaHelper.connect());
  afterAll(async () => await PrismaHelper.disconnect());

  describe('connect()', () => {
    test('Should be able connect to prisma client', async () => {
      const isConnected = PrismaHelper.isConnected;
      expect(isConnected).toBeTruthy();
    });
  });

  describe('disconnect()', () => {
    test('Should not be able connect to prisma client', async () => {
      await PrismaHelper.disconnect();
      const isConnected = PrismaHelper.isConnected;
      expect(isConnected).toBeFalsy();
    });
  });
});
