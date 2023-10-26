import { faker } from '@faker-js/faker';
import { EmailValidatorSpy } from '../mocks';
import { throwError } from '../../domain/mocks';
import { InvalidParamError } from '../../../src/presentation/errors';
import { EmailValidation } from '../../../src/validation/validators';

const field = faker.lorem.word();

interface SutTypes {
  sut: EmailValidation;
  emailValidatorSpy: EmailValidatorSpy;
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidation(field, emailValidatorSpy);
  return { sut, emailValidatorSpy };
};

describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const email = faker.internet.email();
    const error = sut.validate({ [field]: email });
    expect(error).toEqual(new InvalidParamError(field));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut();
    const email = faker.internet.email();
    sut.validate({ [field]: email });
    expect(emailValidatorSpy.email).toBe(email);
  });

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError);
    expect(sut.validate).toThrow();
  });

  test('Should return null if EmailValidator succeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ [field]: faker.internet.email() });
    expect(error).toBeNull();
  });
});
