import { Validation } from '../../presentation/protocols';
import {
  InvalidParamError,
  MissingParamError,
} from '../../presentation/errors';
import { EmailValidator } from '../protocols';

export class MultiEmailsInTheFieldValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate(input: any): Error | null {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName);

    for (const email of input[this.fieldName]) {
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) return new InvalidParamError(this.fieldName);
    }
    return null;
  }
}
