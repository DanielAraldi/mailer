import { Validation } from '../../../src/presentation/protocols';

export class ValidationSpy implements Validation {
  public error: Error = null;
  public input: any;

  validate(input: any): Error | null {
    this.input = input;
    return this.error;
  }
}
