import { makeSendMailValidation } from '../../../../src/main/factories/controllers';
import { Validation } from '../../../../src/presentation/protocols';
import { EmailValidatorAdapter } from '../../../../src/infra/validators/email-validator-adapter';
import {
  EmailValidation,
  MultiEmailsInTheFieldValidation,
  RequiredFieldValidation,
  RequiredMultiValuesInTheFieldValidation,
  ValidationComposite,
} from '../../../../src/validation/validators';

jest.mock('../../../../src/validation/validators/validation-composite.ts');

describe('SendMailValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSendMailValidation();
    const validations: Validation[] = [];

    const emailValidator = new EmailValidatorAdapter();
    validations.push(new EmailValidation('from', emailValidator));
    validations.push(new RequiredMultiValuesInTheFieldValidation(['to']));
    validations.push(new MultiEmailsInTheFieldValidation('to', emailValidator));
    validations.push(
      new RequiredFieldValidation([
        'to',
        'from',
        'title',
        'message',
        'login',
        'password',
      ])
    );

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
