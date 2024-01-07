import { MultiEmailsInTheFieldValidation } from '../../../src/validation/validators';
import {
  InvalidParamError,
  MissingParamError,
} from '../../../src/presentation/errors';
import { EmailValidatorSpy } from '../mocks';
import { faker } from '@faker-js/faker';

const field = faker.lorem.word();

interface SutTypes {
  sut: MultiEmailsInTheFieldValidation;
  emailValidatorSpy: EmailValidatorSpy;
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new MultiEmailsInTheFieldValidation(field, emailValidatorSpy);
  return { sut, emailValidatorSpy };
};

describe('Required Multi Values in the Field Validation', () => {
  test('Should call RequiredMultiValuesInTheFieldValidation with correct field', () => {
    const { sut } = makeSut();
    const validateSpy = jest.spyOn(sut, 'validate');
    const input = { [field]: [faker.internet.email()] };
    sut.validate(input);
    expect(validateSpy).toHaveBeenCalledWith(input);
  });

  test('Should return a MissingParamError if validation fails when field name is incorrect', () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const error = sut.validate({ invalidField: [faker.internet.email()] });
    expect(error).toEqual(new MissingParamError(field));
  });

  test('Should return a InvalidParamError if validation fails when invalid email is provided', () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const error = sut.validate({ [field]: [faker.lorem.word()] });
    expect(error).toEqual(new InvalidParamError(field));
  });

  test('Should return null if array is empty', () => {
    const { sut } = makeSut();
    const error = sut.validate({ [field]: [] });
    expect(error).toBeNull();
  });

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ [field]: [faker.internet.email()] });
    expect(error).toBeNull();
  });
});
