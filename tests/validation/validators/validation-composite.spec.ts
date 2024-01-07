import { ValidationComposite } from '../../../src/validation/validators';
import { MissingParamError } from '../../../src/presentation/errors';
import { ValidationSpy } from '../../presentation/mocks';
import { faker } from '@faker-js/faker';

const field = faker.lorem.word();

interface SutTypes {
  sut: ValidationComposite;
  validationSpies: ValidationSpy[];
}

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()];
  const sut = new ValidationComposite(validationSpies);
  return {
    sut,
    validationSpies,
  };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[1].error = new MissingParamError(field);
    const error = sut.validate({ [field]: faker.lorem.word() });
    expect(error).toEqual(validationSpies[1].error);
  });

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[0].error = new Error();
    validationSpies[1].error = new MissingParamError(field);
    const error = sut.validate({ [field]: faker.lorem.word() });
    expect(error).toEqual(validationSpies[0].error);
  });

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ [field]: faker.lorem.word() });
    expect(error).toBeNull();
  });
});
