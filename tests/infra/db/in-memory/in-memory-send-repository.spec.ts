import { mockSendMailParams } from '../../../domain/mocks';
import { InMemorySendRepository } from '../../mocks';

const makeSut = (): InMemorySendRepository => new InMemorySendRepository();

describe('SendInMemoryRepository', () => {
  describe('send()', () => {
    test("Should return false if the email wasn't sent", async () => {
      const sut = makeSut();
      const sendMailParams = mockSendMailParams();
      jest.spyOn(sut, 'send').mockReturnValueOnce(Promise.resolve(false));
      const wasSent = await sut.send(sendMailParams);
      expect(wasSent).toBeFalsy();
    });

    test('Should return true if the email was sent', async () => {
      const sut = makeSut();
      const sendMailParams = mockSendMailParams();
      const wasSent = await sut.send(sendMailParams);
      expect(wasSent).toBeTruthy();
    });
  });
});
