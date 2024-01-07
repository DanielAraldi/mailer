import { SendEmail } from '..';
import { faker } from '@faker-js/faker';

export const mockSendMailParams = (): SendEmail.Params => ({
  from: faker.internet.email(),
  login: faker.internet.email(),
  message: faker.lorem.words(),
  password: faker.internet.password(),
  title: faker.lorem.word(),
  username: faker.person.fullName(),
  to: [faker.internet.email(), faker.internet.email()],
});
