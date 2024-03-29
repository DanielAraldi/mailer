import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { faker } from '@faker-js/faker';
import { PrismaHelper } from '../../../src/infra/db';
import { getInstance, getMailPassword, getMailUsername } from '../mocks';

let app: FastifyInstance;
let mailTable: PrismaClient['mail'];

describe('Send Mail Routes', () => {
  beforeAll(async () => {
    app = await getInstance();
    await PrismaHelper.connect();
  }, 30000);

  afterAll(async () => {
    await PrismaHelper.disconnect();
  }, 30000);

  beforeEach(async () => {
    mailTable = await PrismaHelper.getTable('mail');
    await mailTable.deleteMany();
  });

  describe('POST /send', () => {
    test('Should return 400 if "from" property is an incorrect email', async () => {
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

      expect(response.body).toEqual('{"error":"Invalid param: from"}');
      expect(response.statusCode).toBe(400);
    });

    test('Should return 400 if "to" property is blank', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/send',
        body: {
          from: faker.internet.email(),
          to: [],
          title: faker.lorem.words(),
          message: faker.lorem.paragraph(),
          username: faker.internet.userName(),
          login: faker.internet.userName(),
          password: faker.internet.password(),
        },
      });

      expect(response.body).toEqual('{"error":"Missing param: to"}');
      expect(response.statusCode).toBe(400);
    });

    test('Should return 400 if "to" property has incorrect emails', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/send',
        body: {
          from: faker.internet.email(),
          to: [faker.lorem.word(), faker.lorem.words()],
          title: faker.lorem.words(),
          message: faker.lorem.paragraph(),
          username: faker.internet.userName(),
          login: faker.internet.userName(),
          password: faker.internet.password(),
        },
      });

      expect(response.body).toEqual('{"error":"Invalid param: to"}');
      expect(response.statusCode).toBe(400);
    });

    test('Should return 400 if a required property is missing', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/send',
        body: {
          from: faker.internet.email(),
          to: [faker.internet.email()],
          title: faker.lorem.words(),
          message: faker.lorem.paragraph(),
          username: faker.internet.userName(),
        },
      });

      expect(response.body).toEqual('{"error":"Missing param: login"}');
      expect(response.body).not.toEqual('{"error":"Missing param: password"}');
      expect(response.statusCode).toBe(400);
    });

    test('Should return 500 if a invalid login is done', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/send',
        body: {
          from: faker.internet.email(),
          to: [faker.internet.email()],
          title: faker.lorem.words(),
          message: faker.lorem.paragraph(),
          username: faker.internet.userName(),
          login: faker.internet.userName(),
          password: faker.internet.password(),
        },
      });

      expect(response.body).toEqual('{"error":"Unauthorized"}');
      expect(response.statusCode).toBe(401);
    });

    test('Should return 204 when email is sent with succeeds', async () => {
      const username = getMailUsername();
      const response = await app.inject({
        method: 'POST',
        url: '/api/send',
        body: {
          from: username,
          to: [username],
          title: faker.lorem.words(),
          message: faker.lorem.paragraph(),
          username: faker.internet.userName(),
          login: username,
          password: getMailPassword(),
        },
      });

      expect(response.body).toBeFalsy();
      expect(response.statusCode).toBe(204);
    });
  });
});
