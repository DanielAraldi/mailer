import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { faker } from '@faker-js/faker';
import { PrismaHelper } from '../../../src/infra/db';
import { getInstance } from '../mocks';

let app: FastifyInstance;
let mailTable: PrismaClient['mail'];

describe('Send Mail Routes', () => {
  beforeAll(async () => {
    app = await getInstance();
    await PrismaHelper.connect();
  });

  afterAll(async () => await PrismaHelper.disconnect());

  beforeEach(async () => {
    mailTable = await PrismaHelper.getTable('mail');
    await mailTable.deleteMany();
  });

  describe('POST /send', () => {
    test('Should return 400 if from property is an incorrect email', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/send',
        body: {
          from: faker.lorem.word(),
          to: [faker.internet.email()],
          title: faker.lorem.words(),
          message: faker.lorem.paragraph(),
          username: faker.internet.userName(),
          login: faker.internet.userName(),
          password: faker.internet.password(),
        },
      });

      expect(response.body).toBeTruthy();
      expect(response.body).toEqual('{"error":"Invalid param: from"}');
      expect(response.statusCode).toBe(400);
    });
  });
});
