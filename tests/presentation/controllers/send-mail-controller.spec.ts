import { mockSendMailParams, throwError } from '../../domain/mocks';
import { SendMailSpy, ValidationSpy } from '../mocks';
import { SendMailController } from '../../../src/presentation/controllers';
import {
  badRequest,
  noContent,
  serverError,
} from '../../../src/presentation/helpers';
import { SendFailedError } from '../../../src/presentation/errors';

interface SutTypes {
  sut: SendMailController;
  sendMailSpy: SendMailSpy;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sendMailSpy = new SendMailSpy();
  const sut = new SendMailController(validationSpy, sendMailSpy);
  return {
    sut,
    sendMailSpy,
    validationSpy,
  };
};

describe('SendMail Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockSendMailParams();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new Error();
    const request = await sut.handle(mockSendMailParams());
    expect(request).toEqual(badRequest(validationSpy.error));
  });

  test('Should call SendMail with correct values', async () => {
    const { sut, sendMailSpy } = makeSut();
    const request = mockSendMailParams();
    await sut.handle(request);
    expect(sendMailSpy.mail).toEqual(request);
  });

  test('Should return 500 if SendMail throws', async () => {
    const { sut, sendMailSpy } = makeSut();
    jest.spyOn(sendMailSpy, 'send').mockImplementationOnce(throwError);
    const request = await sut.handle(mockSendMailParams());
    expect(request).toEqual(serverError(new Error()));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const request = await sut.handle(mockSendMailParams());
    expect(request).toEqual(noContent());
  });

  test("Should return 400 if SendMail isn't successfully", async () => {
    const { sut, sendMailSpy } = makeSut();
    sendMailSpy.result = false;
    const request = await sut.handle(mockSendMailParams());
    expect(request).toEqual(badRequest(new SendFailedError()));
  });
});
