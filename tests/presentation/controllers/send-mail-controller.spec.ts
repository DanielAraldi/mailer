import { mockSendMailParams } from '../../domain/mocks';
import { SendMailSpy } from '../mocks/mock-mail';
import { SendMailController } from '../../../src/presentation/controllers';

describe('SendMail Controller', () => {
  test('Should call SendMail with correct values', async () => {
    const sendMailSpy = new SendMailSpy();
    const sut = new SendMailController(sendMailSpy);
    const request = mockSendMailParams();
    await sut.handle(request);
    expect(sendMailSpy.mail).toEqual(request);
  });
});
