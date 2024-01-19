import { mockSendMailParams } from '../../../domain/mocks';
import { InMemorySendRepository } from '../../mocks';

const makeSut = (): InMemorySendRepository => new InMemorySendRepository();

describe('SendInMemoryRepository', () => {
  describe('send()', () => {
    test('Should call send() with correct values', async () => {
      const sut = makeSut();
      const sendMailParams = mockSendMailParams();
      await sut.send(sendMailParams);
      expect(sut.data).toEqual(sendMailParams);
    });

    test('Should throw error if some error throws', async () => {
      const sut = makeSut();
      const sendMailParams = mockSendMailParams();
      jest
        .spyOn(sut, 'send')
        .mockImplementationOnce(async () => await Promise.reject(new Error()));
      const promise = sut.send(sendMailParams);
      await expect(promise).rejects.toThrow();
    });

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
