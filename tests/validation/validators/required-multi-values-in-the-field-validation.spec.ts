import { RequiredMultiValuesInTheFieldValidation } from '../../../src/validation/validators';
import { MissingParamError } from '../../../src/presentation/errors';
import { faker } from '@faker-js/faker';

const field = faker.lorem.word();

const makeSut = (): RequiredMultiValuesInTheFieldValidation =>
  new RequiredMultiValuesInTheFieldValidation([field]);

describe('Required Multi Values in the Field Validation', () => {
  test('Should call RequiredMultiValuesInTheFieldValidation with correct field', () => {
    const sut = makeSut();
    const validateSpy = jest.spyOn(sut, 'validate');
    const input = { [field]: [faker.lorem.word()] };
    sut.validate(input);
    expect(validateSpy).toHaveBeenCalledWith(input);
  });

  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ invalidField: [faker.lorem.word()] });
    expect(error).toEqual(new MissingParamError(field));
  });

  test('Should return a MissingParamError if array is empty', () => {
    const sut = makeSut();
    const error = sut.validate({ [field]: [] });
    expect(error).toEqual(new MissingParamError(field));
  });

  test('Should return null if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({ [field]: [faker.lorem.word()] });
    expect(error).toBeNull();
  });
});
