import { SendEmailRepository } from '../../../../src/data/protocols/db';
import { mockSendMailParams } from '../../../domain/mocks';
import { InMemorySendRepository } from '../../mocks';

const makeSut = (): SendEmailRepository => new InMemorySendRepository();

describe('SendInMemoryRepository', () => {
  describe('send()', () => {
    test('Should return true if the email was sent.', async () => {
      const sut = makeSut();
      const sendMailParams = mockSendMailParams();
      const isValid = await sut.send(sendMailParams);
      expect(isValid).toBe(true);
    });
  });
});
