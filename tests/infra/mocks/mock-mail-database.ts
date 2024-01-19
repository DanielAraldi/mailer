import { SendEmailRepository } from '../../../src/data/protocols/db';
import { faker } from '@faker-js/faker';

export const mockMailDatabaseParams = (): SendEmailRepository.Params => ({
  from: faker.internet.email(),
  message: faker.lorem.words(),
  title: faker.lorem.word(),
  username: faker.person.fullName(),
  to: [faker.internet.email(), faker.internet.email()],
});
