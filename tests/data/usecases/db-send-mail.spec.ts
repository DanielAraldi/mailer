import { mockSendMailParams } from '../../domain/mocks';
import { NodemailerAdapterSpy } from '../mocks';
import { DbSendMail } from '../../../src/data/usecases';
import { SendEmailRepository } from '../../../src/data/protocols/db';
import { InMemorySendRepository } from '../../infra/mocks';

interface SutTypes {
  sendPrismaRepository: SendEmailRepository;
  nodemailerSpy: NodemailerAdapterSpy;
  sut: DbSendMail;
}

const makeSut = (): SutTypes => {
  const sendPrismaRepository = new InMemorySendRepository();
  const nodemailerSpy = new NodemailerAdapterSpy();
  const sut = new DbSendMail(
    nodemailerSpy,
    nodemailerSpy,
    sendPrismaRepository
  );
  return {
    sendPrismaRepository,
    nodemailerSpy,
    sut,
  };
};

describe('DbSendMail Usecase', () => {
  test('Should call create() from NodemailerAdapter to initialize transporter', async () => {
    const { nodemailerSpy } = makeSut();
    jest.spyOn(nodemailerSpy, 'create');
    nodemailerSpy.create();
    expect(nodemailerSpy.create).toHaveBeenCalled();
  });

  test('Should call sendMail() from NodemailerAdapter with correct values', async () => {
    const { sut, nodemailerSpy } = makeSut();
    const mail = mockSendMailParams();
    nodemailerSpy.create();
    await sut.send(mail);
    expect(nodemailerSpy.mail).toEqual(mail);
  });

  test("Should return false if sendMail() from NodemailerAdapter doesn't initialize transporter", async () => {
    const { sut, nodemailerSpy } = makeSut();
    nodemailerSpy.transporter = null;
    const mail = mockSendMailParams();
    jest
      .spyOn(nodemailerSpy, 'send')
      .mockReturnValueOnce(Promise.resolve(false));
    const wasSent = await sut.send(mail);
    expect(wasSent).toBeFalsy();
  });

  test('Should throw error if sendMail() from NodemailerAdapter throws', async () => {
    const { sut, nodemailerSpy } = makeSut();
    const mail = mockSendMailParams();
    jest
      .spyOn(nodemailerSpy, 'send')
      .mockImplementationOnce(async () => await Promise.reject(new Error()));
    nodemailerSpy.create();
    const promise = sut.send(mail);
    await expect(promise).rejects.toThrow();
  });

  test('Should return true if sendMail() from NodemailerAdapter send an email', async () => {
    const { sut, nodemailerSpy } = makeSut();
    const mail = mockSendMailParams();
    nodemailerSpy.create();
    const wasSent = await sut.send(mail);
    expect(wasSent).toBeTruthy();
  });

  test('Should return false if sendMail() from NodemailerAdapter returns false', async () => {
    const { sut, nodemailerSpy } = makeSut();
    const mail = mockSendMailParams();
    nodemailerSpy.create();
    jest
      .spyOn(nodemailerSpy, 'send')
      .mockReturnValueOnce(Promise.resolve(false));
    const wasSent = await sut.send(mail);
    expect(wasSent).toBeFalsy();
  });

  test('Should return true if SendPrismaRepository returns true', async () => {
    const { sut, nodemailerSpy, sendPrismaRepository } = makeSut();
    const mail = mockSendMailParams();
    nodemailerSpy.create();
    jest
      .spyOn(sendPrismaRepository, 'send')
      .mockReturnValueOnce(Promise.resolve(true));
    const wasSent = await sut.send(mail);
    expect(wasSent).toBeTruthy();
  });

  test('Should return true if SendPrismaRepository returns false', async () => {
    const { sut, nodemailerSpy, sendPrismaRepository } = makeSut();
    const mail = mockSendMailParams();
    nodemailerSpy.create();
    jest
      .spyOn(sendPrismaRepository, 'send')
      .mockReturnValueOnce(Promise.resolve(false));
    const wasSent = await sut.send(mail);
    expect(wasSent).toBeFalsy();
  });
});
