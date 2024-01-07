import { Validation } from '../../presentation/protocols';
import { MissingParamError } from '../../presentation/errors';

export class RequiredMultiValuesInTheFieldValidation implements Validation {
  constructor(private readonly fieldNames: string[]) {}

  validate(input: any): Error | null {
    for (const fieldName of this.fieldNames) {
      if (!Array.isArray(input[fieldName])) {
        return new MissingParamError(fieldName);
      }
      if (input[fieldName].length === 0) {
        return new MissingParamError(fieldName);
      }
    }
    return null;
  }
}
