import { EmailValidatorAdapter } from '../../../infra/validators/email-validator-adapter';
import { Validation } from '../../../presentation/protocols';
import {
  EmailValidation,
  MultiEmailsInTheFieldValidation,
  RequiredFieldValidation,
  RequiredMultiValuesInTheFieldValidation,
  ValidationComposite,
} from '../../../validation/validators';

export const makeSendMailValidation = (): ValidationComposite => {
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

  return new ValidationComposite(validations);
};
