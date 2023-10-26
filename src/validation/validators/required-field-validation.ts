import { Validation } from "../../../src/presentation/protocols";
import { MissingParamError } from "../../../src/presentation/errors";

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldNames: string[]) {}

  validate(input: any): Error | null {
    for (const fieldName of this.fieldNames) {
      if (!input[fieldName]) return new MissingParamError(fieldName);
    }
    return null;
  }
}
